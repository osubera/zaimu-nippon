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
    expect(Kuro_base).itself.to.respondTo('lengthenArray');
    expect(Kuro_base).itself.to.respondTo('flattenArray');
    expect(Kuro_base).itself.to.respondTo('quoteString');
    expect(Kuro_base).itself.to.respondTo('unquoteString');
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
      it('should respond to methods', function(){
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
        expect(x).to.have.property('trim', true);
      });
      it('should respond to methods', function(){
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
      it('should be stringified as JSON', function(){
        expect(x.toJSON()).to.equal(-87654321);
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
      it('should be stringified as JSON', function(){
        x.formatSeparator = '/';
        x.formatMonthFillZero = false;
        x.formatDayFillZero = false;
        expect(x.toJSON()).to.equal('2012/3/1');
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
      it('should be stringified as JSON', function(){
        expect(x.toJSON()).to.equal(false);
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
        // increase, decrease, updateLength
      });
      it('should relocate values', function(){
        // move
      });
      it('should set values back to default', function(){
        // clearItem, clearItemAt
      });
      it('should parse string through methods', function(){
        // parseCSV, parseJSON
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
        // value =
      });
      it('should reset items by these methods', function(){
        // resetByLength, resetByValues
      });
      it('should not reset items by these methods', function(){
        // values =, updateValues, updateValueAt, 
        // updateLength, increase, decrease
        // move, clearItem, clearItemAt
        // parseCSV, parseJSON
      });
      it('should extract specified values', function(){
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
      it('should change the default value', function(){
        x.defaultValue = 12;
        expect(x.defaultValue).to.equal(12);
        expect(x.each(function(o){ return o.defaultValue; })).to.deep.equal([12,12]);
        /*
        x.push(2);
        expect(x.value).to.deep.equal([4,5,12,12]);
        */
      });
      it('should change the default type', function(){
      });
      it('should have builtin factories', function(){
      });
      it('should change factories', function(){
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
      it('should have constructor factories', function(){
      });
      it('should have updatable factories', function(){
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
