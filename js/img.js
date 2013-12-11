function Img() {
  
  this.loadingScreenImageSource = "img/loading.png";
  this.loadingScreenFontSource = "img/font_black.png";
  
  this.loadingScreenImage;
  this.loadingScreenFont;
  
  this.loadingScreenImageLoaded = false;
  this.loadingScreenFontLoaded = false;
  
  this.sources = {
    test : "img/test.png",
    test2 : "img/test2.png",

    // List sources here

  };
  
  this.assets = {};

  this.loadedAssets = 0;
  
  this.percentageLoaded = 0;
  this.loaded = false;
  
  this.loadingScreenInterval;
  
  this.FAKE_LOADING_TIME = 1000;
  this.FAKE_LOADING_PERCENTAGE = 40;
  
  
  this.startLoading = function() {
    this.loadLoadingScreen();
  };
  
  
  this.loadLoadingScreen = function() {
    this.loadingScreenImage = new Image();
    this.loadingScreenImage.onload = function() {
      img.loadingScreenImageLoaded = true;
      img.reportLoadingScreenAssetLoaded();
    };
    this.loadingScreenImage.src = this.loadingScreenImageSource;
    this.loadingScreenFont = new Image();
    this.loadingScreenFont.onload = function() {
      img.loadingScreenFontLoaded = true;
      img.reportLoadingScreenAssetLoaded();
    };
    this.loadingScreenFont.src = this.loadingScreenFontSource;
  };
  
  
  this.reportLoadingScreenAssetLoaded = function() {
    if(this.loadingScreenImageLoaded && this.loadingScreenFontLoaded) {
      fonts.create("Black", this.loadingScreenFont, 1410, 24, 15, 1, 8);
      img.drawLoadingScreen();
      img.loadAssets();
    }
  };
  
  
  this.loadAssets = function() {
    for(var name in this.sources) {
      this.assets[name] = new Image();
      this.assets[name].onload = function() {
        img.reportAssetLoaded();
      };
      this.assets[name].src = this.sources[name];
    }
  };
  
  
  this.reportAssetLoaded = function() {
    this.loadedAssets++;
    this.percentageLoaded += (100 - this.FAKE_LOADING_PERCENTAGE) / Object.keys(this.sources).length;
    this.drawLoadingScreen();
    if(this.loadedAssets == Object.keys(this.sources).length) {
      this.loadingScreenInterval = window.setInterval(function() {
        img.updateLoadingScreen();
      }, 33);
    }
  };
  
  
  this.updateLoadingScreen = function() {
    this.percentageLoaded += this.FAKE_LOADING_PERCENTAGE * (33 / this.FAKE_LOADING_TIME);
    if(this.percentageLoaded >= 100.0) {
      window.clearInterval(this.loadingScreenInterval);
      this.loaded = true;
      this.percentageLoaded = 100.0;
      window.setTimeout(function() {
        game.imageLoadingEnded();
      }, 33);
    }
    this.drawLoadingScreen();
  };
  
  
  this.drawLoadingScreen = function() {

    // customize loading screen here

    c.drawImage(this.loadingScreenImage, 0, 0);
    c.fillStyle = "#000";
    c.fillRect(284, 400, 200 * (this.percentageLoaded / 100), 20);
    if(fonts.created("Black")) {
      var percentageText = new Text();
      percentageText.setFont("Black");
      percentageText.setAlignment(Text.CENTER);
      percentageText.setPosition(384, 435);
      percentageText.text(Math.round(this.percentageLoaded) + "%");
      percentageText.draw();
    }
  };
  
  
  this.get = function(name) {
    return this.assets[name];
  };
  
  
  this.draw = function(name, x, y) {
    c.drawImage(this.assets[name], x, y);
  };
  
  
  this.drawSprite = function(name, x, y, w, h, posX, posY) {
    c.drawImage(this.assets[name], w * posX, h * posY, w, h, x, y, w, h);
  };
  
  
  this.drawRotated = function(name, x, y, centerX, centerY, angle) {
    c.save();
    c.translate(x, y);
    c.rotate(angle * 0.0174533);
    c.translate(-centerX, -centerY);
    c.drawImage(this.assets[name], 0, 0);
    c.restore();
  };
  
  
  this.drawRotatedSprite = function(name, x, y, w, h, posX, posY, centerX, centerY, angle) {
    c.save();
    c.translate(x, y);
    c.rotate(angle * 0.0174533);
    c.translate(-centerX, -centerY);
    c.drawImage(this.assets[name], w * posX, h * posY, w, h, 0, 0, w, h);
    c.restore();
  };
    
}