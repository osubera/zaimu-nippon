var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Kuro_calc = requirejs('kuro/calc');

describe('Kuro_calc', function(){
  it('should be an object', function(){
    expect(Kuro_calc).to.be.an('object');
  });
  it('should respond to methods', function(){
    expect(Kuro_calc).itself.to.respondTo('func');
    expect(Kuro_calc).itself.to.respondTo('calc');
  });
});

describe('Kuro_calc.func', function(){
  it('should be a function', function(){
    expect(Kuro_calc.func).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_calc.func;
    expect(x).to.be.an('object')
        .and.to.be.instanceOf(Kuro_calc.func);
    
    describe('new Kuro_calc.func', function(){
      it('should have properties', function(){
        expect(x).to.have.property('func', undefined);
        expect(x).to.have.property('var', undefined);
        expect(x).to.have.property('depends', []);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('calc');
      });
    });
  });
});

describe('Kuro_calc.calc', function(){
  it('should be a function', function(){
    expect(Kuro_calc.calc).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_calc.calc;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_calc.calc);
  });
});

describe('Kuro_calc.solv', function(){
  it('should be a function', function(){
    expect(Kuro_calc.solv).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Kuro_calc.solv;
    expect(x).to.be.an('object')
      .and.to.be.instanceOf(Kuro_calc.solv);
  });
});
