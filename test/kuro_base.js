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
        x.value = '    A long time ago,     ';
        expect(x.value).to.equal('    A long time ago,     ');
      });
    });
  });
});
