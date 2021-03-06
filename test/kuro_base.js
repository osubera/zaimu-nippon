var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Kuro_base = requirejs('kuro/base');

describe('Kuro_base', function(){
  it('should be an object', function(){
    expect(Kuro_base).to.be.an('object');
  });
  it('should respond to methods', function(){
    expect(Kuro_base).itself.to.respondTo('syncer');
    expect(Kuro_base).itself.to.respondTo('var');
    expect(Kuro_base).itself.to.respondTo('string');
    expect(Kuro_base).itself.to.respondTo('number');
    expect(Kuro_base).itself.to.respondTo('date');
    expect(Kuro_base).itself.to.respondTo('boolean');
    expect(Kuro_base).itself.to.respondTo('list');
    expect(Kuro_base).itself.to.respondTo('table');
    expect(Kuro_base).itself.to.respondTo('today');
    expect(Kuro_base).itself.to.respondTo('parseString');
    expect(Kuro_base).itself.to.respondTo('parseNumber');
    expect(Kuro_base).itself.to.respondTo('parseDate');
    expect(Kuro_base).itself.to.respondTo('formatDateYmd');
    expect(Kuro_base).itself.to.respondTo('lengthenArray');
    expect(Kuro_base).itself.to.respondTo('flattenArray');
    expect(Kuro_base).itself.to.respondTo('ParseStringCSV');
    expect(Kuro_base).itself.to.respondTo('parseStringCSV');
    expect(Kuro_base).itself.to.respondTo('parseStringJSON');
    expect(Kuro_base).itself.to.respondTo('escapeRegExp');
    expect(Kuro_base).itself.to.respondTo('EscCSV');
    expect(Kuro_base).itself.to.respondTo('EscJSON');
    expect(Kuro_base).itself.to.respondTo('transcribeString');
    expect(Kuro_base).itself.to.respondTo('escapeString');
    expect(Kuro_base).itself.to.respondTo('unescapeString');
  });
});

describe('Kuro_base.syncer', function(){
  it('should be a function', function(){
    expect(Kuro_base.syncer).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.syncer;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.syncer);
    
    describe('new Kuro_base.syncer', function(){
      it('should have properties', function(){
        expect(x).to.have.property('kuro', undefined);
        expect(x).to.have.property('element', undefined);
        expect(x).to.have.property('ready', false);
        expect(x).to.have.property('listener', undefined);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('onVar');
        expect(x).to.respondTo('onBox');
        expect(x).to.respondTo('setElement');
        expect(x).to.respondTo('updateByVar');
        expect(x).to.respondTo('updateByBox');
      });
    });
  });
});

describe('Kuro_base.var', function(){
  it('should be a function', function(){
    expect(Kuro_base.var).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.var;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.var);
    
    describe('new Kuro_base.var', function(){
      it('should have properties', function(){
        expect(x).to.have.property('value', undefined);
        expect(x).to.have.property('defaultValue', undefined);
        expect(x).to.have.property('sync', undefined);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('parseValue');
        expect(x).to.respondTo('syncValue');
        expect(x).to.respondTo('setElement');
        expect(x).to.respondTo('cloneValue');
        expect(x).to.respondTo('compareValue');
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toJSON');
      });
      var y = new Kuro_base.var('anything');
      it('should be initialized with', function(){
        expect(y).to.have.property('value', 'anything');
      });
      it('should be independent to another instance', function(){
        expect(x.value).not.to.equal('anything');
        x.value = 'another one';
        expect(x.value).to.equal('another one');
        expect(y.value).to.equal('anything');
      });
    });
  });
});

describe('Kuro_base.string', function(){
  it('should be a function', function(){
    expect(Kuro_base.string).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.string;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.string);
    
    describe('new Kuro_base.string', function(){
      it('should have properties', function(){
        expect(x).to.have.property('value', '');
        expect(x).to.have.property('defaultValue', '');
        expect(x).to.have.property('sync', undefined);
        expect(x).to.have.property('trim', true);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('parseValue');
        expect(x).to.respondTo('syncValue');
        expect(x).to.respondTo('cloneValue');
        expect(x).to.respondTo('compareValue');
        expect(x).to.respondTo('setElement');
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toJSON');
      });
      var y = new Kuro_base.string('any string');
      it('should be initialized with', function(){
        expect(y).to.have.property('value', 'any string');
      });
      it('should be independent to another instance', function(){
        expect(x.value).not.to.equal('any string');
        x.value = 'another one';
        expect(x.value).to.equal('another one');
        expect(y.value).to.equal('any string');
      });
      it('should change the default', function(){
        x.defaultValue = 'empty';
        expect(x.defaultValue).to.equal('empty');
        x.value = undefined
        expect(x.value).to.equal('empty');
      });
      it('should have string value', function(){
        x.value = [1,2,3];
        expect(x.value).to.equal('1,2,3');
      });
      it('should be stringified', function(){
        expect(x.toString()).to.equal('1,2,3');
      });
      it('should be stringified as JSON', function(){
        expect(x.toJSON()).to.equal('1,2,3');
      });
      it('should enable/disable trim', function(){
        x.value = '    A long time ago,     ';
        expect(x.value).to.equal('A long time ago,');
        x.trim = false;
        expect(x.trim).to.be.false;
        x.value = '    A long time ago,     ';
        expect(x.value).to.equal('    A long time ago,     ');
      });
      it('should clone value', function(){
        var m = 'clone me';
        x.value = m;
        var n = x.cloneValue();
        expect(n).to.equal(m);
        n = 'clone should not change the original';
        expect(n).not.to.equal(x.value);
      });
      it('should compare value', function(){
        x.value = 'compare me';
        expect(x.compareValue('compare me')).to.equal(0);
        expect(x.compareValue('ampere meet')).to.equal(1);
        expect(x.compareValue('compare meat')).to.equal(-1);
        expect(x.compareValue(true)).to.deep.equal(NaN);
      });
    });
  });
});

