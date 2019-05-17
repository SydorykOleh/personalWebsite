var stars = [];
var speed;
var size;
var moveX;
var moveY;

function setup() {
  createCanvas(windowWidth, windowHeight, P2D);  

  speed = windowWidth/70;
  
  for (var i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }
}

function draw() {
  //Add movement using mouse position
  if (mouseX<width && mouseY<height){
    moveX = map(mouseX, 0, width, width/10, -width/10);
    moveY = map(mouseY, 0, height, height/10, -height/10)
  }
  translate(moveX, moveY);
  //Draw stars
  background(40);
  translate(width / 2, height / 2);  
  for (var i = 0; i < stars.length; i++) {
    stars[i].move();
    stars[i].display();
  }
}
