function Text() {
  
  this.x = 0;
  this.y = 0;
  
  this.chars = [];
  this.charX = [];
  
  this.width = 0;
  
  this.alignment = this.LEFT;
  
  this.font = fonts.get("Black");
  
  this.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
  };
  
  
  this.text = function(text) {
    this.chars = [];
    this.charX = [];
    var x = 0;
    this.width = 0;
    for(var i = 0; i < text.length; i++) {
      var c = text.charCodeAt(i) - 32;
      this.chars[i] = c;
      this.charX[i] = x;
      var charWidth = this.font.charOffsets[c] + this.font.charSpacing;
      x += charWidth;
      this.width += charWidth;
    }
  };
  
  
  this.setFont = function(font) {
    this.font = fonts.get(font);
  };
  
  
  this.setAlignment = function(alignment) {
    this.alignment = alignment;
  };
  
  
  this.draw = function() {
    var end = this.chars.length;
    var x = this.x;
    if(this.alignment == Text.CENTER) {
      x -= Math.round(this.width / 2);
    } else if(this.alignment == Text.RIGHT) {
      x -= this.width;
    }
    for(var i = 0; i < end; i++) {
      var sx = this.chars[i] * this.font.charWidth;
      var sy = 0;
      c.drawImage(this.font.file, sx, sy, this.font.charWidth, this.font.charHeight, x + this.charX[i], this.y, this.font.charWidth, this.font.charHeight);
    }
  };
  
  
}


Text.LEFT = -1;
Text.CENTER = 0;
Text.RIGHT = 1;