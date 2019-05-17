function Branch(begin, end, iteration, hue){

	this.begin = begin;
	this.end = end;
	this.finished = false;
	this.iteration = iteration;
	this.hue = hue;

	//Calculate lenght
	var combine = p5.Vector.sub(this.end, this.begin);
	this.lenght = combine.mag();

	//normalize lenght
	this.lenght = height/this.lenght;

	//generate weight values
	if(this.lenght == 4){
		this.weight = 40;
	}else if(this.lenght <50){
		this.weight = map(this.lenght, 4, 50, 20, 2);
	}else {
		this.weight = 1;
	}

	//generate random HSB values
	colorMode(HSB);
	//scale hue randomness
	var hueRand;
	if (this.lenght < 20) {
	hueRand = map(this.lenght, 4, 20, 30, 0);
	} else {
		hueRand = 3;
	}

	this.hue = this.hue + random(-hueRand, hueRand);
	if(this.lenght > 200){
		this.colorS = 80;
		this.colorB = 100;
		this.opacity = .3;
	} else{
		this.colorS = map(this.lenght, 4, 200, 60, 70);
		this.colorB = map(this.lenght, 20, 200, 10, 100);
		this.opacity = map(this.lenght, 4, 200, 1, 0.1);
	}

	this.color = color(this.hue, this.colorS, this.colorB, this.opacity);



	this.wind = function() {
	}


	this.show = function(){

		stroke(this.color);
		strokeWeight(this.weight);
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	}


	this.branch = function(iteration) {
		var branches = [];

		//number of new branches
		var n = floor(random(4, 2));
		var newEnd;

		//if first generation add 5 branches
		if(this.iteration == 0){
			n = 7;
		}
		for (var i = 0; i < n; i++) {
			newEnd = 0;
			var dir = 0;
			var angle = 0;

			//random angle and scale
			var plusOrMinus = Math.round(Math.random()) * 2 - 1;
			angle = random(PI/4, -PI/4);
			dir = p5.Vector.sub(this.end, this.begin);
			dir.mult(random(.5, .8));
			dir.rotate(angle);
			newEnd = p5.Vector.add(this.end, dir);
			branches[i] = new Branch(this.end, newEnd, iteration, this.hue);
		}
		return branches;
	}
}
