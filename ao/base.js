// 内部ストレージ基底クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Ao_base, as a class
青色申告システム向けの共通コンストラクタ、関数
require kuro/base.js
############################*/

define(['kuro/base'], function(Kuro_base){
  
  function Ao_base(){
    
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
    properties
    ############################*/
    
    Object.defineProperties(this, {
      "xxxnendo": { value: 3}//new Nendo }
    });
  }
  
  return(Ao_base);
});
