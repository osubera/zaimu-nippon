// イベント生成クラス
// https://github.com/osubera/zaimu-nippon

/*############################
Kuro_event, as a static class
イベント生成の共通コンストラクタ、関数
参考: http://stackoverflow.com/questions/15308371/custom-events-model-without-using-dom-events-in-javascript
############################*/

define(function(){
  
  var Kuro_event = new function(){
    
    /*############################
    Event / this.event
    イベント生成のコンストラクタ
    ############################*/
    

function Event(name){
  this.name = name;
  this.callbacks = [];
  this.data = [];
}
Event.prototype.registerCallback = function(callback, data){
  this.callbacks.push(callback);
  this.data.push(data);
}
this.event = Event;
    
    /*############################
     Reactor / this.reactor
    イベント管理のコンストラクタ
    ############################*/
    
function Reactor(){
  this.events = {};
}
this.reactor = Reactor;

Reactor.prototype.registerEvent = function(eventName){
  var event = new Event(eventName);
  this.events[eventName] = event;
};

Reactor.prototype.dispatchEvent = function(eventName, eventArgs){
  var event = this.events[eventName];
  var callbacks = event.callbacks;
  var data = event.data;
  for(var i = 0; i < callbacks.length; i++) {
    callbacks[i](eventArgs, data[i]);
  }
};

Reactor.prototype.addEventListener = function(eventName, callback, data){
  this.events[eventName].registerCallback(callback, data);
};


  };
  
  return(Kuro_event);
});
