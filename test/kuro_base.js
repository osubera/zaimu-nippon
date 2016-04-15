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
  it('should have following keys', function(){
    expect(Kuro_base).have.all.keys(
      'var', 'string', 'number', 'boolean', 'date', 'list', 'table', 'today', 'parseString', 
      'parseNumber', 'parseDate', 'formatNumberThousands', 'formatNumberTriangle', 
      'formatDateYmd'
    );
  });
});

