var source_image;

function preload() {
source_image = loadImage("face2.jpeg");
//    source_image.loadPixels();
}

function setup() {
  createCanvas(1000, 700);
}

function draw() {
    var clr = source_image.get(mouseX, mouseY);
    var r = red(clr) / 255.0;
    var rnd = random(0, 1);
    if (rnd > r) {
        // stick to the spot
        background(255);
    } else {
        background(0);
    }
image(source_image, 0, 0);

}