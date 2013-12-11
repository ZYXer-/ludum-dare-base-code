var game;

var canvas;
var c;

var img;
var fonts;
var mouse;
var keyboard;


jQuery(document).ready(function() {
  
  jQuery("body").attr("unselectable", "on").css("user-select", "none").on("selectstart", false);
  
  canvas = document.getElementById("game");
  c = canvas.getContext("2d");
  
  img = new Img();
  
  fonts = new Fonts();
  
  mouse = new Mouse();
  mouse.init();
  
  keyboard = new Keyboard();
  keyboard.init();
  
  game = new Game();
  game.init();
  
});