describe('Kuro_base.parseString', function(){
  it('should be a function', function(){
    expect(Kuro_base.parseString).to.be.a('function');
  });
  it('should return string', function(){
    expect(Kuro_base.parseString('abc')).to.equal('abc');
    expect(Kuro_base.parseString(123)).not.to.equal(123);
    expect(Kuro_base.parseString(123)).to.equal('123');
  });
  it('should use default value', function(){
    expect(Kuro_base.parseString(undefined, 'me')).to.equal('me');
    expect(Kuro_base.parseString(true, 'me')).to.equal('me');
  });
  it('should control trim', function(){
    expect(Kuro_base.parseString('  abc  ', undefined, true)).to.equal('abc');
    expect(Kuro_base.parseString('  abc  ', undefined, false)).to.equal('  abc  ');
  });
});

describe('Kuro_base.number', function(){
  it('should be a function', function(){
    expect(Kuro_base.number).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.number;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.number);
    
    describe('new Kuro_base.number', function(){
      it('should have properties', function(){
        expect(x).to.have.property('value', 0);
        expect(x).to.have.property('defaultValue', 0);
        expect(x).to.have.property('sync', undefined);
        expect(x).to.have.property('formatZeroAsBlank', true);
        expect(x).to.have.property('formatThousands', true);
        expect(x).to.have.property('formatMinusAsTriangle', false);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('parseValue');
        expect(x).to.respondTo('syncValue');
        expect(x).to.respondTo('setElement');
        expect(x).to.respondTo('cloneValue');
        expect(x).to.respondTo('compareValue');
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toJSON');
      });
      var y = new Kuro_base.number(123456789.0123);
      it('should be initialized with', function(){
        expect(y).to.have.property('value', 123456789.0123);
      });
      it('should be independent to another instance', function(){
        expect(x.value).not.to.equal(123456789.0123);
        x.value = -987654321;
        expect(x.value).to.equal(-987654321);
        expect(y.value).to.equal(123456789.0123);
      });
      it('should change the default', function(){
        x.defaultValue = 555;
        expect(x.defaultValue).to.equal(555);
        x.value = undefined
        expect(x.value).to.equal(555);
      });
      it('should have number value', function(){
        x.value = '666';
        expect(x.value).not.to.equal('666');
        expect(x.value).to.equal(666);
        x.value = '-1,234.56';
        expect(x.value).to.equal(-1234.56);
        x.value = '△2,345';
        expect(x.value).to.equal(-2345);
        x.value = '   △   1,234   ';
        expect(x.value).to.equal(-1234);
        x.value = '777th';
        expect(x.value).to.equal(777);
      });
      it('should be stringified', function(){
        expect(x.toString()).to.equal('777');
        x.formatMinusAsTriangle = true;
        expect(x.toString()).to.equal('777');
        x.value = -87654321;
        expect(x.toString()).to.equal('△ 87,654,321');
        x.formatThousands = false;
        expect(x.toString()).to.equal('△ 87654321');
        x.formatMinusAsTriangle = false;
        expect(x.toString()).to.equal('-87654321');
        x.formatThousands = true;
        expect(x.toString()).to.equal('-87,654,321');
        expect(y.toString()).to.equal('123,456,789.0123');
        y.value = 0;
        expect(y.toString()).to.equal('');
        y.formatZeroAsBlank = false;
        expect(y.toString()).to.equal('0');
      });
      it('should be stringified as JSON', function(){
        expect(x.toJSON()).to.equal(-87654321);
      });
      it('should clone value', function(){
        var m = 1234;
        x.value = m;
        var n = x.cloneValue();
        expect(n).to.equal(m);
        n = 5678;
        expect(n).not.to.equal(x.value);
      });
      it('should compare value', function(){
        x.value = 5;
        expect(x.compareValue(5)).to.equal(0);
        expect(x.compareValue(3)).to.equal(1);
        expect(x.compareValue(7)).to.equal(-1);
        expect(x.compareValue('9')).to.equal(-1);
        expect(x.compareValue('one')).to.deep.equal(NaN);
      });
    });
  });
});

describe('Kuro_base.parseNumber', function(){
  it('should be a function', function(){
    expect(Kuro_base.parseNumber).to.be.a('function');
  });
  it('should return number', function(){
    expect(Kuro_base.parseNumber(123)).to.equal(123);
    expect(Kuro_base.parseNumber('456')).not.to.equal('456');
    expect(Kuro_base.parseNumber('456')).to.equal(456);
  });
  it('should ignore some characters', function(){
    expect(Kuro_base.parseNumber('2nd')).to.equal(2);
    expect(Kuro_base.parseNumber('1,000')).to.equal(1000);
  });
  it('should parse special characters', function(){
    expect(Kuro_base.parseNumber('△345')).to.equal(-345);
  });
  it('should use default value', function(){
    expect(Kuro_base.parseNumber(undefined, 789)).to.equal(789);
    expect(Kuro_base.parseNumber(true, 789)).to.equal(789);
  });
});

