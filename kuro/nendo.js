// 年度クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Kuro_nendo, as a class
年度関連のコンストラクタ、関数
require kuro/base.js
############################*/

define(['kuro/base'], function(Kuro_base){
  
  function Kuro_nendo(){
    
    /*############################
    Nendo / this.nendo
    年度変数のコンストラクタ
    ############################*/
    
    function Nendo(year, begin, end){
      var _year = new Kuro_base.number;
      var _begin = new Kuro_base.date;
      var _end = new Kuro_base.date;
      var _month = new Kuro_base.number;
      
      Object.defineProperties(this, {
        "year": { get: function(){ return _year; },
                     set: function(value){ _year = parseYear(this, value); },
                     configurable: true },
                     // begin, end, month が未実装。
        "defaultYear": { value: new Date().getFullYear(), writable: true, configurable: true }
      });
      
      this.begin = begin;
      this.end = end;
      this.year = year;
      
      function parseYear(obj, x) {
        var y = Number.parseInt(x);
        if(y == 0 || y.toString() == "NaN") { y = obj.defaultYear; }
        if(!obj.begin) {}
        if(!obj.end) {}
        if(!obj.month) {}
        return(y);
      }
    }
    this.nendo = Nendo;
    
    /*############################
    NendoMaster / this.nendoMaster
    年度履歴変数のコンストラクタ
    ############################*/
    
    function NendoMaster(){
    }
    this.nendoMaster = NendoMaster;
    
    /*############################
    properties
    ############################*/
    
    Object.defineProperties(this, {
      "hoge": { value: 3 }
    });
    this.fuga = 1;
  }
  
  return(Kuro_nendo);
});
