function Game() {
  
  this.WIDTH = 960;
  this.HEIGHT = 600;
  
  this.DEBUG = true;
  
  this.TIME_PER_FRAME = 33;
  
  this.interval;
  
  this.state = -1;
  this.nextState = -1;
  
  this.loadingScreen;
  this.loginScreen;
  
  // just for demonstration purposes:
  this.demoText;
  this.demoParticleSystem1;
  this.demoParticleSystem2;
  this.demoShaking;
  this.demoImageRotation = 0;
  
  // demonstration of online synchronization
  /*this.demoHoles = [];
  this.demoMyHoles = [];
  this.demoSyncCounter = 0;*/
  
  
  this.init = function() {
    this.drawEmpty(); 
    timer.init();
    performanceMonitor.init();
    preloadingManager.preloadLoadingScreen();
  };
  
  
  this.showLoadingScreen = function() {
    this.setState(Game.LOADING_SCREEN_STATE);
    this.startLoop();
  };
  
  
  this.setState = function(state) {
    this.nextState = state;
  };
  
  
  this.startLoop = function() {
    this.interval = window.setInterval(function() {
      game.loop();
    }, this.TIME_PER_FRAME);
  };
  
  
  this.loop = function() {
    this.initState();
    timer.update();
    this.update();
    this.draw();
    performanceMonitor.update();
  };
  
  
  this.initState = function() {
    if(this.state != this.nextState) {
      this.state = this.nextState;
      
      if(this.state == Game.LOADING_SCREEN_STATE) {
        this.loadingScreen = new LoadingScreen();
        preloadingManager.preloadGame();
        
      } else if(this.state == Game.LOGIN_SCREEN_STATE) {
        this.loginScreen = new LoginScreen();
        this.loginScreen.init();
        
      } else if(this.state == Game.INGAME_STATE) {
        this.setupGame();
        
      }
    }
  };
  
  
  this.setupGame = function() {
    
    keyboard.init();
    mouse.init();
    
    keyboard.registerKeyUpHandler(Keyboard.P, function() {
      game.paused = !game.paused;
    });
    
    keyboard.registerKeyUpHandler(Keyboard.M, function() {
      sound.muteUnmute();
    });
    
    // setup stuff here, examples:
    
    this.demoText = new Text();
    this.demoText.setPosition(480, 20);
    this.demoText.setAlignment(Text.CENTER);
    this.demoText.text("Hello World!");
    
    this.demoParticleSystem1 = new ParticleSystem();
    this.demoParticleSystem1.setType(1);
    this.demoParticleSystem1.setEmitter(192, 240);
    this.demoParticleSystem1.setV(-30.0, 30.0, -150.0, -120.0);
    this.demoParticleSystem1.setA(-6.0, 6.0, 0.0, 12.0);
    this.demoParticleSystem1.setLife(30, 50);
    
    this.demoParticleSystem2 = new ParticleSystem();
    this.demoParticleSystem2.setMode(ParticleSystem.BURST_MODE);
    this.demoParticleSystem2.setType(2);
    this.demoParticleSystem2.setV(-240.0, 240.0, -240.0, 240.0);
    this.demoParticleSystem2.setA(-6.0, 6.0, -6.0, 6.0);
    this.demoParticleSystem2.setLife(15, 20);
    this.demoParticleSystem2.setParticlesPerTick(50);
    
    this.demoShaking = new Shaking();
    
    mouse.registerUpArea("demoFire", 0, 0, this.WIDTH, this.HEIGHT, function() {
      if(!game.paused) {
        game.demoParticleSystem2.setEmitter(mouse.x, mouse.y);
        game.demoParticleSystem2.burst();
        game.demoShaking.shake(6, 18, 2);
        sound.play("cannon");
        
        // demonstration of online synchronization
        /*game.demoHoles.push({ x : Math.round(mouse.x), y : Math.round(mouse.y) });
        game.demoMyHoles.push({ x : Math.round(mouse.x), y : Math.round(mouse.y) });*/
      }
    });
    
  };
  
  
  this.update = function() {
    
    if(this.state == Game.LOADING_SCREEN_STATE) {
      this.loadingScreen.update();

    } else if(this.state == Game.INGAME_STATE) {
      
      // update stuff here:
      
      if(!game.paused) {
        this.demoImageRotation += 10 * timer.delta;
      }
      
    } 
  };
  
  
  this.draw = function() {
    
    this.drawEmpty();
    
    if(this.state == Game.LOADING_SCREEN_STATE) {
      this.loadingScreen.draw();
      
    } else if(this.state == Game.LOGIN_SCREEN_STATE) {
      this.loginScreen.draw();
      
    } else if(this.state == Game.INGAME_STATE) {
    
      // draw stuff here, examples:
      
      c.fillStyle = "#fff";
      c.fillRect(0, 0, this.WIDTH, this.HEIGHT);

      this.demoText.draw();
      
      this.demoShaking.apply();
      
      img.drawRotated("test", 480, 300, 38, 38, this.demoImageRotation);
      
      this.demoParticleSystem1.draw();
      this.demoParticleSystem2.draw();
      
      // demonstration of online synchronization
      /*for(var i = 0; i < this.demoHoles.length; i++) {
        c.fillStyle = "#060";
        c.fillRect(this.demoHoles[i].x - 6, this.demoHoles[i].y - 6, 12, 12);
      }
      this.demoSyncCounter--;
      if(this.demoSyncCounter <= 0) {
        this.demoSyncCounter = 30;
        ajax.send("sync", { holes : this.demoMyHoles }, function(data) {
          if(data.type == "sync" && data.result.hasOwnProperty("holes")) {
            game.demoHoles = data.result.holes;
          }
        });
        this.demoMyHoles = [];
      }*/
      
      this.demoShaking.remove();
    }
  };
  
  
  this.drawEmpty = function() {
    c.fillStyle = "#000";
    c.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  };

}


Game.LOADING_SCREEN_STATE = 0;
Game.LOGIN_SCREEN_STATE = 1;
Game.INGAME_STATE = 2;