describe('Kuro_base.date', function(){
  it('should be a function', function(){
    expect(Kuro_base.date).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.date;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.date);
    
    describe('new Kuro_base.date', function(){
      it('should have properties', function(){
        expect(x).to.have.property('value');
        expect(x).to.have.property('defaultValue');
        expect(x).to.have.property('sync', undefined);
        expect(x).to.have.property('formatSeparator', '/');
        expect(x).to.have.property('formatMonthFillZero', true);
        expect(x).to.have.property('formatDayFillZero', true);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('parseValue');
        expect(x).to.respondTo('syncValue');
        expect(x).to.respondTo('setElement');
        expect(x).to.respondTo('cloneValue');
        expect(x).to.respondTo('compareValue');
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toJSON');
      });
      it('should have dafault value today (construction date)', function(){
        expect(x.value).to.deep.equal(x.defaultValue);
        expect(x.defaultValue).to.deep.equal(Kuro_base.today());
      });
      var y = new Kuro_base.date('2001/6/23');
      it('should be initialized with', function(){
        expect(y.value).to.deep.equal(new Date(2001,5,23));
      });
      it('should be independent to another instance', function(){
        expect(x.value).not.to.deep.equal(y.value);
        x.value = new Date('2012/2/29');
        expect(x.value).to.deep.equal(new Date('2012/2/29'));
        expect(y.value).to.deep.equal(new Date('2001/6/23'));
      });
      it('should change the default', function(){
        x.defaultValue = new Date('2010/12/20');
        expect(x.defaultValue).to.deep.equal(new Date('2010/12/20'));
        x.value = undefined
        expect(x.value).to.deep.equal(new Date('2010/12/20'));
      });
      it('should have date value', function(){
        x.value = '2012/3/1';
        expect(x.value).not.to.deep.equal('2012/3/1');
        expect(x.value).to.deep.equal(new Date('2012/3/1'));
      });
      it('should be stringified', function(){
        expect(x.toString()).to.equal('2012/03/01');
      });
      it('should change format separator', function(){
        x.formatSeparator = '-';
        expect(x.formatSeparator).to.equal('-');
        expect(x.toString()).to.equal('2012-03-01');
      });
      it('should change zero filling', function(){
        x.formatMonthFillZero = false;
        expect(x.formatMonthFillZero).to.equal.false;
        expect(x.toString()).to.equal('2012-3-01');
        x.formatDayFillZero = false;
        expect(x.formatDayFillZero).to.equal.false;
        expect(x.toString()).to.equal('2012-3-1');
        x.formatMonthFillZero = true;
        expect(x.formatMonthFillZero).to.equal.true;
        expect(x.toString()).to.equal('2012-03-1');
      });
      it('should be stringified as JSON', function(){
        x.formatSeparator = '/';
        x.formatMonthFillZero = false;
        x.formatDayFillZero = false;
        expect(x.toJSON()).to.equal('2012/3/1');
      });
      it('should clone value', function(){
        var m = new Date(2016,5,8);
        x.value = m;
        var n = x.cloneValue();
        expect(x.value).to.deep.equal(m);
        expect(x.value).not.to.equal(m);
        expect(x.value).to.deep.equal(n);
        expect(x.value).not.to.equal(n);
        n = new Date(2015,5,8);
        expect(n).not.to.deep.equal(x.value);
      });
      it('should compare value', function(){
        x.value = new Date(2016,5,8);
        expect(x.compareValue(new Date(2016,5,8))).to.equal(0);
        expect(x.compareValue(new Date(2016,5,7))).to.equal(1);
        expect(x.compareValue(new Date(2016,5,9))).to.equal(-1);
        expect(x.compareValue('2016/5/8')).to.deep.equal(NaN);
        expect(x.compareValue(undefined)).to.deep.equal(NaN);
      });
    });
  });
});

describe('Kuro_base.parseDate', function(){
  it('should be a function', function(){
    expect(Kuro_base.parseDate).to.be.a('function');
  });
  it('should return date', function(){
    expect(Kuro_base.parseDate(new Date(2000,1,23))).to.deep.equal(new Date(2000,1,23));
    expect(Kuro_base.parseDate('2001/3/24')).to.deep.equal(new Date(2001,2,24));
  });
  it('should use default value', function(){
    expect(Kuro_base.parseDate(undefined, new Date(2002,3,25))).to.deep.equal(new Date(2002,3,25));
    expect(Kuro_base.parseDate(true, new Date(2002,3,25))).to.deep.equal(new Date(2002,3,25));
  });
  it('should not truncate hours', function(){
    expect(Kuro_base.parseDate(new Date(2003,4,26,10))).to.deep.equal(new Date(2003,4,26,10));
    expect(Kuro_base.parseDate(new Date(2003,4,26,10))).not.to.deep.equal(new Date(2003,4,26));
  });
});

describe('Kuro_base.today', function(){
  it('should be a function', function(){
    expect(Kuro_base.today).to.be.a('function');
  });
  it('should return today', function(){
    var x = Kuro_base.today();
    var y = new Date;
    expect(x.getFullYear()).to.equal(y.getFullYear());
    expect(x.getMonth()).to.equal(y.getMonth());
    expect(x.getDate()).to.equal(y.getDate());
    expect(x.getHours()).to.equal(0);
    expect(x.getMinutes()).to.equal(0);
    expect(x.getSeconds()).to.equal(0);
    expect(x.getMilliseconds()).to.equal(0);
    expect(x.getTimezoneOffset()).to.equal(y.getTimezoneOffset());
  });
});

