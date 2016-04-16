var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Kuro_nendo = requirejs('kuro/nendo');

describe('Kuro_nendo', function(){
  it('should be a function (constructor)', function(){
    expect(Kuro_nendo).to.be.a('function');
  });
});

describe('new Kuro_nendo', function(){
  var nen = new Kuro_nendo;
  it('should be an object', function(){
    expect(nen).to.be.an('object');
  });
  it('should have following keys', function(){
    expect(nen).have.all.keys(
      'nendo', 'nendoMaster', 'fuga'
    );
  });
  it('should have hidden key as', function(){
    expect(nen.hoge).to.equal(3);
  });
});

