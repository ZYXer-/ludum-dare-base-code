function ParticleSystem() {
  
  this.mode = ParticleSystem.CONTINUOUS_MODE;
  
  this.type;
  
  this.emitterX = 0;
  this.emitterY = 0;
  
  this.initMinVx = 0;
  this.initMaxVx = 0;
  this.initMinVy = 0;
  this.initMaxVy = 0;
  
  this.initMinAx = 0;
  this.initMaxAx = 0;
  this.initMinAy = 0;
  this.initMaxAy = 0;
  
  this.lifeMin = 0;
  this.lifeMax = 0;
  
  this.particlesPerTick = 1;
  
  this.particles = {};
  this.particleCounter = 0;
  
  this.isOn = true;
  
  this.burstNow = false;
  
  
  this.setMode = function(mode) {
    this.mode = mode;
  };
  
  
  this.setType = function(type) {
    this.type = type;
  };
  
  
  this.setEmitter = function(emitterX, emitterY) {
    this.emitterX = emitterX;
    this.emitterY = emitterY;
  };
  
  
  this.setV = function(initMinVx, initMaxVx, initMinVy, initMaxVy) {
    this.initMinVx = initMinVx;
    this.initMaxVx = initMaxVx;
    this.initMinVy = initMinVy;
    this.initMaxVy = initMaxVy;
  };
  
  
  this.setA = function(initMinAx, initMaxAx, initMinAy, initMaxAy) {
    this.initMinAx = initMinAx;
    this.initMaxAx = initMaxAx;
    this.initMinAy = initMinAy;
    this.initMaxAy = initMaxAy;
  };
  
  
  this.setLife = function(lifeMin, lifeMax) {
    this.lifeMin = lifeMin;
    this.lifeMax = lifeMax;
  };
  
  
  this.setParticlesPerTick = function(particlesPerTick) {
    this.particlesPerTick = particlesPerTick;
  };
  
  
  this.on = function() {
    this.isOn = true;
  };
  
  
  this.off = function() {
    this.isOn = false;
  };
  
  
  this.burst = function() {
    this.burstNow = true;
  };
  
  
  this.draw = function() {
    if(this.isOn && !game.paused) {
      if(this.mode == ParticleSystem.CONTINUOUS_MODE || (this.mode == ParticleSystem.BURST_MODE && this.burstNow)) {
        this.burstNow = false;
        for(var i = 0; i < this.particlesPerTick; i++) {
          this.particles[this.particleCounter] = new Particle();
          this.particles[this.particleCounter].init(this.type, this.emitterX, this.emitterY, this.initMinVx, this.initMaxVx, this.initMinVy, this.initMaxVy, this.initMinAx, this.initMaxAx, this.initMinAy, this.initMaxAy, this.lifeMin, this.lifeMax);
          this.particleCounter++;
        }
      }
    }
    
    for(var particleId in this.particles) {
      if(this.particles[particleId].life < 0) {
        delete this.particles[particleId];
      } else {
        this.particles[particleId].draw();
      }
    }
  };
  
}


ParticleSystem.CONTINUOUS_MODE = 0;
ParticleSystem.BURST_MODE = 1;
