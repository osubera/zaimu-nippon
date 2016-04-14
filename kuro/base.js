// 内部ストレージ基底クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Kuro_base, as a static class
伝票システム向けの共通コンストラクタ、関数
############################*/

define(function(){
  
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
                      _value = parseString(value, this.defaultValue, this.trim);
                    },
                    configurable: true },
      "defaultValue": { value: "", writable: true, configurable: true },
      "trim": { value: true, writable: true, configurable: true }
    });
    this.value = value;
    this.toString = function(){
      return(_value);
    };
  }
  this.string = KuroString;
  
  // 文字列パース
  function parseString(x, fallback, trim) {
    var v = x && x !== true ? x.toString() : fallback;
    if(trim) { v = v.trim(); }
    return(v);
  }
  this.parseString = parseString;
  
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
    /* return(x.toLocaleString());
    toLocaleStringには、小数点以下を3桁丸めする副作用がある。
    */
    var s = x.toString();
    var reg = /\./.test(s) ? /\B(?=(?:\d{3})+\.)/g : /\B(?=(?:\d{3})+$)/g;
    return(s.replace(reg, ","));
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
                      _value = parseDate(value, this.defaultValue);
                    } ,
                    configurable: true },
      "defaultValue": { value: today(), writable: true, configurable: true },
      "formatSeparator": { value: "/", writable: true, configurable: true },
      "formatMonthFillZero": { value: true, writable: true, configurable: true },
      "formatDayFillZero": { value: true, writable: true, configurable: true }
    });
    this.value = value;
    this.toString = function(){
      return(formatDateYmd(_value,
        this.FormatSeparator, this.formatMonthFillZero, this.formatDayFillZero));
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
  function formatDateYmd(x, separator, monthfill, dayfill) {
    /*return(x.toLocaleDateString());
    locale依存
    safari だと漢字になる。2016年4月10日
    */
    var y = x.getFullYear();
    var m = x.getMonth() + 1;
    if(monthfill && m < 10) { m = "0" + m; }
    var d = x.getDate();
    if(dayfill && d < 10) { d = "0" + d; }
    return([y, m, d].join(separator));
  }
  this.formatDateYmd = formatDateYmd;
  
  /*############################
  KuroBoolean / this.boolean
  論理変数のコンストラクタ
  ############################*/
  
  function KuroBoolean(value) {
      KuroVar.call(this);
    
    var _value;
    Object.defineProperties(this, {
      "value": { get: function(){ return _value; },
                    set: function(value) {
                      _value = value === true ? true : 
                        ( value === false ? false : this.defaultValue);
                    } ,
                    configurable: true },
      "defaultValue": { value: false, writable: true, configurable: true },
      "formatTrue": { value: "true", writable: true, configurable: true },
      "formatFalse": { value: "false", writable: true, configurable: true }
    });
    this.value = value;
    this.toString = function(){
      return(_value ? this.formatTrue : this.formatFalse);
    };
  }
  this.boolean = KuroBoolean;
  
  /*############################
  KuroList / this.list
  一次元配列変数のコンストラクタ
  ############################*/
  
  function KuroList(value) {
  }
  this.list = KuroList;
  
  /*############################
  KuroTable / this.table
  二次元表データベース変数のコンストラクタ
  ############################*/
  
  function KuroTable(value) {
  }
  this.table = KuroTable;
};

return({version: '1.0.0', Kuro_base: Kuro_base});
});
