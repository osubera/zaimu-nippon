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
  };
  
  return(Kuro_calc);
});
