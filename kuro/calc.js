// 計算制御クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Kuro_calc, as a static class
伝票システム向けの計算・依存制御
############################*/

define(function(){
  
  var Kuro_calc = new function(){
    
    /*############################
    Func / this.func
    計算式のコンストラクタ
    ############################*/
    
    function Func() {
      Object.defineProperties(this, {
        "cell": { value: undefined, writable: true },
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
    
    /*
    calc
    実際に呼び出されるコールバック
    引数をセットしてfuncを呼ぶ
    手動計算用に、強制フラグを持つ。
    lastArgs と recalcRequired をリセットする。
    日付タイプのときは clone しないといけない。
    
    func
    func.apply(null, [4,5,6,7]);
    の形で、配列を展開して呼び出す。
    
    depends
    引数順で、依存objectの配列を持つ
    基本型の定数を混ぜることができる
    
    cell
    計算結果を格納するobjectを持つ
    
    lastArgs
    現在の計算値の元になった引数値配列を持つ
    
    auto
    自動再計算フラグ
    offにするとイベントがcalcを呼んでもnop動作
    手動計算向けに、forth引数との or 動作となる。
    
    recalcRequired
    再計算フラグ
    外部または内部からセット
    
    argsChanged
    lastArgsとvarのvalueの配列の比較をして、変化の有無を調べる。
    変化があれば、recalcRequiredフラグを立てる。
    recalcRequired || argsChanged 判定をすることで、何度も計算しないように。
    
    verbose
    console.log に情報を出すスイッチ
    */
    
    /*############################
    Calc / this.calc
    計算制御のコンストラクタ
    ############################*/
    
    function Calc() {
      Object.defineProperties(this, {
        "funcs": { value: [] },
        "ids": { value: [], writable: true },
        "solves": { value: [], writable: true },
        "serializedFuncs": { value: [], writable: true },
        "rebuildRequired": { value: false, writable: true },
        "disableAuto": { value: false, writable: true },
        "unsolved": { get: function(){
                        return this.solves.length > 0;
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
    
    /*
    ほとんどのケースで、計算式は設計時に決まっていて、
    実行時には変更されない。
    よって、初期に1度だけtreeを作れば、
    あとはそれを使いまわせるはず。
    そのポリシーを制御するフラグも作る。
    計算時にtreeの要素を消さないで消しこみをする手段を考える。
    
    tree固定なら、funcの計算順序も固定できるので、
    最終的には func の配列を保持すればいい。
    それを順に計算していくだけでいい。
    */
    
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
        this.makeTree();
        this.serializeTree();
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
      while(true) {
        var leaf = this.getFirstLeaf();
        if(leaf === null) {
          // 計算できる端点がなくなれば終了
          var err = this.unsolved;
          if(err) {
            // 端点が無いのに未処理があれば、循環
            this.onCyclicError();
          }
          return(!err);
        }
        // 計算序列に追加
        this.serializedFuncs.push(getFuncBySolv(leaf));
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
      this.ids = [];
    }
    
    Calc.prototype.addTree = function(start){
      this.solves.push(new Solv(start));
      this.ids.push(start);
      this.root.children.push(start);
      this.sprout(start);
    }
    
    Calc.prototype.sprout = function(at){
      var solv = this.getSolvById(at);
      var func = this.funcs[solv.self];
      var dep = func.depends;
      for(var i = 0; i < dep.length; i++) {
        var child = this.getIdByVar(dep[i]);
        if(this.isIdListed(child)) {
          this.addOldChild(at, child);
        } else {
          this.addNewChild(at, child);
          this.sprout(child);
        }
      }
    }
    
    Calc.prototype.addNewChild = function(at, child){
      var solv = this.getSolvById(at);
      var childSolv = new Solv(child);
      this.solves.push(childSolv);
      this.ids.push(child);
      childSolv.addParent(at);
      solv.addChild(child);
    }
    
    Calc.prototype.addOldChild = function(at, child){
      var solv = this.getSolvById(at);
      var childSolv = this.getSolvById(child);
      childSolv.addParent(at);
      solv.addChild(child);
    }
    
    Calc.prototype.makeTree = function(){
      this.clearTree();
      while(true) {
        var start = this.getFirstUnlistedFunc();
        if(start === null) { break; }
        this.addTree(start);
      }
    }
    
    /*############################
    計算式登録
    ############################*/
    
    Calc.prototype.addFunc = function(cell, fn, depends, auto, verbose, tag){
      var func = new Func;
      func.cell = cell;
      func.fn = fn;
      func.depends = depends;
      if(auto != undefined) { func.auto = auto; }
      if(verbose != undefined) { func.verbose = verbose; }
      if(tag) { func.tag = tag; }
      func.commander = this;
      func.addEventListeners();
      
      this.removeFuncByVar(cell);
      this.funcs.push(func);
      this.rebuildRequired = true;
    }
    
    Calc.prototype.removeFuncAt = function(at){
      var funcs = this.funcs;
      if(at < 0 || at >= funcs.length) {
        throw new RangeError('array index out of range');
      }
      funcs[at].removeEventListeners();
      funcs[at] == new Func;
      // 空の Func object で埋めれば、計算要求は無視される。
      // idがずれないので rebuildRequired しなくてよい。
      // きれいに詰めたいなら、 new Calc からのやり直しが早い。
    }
    
    Calc.prototype.removeFuncByVar = function(cell){
      var at = this.getIdByVar(cell);
      if(at == null) { return; }
      this.removeFuncAt(at);
    }
    
    /*############################
    正引き、逆引き、検索
    ############################*/
    
    Calc.prototype.getFirstUnlistedFunc = function(){
      var funcs = this.funcs;
      var n = funcs.length;
      var ids = this.ids;
      for(var i = 0; i < n; i++) {
        if(ids.indexOf(i) == -1 && funcs[i].cell != undefined) { return(i); }
      }
      return(null);
    }
    
    Calc.prototype.getFirstLeaf = function(){
      var solves = this.solves;
      var n = solves.length;
      for(var i = 0; i < n; i++) {
        if(solves[i].isLeaf) { return(solves[i]); }
      }
      return(null);
    }
    
    Calc.prototype.getIdByVar = function(cell){
      var funcs = this.funcs;
      var n = funcs.length;
      for(var i = 0; i < n; i++) {
        if(funcs[i].cell === cell) { return(i); }
      }
      return(null);
    }
    
    Calc.prototype.getVarById = function(id){
      // 未使用
    }
    
    Calc.prototype.getIdBySolv = function(solv){
      // 未使用
    }
    
    Calc.prototype.getSolvById = function(id){
      var at = this.ids.indexOf(id);
      return(at == -1 ? null : this.solves[at]);
    }
    
    Calc.prototype.getFuncBySolv = function(solv){
      var at = this.solves.indexOf(solv);
      return(at == -1 ? null : this.funcs[this.ids[at]]);
    }
    
    Calc.prototype.isIdListed = function(id){
      // 未使用
    }
    
    /*
    calc
    計算実行
    強制フラグあり
    
    calcForce
    計算ボタンのイベントハンドラ登録用。
    calc(force=true) に相当。
    
    auto
    自動計算on/off
    配下の Func object 全部を連動させる。
    
    verbose
    console.log出力のスイッチ。
    配下の Func object 全部を連動させる。
    自分自身の動作に影響はしない。
    
    funcs
    Func object の配列
    
    addFunc
    関数などを指定して、Func object の生成と登録を行う。
    addEventListener 登録を行う。
    逆引き登録も行う。
    
    recalcRequired
    配下で recalcRequired || argsChanged を実施し、
    計算の要不要情報を得る。
    */
    
    /*############################
    Solv / this.solv
    計算樹の要素のコンストラクタ
    child側が依存先で、先に計算する。
    ############################*/
    
    function Solv(self) {
      Object.defineProperties(this, {
        "self": { value: undefined, writable: true },
        "children": { value: [] },
        "parents": { value: [] },
        "needCalc": { value: true, writable: true },
        "isLeaf": { get: function(){
                      var kids = this.children;
                      for(var i = 0; i < kids.length; i ++) {
                        if(kids[i].needCalc) {
                          // kids[i] には id が格納されており、ここは動かない
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
      this.self = self;
    }
    this.solv = Solv;
    
    Solv.prototype.addChild = function(child){
      this.children.push(child);
    }
    
    Solv.prototype.addParent = function(parent){
      this.parents.push(parent);
    }
    
    /*
    kuro_var object を a === b で探す。
    
    独立変数から Func を探す。
    ターゲットと一致する、 func.depends を含む func を総なめで探す。
    ターゲットの値変更によって再計算が必要になるものを探せる。
    
    従属変数から Func を探す。
    ターゲットと一致する、 func.var を持つ func を総なめで探す。
    ターゲットの値を決める計算式を探せる。もしくは登録が無いかも。
    
    上記動作を高速化するためのインデックスを持つ。
    funcs が配列なので、配列の位置番号が答え。
    [a,c,b,a,,,] という object配列を持ち、
    [0,1,2,4,,,] と、配列位置に対応させ、
    一致する場所を検索する。
    calc.addFunc によって、インデックスを更新する。
    removeFunc 機能もいるか？
    でも、削除は、他の func による使用もあるので単純ではない。
    むしろ何もせず残して、対応するものがなければ、エラーでなく空振り、って動作にするか。
    func object を直接更新して参照先などを変更した場合、連動しない。
    つまり、このデータを手動更新しないと計算が違ってしまう。
    
    連動が難しいなら、インデックスしない方がいいかも？
    object が hash 化できないこともあって、たいして高速にならないし。
    重複する参照がたくさんあるときに、若干速くなるのか。
    でも重複削除しよいうと思ったら、インデックス更新が重くなるし。
    
    毎回総なめしても、
    計算式の数×独立変数の平均数、もしくは、独立変数の総和、程度のコスト。
    a === b 比較は、しょせんはアドレス比較にすぎないので速いはず。
    
    スピードとは別の視点で、
    循環計算を止めるための仕組みが必要。
    計算依存のtreeを計算開始前に作ってしまい、
    循環発生時点で止める。
    
    強制全計算のときに、
    適当な順序でやると（登録順のような）、
    依存関係による無駄な再計算が発生する。
    依存未計算の無いものから優先的に計算しつつ、
    動的に依存未計算を消しこんでいくしくみが欲しいかも。
    そうすると、 Func に、動的な依存リストを登録できるようにするのか？
    
    循環判定
    1. 最初にtreeを完成させる。
    計算開始点に対応する solv を作成。funcのidを持つ。
    id は funcs 配列上の順位を文字化したもの。
    これに依存する func を検索し、その id （複数）を登録。
    child id の数だけ分岐。
    child に対応する solv を作成。
    このとき、親検索できるように、親id (複数)も登録しておく。
    以上を繰り返し。
    終了条件
    依存する func が無い。
    既存の solv に戻った。（これだけでは循環したとは限らない。）
    既存に戻った solv には、合流点として目印をつけておく。
    2. 端点から計算していく。
    端点とは、依存する func が無い終了点。
    端点を計算したことで、消し込めば、それのみに依存するものが次の端点になる。
    treeが全部消えてないのに端点が見つからないなら、それは循環している。
    
    全計算時は、
    適当な開始点からはじめ、上と同じ処理をする。
    終了すれば、残っている点から、再度適当な開始点を選び、繰り返す。
    終了条件
    すべての点に対応する solv が作られた。
    これらを束ねるための root solv があるといいかも。
    */
    
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
