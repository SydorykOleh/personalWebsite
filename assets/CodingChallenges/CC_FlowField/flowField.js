var grid;
var scl = 10;
var cols, rows;
var inc = 0.0015;
simplex = new SimplexNoise();
var angle;
var offZ = 0;
var particles = [];
var flowfield;


var hue;

var rotation = 0.9;

function setup() {	
	hue  = random(100, 740);
	cols = floor(690/scl);
	rows = cols;
	var canvas = createCanvas(690, 690);
	canvas.parent('sketch-holder');
	colorMode(RGB);
	background(37, 37, 45);
	randY = random(0, 100);
	randX = random(0, 100);

	flowfield = new Array(rows * cols);

	for(var i = 0; i < 3000; i++){
		particles[i] = new Particle();
	}
}

function draw() {
	noStroke();
	fill(37, 37, 45);

	colorMode(HSB);
	//rect(0,0, width, height);
	//rotation = rotation * 0.995;
	push();
	scale(1);

	var s;
	var t;
	var dx;
	var dy;

	var nx;
	var ny;
	var nz;
	var nw;

	var x1 = 1;
	var x2 = 3;
	var y1 = 1;
	var y2 = 3;

	//Create Simplex 3D Noise values
	for (var x = 0; x < rows; x++){
		for (var y = 0; y < cols; y++){		
			var index = x + (y * cols);

			s = x / rows;
	        t = y / cols;
	        dx = x2 - x1;
	        dy = y2 - y1;

	        nx = x1 + cos(s*2*PI)*dx/(2*PI);
	        ny = y1 + cos(t*2*PI)*dy/(2*PI);
	        nz = x1 + sin(s*2*PI)*dx/(2*PI);
	        nw = y1 + sin(t*2*PI)*dy/(2*PI);


			angle = (simplex.noise3D(nz + randX, nw + randY, offZ) * TWO_PI * 2);
			var v = p5.Vector.fromAngle(angle);	
			v.setMag(1);	
			flowfield[index] = v;



			//Draw vector lines
			/*
			stroke(200, 80, 40);
			strokeWeight(1);
			push();
			translate(x * scl, y * scl);
			rotate(v.heading());
			line(0, 0, scl, 0);
			pop();
			//noLoop();
			*/
			
		}
	}
	
	for (var i = 0; i < particles.length; i++) {	
		
		//Draw particles
		particles[i].follow(flowfield);
		particles[i].update();
		particles[i].show();		
		particles[i].edges();
		
	}	
	
	offZ += inc;
	pop();

}
