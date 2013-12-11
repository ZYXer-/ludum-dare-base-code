function Fonts() {
  
  this.fonts = {};
  
  this.EMPTY_R = 0;
  this.EMPTY_G = 100;
  this.EMPTY_B = 0;
  
  
  this.create = function(name, file, fileWidth, fileHeight, charWidth, charSpacing, spaceWidth) {
    
    var fontCanvas = document.createElement("canvas");
    fontCanvas.width = fileWidth;
    fontCanvas.height = fileHeight;
    
    var fontContext = fontCanvas.getContext("2d");
    fontContext.fillStyle = "rgb(" + this.EMPTY_R + ", " + this.EMPTY_G + ", " + this.EMPTY_B + ")";
    fontContext.fillRect(0, 0, fileWidth, fileHeight);
    
    fontContext.drawImage(file, 0, 0);
    var fontContextData = fontContext.getImageData(0, 0, fileWidth, fileHeight);
    
    this.fonts[name] = { name : name, file : file, charWidth : charWidth, charHeight : fileHeight, charSpacing : charSpacing, charOffsets : [spaceWidth] };
    
    for(var i = 1; i < 94; i++) {      
      var thisCharWidth = charWidth;
      while(this.columnIsEmpty((i * charWidth) + (thisCharWidth - 1), fontContextData.data, fileWidth, fileHeight, charWidth) && thisCharWidth > 0) {
        thisCharWidth--;
      }
      this.fonts[name].charOffsets.push(thisCharWidth);     
    }
    
  };
  
  
  this.created = function(name) {
    return this.fonts.hasOwnProperty(name);
  };
  
  
  this.columnIsEmpty = function(column, data, fileWidth, fileHeight, charWidth) {
    for(var i = 0; i < fileHeight; i++) {
      if(data[(4 * ((fileWidth * i) + column))] != this.EMPTY_R ||
          data[(4 * ((fileWidth * i) + column)) + 1] != this.EMPTY_G ||
          data[(4 * ((fileWidth * i) + column)) + 2] != this.EMPTY_B) {
        return false;
      }
    }
    return true;
  };
  
  
  this.get = function(name) {
    return this.fonts[name];
  };


}