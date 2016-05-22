var expect = require('chai').expect;
var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: '.'
});

var Kuro_wareki = requirejs('kuro/wareki');

describe('Kuro_wareki', function(){
  it('should be a function (constructor)', function(){
    expect(Kuro_wareki).to.be.a('function');
  });
});

describe('new Kuro_wareki', function(){
  var wa = new Kuro_wareki;
  it('should be an object', function(){
    expect(wa).to.be.an('object');
  });
  it('should have following keys', function(){
    expect(wa).have.all.keys(
      'date', 'warekiRule'
    );
  });
  
  describe('Kuro_wareki.date', function(){
    var x = new wa.date;
    it('should be a date', function(){
      expect(x).to.be.an('object');
    });
    it('should have a value of date', function(){
      expect(x.value).to.be.a('date');
    });
    it('should have today as a default value', function(){
      var today = new Date;
      expect(x.value.year).to.equal(today.year);
      expect(x.value.month).to.equal(today.month);
      expect(x.value.date).to.equal(today.date);
    });
  });
});

