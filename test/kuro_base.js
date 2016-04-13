var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Kuro_base = requirejs(['kuro/base']);
/*var Kuro_base = requirejs(['kuro/base'], function(Kuro_base){});
requirejs(['kuro/base'], function(Kuro_base){
  
});
*/

describe('Kuro_base', function(){
  it('should something new', function(){
//    expect(Kuro_base).to.be.an('object');
//    expect(Kuro_base).have.all.keys('var', 'string');
    expect(Kuro_base.version).to.be.a('string');
  });
});

