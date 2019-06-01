var cols, rows;
var scl = 250;

var w;
var h;

var terrain = [];
var flying = 0;
var off = 0.1;

simplex = new SimplexNoise();

function setup() {
	var canvas = createCanvas(690, 690, WEBGL);
	canvas.parent('sketch-holder');
	w = windowWidth * 1.5;
	h = windowHeight * 4;

	cols = floor(w / scl);
	rows = floor(h / scl);

	for (var x = 0; x < cols; x++) {
    	terrain[x] = [];
    	for (var y = 0; y < rows; y++) {
    		terrain[x][y] = 0;
    	}
  	}
}

function draw(){

	flying -= 0.03;
	var yoff = flying;
  	for (var y = 0; y < rows; y++) {
    	var xoff = 0;
    	for (var x = 0; x < cols; x++) {
      		terrain[x][y] = simplex.noise2D(xoff, yoff) * 50 ;
      		xoff += 0.2;
    	}
    	yoff += 0.2;
  	}

	background(37,37,45);
	rotateX(PI/3);
  	translate(-w/2, -h * .8);  

  	beginShape(LINES);
	for (var x = 0; x < cols - 2; x++) {
		stroke(200, 80, 20);
		strokeWeight(2);
		noFill();
		vertex(x * scl, 0, terrain[x][0]);
		vertex((x + 1) * scl, 0, terrain[x + 1][0]);
	}
	endShape();

	for (var y = 0; y < rows; y++){	
		beginShape(QUAD_STRIP);
		for (var x = 0; x < cols - 1; x++) {
			stroke(200, 80, 20,);
			noFill();
			vertex((x + 0) * scl, (y + 0) * scl, terrain[x + 0][y + 0]);
			vertex((x + 0) * scl, (y + 1) * scl, terrain[x + 0][y + 1]);
			vertex((x + 1) * scl, (y + 1) * scl, terrain[x + 1][y + 1]);
			vertex((x + 1) * scl, (y + 0) * scl, terrain[x + 1][y + 0]);
		}
		endShape();
	}
}