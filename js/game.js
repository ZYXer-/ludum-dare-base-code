function Game() {
  
  this.width = 768;
  this.height = 480;
  
  this.interval;
  
  this.frameCounter = 0;
  this.fps = 0;
  
  //just for demonstration purposes:
  this.demoText;
  this.demoParticleSystem;

  
  this.init = function() {
    this.drawEmpty();
    img.startLoading();
  };
  
  
  this.imageLoadingEnded = function() {
    this.setupGame();
    this.startLoop();
    window.setInterval(function() {
      game.calculateFps();
    }, 1000);
  };
  
  
  this.setupGame = function() {
    
    // setup stuff here, examples:

    this.demoText = new Text();
    this.demoText.setPosition(384, 20);
    this.demoText.setAlignment(Text.CENTER);
    this.demoText.text("Hello World!");
    
    this.demoParticleSystem = new ParticleSystem();
    this.demoParticleSystem.setType(1);
    this.demoParticleSystem.setEmitter(384, 240);
    this.demoParticleSystem.setV(-5.0, 5.0, -5.0, 5.0);
    this.demoParticleSystem.setA(-0.2, 0.2, -0.2, 0.2);
    this.demoParticleSystem.setLife(20, 40);

  };
  
  
  this.startLoop = function() {
    this.interval = window.setInterval(function() {
      game.loop();
    }, 33);
  };
  
  
  this.loop = function() {
    this.update();
    this.draw();
    this.frameCounter++;
  };
  
  
  this.update = function() {

    // update stuff here, example:
    
    if(mouse.isOver(5, 5, 758, 470)) {
      this.demoParticleSystem.setEmitter(mouse.x, mouse.y);
    }

  };
  
  
  this.draw = function() {
    
    this.drawEmpty();
    
    // draw stuff here, examples:
    
    c.fillStyle = "#fff";
    c.fillRect(0, 0, this.width, this.height);

    this.demoParticleSystem.draw();
    this.demoText.draw();
  };
  
  
  this.calculateFps = function() {
    this.fps = this.frameCounter;
    this.frameCounter = 0;
    this.printFps();
  };
  
  
  this.printFps = function() {
    // customize fps output:
    jQuery("#fps").html("FPS: " + this.fps);
  };
  
  
  this.drawEmpty = function() {
    c.fillStyle = "#000";
    c.fillRect(0, 0, this.width, this.height);
  };

}