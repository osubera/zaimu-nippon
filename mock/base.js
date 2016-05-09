// テスト用モック
// https://github.com/osubera/zaimu-nippon

/*############################
Mock_base, as a static class
ユニットテスト用のモック
############################*/

define(function(){
  
  var Mock_base = new function(){
    
    /*############################
    Base / this.base
    ベースコンストラクタ
    ############################*/
    
    function Base() {
      Object.defineProperties(this, {
        "mockLastCall": { value: "", writable: true, configurable: true },
        "mockName": { value: "", writable: true, configurable: true },
        "mockVerbose": { value: false, writable: true, configurable: true }
      });
      
      function mockGetLastCall() {
        var ret = this.mockName + ": " + this.mockLastCall;
        this.mockLastCall = "";
        if(this.mockVerbose) { console.log(ret); }
        return(ret);
      }
      this.mockGetLastCall =mockGetLastCall;
      
      function mockSetLastCall(arg) {
        this.mockLastCall = arg
      }
      this.mockSetLastCall =mockSetLastCall;
    }
    this.base = Base;
    
    /*############################
    Element / this.element
    DOM element
    ############################*/
    
    function Element() {
      Base.call(this);
      
      function addEvenetListener(type, listener, useCapture){
        this.mockSetLastCall("addEventListener@" + arguments);
      }
    }
    this.element = Element;
  };
  
  return(Mock_base);
});
