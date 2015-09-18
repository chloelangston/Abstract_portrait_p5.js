var system;



var source_image;

function preload() {
source_image = loadImage("face.jpg");
//    source_image.loadPixels();
}



function setup() {
  createCanvas(1000, 800);
  system = new ParticleSystem(createVector(width/2, 10));
}

function draw() {
  background(source_image);
  system.addParticle();
  system.run();
    
}

// A simple Particle class
//identify darker/lighter areas
//random, more likely for particle to stick the darker it is
var Particle = function(position) {
  this.acceleration = createVector(0, 0.02);
  this.velocity = createVector(random(-5, 5), random(-5, 5));
  this.position = position.copy();
  this.lifespan = 400.0;
    
    var clr = source_image.get(this.position);
    var r = red(clr) / 255.0;
    var rnd = random(0, 1);
    if (rnd > r) {
        // stick to the spot
        background(255);
    } else {
        background(0);
    }
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(255, this.lifespan);
  ellipse(this.position.x, this.position.y, 8, 8);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};