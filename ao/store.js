// データ構造
// https://github.com/osubera/zaimu-nippon

function Ao_Store(){}
Ao_Store.prototype = new Kuro_StoreBase;

Ao_Store.prototype.nendo = new function(){
  this.year = new KuroNumber;
  this.begin = new KuroDate;
  this.end = new KuroDate;
  this.months = new KuroNumber;
}
