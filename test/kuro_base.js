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
    expect(Kuro_base).itself.to.respondTo('formatNumberThousands');
    expect(Kuro_base).itself.to.respondTo('formatNumberTriangle');
    expect(Kuro_base).itself.to.respondTo('formatDateYmd');
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
        expect(x).to.have.property('trim', true);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('toString');
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
      it('should enable/disable trim', function(){
        x.value = '    A long time ago,     ';
        expect(x.value).to.equal('A long time ago,');
        x.trim = false;
        expect(x.trim).to.be.false;
        x.value = '    A long time ago,     ';
        expect(x.value).to.equal('    A long time ago,     ');
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
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toAccountingString');
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
        expect(x.toAccountingString()).to.equal('777');
        x.value = -87654321;
        expect(x.toString()).to.equal('-87,654,321');
        expect(x.toAccountingString()).to.equal('△ 87,654,321');
        expect(y.toString()).to.equal('123,456,789.0123');
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

describe('Kuro_base.formatNumberThousands', function(){
  it('should be a function', function(){
    expect(Kuro_base.formatNumberThousands).to.be.a('function');
  });
  it('should return string formatted with comma', function(){
    expect(Kuro_base.formatNumberThousands(123)).to.equal('123');
    expect(Kuro_base.formatNumberThousands(123.4567)).to.equal('123.4567');
    expect(Kuro_base.formatNumberThousands(1234567)).to.equal('1,234,567');
    expect(Kuro_base.formatNumberThousands(12345678.9012)).to.equal('12,345,678.9012');
    expect(Kuro_base.formatNumberThousands(-123456789)).to.equal('-123,456,789');
  });
});

describe('Kuro_base.formatNumberTriangle', function(){
  it('should be a function', function(){
    expect(Kuro_base.formatNumberTriangle).to.be.a('function');
  });
  it('should return string formatted with comma and triangle', function(){
    expect(Kuro_base.formatNumberTriangle(123)).to.equal('123');
    expect(Kuro_base.formatNumberTriangle(123.4567)).to.equal('123.4567');
    expect(Kuro_base.formatNumberTriangle(1234567)).to.equal('1,234,567');
    expect(Kuro_base.formatNumberTriangle(12345678.9012)).to.equal('12,345,678.9012');
    expect(Kuro_base.formatNumberTriangle(-123456789)).to.equal('△ 123,456,789');
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
        expect(x).to.have.property('formatSeparator', '/');
        expect(x).to.have.property('formatMonthFillZero', true);
        expect(x).to.have.property('formatDayFillZero', true);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('toString');
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
        expect(x).to.have.property('formatTrue', 'true');
        expect(x).to.have.property('formatFalse', 'false');
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('toString');
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
        //expect(x).to.have.property('keys', []);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('toString');
        expect(x).to.respondTo('toJSON');
        expect(x).to.respondTo('reset');
        expect(x).to.respondTo('parse');
        /*
        expect(x).to.respondTo('item');
        expect(x).to.respondTo('append');
        expect(x).to.respondTo('remove');
        expect(x).to.respondTo('appendAt');
        expect(x).to.respondTo('removeAt');
        */
      });
      /*
      it('should be enumerable', function(){
      });
      */
      it('should deny setting values to length, type and factory properties', function(){
      });
      it('should have reset() method to set length and type properties', function(){
      });
      it('should have default factory as a constructor', function(){
        expect(x.factory).to.be.a('function');
      });
      it('should have default value as a blank array', function(){
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
        x.value = [4,5];
        expect(x.value).to.deep.equal([4,5]);
        expect(y.value).to.deep.equal([0,0,0]);
      });
      it('should accept value as an array or a basic type', function(){
      });
      it('should not parse value', function(){
      });
      it('should parse string through parse() method', function(){
        /*
        x.parse('1,2,3');
        expect(x.value).to.deep.equal([1,2,3]);
        x.parse('"A","long","time","ago"');
        expect(x.value).to.deep.equal(['A','long','time','ago']);
        x.parse('[1,2,3]');
        expect(x.value).to.deep.equal([1,2,3]);
        x.parse('["A","long","time","ago"]');
        expect(x.value).to.deep.equal(['A','long','time','ago']);
        x.parse('[[1,2], {c:3}]');
        expect(x.value).to.deep.equal([0,0]);
        */
      });
      it('should have same type items', function(){
        /*
        x.value = ['A','long','time','ago'];
        expect(x.value).to.deep.equal([0,0,0,0]);
        x.value = ['1','2','3','4'];
        expect(x.value).not.to.deep.equal(['1','2','3','4']);
        expect(x.value).to.deep.equal([1,2,3,4]);
        z.value = [1,2,3,4];
        expect(z.value).not.to.deep.equal([1,2,3,4]);
        expect(z.value).to.deep.equal(['1','2','3','4']);
        */
      });
      it('should change the default', function(){
        x.defaultValue = 12;
        expect(x.defaultValue).to.equal(12);
        /*
        x.push(2);
        expect(x.value).to.deep.equal([4,5,12,12]);
        */
      });
      it('should be stringified', function(){
        x.value = [1,2,3];
        expect(x.toString()).to.equal('[1,2,3]');
        x.value = ['a','b','c'];
        expect(x.toString()).to.equal('["a","b","c"]');
      });
      it('should be stringified as JSON', function(){
        x.value = [1,2,3];
        expect(JSON.stringify(x)).to.equal('"[1,2,3]"');
        x.value = ['a','b','c'];
        expect(JSON.stringify(x)).to.equal('"[\\"a\\",\\"b\\",\\"c\\"]"');
      });
      it('should have constructor factories', function(){
      });
      it('should have updatable factories', function(){
      });
    });
  });
});
