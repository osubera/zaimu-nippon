// 和暦クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Kuro_wareki, as a class
和暦日付のコンストラクタ、関数
require kuro/base.js
############################*/

define(['kuro/base'], function(Kuro_base){
  
  function Kuro_wareki(){
    
    /*############################
    _warekiRule / this.warekiRule
    和暦変換の基礎情報
    ############################*/
    
    var _warekiRule = {
    };
    /*
    hash ではなく、table を利用した方がいいか？
平成 1988年
昭和 1925年
大正 1911年
明治 1867年
による、年単位の簡易変換と、
平成元年1/8
昭和元年12/25
大正元年7/30
明治元年1/25
開始による、日単位の変換をサポートする。
漢字表記とH,S,T,Mという略号も。
parseも含めて。
漢字の曜日を入れる？
    */
    this.warekiRule = _warekiRule;
    
    /*############################
    KuroDate / this.date
    和暦日付変数のコンストラクタおよび補助関数
    ############################*/
    
    function KuroDate(value) {
      Kuro_base.date.call(this);
      
    }
    this.date = KuroDate;
  }
  
  return(Kuro_wareki);
});
