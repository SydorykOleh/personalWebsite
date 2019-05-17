var grid;
var scl = 9;
var cols, rows;
var inc = 0.015;
simplex = new SimplexNoise();
var angle;
var offZ = 0;
var particles = [];
var flowfield;


var rLow;
var rHigh;
var gLow;
var gHigh;
var bLow;
var bHigh;

var rotation = 0.9;

function setup() {	
	rLow  = random(0  , 128);
	rHigh = random(128, 255);
	gLow  = random(0  , 128);
	gHigh = random(128, 255);
	bLow  = random(0  , 128);
	bHigh = random(128, 255);

	cols = 100;
	rows = cols;
	createCanvas(rows*scl, cols*scl, P2D);
	background(0);

	flowfield = new Array(rows * cols);

	for(var i = 0; i < 1000; i++){
		particles[i] = new Particle();
	}
}

function draw() {

	//rotation = rotation * 0.995;
	push();
	scale(1);

	var offY = 0;
	//Create Simplex 3D Noise values
	for (var x = 0; x < rows; x++){
		var offX = 0;
		for (var y = 0; y < cols; y++){		
			var index = x + (y * cols);
			angle = (simplex.noise3D(offX, offY, offZ) * TWO_PI*2);
			var v = p5.Vector.fromAngle(angle);		
			v.setMag(0.5);	
			flowfield[index] = v;
			offX += inc;

			//Draw vector lines
			/*
			stroke(200, 80, 40, 255);
			strokeWeight(1);
			push();
			translate(x * scl, y * scl);
			rotate(v.heading());
			line(0, 0, scl, 0);
			pop();
			//noLoop();
			*/
		}
		offY += inc;
	}
	for (var i = 0; i < particles.length; i++) {	
		
		//Draw particles
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].show();		
		particles[i].edges();
		
	}
	offZ+= inc/50;
	pop();

}