describe('Kuro_base.formatDateYmd', function(){
  it('should be a function', function(){
    expect(Kuro_base.formatDateYmd).to.be.a('function');
  });
  it('should return date formatted by yyyy/mm/dd', function(){
    expect(Kuro_base.formatDateYmd(new Date(2002,2,4))).to.equal('2002,3,4');
    expect(Kuro_base.formatDateYmd(new Date(2002,2,4), '/')).to.equal('2002/3/4');
    expect(Kuro_base.formatDateYmd(new Date(2002,2,4), '/', true)).to.equal('2002/03/4');
    expect(Kuro_base.formatDateYmd(new Date(2002,2,4), '/', true, true)).to.equal('2002/03/04');
    expect(Kuro_base.formatDateYmd(new Date(2002,11,14), '-', true, true)).to.equal('2002-12-14');
  });
});

describe('Kuro_base.boolean', function(){
  it('should be a function', function(){
    expect(Kuro_base.boolean).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.boolean;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.boolean);
    
    describe('new Kuro_base.boolean', function(){
      it('should have properties', function(){
        expect(x).to.have.property('value', false);
        expect(x).to.have.property('defaultValue', false);
        expect(x).to.have.property('sync', undefined);
        expect(x).to.have.property('formatTrue', 'true');
        expect(x).to.have.property('formatFalse', 'false');
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('parseValue');
        expect(x).to.respondTo('syncValue');
        expect(x).to.respondTo('setElement');
        expect(x).to.respondTo('cloneValue');
        expect(x).to.respondTo('compareValue');
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toJSON');
      });
      var y = new Kuro_base.boolean(true);
      it('should be initialized with', function(){
        expect(y).to.have.property('value', true);
      });
      it('should be independent to another instance', function(){
        expect(x.value).not.to.be.true;
        x.value = false;
        expect(x.value).to.be.false;
        expect(y.value).to.be.true;
      });
      it('should change the default', function(){
        x.defaultValue = true;
        expect(x.defaultValue).to.be.true;
        x.value = undefined;
        expect(x.value).to.be.true;
      });
      it('should have exact boolean value', function(){
        x.defaultValue = undefined;
        x.formatTrue = 'yes';
        x.formatFalse = 'no';
        x.value = 'true';
        expect(x.value).not.to.equal('true');
        expect(x.value).to.equal(undefined);
        x.value = 'false';
        expect(x.value).not.to.equal('false');
        expect(x.value).to.equal(undefined);
        x.value = 1;
        expect(x.value).to.equal(undefined);
        x.value = 0;
        expect(x.value).to.equal(undefined);
        x.value = true;
        expect(x.value).to.equal(true);
        x.value = false;
        expect(x.value).to.equal(false);
      });
      it('should parse formatted text', function(){
        x.value = 'yes';
        expect(x.value).to.equal(true);
        x.value = 'no';
        expect(x.value).to.equal(false);
        x.formatTrue = 'true';
        x.formatFalse = 'false';
        x.value = 'true';
        expect(x.value).to.equal(true);
        x.value = 'false';
        expect(x.value).to.equal(false);
        x.value = 'true    ';
        expect(x.value).to.equal(undefined);
        x.value = '    false';
        expect(x.value).to.equal(undefined);
      });
      it('should be stringified', function(){
        x.value = true;
        expect(x.toString()).to.equal('true');
        x.formatTrue = 'ok';
        expect(x.toString()).to.equal('ok');
        x.formatTrue = '○';
        expect(x.toString()).to.equal('○');
        x.value = false;
        expect(x.toString()).to.equal('false');
        x.formatFalse = 'ng';
        expect(x.toString()).to.equal('ng');
        x.formatFalse = '×';
        expect(x.toString()).to.equal('×');
      });
      it('should be stringified as JSON', function(){
        expect(x.toJSON()).to.equal(false);
      });
      it('should clone value', function(){
        var m = true;
        x.value = m;
        var n = x.cloneValue();
        expect(n).to.equal(m);
        n = false;
        expect(n).not.to.equal(x.value);
      });
      it('should compare value', function(){
        x.value = true;
        expect(x.compareValue(true)).to.equal(0);
        expect(x.compareValue(false)).to.equal(1);
        expect(x.compareValue(0)).to.equal(1);
        expect(x.compareValue('false')).to.deep.equal(NaN);
        expect(x.compareValue('balse')).to.deep.equal(NaN);
        x.value = false;
        expect(x.compareValue(true)).to.equal(-1);
        expect(x.compareValue(1)).to.equal(-1);
      });
    });
  });
});

describe('Kuro_base.parseBoolean', function(){
  it('should be a function', function(){
    expect(Kuro_base.parseBoolean).to.be.a('function');
  });
  it('should return boolean', function(){
    expect(Kuro_base.parseBoolean(true)).to.equal(true);
    expect(Kuro_base.parseBoolean(false)).to.equal(false);
  });
  it('should use default value', function(){
    expect(Kuro_base.parseBoolean(1, 'no bool')).to.equal('no bool');
    expect(Kuro_base.parseBoolean(undefined, 'no bool')).to.equal('no bool');
    expect(Kuro_base.parseBoolean('true', 'no bool')).to.equal('no bool');
  });
  it('should parse formatted text', function(){
    expect(Kuro_base.parseBoolean('true', 'no bool', 'true', 'false')).to.equal(true);
    expect(Kuro_base.parseBoolean('false', 'no bool', 'true', 'false')).to.equal(false);
  });
});

