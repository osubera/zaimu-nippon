var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Mock_base = requirejs('mock/base');

describe('Mock_base', function(){
  it('should be an object', function(){
    expect(Mock_base).to.be.an('object');
  });
  it('should respond to methods', function(){
    expect(Mock_base).itself.to.respondTo('base');
    expect(Mock_base).itself.to.respondTo('console');
    expect(Mock_base).itself.to.respondTo('element');
  });
});

describe('Mock_base.base', function(){
  it('should be a function', function(){
    expect(Mock_base.base).to.be.a('function');
  });
  it('should be a constructor', function(){
    var x = new Mock_base.base;
    expect(x).to.be.an('object')
        .and.to.be.instanceOf(Mock_base.base);
    
    describe('new Mock_base.base', function(){
      it('should have properties', function(){
        expect(x).to.have.property('mockCalls');
        expect(x).to.have.property('mockLastCall', "");
        expect(x).to.have.property('mockName', "");
        expect(x).to.have.property('mockVerbose', false);
      });
      it('should respond to methods', function(){
        expect(x).to.respondTo('mockGetLastCall');
        expect(x).to.respondTo('mockSetLastCall');
        expect(x).to.respondTo('mockGetCalls');
      });
      it('should store last call with arguments', function(){
        x.mockName = 'mock#1';
        x.mockSetLastCall('myfunc', [1,2,3]);
        expect(x.mockLastCall).to.equal('myfunc,1,2,3');
        expect(x.mockCalls).to.deep.equal(['myfunc,1,2,3']);
      });
      it('should clear last call after mockGetLastCall', function(){
        expect(x.mockGetLastCall()).to.equal('mock#1: myfunc,1,2,3');
        expect(x.mockGetLastCall()).to.equal('mock#1: ');
        expect(x.mockLastCall).to.equal('');
        expect(x.mockCalls).to.deep.equal(['myfunc,1,2,3']);
      });
      it('should store multiple calls', function(){
        x.mockSetLastCall('myA', [11,12]);
        x.mockSetLastCall('myB', [21,22]);
        x.mockSetLastCall('myC', [31,32]);
        expect(x.mockGetLastCall()).to.equal('mock#1: myC,31,32');
        expect(x.mockCalls).to.deep.equal(['myfunc,1,2,3','myA,11,12','myB,21,22','myC,31,32']);
      });
      it('should clear multiple calls after mockGetCalls', function(){
        expect(x.mockGetCalls()).to.equal('mock#1: myfunc,1,2,3;myA,11,12;myB,21,22;myC,31,32');
        expect(x.mockCalls).to.deep.equal([]);
      });
    });
  });
});

describe('Mock_base.console', function(){
  it('should be a constructor', function(){
    var y = new Mock_base.console;
    expect(y).to.be.an('object')
        .and.to.be.instanceOf(Mock_base.console);
    
    describe('new Mock_base.console', function(){
      it('should not change some properties', function(){
        y.mockName = 'mock#2';
        expect(y.mockName).to.equal('console');
        y.mockVerbose = true;
        expect(y.mockVerbose).to.equal(false);
      });
      it('should respond to log', function(){
        expect(y).to.respondTo('log');
        y.log("something");
        expect(y.mockGetLastCall()).to.equal('console: log,something');
      });
      it('should be used to fake console.log', function(){
        y.mockOriginal = console.log;
        console.log = y.log.bind(y);
        var x = new Mock_base.base;
        x.mockName = 'mock#2';
        x.mockVerbose = true;
        x.mockSetLastCall('myfunc',['a','b','c']);
        expect(x.mockGetLastCall()).to.equal('mock#2: myfunc,a,b,c');
        expect(y.mockGetLastCall()).to.equal('console: log,mock#2: myfunc,a,b,c');
        console.log = y.mockOriginal;
      });
    });
  });
});

describe('Mock_base.element', function(){
  it('should be a constructor', function(){
    var x = new Mock_base.element;
    expect(x).to.be.an('object')
        .and.to.be.instanceOf(Mock_base.element);
    
    describe('new Mock_base.element', function(){
      it('should respond to addEventListener', function(){
        expect(x).to.respondTo('addEventListener');
        x.mockName = 'element#1';
        x.addEventListener(1,2,3);
        expect(x.mockGetLastCall()).to.equal('element#1: addEventListener,1,2,3');
      });
      it('should respond to removeEventListener', function(){
        expect(x).to.respondTo('removeEventListener');
        x.mockName = '';
        x.removeEventListener(1,2,3);
        expect(x.mockGetLastCall()).to.equal(': removeEventListener,1,2,3');
      });
    });
  });
});
