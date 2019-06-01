var scl;
var s;
var cols;
var rows;
var food;
var currentScore = 0;
var maxScore = 0;
var speed;
let orange;
var translateGrid;



function setup() {
  cols = 50;
  rows = floor(windowHeight/windowWidth*(cols));
  scl = floor(windowWidth/(cols));
  createCanvas(windowWidth, windowHeight-1);
  s = new Snake();
  pickLocation();
  orange = color(200, 80, 20);
  s.dir(0, 0);
  translateGrid = createVector((windowWidth-(cols*scl))/2,(windowHeight-(rows*scl))/2);
}

function draw() {
  background(40);
  translate(translateGrid.x, translateGrid.y);

  //Draw lines
  for(var i = 0; i < cols+1; i++){
    for(var j = 0; j < rows+1; j++){
      stroke(60, 60, 60);
      line(i*scl, 0, i*scl, height);
      line(0, j*scl, width, j*scl);
    }
  }
  //Draw edges
  fill(40);
  noStroke();
  rect(cols*scl+1, -1, scl*2, (rows+1)*scl);
  rect(0, rows*scl+1, (cols+1)*scl, scl*5);
  if(s.eat(food)){
    pickLocation();
  }
  speed = 10.0 + 0.5*s.tail.length;
  speed = constrain(speed, 10, 20);
  frameRate(speed);
  s.move();  
  s.death();
  s.show();
  speedInfo();
  showFood();
  score();  
  if(s.xspeed == 0 && s.yspeed == 0){
    startScreen();
  }
}

function pickLocation(){
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function keyTyped(){
  if (key == 'a' && s.xspeed == 0){
    s.dir(-1, 0); 
  } else if(key == 'd' && s.xspeed == 0){
    s.dir(1, 0);
  } else if(key === 'w' && s.yspeed == 0){
    s.dir(0, -1);
  } else if(key === 's' && s.yspeed == 0){
    s.dir(0, 1);
  }
}

function keyPressed(){
  if(keyCode == ENTER){
    loop();
    s.restart();
  }
}


function showFood(){
  fill(255, 64, 64);
  rect(food.x + 1, food.y + 1, scl-1, scl-1);
}

function startScreen(){
  fill(orange);
  textSize(scl*PI);
  textAlign(CENTER);
  textFont("monospace");
  text("WELCOME", (cols/2)*scl, rows/2*scl);
  textSize(scl*HALF_PI);
  text("TO START USE WASD", cols/2*scl, (rows/2+2)*scl);
}


function score(){
  fill(orange);
  textSize(scl*HALF_PI);
  textAlign(LEFT);
  textFont("monospace");
  text("CURRENT SCORE: " + currentScore, scl, scl*2)
  text("    HIGHSCORE: " + maxScore, scl, scl*4)
}
function speedInfo(){
  fill(orange);
  textSize(scl*HALF_PI);
  textAlign(RIGHT);
  textFont("monospace");
  text("SPEED:" + speed, (cols-1)*scl, scl*2)
}

function deadScreen(){
  fill(orange);
  noLoop();
  textSize(scl*PI);
  textAlign(CENTER);
  text("GAME OVER", (cols/2)*scl, rows/2*scl);
  textSize(scl*HALF_PI);
  text("TO RESTART PRESS ENTER", cols/2*scl, (rows/2+2)*scl);
}

