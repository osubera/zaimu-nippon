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
    }
    this.calc = Calc;
    
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
    依存逆引きのコンストラクタ
    ############################*/
    
    function Solv() {
    }
    this.solv = Solv;
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
    */
  };
  
  return(Kuro_calc);
});