describe('Kuro_base.list', function(){
  it('should be a function', function(){
    expect(Kuro_base.list).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.list;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.list);
    
    describe('new Kuro_base.list', function(){
      it('should have properties', function(){
        expect(x).to.have.property('value');
        expect(x).to.have.property('type', 'number');
        expect(x).to.have.property('length', 0);
        expect(x).to.have.property('defaultValue', 0);
        expect(x).to.have.property('defaultType', 'number');
        expect(x).to.have.property('factories');
        expect(x).to.have.property('factory');
        expect(x).to.have.property('keys');
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toJSON');
        expect(x).to.respondTo('resetByLength');
        expect(x).to.respondTo('resetByValues');
        expect(x).to.respondTo('updateValues');
        expect(x).to.respondTo('updateValueAt');
        expect(x).to.respondTo('updateLength');
        expect(x).to.respondTo('increase');
        expect(x).to.respondTo('decrease');
        expect(x).to.respondTo('move');
        expect(x).to.respondTo('clearItem');
        expect(x).to.respondTo('clearAt');
        expect(x).to.respondTo('item');
        expect(x).to.respondTo('at');
        expect(x).to.respondTo('select');
        expect(x).to.respondTo('filter');
        expect(x).to.respondTo('each');
        expect(x).to.respondTo('parseCSV');
        expect(x).to.respondTo('parseJSON');
      });
      it('should be enumerable', function(){
        expect(x.propertyIsEnumerable('keys')).to.be.true;
      });
      it('should deny setting values to keys, length, type and factory properties', function(){
        x.keys = undefined;
        expect(x.keys).not.to.equal(undefined);
        x.length = 12;
        expect(x.length).not.to.equal(12);
        x.type = 'date';
        expect(x.type).not.to.equal('date');
        x.factory = Date;
        expect(x.factory).not.to.equal(Date);
      });
      it('should have resetByLength() method to set length and type properties', function(){
        x.resetByLength(5);
        expect(x.length).to.equal(5);
        expect(x.type).to.equal(x.defaultType);
        expect(x.value).to.deep.equal([0,0,0,0,0]);
      });
      it('should have resetByValues() method to set values', function(){
        x.resetByValues(['A','long','time','ago']);
        expect(x.length).to.equal(4);
        expect(x.type).to.equal('string');
        expect(x.value).to.deep.equal(['A','long','time','ago']);
        x.resetByValues('in,a,galaxy');
        expect(x.length).to.equal(1);
        expect(x.type).to.equal('string');
        expect(x.value).to.deep.equal(['in,a,galaxy']);
        x.resetByValues(undefined);
        expect(x.length).to.equal(0);
        expect(x.type).to.equal(x.defaultType);
        expect(x.value).to.deep.equal([]);
      });
      it('should have updateValues() method to set values', function(){
        x.resetByValues([10,20,30,40]);
        x.updateValues([11,12,13,14]);
        expect(x.value).to.deep.equal([11,12,13,14]);
        x.updateValues([10,11,12,13,14]);
        expect(x.value).to.deep.equal([10,11,12,13]);
        x.updateValues([15,,17]);
        expect(x.value).to.deep.equal([15,11,17,13]);
        x.updateValues(['21']);
        expect(x.value).to.deep.equal([21,11,17,13]);
        x.updateValues(22);
        expect(x.value).to.deep.equal([22,22,22,22]);
      });
      it('should have updateValueAt() method to set values', function(){
        x.resetByValues([100,200,300]);
        x.updateValueAt(2,400);
        expect(x.value).to.deep.equal([100,200,400]);
        expect(function(){x.updateValueAt(-1,999)}).to.throw(RangeError);
        expect(function(){x.updateValueAt(3,999)}).to.throw(RangeError);
      });
      it('should chage length', function(){
        x.increase(3);
        expect(x.length).to.equal(6);
        expect(x.value).to.deep.equal([100,200,400,0,0,0]);
        x.decrease(2);
        expect(x.length).to.equal(4);
        expect(x.value).to.deep.equal([100,200,400,0]);
        x.increase(0);
        expect(x.length).to.equal(4);
        expect(x.value).to.deep.equal([100,200,400,0]);
        x.decrease(0);
        expect(x.length).to.equal(4);
        expect(x.value).to.deep.equal([100,200,400,0]);
        x.updateLength(4);
        expect(x.length).to.equal(4);
        expect(x.value).to.deep.equal([100,200,400,0]);
        x.updateLength(5);
        expect(x.length).to.equal(5);
        expect(x.value).to.deep.equal([100,200,400,0,0]);
        x.updateLength(2);
        expect(x.length).to.equal(2);
        expect(x.value).to.deep.equal([100,200]);
        expect(function(){x.updateLength(-1)}).to.throw(RangeError);
        expect(function(){x.increase(-1)}).to.throw(RangeError);
        expect(function(){x.decrease(-1)}).to.throw(RangeError);
        expect(function(){x.decrease(3)}).to.throw(RangeError);
        x.updateLength(0);
        expect(x.length).to.equal(0);
        expect(x.value).to.deep.equal([]);
      });
      it('should relocate values', function(){
        x.resetByValues([1,2,3,4,5,6,7,8,9]);
        x.move([true,true,false,true,false,false,true,true,false]);
        expect(x.value).to.deep.equal([1,2,4,7,8,0,0,0,0]);
        x.resetByValues([1,2,3,4,5,6,7,8,9]);
        x.move(['true',1,0,'also acceptable',undefined,'','cat','dog',NaN]);
        expect(x.value).to.deep.equal([1,2,4,7,8,0,0,0,0]);
        x.resetByValues([1,2,3,4,5,6,7,8,9]);
        x.move([true,true,false,true,false,false,true,true,false,true,true,true,true]);
        expect(x.value).to.deep.equal([1,2,4,7,8,0,0,0,0]);
        x.resetByValues([1,2,3,4,5,6,7,8,9]);
        x.move([true,true,false,true]);
        expect(x.value).to.deep.equal([1,2,4,0,0,0,0,0,0]);
        x.resetByValues([1,2,3,4,5,6,7,8,9]);
        x.move('will be nop');
        expect(x.value).to.deep.equal([1,2,3,4,5,6,7,8,9]);
      });
      it('should set values back to default', function(){
        x.clearItem(1);
        expect(x.value).to.deep.equal([1,0,3,4,5,6,7,8,9]);
        x.clearAt(4,7);
        expect(x.value).to.deep.equal([1,0,3,4,0,0,0,0,9]);
      });
      it('should parse string through methods', function(){
        x.resetByLength(4, 'string');
        expect(x.value).to.deep.equal(["","","",""]);
        x.parseCSV('1,2,3');
        expect(x.value).to.deep.equal(["1","2","3",""]);
        x.parseCSV('"A","long","time","ago"');
        expect(x.value).to.deep.equal(['A','long','time','ago']);
        x.parseJSON('[1,2,3]');
        expect(x.value).to.deep.equal(["1","2","3","ago"]);
        x.parseJSON('["A","long","time","ago"]');
        expect(x.value).to.deep.equal(['A','long','time','ago']);
        x.parseJSON('[[1,2], {c:3}]');
        expect(x.value).to.deep.equal(['[1','2]','{c:3}','ago']);
      });
      it('should accept property value as an array or a basic type', function(){
        x.resetByLength(5, 'number');
        x.value = [5,4,3,2,1];
        expect(x.value).to.deep.equal([5,4,3,2,1]);
        x.value = ['10',20];
        expect(x.value).to.deep.equal([10,20,10,20,10]);
        x.value = 4;
        expect(x.value).to.deep.equal([4,4,4,4,4]);
        x.value = [8,7,6,5,4,3,2,1];
        expect(x.value).to.deep.equal([8,7,6,5,4]);
        x.value = undefined;
        expect(x.value).to.deep.equal([0,0,0,0,0]);
      });
      it('should not parse value through property', function(){
        x.value = '1,2,3';
        expect(x.value).to.deep.equal([123,123,123,123,123]);
        expect(x.value).not.to.deep.equal([1,2,3]);
        expect(x.value).not.to.deep.equal(['1,2,3']);
      });
      it('should reset items by these methods', function(){
        x.item(0, function(o){o.defaultValue = 999;});
        expect(x.item(0, function(o){return o.defaultValue;})).to.equal(999);
        x.resetByLength(2, 'string');
        expect(x.item(0, function(o){return o.defaultValue;})).not.to.equal(999);
        x.item(0, function(o){o.defaultValue = 'abc';});
        expect(x.item(0, function(o){return o.defaultValue;})).to.equal('abc');
        x.resetByValues([1,2,3]);
        expect(x.item(0, function(o){return o.defaultValue;})).not.to.equal('abc');
      });
      it('should not reset items by these methods', function(){
        x.item(0, function(o){o.defaultValue = 999;});
        x.values = [1,2];
        x.item(0, function(o){o.defaultValue = 999;});
        x.updateValues([1,2]);
        x.item(0, function(o){o.defaultValue = 999;});
        x.updateValueAt(2,3);
        x.item(0, function(o){o.defaultValue = 999;});
        x.updateLength(2);
        x.item(0, function(o){o.defaultValue = 999;});
        x.increase(2);
        x.item(0, function(o){o.defaultValue = 999;});
        x.decrease(1);
        x.item(0, function(o){o.defaultValue = 999;});
        x.move([true,false,true,true]);
        x.item(0, function(o){o.defaultValue = 999;});
        x.clearItem(1);
        x.item(0, function(o){o.defaultValue = 999;});
        x.clearAt(1, 2);
        x.item(0, function(o){o.defaultValue = 999;});
        x.parseCSV('3,1,4');
        x.item(0, function(o){o.defaultValue = 999;});
        x.parseCSV('[3,1,4]');
        x.item(0, function(o){o.defaultValue = 999;});
      });
      it('should extract specified values', function(){
        x.resetByValues([1,3,5]);
        expect(x.item(1)).to.equal(3);
        expect(x.item(1,function(o){return(o.value * 2);})).to.equal(6);
        expect(x.item(1,function(o){return(o.defaultValue);})).to.equal(0);
        expect(x.at(1)).to.deep.equal([3]);
        expect(x.at(1,2)).to.deep.equal([3,5]);
        expect(x.at(1,2,function(o){return(o.value * 2);})).to.deep.equal([6,10]);
        expect(x.select([true,false,true])).to.deep.equal([1,5]);
        expect(x.select([true,false,true,true])).to.deep.equal([1,5]);
        expect(x.select([true,false])).to.deep.equal([1]);
        expect(x.select([true,false,true],function(o){return(o.value - 1);})).to.deep.equal([0,4]);
        expect(x.filter(function(o){return(o.value > 2);})).to.deep.equal([3,5]);
        expect(x.filter(function(o){return(o.value > 2);}, function(o){return(o.toString());})).to.deep.equal(['3','5']);
        // item, at, select, filter
      });
      it('should do loop for each item', function(){
        x.resetByValues([1,3,5]);
        x.each(function(element){ element.value++; });
        expect(x.value).to.deep.equal([2,4,6]);
        expect(x.each(function(element){ return(2 * element.value); })).to.deep.equal([4,8,12]);
      });
      it('should have default factory as a constructor', function(){
        expect(x.factory).to.be.a('function');
      });
      it('should have default value as a blank array', function(){
        var x = new Kuro_base.list;
        expect(x.value).to.deep.equal([]);
      });
      var y = new Kuro_base.list(3);
      var z = new Kuro_base.list(4, 'string');
      it('should be initialized by length and type', function(){
        expect(y.value).to.deep.equal([0,0,0]);
        expect(y.length).to.equal(3);
        expect(z.value).to.deep.equal(['','','','']);
        expect(z.length).to.equal(4);
      });
      it('should be independent to another instance', function(){
        expect(x.value).not.to.deep.equal(y.value);
        x.resetByValues([4,5]);
        expect(x.value).to.deep.equal([4,5]);
        expect(y.value).to.deep.equal([0,0,0]);
      });
      it('should generate same type items', function(){
        x.resetByLength(4, 'number');
        x.value = [1,2,'3rd','four'];
        expect(x.value).to.deep.equal([1,2,3,0]);
        x.resetByLength(4, 'string');
        x.value = [1,2,'3rd','four'];
        expect(x.value).to.deep.equal(['1','2','3rd','four']);
      });
      it('should change the default value', function(){
        x.resetByValues([4,5]);
        x.defaultValue = 12;
        expect(x.defaultValue).to.equal(12);
        expect(x.each(function(o){ return o.defaultValue; })).to.deep.equal([12,12]);
        x.increase(2);
        expect(x.value).to.deep.equal([4,5,12,12]);
      });
      it('should return ordinal numbers as keys', function(){
        x.resetByLength(4);
        expect(x.keys).to.deep.equal([0,1,2,3]);
        x.resetByLength(8);
        expect(x.keys).to.deep.equal([0,1,2,3,4,5,6,7]);
      });
      it('should be stringified as CSV', function(){
        x.resetByValues([1,2,3]);
        expect(x.toString()).to.equal('1,2,3');
        x.resetByValues(['a','b','c']);
        expect(x.toString()).to.equal("a,b,c");
      });
      it('should be stringified as JSON', function(){
        x.resetByValues([1,2,3]);
        expect(x.toJSON()).to.deep.equal([1,2,3]);
        expect(JSON.stringify(x)).to.equal('[1,2,3]');
        x.resetByValues(['a','b','c']);
        expect(x.toJSON()).to.deep.equal(["a","b","c"]);
        expect(JSON.stringify(x)).to.equal('["a","b","c"]');
      });
      it('should change the default type', function(){
        var x = new Kuro_base.list;
        x.resetByLength(1);
        expect(x.value).to.deep.equal([0]);
        x.defaultType = 'string';
        x.resetByLength(1);
        expect(x.value).to.deep.equal(['']);
        x.defaultType = 'boolean';
        x.resetByLength(1);
        expect(x.value).to.deep.equal([false]);
      });
      it('should have constructor factories', function(){
        expect(x.factories).to.be.an('object');
        expect(x.factories.number).to.be.a('function');
        expect(x.factories.string).to.be.a('function');
        expect(x.factories.boolean).to.be.a('function');
        expect(x.factories.date).to.be.a('function');
      });
      it('should have updatable factories', function(){
        x.factories = { hoge: function(){this.fuga = 'huge';} };
        expect(x.factories).to.be.an('object');
        expect(x.factories.hoge).to.be.a('function');
        expect(x.factories.number).to.equal(undefined);
        expect(x.factories.string).to.equal(undefined);
        expect(x.factories.boolean).to.equal(undefined);
        expect(x.factories.date).to.equal(undefined);
        x.resetByLength(1, 'hoge');
        expect(x.item(0, function(o){return o;})).to.be.an('object');
        expect(x.item(0, function(o){return o.fuga;})).to.equal('huge');
      });
    });
  });
});

