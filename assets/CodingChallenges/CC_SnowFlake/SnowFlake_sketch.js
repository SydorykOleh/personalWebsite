var current;
var snowflakes = [];
var count;
var whileCount;


function setup() {  
  createCanvas(windowWidth, windowHeight);
  current = new Particle(width/2, 0);
  count = 0;
}

function draw() {
	background(50);

	//add TEXT
	fill(200, 80, 20);
	textSize(width/40);
	textAlign(LEFT);
	textFont("monospace");
	text("PARTICLES COUNT: " + count, width*0.05, height*0.05);


	translate(width/2,height/2);
	rotate(-PI/6);	
	
	whileCount = 0
	while(whileCount < 10){
		while (!current.finished() && !current.intersects(snowflakes)){
			current.update();
	  	}
	  	whileCount++
	  	//snowflakes.unshift(current);
	  	append(snowflakes, current);
		current = new Particle(width/2, 0);
		count++;
		}
	
	if (count >= 2500) {
	  noLoop();
	  console.log(count);
	}
	
	for(var i = 0; i < 6; i++){
		rotate(PI/3);
		//current.show();
		for(var j = 0; j < snowflakes.length; j++){
			snowflakes[j].show();
		}
		push();
		scale(1,-1);
		for(var j = 0; j < snowflakes.length; j++){
			snowflakes[j].show();
		}
		pop();	
	}
}