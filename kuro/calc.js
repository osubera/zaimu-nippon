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
    }
    this.func = Func;
    /*
    calc
    実際に呼び出されるコールバック
    引数をセットしてfuncを呼ぶ
    手動計算用に、強制フラグを持つ。
    lastArgs と recalcRequired をリセットする。
    
    func
    func.apply(null, [4,5,6,7]);
    の形で、配列を展開して呼び出す。
    
    depends
    引数順で、依存objectの配列を持つ
    基本型の定数を混ぜることができる
    
    var
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
        "unsolved": { get: function(){
                        return this.solves.length > 0;
                      }},
        "root": { get: function(){
                    return this.solves[0];
                  }},
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
    
    /*
    この内容は実行でなく、計算順序作成。
    */
    Calc.prototype.calc = function(force){
      while(true) {
        var leaf = this.getFirstLeaf();
        if(leaf === nothing) {
          if(this.countRemains() == 0) {
            // 計算終了
            return;
          } else {
            // 循環
            /*
            処理を固定しないで、
            this.onError を呼び出す方式にする。
            */
            var message = "\u5FAA\u74B0";
            throw new Error(message);
          }
        }
        // leaf の計算
        var func = getFuncBySolv(leaf);
        func.calc(force);
        // 計算済みをセット
        leaf.needCalc = false;
      }
    }
    
    /*############################
    計算樹生成
    ############################*/
    
    /*
    root 不要。
    parentをたどるのでなく、leafを処理していくだけなので。
    parent と child の意味が逆っぽいので、入れ替えた方がわかりいいかも。
    現状は、 child が depend になっているので、
    child 末端から計算していく。
    あるセルが変わったとき影響を受ける相手は parent の側になっている。
    */
    Calc.prototype.makeRoot = function(){
      this.solves = [new Solv(undefined, true)];
      this.ids = ["root"];
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
    
    Calc.prototype.addNewChild(at, child){
      var solv = this.getSolvById(at);
      var childSolv = new Solv(child);
      this.solves.push(childSolv);
      this.ids.push(child);
      childSolv.addParent(at);
      solv.addChild(child);
    }
    
    Calc.prototype.addOldChild(at, child){
      var solv = this.getSolvById(at);
      var childSolv = this.getSolvById(child);
      childSolv.addParent(at);
      solv.addChild(child);
    }
    
    /*
    部分的再作成は意味がないし、難しいのでしない。
    */
    Calc.prototype.makeTree = function(start){
      this.makeRoot();
      this.addTree(start);
    }
    
    Calc.prototype.makeAllTrees = function(){
      this.makeRoot();
      while(true) {
        var start = this.getFirstUnlistedFunc();
        if(start === null) { break; }
        this.addTree(start);
      }
    }
    
    /*############################
    正引き、逆引き、検索
    ############################*/
    
    Calc.prototype.getFirstUnlistedFunc = function(){
    }
    
    Calc.prototype.getFirstLeaf = function(){
    }
    
    Calc.prototype.countRemains = function(){
    }
    
    Calc.prototype.getIdByVar = function(kuro){
    }
    
    Calc.prototype.getVarById = function(id){
    }
    
    Calc.prototype.getIdBySolv = function(solv){
    }
    
    Calc.prototype.getSolvById = function(id){
    }
    
    Calc.prototype.getFuncBySolv = function(solv){
    }
    
    Calc.prototype.isIdListed = function(id){
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
    ############################*/
    
    function Solv(self, root) {
      Object.defineProperties(this, {
        "self": { value: undefined, writable: true },
        "children": { value: [] },
        "parents": { value: [] },
        "needCalc": { value: false, writable: true },
        "isRoot": { value: false, writable: true },
        "isLeaf": { get: function(){
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
      this.self = self;
      this.isRoot = !!root;
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
  };
  
  return(Kuro_calc);
});
