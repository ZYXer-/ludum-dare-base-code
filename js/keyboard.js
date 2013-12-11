function Keyboard() {
  
  this.ARROW_LEFT = 37;
  this.ARROW_UP = 38;
  this.ARROW_RIGHT = 39;
  this.ARROW_DOWN = 40;
  
  this.keyPressed = {};
  
  this.keyDownHandlers = {};
  this.keyUpHandlers = {};
  
  this.init = function() {
    jQuery(window).keydown(function(event) {
      event.preventDefault();
      keyboard.keyPressed[event.which] = true;
      if(keyboard.keyDownHandlers.hasOwnProperty(event.which)) {
        keyboard.keyDownHandlers[event.which].callback();
      }
      
    }).keyup(function(event) {
      event.preventDefault();
      keyboard.keyPressed[event.which] = false;
      if(keyboard.keyUpHandlers.hasOwnProperty(event.which)) {
        keyboard.keyUpHandlers[event.which].callback();
      }
    });
  };
  
  
  this.isPressed = function(key) {
    if(!this.keyPressed.hasOwnProperty(key)) {
      return false;
    }
    return this.keyPressed[key];
  };
  
  
  this.registerKeyDownHandler = function(key, callback) {
    this.keyDownHandlers[key] = { key : key, callback : callback };
  };
  
  
  this.deleteKeyDownHandler = function(key) {
    if(this.keyDownHandlers.hasOwnProperty(key)) {
      delete this.keyDownHandlers[key];
    }
  };
  
  
  this.registerKeyUpHandler = function(key, callback) {
    this.keyUpHandlers[key] = { key : key, callback : callback };
  };
  
  
  this.deleteKeyUpHandler = function(key) {
    if(this.keyUpHandlers.hasOwnProperty(key)) {
      delete this.keyUpHandlers[key];
    }
  };
  
}