describe('Kuro_base.lengthenArray', function(){
  it('should be a function', function(){
    expect(Kuro_base.lengthenArray).to.be.a('function');
  });
  it('should return array with repeated value within specified length', function(){
    expect(Kuro_base.lengthenArray([1,2], 5)).to.deep.equal([1,2,1,2,1]);
    expect(Kuro_base.lengthenArray(3, 4)).to.deep.equal([3,3,3,3]);
    expect(Kuro_base.lengthenArray([1,2,3,4], 3)).to.deep.equal([1,2,3]);
  });
});

describe('Kuro_base.flattenArray', function(){
  it('should be a function', function(){
    expect(Kuro_base.flattenArray).to.be.a('function');
  });
  it('should return simplified array', function(){
    expect(Kuro_base.flattenArray([1,2,[3,4]])).to.deep.equal([1,2,3,4]);
    expect(Kuro_base.flattenArray([1,2,[3,[4,5]]])).to.deep.equal([1,2,3,4,5]);
    expect(Kuro_base.flattenArray([1,2])).to.deep.equal([1,2]);
    expect(Kuro_base.flattenArray(1)).to.deep.equal(1);
  });
});

describe('Kuro_base.ParseStringCSV', function(){
  it('should be a function', function(){
    expect(Kuro_base.ParseStringCSV).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_base.ParseStringCSV;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_base.ParseStringCSV);
    
    describe('new Kuro_base.ParseStringCSV', function(){
      it('should have properties', function(){
        expect(x).to.have.property('i');
        expect(x).to.have.property('text');
        expect(x).to.have.property('d');
        expect(x).to.have.property('q');
        expect(x).to.have.property('e');
        expect(x).to.have.property('x');
        expect(x).to.have.property('x1');
        expect(x).to.have.property('x2');
        expect(x).to.have.property('dc');
        expect(x).to.have.property('dc1');
        expect(x).to.have.property('v');
        expect(x).to.have.property('buff');
        expect(x).to.have.property('n');
        expect(x).to.have.property('qs');
        expect(x).to.have.property('qe');
        expect(x).to.have.property('qc');
        expect(x).to.have.property('qq');
        expect(x).to.have.property('isEmptyBuff');
        expect(x).to.have.property('hasQuoteStart');
        expect(x).to.have.property('hasQuoteEnd');
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('setEscapes');
        expect(x).to.respondTo('updateQq');
        expect(x).to.respondTo('setText');
        expect(x).to.respondTo('exec');
        expect(x).to.respondTo('pushQuotedItem');
        expect(x).to.respondTo('keepNewQuotedItem');
        expect(x).to.respondTo('pushNoQuoteItem');
        expect(x).to.respondTo('pushKeptQuotedItem');
        expect(x).to.respondTo('continueKeepingQuotedItem');
        expect(x).to.respondTo('flushBuff');
      });
    });
  });
});

