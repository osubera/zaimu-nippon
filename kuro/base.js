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
      this.toJSON = function(){
        return(this.value);
      };
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
        return(this.value);
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
        return(formatNumberThousands(this.value));
      };
      this.toAccountingString = function(){
        return(formatNumberTriangle(this.value));
      };
    }
    this.number = KuroNumber;
    
    // 数値パース, カンマを緩く許可
    function parseNumber(x, fallback) {
      var v = (typeof x == "string") ?
                 Number.parseFloat(x.trim().replace(/,/g, "").replace(/^△ */, "-")) :
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
      /*            小数点     ?  小数点より前まで  :  最後まで             */
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
        return(formatDateYmd(this.value,
          this.formatSeparator, this.formatMonthFillZero, this.formatDayFillZero));
      };
      this.toJSON = this.toString;
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
                        _value = parseBoolean(value, this.defaultValue,
                          this.formatTrue, this.formatFalse);
                      } ,
                      configurable: true },
        "defaultValue": { value: false, writable: true, configurable: true },
        "formatTrue": { value: "true", writable: true, configurable: true },
        "formatFalse": { value: "false", writable: true, configurable: true }
      });
      this.value = value;
      this.toString = function(){
        return(this.value ? this.formatTrue : this.formatFalse);
      };
    }
    this.boolean = KuroBoolean;
    
    // 論理値パース, 自動変換しない, 書式文字のみ
    function parseBoolean(x, fallback, formatT, formatF) {
      var useDefault = x !== true && x !== false;
      if(formatT === x && typeof formatT == 'string') { useDefault = false; x = true; }
      if(formatF === x && typeof formatF == 'string') { useDefault = false; x = false; }
      return(useDefault ? fallback : x);
    }
    this.parseBoolean = parseBoolean;
    
    /*############################
    KuroList / this.list
    一次元配列変数のコンストラクタ
    ############################*/
    
    function KuroList(length, type) {
      var _value;
      var _type;
      var _defaultValue = 0;
      
      Object.defineProperties(this, {
        "value": { get: function() {
                        var v = [];
                        var n = _value.length
                        for(var i = 0; i < n; i++) {
                          v.push(_value[i].value);
                        }
                        return v; 
                      },
                      set: function(value) {
                        var n = _value.length;
                        var v = lengthenArray(value, n);
                        for(var i = 0; i < n; i++) {
                          _value[i].value = v[i];
                        }
                      },
                      configurable: true },
        "defaultValue": { get: function(){ return _defaultValue; },
                                 set: function(value){
                                    _defaultValue = value;
                                    Each(function(o){ o.defaultValue = value; });
                                 },
                                 configurable: true },
        "defaultType": { value: 'number', writable: true, configurable: true },
        "type": { get: function(){ return _type; }, configurable: true },
        "length": { get: function(){ return _value.length; },
                       configurable: true },
        "factories": { value: {
                                       number: KuroNumber,
                                       string: KuroString,
                                       date: KuroDate,
                                       boolean: KuroBoolean
                           },
                           writable: true, configurable: true
                         },
        "factory": { get: function(){ return this.factories[_type]; }, configurable: true },
        "keys": { get: function(){
                        var k = []
                        for(i = 0; i < _value.length; i++) {
                          k.push(i);
                        }
                        return k;
                      }, 
                      enumerable: true, configurable: true
                    }
      });
      
      function Each(fn) {
        // 内部変数 _value を直接呼ぶので継承できない。
        // fn = function(element)
        var v = [];
        var n = _value.length;
        for(var i = 0; i < n; i++) {
          v.push(fn(_value[i]));
        }
        return(v);
      }
      this.each = Each;
      
      // Reset系は、内部objectをすべて作りなおす、総入れ替え。
      
      function resetByLength(length, type) {
        // 内部変数 _type, _value を直接変更するので継承できない。
        var n = Number.parseInt(length);
        if(!n) { n = 0; }
        _type = type;
        if(!this.factory) { _type = this.defaultType; }
        
        var co = this.factory;
        var v = _defaultValue;
        _value = new Array(n);
        for(var i = 0; i < n; i++) {
          _value[i] = new co(v);
          _value[i].defaultValue = v;
        }
      }
      this.resetByLength = resetByLength;
      this.resetByLength(length, type);
      
      function resetByValues(value) {
        // 内部変数 _type, _value を直接変更するので継承できない。
        var v = Array.isArray(value) ? value : [value];
        // value: Arrayまたは単一値、単一値は要素1のArrayとみなす。
        _type = typeof v[0];
        // 先頭要素の型から全体の型を決める。
        var co = this.factory;
        if(co == undefined) {
          // factories登録の無い型の場合、全体を[]で初期化する。
          _type = this.defaultType;
          _value = [];
          return;
        }
        var n = v.length;
        _value = new Array(n);
        for(var i = 0; i < n; i++) {
          _value[i] = new co(v[i]);
          _value[i].defaultValue = _defaultValue;
        }
      }
      this.resetByValues = resetByValues;
      
      // Update系は、内部objectをできるだけ保持し値だけを入れ替える。
      
      function updateValues(value) {
        // 内部変数 _value を直接呼ぶので継承できない。
        if(Array.isArray(value)) {
          var n = Math.min(_value.length, value.length);
          for(var i = 0; i < n; i++) {
            if(value[i] != undefined) {
              // undefined な要素では上書きしない。
              _value[i].value = value[i];
            }
          }
        }
        else {
          // 単一値なら、undefinedも含め、すべてを同一値で埋める。
          var n = _value.length;
          for(var i = 0; i < n; i++) {
            _value[i].value = value;
          }
        }
      }
      this.updateValues = updateValues;
      
      function updateValueAt(index, value) {
        // 内部変数 _value を直接呼ぶので継承できない。
        var id = Number.parseInt(index);
        if(id < 0 || id >= _value.length) {
          throw new RangeError('array index out of range');
        }
        _value[id].value = value;
      }
      this.updateValueAt = updateValueAt;
      
      function updateLength(length) {
        var diff = Number.parseInt(length) - this.length;
        if(diff > 0) { this.increase(diff); }
        else if(diff < 0) { this.decrease(-diff); }
      }
      this.updateLength = updateLength;
      
      function increase(number) {
        // 内部変数 _value を直接呼ぶので継承できない。
        var x = Number.parseInt(number);
        if(x < 0) {
          throw new RangeError('must be positive and within length');
        }
        var co = this.factory;
        for(var i = 0; i < x; i++) {
          var o = new co(_defaultValue);
          o.defaultValue = _defaultValue;
          _value.push(o);
        }
      }
      this.increase = increase;
      
      function decrease(number) {
        // 内部変数 _value を直接呼ぶので継承できない。
        var x = Number.parseInt(number);
        if(x < 0 || x > _value.length ) {
          throw new RangeError('must be positive');
        }
        for(var i = 0; i < x; i++) {
          _value.pop();
        }
      }
      this.decrease = decrease;
      
      this.toString = function(){
        return(this.value.toString());
      };
      this.toJSON = function(){
        return(this.value);
      }
    }
    this.list = KuroList;
    
    function lengthenArray(array, length) {
      var a = Array.isArray(array) ? array : [array];
      var n = a.length;
      var v = [];
      for(var i = 0; i < length; i++) {
        v.push(a[i % n]);
      }
      return(v);
    }
    this.lengthenArray = lengthenArray;
    
    function flattenArray(array) {
      if(!Array.isArray(array)) {
        return(array); // terminator
      }
      var p = []
      for(var i = 0; i < array.length; i++) {
        if(Array.isArray(array[i])) {
          var c = flattenArray(array[i]);
          for(j = 0; j < c.length; j++) {
            p.push(c[j]);
          }
        }
        else {
          p.push(array[i]);
        }
      }
      return(p);
    }
    this.flattenArray = flattenArray;
    
    function quoteString(text, quotation) {
    }
    this.quoteString = quoteString;
    
    function unquoteString(text) {
    }
    this.unquoteString = unquoteString;
    
    /*############################
    KuroTable / this.table
    二次元表（列優先）データベース変数のコンストラクタ
    ############################*/
    
    function KuroTable(value) {
    }
    this.table = KuroTable;
    
    /*############################
    KuroRow / this.row
    一次元ハッシュ変数のコンストラクタ
    ############################*/
    
    function KuroRow(value) {
    }
    this.row = KuroRow;
    
    /*############################
    KuroRows / this.rows
    二次元表（行優先）データベース変数のコンストラクタ
    ############################*/
    
    function KuroRow(value) {
    }
    this.row = KuroRow;
  };
  
  return(Kuro_base);
});
/*

簡単な処理をつみあげていく。

reset系とupdate系を明確に区別する。

.resetByLength
.resetByValues

リセット系は上記のみか。


.updateValues
.updateValueAt

updateValues は、
必ずlength長の array を指定し、
undefined な箇所は無視して、元のデータを保持する。
つまり部分更新に使える。


.value= は、
update 系で、
現在のlength, type を維持したまま、入力データを展開する。
文字パースはせず、
undefined -> すべてを初期値相当に。
それ以外は、
array だろうがそうでなかろうが、
繰り返しまたは切り捨てによって、
必要なlength のデータを得て、それで update する。


簡単な処理をする便利関数やメソッドを用意する。

.each(function(element){})
_value[i].value を個々に関数処理した結果のarrayを返す。

repeatArray(array, length)
arrayを繰り返したり切り詰めたりして、指定lengthのものを返す。
単一データが来れば、それの繰り返し配列。

.increase(number)
.decrease(number)
.updateLength(length)

現在のデータをできるだけ保持したまま、
lengthを変更する。
増減は必ず末尾を処理。

.item(at, fn)
指定位置の値など。

.at(from, to, fn)
指定範囲の値の配列を返す。
to省略だと、
from 位置の値を単一で返す。
from, to に同じ値だと、
from 位置の値が入った配列を返す。

.select(array, fn)
[true, false,,,] の配列をもらって、
true 箇所だけを抽出したデータ配列を返す。
標準は .value を使うが、
fn でカスタマイズして、
toString() を返したり、何か計算した結果を返したりできる。


.filter(fn, fn)
関数による条件抽出。


.move(array)
[true, false,,,] の配列をもらって、
true 箇所だけを値を前につめて、残りは初期値とする。


.clearItem(at)
.clearAt(from,to)

場所を指定して、値の消去。初期値にする。





parseCSV(string, delimiter)
刻んだ文字を返す。
型変換はしない。個々のクラスの仕事。

parseJSON(string)
前後の[]を取って、parseCsvすればいい。



flatArray(array)
高次の配列を再帰的にばらして単純配列にする。



quote(string, quotation)
quotationで囲む。
必要なら ¥ でエスケープする。
¥¥も

unquote(string, quotation)
quotation囲みをはずす。
¥ エスケープを元に戻す。
¥¥も
囲まれてないなら何もしない。
quotation指定がないなら、'"両方を探し、一方を実行する。






数値の 0 を、
"0" 表記するのか、
"" ブランクとするのか、
っていう選択肢が必要だろう。
この際、ブランクからのパースも必要。


*/