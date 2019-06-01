var tree = [];
var iteration = 0;

function setup() {
	var canvas = createCanvas(690, 690);
	canvas.parent('sketch-holder');
	var a = createVector(width / 2, height);
	var b = createVector(width / 2 , height - (height/4));
	var root = new Branch(a, b, iteration, random(20, 120));
	tree[0] = root;
	colorMode(RGB);
	background(37,37,45);
}

function draw(){
	for (var j = 0; j < 1; j++){
		for (var i = tree.length - 1; i >= 0; i--) {
		    if ((!tree[i].finished) && (tree[i].lenght < 170)) {
			    tree = tree.concat(tree[i].branch(iteration));
			    tree[i].finished = true;
				tree[i].show();
			}

		}
		iteration ++;
	}
	if (iteration > 15) {
		noLoop();
	}
}