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
    
    /*############################
    Calc / this.calc
    計算制御のコンストラクタ
    ############################*/
    
    function Calc() {
    }
    this.calc = Calc;
    
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
