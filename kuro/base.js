// 内部ストレージ基底クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Kuro_base, as a static class
伝票システム向けの共通コンストラクタ、関数
############################*/

var Kuro_base = new function(){
  
  /*############################
  KuroVar / this.var
  ベース変数のコンストラクタ
  ############################*/
  
  function KuroVar(value){
    var _value;
    Object.defineProperties(this, {
      "value": { get: function(){ return _value; },
                    set: function(value){ _value = value; },
                    configurable: true },
      "defaultValue": { value: undefined, writable: true, configurable: true }
    });
    this.value = value;
  }
  this.var = KuroVar;
  
  /*############################
  KuroString / this.string
  文字変数のコンストラクタ
  ############################*/
  
  function KuroString(value) {
    KuroVar.call(this);
    
    var _value;
    Object.defineProperties(this, {
      "value": { get: function(){ return _value; },
                    set: function(value) {
                      _value = value ? value.toString() : this.defaultValue;
                    },
                    configurable: true },
      "defaultValue": { value: "", writable: true, configurable: true }
    });
    this.value = value;
    this.toString = function(){
      return(_value);
    };
  }
  this.string = KuroString;
  
  /*############################
  KuroNumber / this.number
  数値変数のコンストラクタおよび補助関数
  ############################*/
  
  function KuroNumber(value) {
    KuroVar.call(this);
    
    var _value;
    Object.defineProperties(this, {
      "value": { get: function(){ return _value; },
                    set: function(value) {
                      //var v = parseNumber(value);
                      //_value = v ? v : 0; 
                      _value = parseNumber(value, this.defaultValue);
                    },
                    configurable: true },
      "defaultValue": { value: 0, writable: true, configurable: true }
    });
    this.value = value;
    this.toString = function(){
      return(formatNumberThousands(_value));
    };
    this.toAccountingString = function(){
      return(formatNumberTriangle(_value));
    };
  }
  this.number = KuroNumber;
  
  // 数値パース, カンマを緩く許可
  function parseNumber(x, fallback) {
    var v = (typeof x == "string") ?
               Number.parseFloat(x.replace(/,/g, "")) :
                x;
    return(v && v !== true ? v : fallback);
  }
  this.parseNumber = parseNumber;
  
  // 3桁,区切りに
  function formatNumberThousands(x) {
    return(x.toLocaleString());
    // toLocaleStringには、小数点以下を3桁丸めする副作用もある。
    // locale依存
  }
  this.formatNumberThousands = formatNumberThousands;
  
  // マイナスを△表記
  function formatNumberTriangle(x) {
    return(formatNumberThousands(x).replace(/-/, "△ "));
  }
  this.formatNumberTriangle = formatNumberTriangle;
  
  /*############################
  KuroDate / this.date
  日付変数のコンストラクタおよび補助関数
  ############################*/
  
  function KuroDate(value) {
    KuroVar.call(this);
    
    var _value;
    Object.defineProperties(this, {
      "value": { get: function(){ return _value; },
                    set: function(value) {
                      //var v = Date.parse(value);
                      //_value = v ? new Date(v) : today(); 
                      //_value = parseDate(value, today());
                      _value = parseDate(value, this.defaultValue);
                    } ,
                    configurable: true },
      "defaultValue": { value: today(), writable: true, configurable: true }
    });
    this.value = value;
    this.toString = function(){
      return(formatDateYmd(_value));
    };
  }
  this.date = KuroDate;
  
  // 日付パース
  function parseDate(x, fallback) {
    var v = Date.parse(x);
    return(v && v !== true ? new Date(v) : fallback);
  }
  this.parseDate = parseDate;
  
  // 今日
  function today() {
    var d = new Date();
    return(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
  }
  this.today = today;
  
  // yyyy/m/d形式に
  function formatDateYmd(x) {
    return(x.toLocaleDateString());
    // locale依存
  }
  this.formatDateYmd = formatDateYmd;
  
  /*############################
  KuroBoolean / this.boolean
  論理変数のコンストラクタ
  ############################*/
  
  function KuroBoolean(value) {
  }
  this.boolean = KuroBoolean;
  
  /*############################
  KuroArray / this.array
  一次元配列変数のコンストラクタ
  ############################*/
  
  function KuroArray(value) {
  }
  this.array = KuroArray;
  
  /*############################
  KuroTable / this.table
  二次元表データベース変数のコンストラクタ
  ############################*/
  
  function KuroTable(value) {
  }
  this.table = KuroTable;
};
