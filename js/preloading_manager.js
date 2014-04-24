function PreloadingManager() {
  
  this.loadingScreenImagePreloader;
  this.loadingScreenFontPreloader;
  
  this.soundManagerPreloader;
  this.imagePreloader;
  this.soundPreloader;
  this.fontPreloader;
  
  
  this.preloadLoadingScreen = function() {
    this.loadingScreenImagePreloader = new Preloader();
    this.loadingScreenImagePreloader.setEndCallback(function() {
      preloadingManager.loadingScreenFontPreloader.loadFonts(resources.loadingScreenFonts);
    });
    this.loadingScreenFontPreloader = new Preloader();
    this.loadingScreenFontPreloader.setEndCallback(function() {
      game.showLoadingScreen();
    });
    
    this.loadingScreenImagePreloader.loadImages(resources.loadingScreenImages);
  };
  
  
  this.preloadGame = function() {
    
    this.soundManagerPreloader = new Preloader();
    this.imagePreloader = new Preloader();
    this.soundPreloader = new Preloader();
    this.fontPreloader = new Preloader();
    
    this.soundManagerPreloader.setEndCallback(function() {
      preloadingManager.soundPreloader.loadSounds(resources.sounds);
    });
    this.soundManagerPreloader.loadSoundManager();
    
    this.imagePreloader.setEndCallback(function() {
      preloadingManager.fontPreloader.loadFonts(resources.fonts);
    });
    this.imagePreloader.loadImages(resources.images);
  };
  
}