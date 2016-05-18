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
        "mockCalls": { value: [], writable: false, configurable: true },
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
      
      function mockSetLastCall(tag, arg) {
        var p = [tag];
        for(var i = 0; i < arg.length; i++) {
          p.push(arg[i]);
        }
        this.mockCalls.push(this.mockLastCall = p.join());
      }
      this.mockSetLastCall =mockSetLastCall;
      
      function mockGetCalls() {
        var ret = this.mockName + ": " + this.mockCalls.join(';');
        while(this.mockCalls.pop()) {}
        return(ret);
      }
      this.mockGetCalls = mockGetCalls;
    }
    this.base = Base;
    
    /*############################
    Console / this.console
    console
    ############################*/
    
    function Console() {
      Base.call(this);
      Object.defineProperties(this, {
        "mockName": { value: "console", writable: false },
        "mockVerbose": { value: false, writable: false },
        "mockOriginal": { value: undefined, writable: true }
      });
      
      function log(){
        this.mockSetLastCall("log", arguments);
        if(this.mockOriginal) {
          this.mockOriginal.apply(null, arguments);
        }
      }
      this.log = log;
    }
    this.console = Console;
    
    /*############################
    Element / this.element
    DOM element
    ############################*/
    
    function Element() {
      Base.call(this);
      
      function addEventListener(type, listener, useCapture){
        this.mockSetLastCall("addEventListener", arguments);
      }
      this.addEventListener = addEventListener;
      
      function removeEventListener(type, listener, useCapture){
        this.mockSetLastCall("removeEventListener", arguments);
      }
      this.removeEventListener = removeEventListener;
    }
    this.element = Element;
  };
  
  return(Mock_base);
});
