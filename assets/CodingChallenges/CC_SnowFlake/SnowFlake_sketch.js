var current;
var snowflakes = [];
var count;
var whileCount;

var randomYmin;
var randomYmax;
var randomXmax;

function setup() {  

	randomYmin = random(-.5, -2);
	randomYmax = random(.5, 2);
	randomXmax = random(-0.5, -2);
	var canvas = createCanvas(690, 690);
	canvas.parent('sketch-holder');
	current = new Particle(width/2, 0, randomXmax, randomYmax, randomYmin);
	count = 0;
	background(37, 37, 45);
	frameRate(20);
}

function draw() {


	//add TEXT
	fill(200, 80, 20);
	textSize(width/40);
	textAlign(LEFT);
	textFont("monospace");
	//text("PARTICLES COUNT: " + count, width*0.05, height*0.05);


	translate(width/2,height/2);
	
	
	whileCount = 0
	while(whileCount < 10){
		while (!current.finished() && !current.intersects(snowflakes)){
			current.update();
	  	}
		for(var i = 0; i < 42; i++){
			rotate(PI/3);
			current.show();
			push();
			scale(1,-1);
			current.show();
			pop();	
		}
		append(snowflakes, current);
		current = new Particle(width/2, 0, randomXmax, randomYmax, randomYmin);


	  	whileCount++

		count++;
	}
	if(count >= 1500){
		noLoop();
	}
}