// 内部ストレージ基底クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Ao_base, as a class
青色申告システム向けの共通コンストラクタ、関数
require kuro/base.js, kuro/nendo.js
############################*/

define(['kuro/base', 'kuro/nendo'], function(Kuro_base, Kuro_nendo){
  
  function Ao_base(year){
    
    var nen = new Kuro_nendo;
    
    /*############################
    properties
    ############################*/
    
    Object.defineProperties(this, {
      "nendo": { value: new nen.nendo(year), writable: true, configurable: true }
    });
  }
  
  return(Ao_base);
});
