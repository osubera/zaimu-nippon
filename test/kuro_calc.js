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
        expect(x).to.have.property('solves');
        expect(x).to.have.property('serializedFuncs');
        expect(x).to.have.property('rebuildRequired', false);
        expect(x).to.have.property('disableAuto', false);
        expect(x).to.have.property('unsolved', true);
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
        expect(x).to.respondTo('cloneFuncList');
        expect(x).to.respondTo('makeTree');
        expect(x).to.respondTo('addFunc');
        expect(x).to.respondTo('removeFunc');
        expect(x).to.respondTo('removeFuncByVar');
        expect(x).to.respondTo('getFirstLeaf');
        expect(x).to.respondTo('getFuncByVar');
        expect(x).to.respondTo('getSolvByFunc');
      });
      it('should add func', function(){
        var y = new Kuro_calc.calc;
        y.addFunc();
        y.addFunc(new Kuro_base.number, function(a,b){ return a+b; },
          [new Kuro_base.number, new Kuro_base.number]);
        y.addFunc(new Kuro_base.number, function(a,b){ return a-b; },
          [new Kuro_base.number, new Kuro_base.number],
          true, true, 'subtract');
        y.addFunc(new Kuro_base.number, function(a,b){ return a*b; },
          [y.funcs[1].cell, y.funcs[2].cell],
          false, false, 'multiply');
        expect(y.funcs.length).to.equal(4);
        expect(y.solves.length).to.equal(0);
        expect(y.serializedFuncs.length).to.equal(0);
        expect(y.rebuildRequired).to.equal(true);
        expect(y.disableAuto).to.equal(false);
        expect(y.unsolved).to.equal(true);
        expect(y.auto).to.equal(undefined);
        expect(y.verbose).to.equal(undefined);
        expect(y.recalcRequired).to.equal(true);
        
        describe('(new Kuro_calc.calc).addFunc', function(){
          it('should manipulate auto', function(){
            y.auto = false;
            expect(y.auto).to.equal(false);
            y.auto = true;
            expect(y.auto).to.equal(true);
          });
          it('should manipulate verbose', function(){
            y.verbose = true;
            expect(y.verbose).to.equal(true);
            y.verbose = false;
            expect(y.verbose).to.equal(false);
          });
          it('should remove func', function(){
            var a = new Kuro_base.number;
            y.addFunc(a, function(a,b){ return a/b; },
              [new Kuro_base.number, new Kuro_base.number],
              false, true, 'check remove');
            expect(y.funcs.length).to.equal(5);
            expect(y.funcs[4].cell).to.equal(a);
            expect(y.funcs[4].tag).to.equal('check remove');
            expect(y.getFuncByVar(a)).to.equal(y.funcs[4]);
            y.removeFuncByVar(a);
            expect(y.funcs.length).to.equal(5);
            expect(y.funcs[4].cell).to.equal(undefined);
            expect(y.funcs[4].tag).to.equal('');
          });
        });
        
        describe('(new Kuro_calc.calc).makeTree', function(){
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
          it.skip('should cloneFuncList', function(){
          });
          it.skip('should makeTree', function(){
          });
          it.skip('should solves', function(){
          });
        });
        
        describe('(new Kuro_calc.calc).serializeTree', function(){
          it.skip('should getFirstLeaf', function(){
          });
          it.skip('should getSolvByFunc', function(){
          });
          it.skip('should serializedFuncs', function(){
          });
          it.skip('should unsolved', function(){
          });
          it.skip('should recalcRequired', function(){
          });
          it.skip('should serializeTree', function(){
          });
          it.skip('should onCyclicError', function(){
          });
        });
        
        describe('(new Kuro_calc.calc).calc', function(){
          it.skip('should requestRecalc', function(){
          });
          it.skip('should calc', function(){
          });
          it.skip('should disableAuto', function(){
          });
          it.skip('should rebuildRequired', function(){
          });
        });
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
        expect(x).to.have.property('func', undefined);
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
      it('should be initialized', function(){
        var a = new Kuro_calc.solv;
        expect(a.func).to.equal(undefined);
        var b = new Kuro_calc.func;
        var a = new Kuro_calc.solv(b);
        expect(a.func).to.equal(b);
      });
      it('should detect leaf', function(){
        var b = new Kuro_calc.func;
        var a = new Kuro_calc.solv(b);
        expect(a.isLeaf).to.equal(true);
        var c = new Kuro_calc.solv(new Kuro_calc.func);
        a.addChild(c);
        expect(a.isLeaf).to.equal(false);
        expect(c.isLeaf).to.equal(true);
        var d = new Kuro_calc.solv(new Kuro_calc.func);
        a.addChild(d);
        expect(a.isLeaf).to.equal(false);
        expect(d.isLeaf).to.equal(true);
        d.needCalc = false;
        expect(a.isLeaf).to.equal(false);
        expect(c.isLeaf).to.equal(true);
        expect(d.isLeaf).to.equal(false);
        c.needCalc = false;
        expect(a.isLeaf).to.equal(true);
        expect(c.isLeaf).to.equal(false);
        expect(d.isLeaf).to.equal(false);
      });
      it('should add Child', function(){
        var b = new Kuro_calc.func;
        var a = new Kuro_calc.solv(b);
        expect(a.children.length).to.equal(0);
        expect(a.hasBranch).to.equal(false);
        expect(a.noChildren).to.equal(true);
        var c = new Kuro_calc.solv(new Kuro_calc.func);
        a.addChild(c);
        expect(a.children.length).to.equal(1);
        expect(a.hasBranch).to.equal(false);
        expect(a.noChildren).to.equal(false);
        var d = new Kuro_calc.solv(new Kuro_calc.func);
        a.addChild(d);
        expect(a.children.length).to.equal(2);
        expect(a.hasBranch).to.equal(true);
        expect(a.noChildren).to.equal(false);
      });
      it('should add Parent', function(){
        var b = new Kuro_calc.func;
        var a = new Kuro_calc.solv(b);
        expect(a.parents.length).to.equal(0);
        expect(a.hasMerge).to.equal(false);
        var c = new Kuro_calc.solv(new Kuro_calc.func);
        a.addParent(c);
        expect(a.parents.length).to.equal(1);
        expect(a.hasMerge).to.equal(false);
        var d = new Kuro_calc.solv(new Kuro_calc.func);
        a.addParent(d);
        expect(a.parents.length).to.equal(2);
        expect(a.hasMerge).to.equal(true);
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