describe('Kuro_base.parseStringCSV', function(){
  it('should be a function', function(){
    expect(Kuro_base.parseStringCSV).to.be.a('function');
  });
  it('should parse csv', function(){
    expect(Kuro_base.parseStringCSV(undefined)).to.deep.equal([]);
    expect(Kuro_base.parseStringCSV("")).to.deep.equal([""]);
    expect(Kuro_base.parseStringCSV("1")).to.deep.equal(["1"]);
    expect(Kuro_base.parseStringCSV("1,2")).to.deep.equal(["1","2"]);
    expect(Kuro_base.parseStringCSV("1,2,3")).to.deep.equal(["1","2","3"]);
    expect(Kuro_base.parseStringCSV("  1  ,  2  ,  3  ")).to.deep.equal(["  1","2","3  "]);
    expect(Kuro_base.parseStringCSV('"a","b","c"')).to.deep.equal(["a","b","c"]);
    expect(Kuro_base.parseStringCSV('"a",b,  c')).to.deep.equal(["a","b","c"]);
    expect(Kuro_base.parseStringCSV("a,'b',c")).to.deep.equal(["a","'b'","c"]);
    expect(Kuro_base.parseStringCSV('"a""","b""c"')).to.deep.equal(['a"','b"c']);
    expect(Kuro_base.parseStringCSV('"a""","b"",c,d,"')).to.deep.equal(['a"','b",c,d,']);
  });
});

