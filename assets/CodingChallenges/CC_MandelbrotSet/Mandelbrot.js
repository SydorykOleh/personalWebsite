var nMaxstart = 100;
var nMax;
var nMaxEnd = 1000;

var posX = 0.3369844464873;
var posY = 0.2;

var posEndX = 0.3369844464873;
var posEndY = 0.0487782196791

var scl = 1;
var sclEnd = 1/4.2E-12;

var steps = 0;
var stepsStart = 20;

var count = 0;

function setup() {
	var canvas = createCanvas(690, 690);
	canvas.parent('sketch-holder');
	pixelDensity(1);
}

function draw() {
	loadPixels();
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {

			var a = map(x, 0, width, posX - scl, posX + scl); 
			var b = map(y, 0, height, posY - scl, posY + scl); 

			var ca = a;
			var cb = b;

			var n = 0;


			while(n < nMax) {
				var aa = a * a - b * b;
				var bb = 2 * a * b;
				a = aa + ca;
				b = bb + cb;
				if(abs(a + b) > 2) {
					break;
				}
				n++;
			}
			var bright = map(n, 0, nMax, 255, 0); 
			if (n === nMax) {
				bright = 0;
			}
			var pix = (x + y * width) * 4;
			pixels[pix + 0] = bright;
			pixels[pix + 1] = bright;
			pixels[pix + 2] = bright;
			pixels[pix + 3] = 255;
		}
	}
	updatePixels();
	steps = (10000 / (count * count * count + 1)) + stepsStart;

	posX = posX + (posEndX - posX) / steps;
	posY = posY + (posEndY - posY) / steps;
	scl = scl + ((1 / sclEnd) - scl) / steps;
	//nMax = nMax + (nMaxEnd - nMax) / steps;
	nMax = nMaxstart + (1/-(Math.log(sclEnd) / Math.log(scl))) * nMaxEnd;
	count ++;
}