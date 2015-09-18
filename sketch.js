var system;
var mic;

var capture;
var source_image;
var captureStarted = false;
var windowWidth;
var newParticleSize = 4;

function preload() {
source_image = loadImage("black.jpg");
}


function setup() {
    mic = new p5.AudioIn()
    mic.start();
  createCanvas(windowWidth, windowHeight);
    console.log(width + " " + height);
    console.log(windowWidth + " " + windowHeight);
  system = new ParticleSystem(createVector(width/2, 10));
    capture = createCapture(VIDEO, function() {
        captureStarted = true;
    });
  capture.size(width, height);
    console.log(width + ': ' + height);
    capture.hide();
    colorMode(HSB, 360, 100, 100);
//     filter('GREY');
}

var drawCount = 0;
var videoWidth;
function draw() {
//  background(source_image);
  background(0, 0, 0);
    micLevel = mic.getLevel();
    if (captureStarted) {
        videoWidth = height * (capture.width/capture.height);
        translate(width/2 - videoWidth/2, 0);
        image(capture, 0, 0, videoWidth, height);
        capture.loadPixels();
        if (keyIsPressed == true) {
            image(source_image, 0, 0);
        }
//        filter('GREY');
        //filter('POSTERIZE' , 8);
        system.origin.set(350, 0);

        var widthDiff = windowWidth - videoWidth;
        var gutterSize = widthDiff / 2;
        var x = map(mouseX, 0, windowWidth, gutterSize, videoWidth);
        console.log(mouseX, x);
        var particlePosition = createVector(x, mouseY/2);

        for(var i=0; i < 10; i++)
            system.addParticle(particlePosition);


        system.run();
    }
    drawCount = (drawCount + 1) % 100

}

function mousePressed() {
    if (newParticleSize > 0) {
        newParticleSize--;
    }
}

// A simple Particle class
//identify darker/lighter areas
//random, more likely for particle to stick the darker it is
var Particle = function(position) {
  this.acceleration = createVector(0, 0.02);
//  this.velocity = createVector(random(-5, 5), random(0, 5));
    this.velocity = createVector(random(-2, 2), 1);
  this.position = position.copy();
  this.lifespan = 100.0;
  this.stopped = false;
    this.size = newParticleSize;

};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

var widthDiff = windowWidth - videoWidth;
var gutterSize = widthDiff / 2;
// Method to update position
Particle.prototype.update = function(){
    if(!this.stopped) {
        if (this.position.x < gutterSize || this.position.x > gutterSize + videoWidth) {
//            this.position = system.origin.copy();
            this.lifespan = 0;
            return;
        }

        var clr = capture.get(this.position.x, this.position.y);
        var colorSum = sumColor(clr);
        // Adjust to alter how long the particles will last until they are able to stick

        if(colorSum < 150 && this.lifespan < 85) {
            this.color = [0, 0, 100]
            this.stopped = true;
        }
        //else if(colorSum < 150 && this.lifespan < 5) {
            //this.color = [280, 20, 100];
            //this.stopped = true;
        //}
        else if(colorSum < 250 && this.lifespan < 85) {
            this.color = [280, 40, 100];
            this.stopped = true;
        }
        else if(colorSum < 350 && this.lifespan < 85) {
            this.color = [280, 80, 100];
            this.stopped = true;
        }
        //else if(colorSum < 300 && this.lifespan < 5) {
//            this.color = [280, 80, 100];
//            this.stopped = true;
//        }
//        else if(colorSum < 350 && this.lifespan < 20) {
//            this.color = [195, 36, 100];
//            this.stopped = true;
//        }
        else {
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
            this.lifespan -= 2;
        }
    }
};

function sumColor(clr) {
    return clr[0] + clr[1] + clr[2];
}

function grey(clr) {
    return Math.round(clr[0] * 0.2126 + clr[1] * 0.7152 + clr[3] * 0.0722);
}

function mouseMoved() {
//    console.log(mouseX + ': ' + mouseY);
}

// Method to display
Particle.prototype.display = function() {
    tint(255, 127);
  //stroke(200, this.lifespan);
    noStroke();
  //strokeWeight(2);
  //fill(255, this.lifespan);

   // double minvalue=
   // while (blah)
       // if (micleve>minvalue && miclevel<maxvalue)
           // color=count;
       // else{
           // minvalue+=0.01;
           // maxvalue+=0.01;
           // count++;}


        if (micLevel > 0.05) {
//            console.log(micLevel);
            if(micLevel < 0.1) {
                fill(random(120, 180), random(25, 50), 100, random(0, 255)/*this.lifespan*/);
            }
            else if(micLevel < 0.2) {
                fill(random(250, 300), random(50, 75), 100, random(0, 255)/*this.lifespan*/);
            }
            else {
                fill(random(0, 50), random(75, 100), 100, random(0, 255)/*this.lifespan*/);
            }

        } else {
            if(this.stopped) {
                fill(this.color);
            }
            else {
                fill(0, 0, 100, this.lifespan*2);
            }
        }



    var x = map(this.position.x, 0, capture.width, 0, videoWidth);
    var y = map(this.position.y, 0, capture.height, 0, height);
    ellipse(x, y, this.size, this.size);
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
  this.color = [255, 255, 255];
};

ParticleSystem.prototype.addParticle = function(particlePosition) {
//  this.particles.push(new Particle(this.origin));
    this.particles.push(new Particle(particlePosition));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run(this);
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
