function LoadingScreen() {
  
  this.percentage = 0;
  
  this.FAKE_LOADING_TICKS = 30;
  
  this.SOUND_MANAGER_PERCENTAGE = 5;
  this.IMAGE_PERCENTAGE = 30;
  this.SOUND_PERCENTAGE = 20;
  this.FONT_PERCENTAGE = 5;
  this.FAKE_LOADING_PERCENTAGE = 40;
  
  this.fakeLoadingCounter = 0;
  
  this.waitForSoundLoadingCountdown = 150;
  
  
  this.update = function() {
    
    var soundManagerPreloader = preloadingManager.soundManagerPreloader;
    var imagePreloader = preloadingManager.imagePreloader;
    var soundPreloader = preloadingManager.soundPreloader;
    var fontPreloader = preloadingManager.fontPreloader;
    
    var soundManagerPercentage = soundManagerPreloader.getFractionLoaded() * this.SOUND_MANAGER_PERCENTAGE;
    var imagePercentage = imagePreloader.getFractionLoaded() * this.IMAGE_PERCENTAGE;
    var soundPercentage = soundPreloader.getFractionLoaded() * this.SOUND_PERCENTAGE;
    var fontPercentage = fontPreloader.getFractionLoaded() * this.FONT_PERCENTAGE;
    var fakeLoadingPercentage = (this.fakeLoadingCounter / this.FAKE_LOADING_TICKS) * this.FAKE_LOADING_PERCENTAGE;
    
    this.percentage = soundManagerPercentage + imagePercentage + soundPercentage + fontPercentage + fakeLoadingPercentage;
    
    if((soundManagerPreloader.isLoaded() && 
        imagePreloader.isLoaded() && 
        soundPreloader.isLoaded() && 
        fontPreloader.isLoaded()) || 
        this.waitForSoundLoadingCountdown < 0) {
      this.fakeLoadingCounter++;
      if(this.fakeLoadingCounter > this.FAKE_LOADING_TICKS) {
        game.setState(Game.INGAME_STATE);
      }
    }
    
    if(imagePreloader.isLoaded() && fontPreloader.isLoaded() && !soundPreloader.isLoaded()) {
      this.waitForSoundLoadingCountdown--;
    }
    
  };
  
  
  this.draw = function() {
    // customize loading screen here
    
    img.draw("loading", 0, 0);
    
    c.fillStyle = "#000";
    c.fillRect(380, 450, 200 * (this.percentage / 100), 20);
    
    var percentageText = new Text();
    percentageText.setFont("black");
    percentageText.setAlignment(Text.CENTER);
    percentageText.setPosition(480, 485);
    percentageText.text(Math.ceil(this.percentage) + "%");
    percentageText.draw();
  };
  
}