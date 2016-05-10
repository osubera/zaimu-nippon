var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Kuro_calc = requirejs('kuro/calc');
var Kuro_base = requirejs('kuro/base');
var Mock_base = requirejs('mock/base');
function mockConsole(fn) {
  var kon = new Mock_base.console;
  kon.mockOriginal = console.log;
  console.log = kon.log.bind(kon);
  fn(kon);
  console.log = kon.mockOriginal;
}

describe('Kuro_calc', function(){
  it('should be an object', function(){
    expect(Kuro_calc).to.be.an('object');
  });
  it('should respond to methods', function(){
    expect(Kuro_calc).itself.to.respondTo('func');
    expect(Kuro_calc).itself.to.respondTo('calc');
    expect(Kuro_calc).itself.to.respondTo('solv');
    expect(Kuro_calc).itself.to.respondTo('notDeepEqualArrays');
    expect(Kuro_calc).itself.to.respondTo('allOrNot');
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
        expect(x).to.have.property('cell', undefined);
        expect(x).to.have.property('func', undefined);
        expect(x).to.have.property('depends');
        expect(x).to.have.property('lastArgs');
        expect(x).to.have.property('auto', true);
        expect(x).to.have.property('verbose', false);
        expect(x).to.have.property('tag', '');
        expect(x).to.have.property('recalcRequired', false);
        expect(x).to.have.property('argsChanged', false);
        expect(x).to.have.property('events');
        expect(x).to.have.property('commander', undefined);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('calc');
        expect(x).to.respondTo('requestRecalc');
        expect(x).to.respondTo('addEventListeners');
        expect(x).to.respondTo('removeEventListeners');
        expect(x).to.respondTo('getElements');
      });
      it('should detect args change', function(){
        x.depends = [new Kuro_base.number(1), 2, new Kuro_base.number(3)];
        x.lastArgs = [1,2,3];
        expect(x.argsChanged).to.equal(false);
        x.lastArgs = [1,2,4];
        expect(x.argsChanged).to.equal(true);
        x.lastArgs = [1,3,3];
        expect(x.argsChanged).to.equal(true);
      });
      it('should not calc when', function(){mockConsole(function(kon){
        var y = new Kuro_calc.func;
        y.verbose = true;
        y.tag = 'TEST';
        y.calc();
        expect(kon.mockGetLastCall()).to.equal('console: log,func.calc: TEST quit by undefined.');
        y.cell = 1;
        y.calc();
        expect(kon.mockGetLastCall()).to.equal('console: log,func.calc: TEST quit by undefined.');
        y.cell = undefined;
        y.func = 1;
        y.calc();
        expect(kon.mockGetLastCall()).to.equal('console: log,func.calc: TEST quit by undefined.');
        y.cell = 1;
        y.auto = false;
        y.calc();
        expect(kon.mockGetLastCall()).to.equal('console: log,func.calc: TEST quit by not auto.');
        y.auto = true;
        y.calc();
        expect(kon.mockGetLastCall()).to.equal('console: log,func.calc: TEST quit by not required.');
      })});
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

describe('Kuro_calc.notDeepEqualArrays', function(){
  it('should be a function', function(){
    expect(Kuro_calc.notDeepEqualArrays).to.be.a('function');
  });
});

describe('Kuro_calc.allOrNot', function(){
  it('should be a function', function(){
    expect(Kuro_calc.allOrNot).to.be.a('function');
  });
});
