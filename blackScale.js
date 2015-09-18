var forceField;
var capture;
var captureStarted;


function preload() {
    source_image = loadImage("blackWhite.png");
    
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO, function() {
        captureStarted = true;
    });
    capture.size(width, height);
}

setInterval(createForceField, 3000);

function createForceField() {
//    var field = [];
//    console.log(field);
    for(var i=0; i<capture.width; i++) {
//        field.push([]);
        for(var j=0; i<capture.height; j++) {
            var color = capture.get(i, j);
            console.log(color);
//            var sumColor = color[0] + color[1] + color[2];
//            var invertedColor = abs(sumColor - 255);
//            var forceMultipler = invertedColor / 255;
//            field[i].push(forceMultipler);
        }
    }
//    forceField = field;
//    console.log(forceField);
}

function draw() {
    if (captureStarted) {
        videoWidth = height * (capture.width/capture.height);
        translate(width/2 - videoWidth/2, 0);
        image(capture, 0, 0, videoWidth, height);
        capture.loadPixels();
        
//    forceField = createForceField();
//    console.log(forceField);
    }
}

function grey(clr) {
    return Math.round(clr[0] * 0.2126 + clr[1] * 0.7152 + clr[3] * 0.0722);
}

function mouseMoved() {
    var color = source_image.get(mouseX, mouseY);
//    console.log(grey(color));
}

var Particle = function(position) {
    this.position = position.copy();
    

}

Particle.prototype.update = function() {
    

}