var tree = [];
var iteration = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	var a = createVector(width / 2, height);
	var b = createVector(width / 2 , height - (height/4));
	var root = new Branch(a, b, iteration, random(20, 120));
	tree[0] = root;
}

function draw(){
	background(20);
	for (var j = 0; j < 10; j++){
		for (var i = tree.length - 1; i >= 0; i--) {
		    if ((!tree[i].finished) && (tree[i].lenght < 180)) {
			    tree = tree.concat(tree[i].branch(iteration));
			}
	    tree[i].finished = true;
		}
		iteration ++;
	}
	for (var i = 0; i < tree.length; i++) {
		tree[i].show();
	}
}