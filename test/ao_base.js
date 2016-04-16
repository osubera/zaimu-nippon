var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Ao_base = requirejs('ao/base');

describe('Ao_base', function(){
  it('should be a function (constructor)', function(){
    expect(Ao_base).to.be.a('function');
  });
});

describe('new Ao_base', function(){
  var ao = new Ao_base;
  it('should be an object', function(){
    expect(ao).to.be.an('object');
  });
  it('should have hidden key as nendo', function(){
    expect(ao.nendo).to.be.an('object');
    expect(ao.nendo.year).to.be.a('number');
    expect(ao.nendo.year).to.equal(new Date().getFullYear());
  });
});

