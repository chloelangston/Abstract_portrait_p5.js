var
  // The number of items in the array (# of circles)
  num,
  // y-position of each circle (fixed)
  y,
  // Speed of each circle
  speed,
  // Phase of each circle
  phase,
  // Color components
  red = 120,
  green = 120,
  blue = 120;

function setup() {

  canvas = createCanvas( 800, 900 );
  num = 3;

  // Allocate space for each array
  y = new Array(num);
  speed = new Array(num);
  phase = new Array(num);

  // Calculate the gap in y based on the number of circles
  gap = height / ( num + 1 );

  //Setup an initial value for each item in the array
  for ( var i = 0; i < num; i++ ) {

    // Y is constant for each so can be calculated once
    y[i] = gap * ( i + 1 );
    speed[i] = random( 10 );
    phase[i] = random( TWO_PI );
  }
}

function draw() {

  background( red, green, blue );

  for ( var i = 0; i < num; i++ ) {

    // Calculate the x-position of each ball based on the speed, phase and
    // current frame
    x = width / 2 + sin( radians( frameCount * speed[i] ) + phase[i] ) * 200;
    ellipse( y[i], x, 100, 100 );
  }
}

// Change the background colour if the mouse is dragged
function mouseDragged() {

  red = map( mouseX, 0, width, 0, 255 );
  green = map( mouseY, 0, height, 0, 255 );
  blue = map( mouseX + mouseY, 0, width + height, 255, 0 );
}