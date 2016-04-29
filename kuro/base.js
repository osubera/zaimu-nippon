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
        "defaultValue": { value: 0, writable: true, configurable: true },
        "formatZeroAsBlank": { value: true, writable: true, configurable: true },
        "formatThousands": { value: true, writable: true, configurable: true },
        "formatMinusAsTriangle": { value: false, writable: true, configurable: true }
      });
      this.value = value;
      
      this.toString = function(){
        if(this.value == 0 && this.formatZeroAsBlank) {
          return("");
        }
        var s = this.value.toString();
        if(this.formatThousands) { // 3桁,区切りに
          // toLocaleString()には、小数点以下を3桁丸めする副作用がある。
          var r = /\./.test(s) ? /\B(?=(?:\d{3})+\.)/g : /\B(?=(?:\d{3})+$)/g;
          /*        小数点     ?  小数点より前まで  :  最後まで             */
          s = s.replace(r, ",");
        }
        if(this.formatMinusAsTriangle) { // マイナスを△表記
          s = s.replace(/-/, "△ ");
        }
        return(s);
      };
    }
    this.number = KuroNumber;
    
    // 数値パース, カンマを緩く許可
    function parseNumber(x, fallback) {
      var v = (typeof x == "string") ?
                 Number.parseFloat(x.replace(/[, ]/g, "").replace(/^△ */, "-")) :
                  x;
      return(v && v !== true ? v : fallback);
    }
    this.parseNumber = parseNumber;
    
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
      
      function parseCSV(text) {
        this.updateValues(parseStringCSV(text));
      }
      this.parseCSV = parseCSV;
      
      function parseJSON(text) {
        this.updateValues(parseStringJSON(text));
      }
      this.parseJSON = parseJSON;
      
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
      
      function move(deadOrAlive) {
        var current = this.value;
        var m = current.length;
        var update = new Array(m);
        var n = Math.min(m, deadOrAlive.length);
        var j = 0;
        for(var i = 0; i < n; i++) {
          if(deadOrAlive[i]) {
            update[j++] = current[i];
          }
        }
        this.value = update;
        // undefined で上書きするので、updateValues では不可。
      }
      this.move = move;
      
      function clearItem(at) {
        this.updateValueAt(at, undefined);
      }
      this.clearItem = clearItem;
      
      function clearAt(from, to) {
        for(var i = from; i <= to; i++) {
          this.updateValueAt(i, undefined);
        }
      }
      this.clearAt = clearAt;
      
      function item(at, fn) {
        var f = fn ? fn : function(element){ return element.value; };
        return(f(_value[at]));
      }
      this.item = item;
      
      function at(from, to, fn) {
        var f = fn ? fn : function(element){ return element.value; };
        var to2 = to ? to : from;
        var v = [];
        for(var i = from; i <= to2; i++) {
          v.push(f(_value[i]));
        }
        return(v);
      }
      this.at = at;
      
      function select(which, fn) {
        var f = fn ? fn : function(element){ return element.value; };
        var n = Math.min(which.length, this.length);
        var v = [];
        for(var i = 0; i < n; i++) {
          if(which[i]) {
            v.push(f(_value[i]));
          }
        }
        return(v);
      }
      this.select = select;
      
      function filter(criteria, fn) {
        var f = fn ? fn : function(element){ return element.value; };
        var n = this.length;
        var v = [];
        for(var i = 0; i < n; i++) {
          if(criteria(_value[i])) {
            v.push(f(_value[i]));
          }
        }
        return(v);
      }
      this.filter = filter;
      
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
    
    function ParseStringCSV(delimitor, quotation, escapes) {
      Object.defineProperties(this, {
        "i": { value: 0, writable: true, configurable: true },
        "text": { value: "", writable: true, configurable: true },
        "d": { value: / *, */g, writable: true, configurable: true },
        "q": { value: '"', writable: true, configurable: true },
        "e": { value: EscCSV(), writable: true, configurable: true },
        "x": { value: [], writable: true, configurable: true },
        "x1": { value: '', writable: true, configurable: true },
        "x2": { value: '', writable: true, configurable: true },
        "dc": { value: [], writable: true, configurable: true },
        "dc1": { value: '', writable: true, configurable: true },
        "v": { value: [], writable: true, configurable: true },
        "buff": { value: [], writable: true, configurable: true },
        "n": { value: 0, writable: true, configurable: true },
        "qs": { value: /^/, writable: true, configurable: true },
        "qe": { value: /$/, writable: true, configurable: true },
        "qc": { value: '', writable: true, configurable: true },
        "qq": { value: undefined, writable: true, configurable: true },
        "isEmptyBuff": { get: function(){
                                   return(this.buff.length == 0);
                                 },
                                configurable: true },
        "hasQuoteStart": { get: function(){
                                      var res = this.qs.test(this.x1);
                                      if(res) {
                                        // 実際に使われたクォート文字を終了検索に使う
                                        this.qc = this.qs.exec(this.x1)[0];
                                        this.qe = new RegExp(escapeRegExp(this.qc) + "$");
                                        this.x1 = this.x1.replace(this.qs, ""); // 先頭クォート除去
                                      }
                                      return(res);
                                    },
                                    configurable: true },
        "hasQuoteEnd": { get: function(){
                                    // エスケープ文字を全部除外し、対象外にして検索
                                    this.x2 = this.x1.replace(this.qq, "");
                                    var res = this.qe.test(this.x2);
                                    if(res) {
                                      this.x1 = this.x1.replace(this.qe, ""); // 末尾クォート除去
                                    }
                                    return(res);
                                  },
                                  configurable: true }
      });
      
      function updateQq(esc) {
        // 末尾クォート検索時にエスケープ類を一括退避させる
        // this.e 更新時に必ず動かす必要がある。
        // 本来、this.e 更新に強制連動すべきだが、
        // 内部private変数を持ちたくないため、あえて連動にしていない。
        var qq2 = [];
        for(var k = 0; k < esc.length; k++) {
          qq2.push(escapeRegExp(esc[k]));
        }
        this.qq = new RegExp(qq2.join("|"), "g");
      }
      this.updateQq = updateQq;
      
      function setEscapes(escapes) {
        if(escapes) { this.e = escapes; }
        this.updateQq(this.e.esc);
      }
      this.setEscapes = setEscapes;
      
      if(delimitor) { this.d = delimitor; }
      if(quotation) { this.q = quotation; }
      this.setEscapes(escapes);
      
      function setText(text) {
        // 対象textに初期処理をして、パース準備をする。
        this.v = []; // 確定データ用
        this.buff = []; // クォート継続用
        this.qs = new RegExp("^" + this.q); // expect escaped by user
        this.text = text; // 参照情報に過ぎず、使わない
        this.x = text.split(this.d);
        // クォート内も含め、多めに分割し、後からクォート箇所を統合する。
        // デリミタそのものをエスケープするという発想には対応しない。
        this.n = this.x.length;
        this.dc =typeof this.d == 'object' ? 
          text.match(this.d) : lengthenArray(this.d, this.n); // 統合用にデリミタ記憶
      }
      this.setText = setText;
      
      function exec(text) {
        // 対象テキストをパースし、配列を返す。
        if(text == undefined) { return([]); } // このとき、プロパティ情報は更新されない
        this.setText(text);
        for(var i = 0; i < this.n; i++) { // 初期処理の配列でクォートを調べ、必要なものを統合する
          this.i = i; // 参照情報に過ぎない。
          this.x1 = this.x[i];
          this.dc1 = this.n > 1 ? this.dc[i] : "";
          if(this.isEmptyBuff) {
            if(this.hasQuoteStart) {
              if(this.hasQuoteEnd) {
                this.pushQuotedItem();
              }
              else { // not hasQuoteEnd
                this.keepNewQuotedItem();
              }
            }
            else { // not hasQuoteStart
              this.pushNoQuoteItem();
            }
          }
          else { // not isEmptyBuff
            if(this.hasQuoteEnd) {
              this.pushKeptQuotedItem();
            }
            else { // not hasQuoteEnd
              this.continueKeepingQuotedItem();
            }
          }
        }
        this.flushBuff;
        return(this.v);
      }
      this.exec = exec;
      
      function pushQuotedItem() { // 単独で両端がクォート
        this.v.push(unescapeString(this.x1, this.e));
      }
      this.pushQuotedItem = pushQuotedItem;
      
      function keepNewQuotedItem() { // 開始端がクォートで終了端が開放
        this.continueKeepingQuotedItem(); // 処理は、継続中と同等
      }
      this.keepNewQuotedItem = keepNewQuotedItem;
      
      function pushNoQuoteItem() { // 単独でクォート無し
        this.v.push(this.x1);
      }
      this.pushNoQuoteItem = pushNoQuoteItem;
      
      function pushKeptQuotedItem() { // 複合クォートの末端
        this.buff.push(unescapeString(this.x1, this.e));
        this.v.push(this.buff.join(""));
        this.buff = [];
      }
      this.pushKeptQuotedItem = pushKeptQuotedItem;
      
      function continueKeepingQuotedItem() { // 複合クォートの内部継続中
        this.buff.push(unescapeString(this.x1, this.e));
        this.buff.push(this.dc1);
      }
      this.continueKeepingQuotedItem = continueKeepingQuotedItem;
      
      function flushBuff() { // 閉じそこねの末尾データ
        this.v.push(this.buff.join(""));
      }
      this.flushBuff = flushBuff;
    }
    this.ParseStringCSV = ParseStringCSV;
    
    function parseStringCSV(text) {
      return((new ParseStringCSV).exec(text));
    }
    this.parseStringCSV = parseStringCSV;
    
    function parseStringJSON(text) {
      if(text == undefined || text == null) { return([]); }
      var unbracket = /^\s*\[(.*)\]\s*$/.exec(text);
      if(unbracket == null) { return([text]); }
      var parser = new ParseStringCSV(/\s*,\s*/g, '"', EscJSON());
      return(parser.exec(unbracket[1].trim()));
    }
    this.parseStringJSON = parseStringJSON;
    
    function escapeRegExp(string){
      // by https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }
    this.escapeRegExp = escapeRegExp;
    
    function EscCSV() {
      return({ raw: ['"'], esc: ['""'] });
    }
    this.EscCSV = EscCSV;
    
    function EscJSON() {
      return({ raw: ['\\', '"'], esc: ['\\\\', '\\"']});
      // 本来なら \u0022 など utf-16 形式も必要だが、対応していない。
      // https://www.ietf.org/rfc/rfc4627.txt
    }
    this.EscJSON = EscJSON;
    
    function transcribeString(text, from, to) {
      // from 列の文字を検索し、to列の対応する位置の文字に置換
      var x = text == undefined || text == null ? "" : text.toString();
      var f = Array.isArray(from) ? from : from == undefined || from == null ? [""] : [from];
      var t = Array.isArray(to) ? to : to == undefined || to == null ? [""] : [to];
      
      var qq2 = [];
      var r = {};
      for(var k = 0; k < f.length; k++) {
        qq2.push(escapeRegExp(f[k]));
        r[f[k]] = t[k];
      }
      var qq = new RegExp(qq2.join("|"), "g");
      
      var x1 = x.split(qq);
      var x2 = x.match(qq);
      if(!Array.isArray(x2)) { x2 = []; }
      var v = [];
      for(var i = 0; i < x1.length; i++) {
        v.push(x1[i]);
        v.push(r[x2[i]]);
      }
      return(v.join(""));
    }
    this.transcribeString = transcribeString;
    
    function escapeString(text, escapes) {
      return(transcribeString(text, escapes.raw, escapes.esc));
    }
    this.escapeString = escapeString;
    
    function unescapeString(text, escapes) {
      return(transcribeString(text, escapes.esc, escapes.raw));
    }
    this.unescapeString = unescapeString;
    
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