describe('Kuro_base.parseStringJSON', function(){
  it('should be a function', function(){
    expect(Kuro_base.parseStringJSON).to.be.a('function');
  });
  it('should parse json', function(){
    expect(Kuro_base.parseStringJSON(undefined)).to.deep.equal([]);
    expect(Kuro_base.parseStringJSON("[]")).to.deep.equal([""]);
    expect(Kuro_base.parseStringJSON("[1]")).to.deep.equal(["1"]);
    expect(Kuro_base.parseStringJSON("[1,2]")).to.deep.equal(["1","2"]);
    expect(Kuro_base.parseStringJSON("[1,2,3]")).to.deep.equal(["1","2","3"]);
    expect(Kuro_base.parseStringJSON("  [  1  ,  2  ,  3  ]  ")).to.deep.equal(["1","2","3"]);
    expect(Kuro_base.parseStringJSON('["a","b","c"]')).to.deep.equal(["a","b","c"]);
    expect(Kuro_base.parseStringJSON('["a",b,  c]')).to.deep.equal(["a","b","c"]);
    expect(Kuro_base.parseStringJSON("[a,'b',c]")).to.deep.equal(["a","'b'","c"]);
    expect(Kuro_base.parseStringJSON('["a\\"","b\\"c"]')).to.deep.equal(['a"','b"c']);
    expect(Kuro_base.parseStringJSON('["a\\"","b\\",c,\\\\d,"]')).to.deep.equal(['a"','b",c,\\d,']);
  });
});

describe('Kuro_base.transcribeString', function(){
  it('should be a function', function(){
    expect(Kuro_base.transcribeString).to.be.a('function');
  });
  it('should replace string', function(){
    expect(Kuro_base.transcribeString()).to.equal('');
    expect(Kuro_base.transcribeString(
      "abcdefghijklmnopqrstuvwxyz",
      ["a","b","c","d","e","f","g","h","i","j","k"],
      ["A","B","C","D","E","F","G","H","I","J","K"])).to.equal(
      "ABCDEFGHIJKlmnopqrstuvwxyz");
    expect(Kuro_base.transcribeString(
      "transcribe me please!",
      ["a","b","c","d","e","f","g","h","i","j","k"],
      ["A","B","C","D","E","F","G","H","I","J","K"])).to.equal(
      "trAnsCrIBE mE plEAsE!");
    expect(Kuro_base.transcribeString(
      "aabcccccd",
      ["aa","ab","bc","cc","cd"],
      [1,2,3,4,5])).to.equal(
      "1344d");
  });
});

describe('Kuro_base.escapeString', function(){
  it('should be a function', function(){
    expect(Kuro_base.escapeString).to.be.a('function');
  });
  it('should escape string', function(){
    expect(Kuro_base.escapeString('escape "quotes"', {raw: '"', esc: '""'})).to.equal('escape ""quotes""');
    expect(Kuro_base.escapeString('no quotes', {raw: '"', esc: '""'})).to.equal('no quotes');
  });
});

describe('Kuro_base.unescapeString', function(){
  it('should be a function', function(){
    expect(Kuro_base.unescapeString).to.be.a('function');
  });
  it('should un-escape string', function(){
    expect(Kuro_base.unescapeString('unescape ""quotes""', {raw: '"', esc: '""'})).to.equal('unescape "quotes"');
    expect(Kuro_base.unescapeString('no quotes', {raw: '"', esc: '""'})).to.equal('no quotes');
  });
});
