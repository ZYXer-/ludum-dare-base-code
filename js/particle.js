function Particle() {
  
  this.type;
  
  this.x;
  this.y;
  
  this.vX;
  this.vY;
  
  this.minAx;
  this.maxAx;
  this.minAy;
  this.maxAy;
  
  this.life;
  
  this.init = function(type, emitterX, emitterY, initMinVx, initMaxVx, initMinVy, initMaxVy, initMinAx, initMaxAx, initMinAy, initMaxAy, lifeMin, lifeMax) {
    this.type = type;
    
    this.x = emitterX;
    this.y = emitterY;
    
    this.vX = initMinVx + ((initMaxVx - initMinVx) * Math.random());
    this.vY = initMinVy + ((initMaxVy - initMinVy) * Math.random());
    
    this.minAx = initMinAx;
    this.maxAx = initMaxAx;
    this.minAy = initMinAy;
    this.maxAy = initMaxAy;
    
    this.life = rand(lifeMin, lifeMax);
    
  };
  
  this.draw = function() {
    
    // implement particle types here:
    if(!game.paused) {
      this.x += this.vX * timer.delta;
      this.y += this.vY * timer.delta;
      this.life--;
      
      if(this.life % 20 == 0) {
        this.vX += this.minAx + ((this.maxAx - this.minAx) * Math.random());
        this.vY += this.minAy + ((this.maxAy - this.minAy) * Math.random());
      }
    }
    
    if(this.type == 1) {
      var opacity = this.life / 60;
      c.fillStyle = "rgba(0, 0, 255, " + opacity + ")";
      c.fillRect(this.x - 20, this.y - 20, 40, 40);
      
    } else if(this.type == 2) {
      var opacity = this.life / 20;
      c.fillStyle = "rgba(0, 127, 0, " + opacity + ")";
      c.fillRect(this.x - 10, this.y - 10, 20, 20);
    }
  };
  
}