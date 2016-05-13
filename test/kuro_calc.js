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
      it.skip('should calc', function(){
      });
      it.skip('should requestRecalc', function(){
      });
      it.skip('should addEventListeners', function(){
      });
      it.skip('should removeEventListeners', function(){
      });
      it.skip('should getElements', function(){
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
      
    describe('new Kuro_calc.calc', function(){
      it('should have properties', function(){
        expect(x).to.have.property('funcs');
        expect(x).to.have.property('ids');
        expect(x).to.have.property('solves');
        expect(x).to.have.property('serializedFuncs');
        expect(x).to.have.property('rebuildRequired', false);
        expect(x).to.have.property('disableAuto', false);
        expect(x).to.have.property('unsolved', false);
        expect(x).to.have.property('auto', undefined);
        expect(x).to.have.property('verbose', undefined);
        expect(x).to.have.property('recalcRequired', false);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('requestRecalc');
        expect(x).to.respondTo('calc');
        expect(x).to.respondTo('serializeTree');
        expect(x).to.respondTo('onCyclicError');
        expect(x).to.respondTo('clearTree');
        expect(x).to.respondTo('addTree');
        expect(x).to.respondTo('sprout');
        expect(x).to.respondTo('addNewChild');
        expect(x).to.respondTo('addOldChild');
        expect(x).to.respondTo('makeTree');
        expect(x).to.respondTo('addFunc');
        expect(x).to.respondTo('removeFuncAt');
        expect(x).to.respondTo('removeFuncByVar');
        expect(x).to.respondTo('getFirstUnlistedFunc');
        expect(x).to.respondTo('getFirstLeaf');
        expect(x).to.respondTo('getIdByVar');
        expect(x).to.respondTo('getVarById');
        expect(x).to.respondTo('getIdBySolv');
        expect(x).to.respondTo('getSolvById');
        expect(x).to.respondTo('getFuncBySolv');
        expect(x).to.respondTo('isIdListed');
      });
      it.skip('should funcs', function(){
      });
      it.skip('should ids', function(){
      });
      it.skip('should solves', function(){
      });
      it.skip('should serializedFuncs', function(){
      });
      it.skip('should rebuildRequired', function(){
      });
      it.skip('should disableAuto', function(){
      });
      it.skip('should unsolved', function(){
      });
      it.skip('should auto', function(){
      });
      it.skip('should verbose', function(){
      });
      it.skip('should recalcRequired', function(){
      });
      it.skip('should requestRecalc', function(){
      });
      it.skip('should calc', function(){
      });
      it.skip('should serializeTree', function(){
      });
      it.skip('should onCyclicError', function(){
      });
      it.skip('should clearTree', function(){
      });
      it.skip('should addTree', function(){
      });
      it.skip('should sprout', function(){
      });
      it.skip('should addNewChild', function(){
      });
      it.skip('should addOldChild', function(){
      });
      it.skip('should makeTree', function(){
      });
      it.skip('should addFunc', function(){
      });
      it.skip('should removeFuncAt', function(){
      });
      it.skip('should removeFuncByVar', function(){
      });
      it.skip('should getFirstUnlistedFunc', function(){
      });
      it.skip('should getFirstLeaf', function(){
      });
      it.skip('should getIdByVar', function(){
      });
      it.skip('should getVarById', function(){
      });
      it.skip('should getIdBySolv', function(){
      });
      it.skip('should getSolvById', function(){
      });
      it.skip('should getFuncBySolv', function(){
      });
      it.skip('should isIdListed', function(){
      });
    });
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
    
    describe('new Kuro_calc.solv', function(){
      it('should have properties', function(){
        expect(x).to.have.property('self', undefined);
        expect(x).to.have.property('children');
        expect(x).to.have.property('parents');
        expect(x).to.have.property('needCalc', true);
        expect(x).to.have.property('isLeaf', true);
        expect(x).to.have.property('noChildren', true);
        expect(x).to.have.property('hasBranch', false);
        expect(x).to.have.property('hasMerge', false);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('addChild');
        expect(x).to.respondTo('addParent');
      });
      it.skip('should self', function(){
      });
      it.skip('should children', function(){
      });
      it.skip('should parents', function(){
      });
      it.skip('should needCalc', function(){
      });
      it.skip('should isLeaf', function(){
      });
      it.skip('should noChildren', function(){
      });
      it.skip('should hasBranch', function(){
      });
      it.skip('should hasMerge', function(){
      });
      it.skip('should addChild', function(){
      });
      it.skip('should addParent', function(){
      });
    });
  });
});

describe('Kuro_calc.notDeepEqualArrays', function(){
  it('should be a function', function(){
    expect(Kuro_calc.notDeepEqualArrays).to.be.a('function');
  });
  it('should compare values of two arrays', function(){
    expect(Kuro_calc.notDeepEqualArrays([1,2,3], [1,2,3])).to.equal(false);
    expect(Kuro_calc.notDeepEqualArrays([1,2,4], [1,2,3])).to.equal(true);
    expect(Kuro_calc.notDeepEqualArrays([1,2,3,4], [1,2,3])).to.equal(true);
    expect(Kuro_calc.notDeepEqualArrays(['a','b'], ['a','b'])).to.equal(false);
  });
  it('should compare kuro array vs basic array values', function(){
    expect(Kuro_calc.notDeepEqualArrays(
      [new Kuro_base.number(1), new Kuro_base.number(2)],
      [1,2])).to.equal(false);
    expect(Kuro_calc.notDeepEqualArrays(
      [new Kuro_base.string('a'), new Kuro_base.string('b')],
      ['a','b'])).to.equal(false);
    expect(Kuro_calc.notDeepEqualArrays(
      [new Kuro_base.date('2016/5/1'), new Kuro_base.date('2016/5/12')],
      [new Date(2016,4,1), new Date(2016,4,12)])).to.equal(false);
    expect(Kuro_calc.notDeepEqualArrays(
      [new Kuro_base.boolean(false), new Kuro_base.boolean(true)],
      [false,true])).to.equal(false);
  });
  it('cannot compare object values of two basic array', function(){
    expect(Kuro_calc.notDeepEqualArrays(
      [new Date(2016,4,1), new Date(2016,4,12)],
      [new Date(2016,4,1), new Date(2016,4,12)])).not.to.equal(false);
  });
});

describe('Kuro_calc.allOrNot', function(){
  it('should be a function', function(){
    expect(Kuro_calc.allOrNot).to.be.a('function');
  });
  it('should scan a property of objects in array', function(){
    expect(Kuro_calc.allOrNot([], 'hoge')).to.equal(undefined);
    expect(Kuro_calc.allOrNot(
      [new Kuro_base.number, new Kuro_base.number],
      'defaultValue')).to.equal(0);
    expect(Kuro_calc.allOrNot(
      [new Kuro_base.string, new Kuro_base.string],
      'defaultValue')).to.equal("");
    expect(Kuro_calc.allOrNot(
      [new Kuro_base.number, new Kuro_base.string],
      'defaultValue')).to.equal(undefined);
  });
});
