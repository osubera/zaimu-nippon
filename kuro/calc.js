// 計算制御クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Kuro_calc, as a static class
伝票システム向けの計算・依存制御
############################*/

define(function(){
  
  /*
func を拡張するか、継承するかして、list対応する。
addFunc で、対象varを判定して、登録方法を変える。

list系は個別varでなくlist全体をcellやdependsとして持ち、
lastArgs系の動作もそれに合わせる。

table系の登録は、
表面的にはtable的にaddFuncを記述できるが、
それはsyntax sugar で、
内部では list系として登録する。

list系の内部var数は動的に変わるので、
登録としては func １つで list １つ、とする。
buildTree する前の unlisted を作る段階で、
clone funcs するときに、
list系の関数を内部的に展開した一時funcを作成して、
solv と serialized は内部varの数に拡張する。

この時、
内部varが個別登録されたfuncをすでに持っていたら、
list数式による展開上書きをしない。
同じvarに複数数式を登録していない前提で計算するので。

eventlistener は、
展開時に個別セルについて発生させるので、
list全体へのelement登録時にlistenerを作らないよう、
addEventListener をskipするか後でremoveするかする。

  */
  
  var Kuro_calc = new function(){
    
    /*############################
    Func / this.func
    計算式のコンストラクタ
    ############################*/
    
    function Func() {
      Object.defineProperties(this, {
        "cell": { value: undefined, writable: true },
        // 計算済みboxへの数値上書きに対応するなら、別途計算値とフラグが必要。
        "func": { value: undefined, writable: true },
        "depends": { value: [], writable: true },
        "lastArgs": { value: [], writable: true },
        "auto": { value: true, writable: true },
        "verbose": { value: false, writable: true },
        "tag": { value: "", writable: true },
        "recalcRequired": { value: false, writable: true },
        "argsChanged": { get: function(){
                           return notDeepEqualArrays(
                             this.depends, this.lastArgs);
                         }
                       },
        "events": { value: [], writable: true },
        "commander": { value: undefined, writable: true }
      });
    }
    this.func = Func;
    
    Func.prototype.calc = function(force){
      if(this.cell == undefined || this.func == undefined) {
        if(this.verbose) {
          console.log('func.calc: ' + this.tag + " quit by undefined.");
        }
        return; // 計算しない
      }
      if(!force && !this.auto) {
        if(this.verbose) {
          console.log('func.calc: ' + this.tag + " quit by not auto.");
        }
        return; // 計算しない
      }
      if(!force && !this.recalcRequired && !this.argsChanged) {
        if(this.verbose) {
          console.log('func.calc: ' + this.tag + " quit by not required.");
        }
        return; // 計算しない
      }
      
      var dep = this.depends;
      var n = dep.length;
      var arg = [];
      for(var i = 0; i < n; i++) {
        if(dep[i].cloneValue) {
          arg.push(dep[i].cloneValue());
        } else {
          arg.push(dep[i]);  // 基本型の定数値と判断
        }
      }
      this.lastArgs = arg;
      if(this.verbose) {
        console.log('func.calc: ' + this.tag + ": " + arg);
      }
      this.cell.value = this.func.apply(null, arg); // 計算実行
      this.recalcRequired = false;
    }
    
    Func.prototype.requestRecalc = function(){
      //addEventListener で bind(this) したので this は func
      this.recalcRequired = true;
      this.commander.requestRecalc(this);
    }
    
    Func.prototype.addEventListeners = function(){
      var elements = this.getElements();
      var n = elements.length;
      var events = [];
      for(var i = 0; i < n; i++) {
        var fn = this.requestRecalc.bind(this);
        elements[i].addEventListener("change", fn, false);
        // bubbling phase で、sync の後
        // bind すると新規無名関数となるので remove 用に記憶しておく。
        events.push([elements[i], fn]);
      }
      this.events = events;
      
    }
    
    Func.prototype.removeEventListeners = function(){
      var events = this.events;
      var n = events.length;
      for(var i = 0; i < n; i++) {
        var e = events[i];
        e[0].removeEventListener("change", e[1], false);
      }
      this.events = [];
    }
    
    Func.prototype.getElements = function(){
      var elements = [];
      var dep = this.depends;
      var n = dep.length;
      for(var i = 0; i < n; i++) {
        var d = dep[i];
        if(d && d.sync && d.sync.ready) {
          elements.push(d.sync.element);
        }
      }
      return(elements);
    }
    
    /*############################
    Calc / this.calc
    計算制御のコンストラクタ
    ############################*/
    
    function Calc() {
      Object.defineProperties(this, {
        "funcs": { value: [] },  // 関数登録
        "solves": { value: [], writable: true },  // 計算樹
        "unlisted": { value: [], writable: true },  // 作業用
        "serializedFuncs": { value: [], writable: true },  // 翻訳済み
        "rebuildRequired": { value: false, writable: true },
        "hasCyclic": { value: false, writable: true },
        "disableAuto": { value: false, writable: true },
        "unsolved": { get: function(){
                        return allOrNot(this.solves, "needCalc") !== false;
                      }},
        "auto": { get: function(){
                    return allOrNot(this.funcs, "auto");
                  },
                  set: function(auto){
                    var funcs = this.funcs;
                    for(var i = 0; i < funcs.length; i++) {
                      funcs[i].auto = auto;
                    }
                  }
                },
        "verbose": { get: function(){
                       return allOrNot(this.funcs, "verbose");
                     },
                     // 配下funcのverbose管理であり、このクラスには影響しない
                     set: function(verbose){
                       var funcs = this.funcs;
                       for(var i = 0; i < funcs.length; i++) {
                         funcs[i].verbose = verbose;
                       }
                     }
                   },
        "recalcRequired": { get: function(){
                              var funcs = this.funcs;
                              var n = funcs.length;
                              for(var i = 0; i < n; i++) {
                                if(funcs[i].recalcRequired ||
                                   funcs[i].argsChanged) {
                                     return true;
                                }
                              }
                              return false;
                            }
                          }
      });
    }
    this.calc = Calc;
    
    /*############################
    計算実行
    ############################*/
    
    Calc.prototype.requestRecalc = function(caller, force){
      // caller は今のところ使わない
      if(!force && this.disableAuto) { return; }
      if(!force && this.auto == false) { return; }
      if(!force && !this.recalcRequired) { return; }
      
      if(this.rebuildRequired) {
        // 計算樹生成と翻訳
        // 基本的に計算式は設計時に固定されるので、
        // 計算樹は固定で、一度生成すれば、実質的に固定。
        this.makeTree();
        this.serializeTree();
        this.rebuildRequired = false;
      }
      // 計算実行
      this.calc(force);
    }
    
    Calc.prototype.calc = function(force){
      var funcs = this.serializedFuncs;
      var n = funcs.length;
      for(var i = 0; i < n; i++) {
        funcs[i].calc(force);
      }
    }
    
    /*############################
    計算樹翻訳
    ############################*/
    
    Calc.prototype.serializeTree = function(){
      this.serializedFuncs = [];
      this.hasCyclic = false;
      if(this.solves.length == 0) { return; }
      // unsolved は、[]に対し true を返すので、空配列でループに入ってはいけない。
      while(true) {
        var leaf = this.getFirstLeaf();
        if(leaf === null) {
          // 計算できる端点がなくなれば終了
          var err = this.unsolved;
          if(err) {
            // 端点が無いのに未処理があれば、循環
            this.hasCyclic = true;
            this.onCyclicError();
          }
          return(!err);
        }
        // 計算序列に追加
        this.serializedFuncs.push(leaf.func);
        // 処理済みにする
        leaf.needCalc = false;
      }
    }
    
    Calc.prototype.onCyclicError = function(){
      // デフォルトの循環エラー処理
      var message = "\u5FAA\u74B0";
      throw new Error(message);
    }
    
    /*############################
    計算樹生成
    ############################*/
    
    Calc.prototype.clearTree = function(){
      this.solves = [];
    }
    
    Calc.prototype.addTree = function(start){
      var solv = new Solv(start);
      this.solves.push(solv);
      this.sprout(solv);
    }
    
    Calc.prototype.sprout = function(at){
      if(!at.func) { return; }
      
      var dep = at.func.depends;
      for(var i = 0; i < dep.length; i++) {
        var func = this.getFuncByVar(dep[i]);
        if(func === null) { return; }
        var child = this.getSolvByFunc(func);
        if(child === null) {
          this.unlisted[this.unlisted.indexOf(func)] = undefined;
          var newChild = new Solv(func);
          this.addNewChild(at, newChild);
          this.sprout(newChild);
        } else {
          this.addOldChild(at, child);
        }
      }
    }
    
    Calc.prototype.addNewChild = function(at, child){
      this.solves.push(child);
      this.addOldChild(at, child);
    }
    
    Calc.prototype.addOldChild = function(at, child){
      child.addParent(at);
      at.addChild(child);
    }
    
    Calc.prototype.cloneFuncList = function(){
      var cloned = [];
      var funcs = this.funcs;
      var n = funcs.length;
      for(var i = 0; i < n; i++) {
        cloned.push(funcs[i]);
        // func は clone しない。
      }
      return(cloned);
    }
    
    Calc.prototype.makeTree = function(){
      this.clearTree();
      this.unlisted = this.cloneFuncList();
      while(this.unlisted.length > 0) {
        var start = this.unlisted.pop();
        if(start) {
          this.addTree(start);
        }
      }
    }
    
    /*############################
    計算式登録
    ############################*/
    
    Calc.prototype.addFunc = function(cell, fn, depends, auto, verbose, tag){
      var func = new Func;
      func.cell = cell;
      func.func = fn;
      if(Array.isArray(depends)) { func.depends = depends; }
      if(auto != undefined) { func.auto = auto; }
      if(verbose != undefined) { func.verbose = verbose; }
      if(tag) { func.tag = tag; }
      func.commander = this;
      func.addEventListeners();
      
      // 同一変数なら上書きする
      this.removeFuncByVar(cell);
      this.funcs.push(func);
      this.rebuildRequired = true;
    }
    
    Calc.prototype.removeFunc = function(func){
      var funcs = this.funcs;
      var n = funcs.length;
      for(var i = 0; i < n; i++) {
        if(funcs[i] === func) {
          funcs[i].removeEventListeners();
          funcs[i] = new Func;
          return;
        }
      }
      // 空の Func object で埋めれば、計算要求は無視される。
      // いちいち rebuildRequired しない。
      // きれいに詰めたいなら、 new Calc からやり直す。
    }
    
    Calc.prototype.removeFuncByVar = function(cell){
      var func = this.getFuncByVar(cell);
      if(func == null) { return; }
      this.removeFunc(func);
    }
    
    /*############################
    正引き、逆引き、検索
    ############################*/
    
    Calc.prototype.getFirstLeaf = function(){
      // 端点を探す。
      // 端点とは、依存するchildがすべて計算済みで、ただちに計算実行できるsolv
      var solves = this.solves;
      var n = solves.length;
      for(var i = 0; i < n; i++) {
        if(solves[i].isLeaf) { return(solves[i]); }
      }
      return(null);
    }
    
    Calc.prototype.getFuncByVar = function(cell){
      var funcs = this.funcs;
      var n = funcs.length;
      for(var i = 0; i < n; i++) {
        if(funcs[i].cell === cell) { return(funcs[i]); }
      }
      return(null);
    }
    
    Calc.prototype.getSolvByFunc = function(func){
      var solves = this.solves;
      var n = solves.length;
      for(var i = 0; i < n; i++) {
        if(solves[i].func === func) { return(solves[i]); }
      }
      return(null);
    }
    
    /*############################
    Solv / this.solv
    計算樹の要素のコンストラクタ
    child側が依存先で、先に計算する。
    ############################*/
    
    function Solv(func) {
      Object.defineProperties(this, {
        "func": { value: undefined, writable: true },
        "children": { value: [] },
        "parents": { value: [] },
        "needCalc": { value: true, writable: true },
        "isLeaf": { get: function(){
                      if(!this.needCalc) { return false; }
                      // 処理済みは対象外。
                      var kids = this.children;
                      for(var i = 0; i < kids.length; i ++) {
                        if(kids[i].needCalc) {
                          return false;
                        }
                      }
                      return true;
                    }},
        "noChildren": { get: function(){
                      return this.children.length == 0;
                    }},
        "hasBranch": { get: function(){
                         return this.children.length > 1;
                       }},
        "hasMerge": { get: function(){
                        return this.parents.length > 1;
                      }}
      });
      this.func = func;
    }
    this.solv = Solv;
    
    Solv.prototype.addChild = function(child){
      this.children.push(child);
    }
    
    Solv.prototype.addParent = function(parent){
      this.parents.push(parent);
    }
    
    /*############################
    共用補助関数
    ############################*/
    
    function notDeepEqualArrays(x, y) {
      // 配列xと配列yの値の不一致を調べる。
      var n = x.length;
      if(n != y.length) { return true; }
      for(var i = 0; i < n; i++) {
        if(x[i].compareValue) {
          // x の要素が Kuro_var系なら、compareValueを使う。
          if(x[i].compareValue(y[i]) != 0) {
            return true;
          }
        } else {
          // 非Kuro_varでは日付比較などは正しくない。
          if(x[i] !== y[i]) {
            return true;
          }
        }
      }
      return false;
    }
    this.notDeepEqualArrays = notDeepEqualArrays;
    
    function allOrNot(x, prop) {
      // 配列xの各要素のプロパティpropを調べる。
      // すべて同じなら該当値を、一つでも違えば undefined を返す。
      var n = x.length;
      if(n == 0) { return undefined; }
      var res = x[0][prop];
      for(var i = 1; i < n; i++) {
        if(res !== x[i][prop]) { return undefined; }
      }
      return res;
    }
    this.allOrNot = allOrNot;
  };
  
  return(Kuro_calc);
});
