function Resources() {
  
  
  this.loadingScreenImages = {
    loading : "img/loading.png",
    fontBlack : "img/font_black.png",
  };
  
  
  this.loadingScreenFonts = {
    black : {
      file : "fontBlack",
      minCharSpacingInFile : 1,
      printCharSpacing : 1,
      printSpaceWidth : 5,
      glyphDetectionThresholds : [0.25, 1.2],
      manualSpacing : [{ char : "'", left : 2 }, { char : ":", left : 2 }, { char : "t", left : 1 }]
    }, 
  };
  
  
  this.images = {
    test : "img/test.png",
    test2 : "img/test2.png",
  };
  
  
  this.fonts = {
  };
  
  
  this.sounds = {
    cannon : { source : ["audio/cannon.wav", "audio/cannon.mp3"], instances : 3 },
  };
  
}