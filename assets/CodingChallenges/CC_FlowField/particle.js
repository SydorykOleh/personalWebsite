function Particle() {
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	this.maxspeedUP = 1;
	this.maxspeedDown = 2;
	this.maxspeed = random(this.maxspeedDown, this.maxspeedUP);

	this.followA = random(1/5, 1/20);

	this.hue = hue + random(100, 0);
	this.S = random(30, 80);
	this.B = random(50,100);
	this.A = random(.01, .05);
	this.prevPos = this.pos.copy();

	this.update = function() {
		this.vel.add(this.acc);
		this.vel.limit(this.maxspeed);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	this.follow = function(vectors) {
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		var index = x + (y * cols);
		var force = vectors[index];
		
		force.add(vectors[x + 1 + ((y + 1) * cols)]);
		force.add(vectors[x + 1 + ((y + 0) * cols)]);
		force.add(vectors[x + 1 + ((y - 1) * cols)]);
		force.add(vectors[x + 0 + ((y + 1) * cols)]);
		force.add(vectors[x + 0 + ((y - 1) * cols)]);
		force.add(vectors[x - 1 + ((y + 1) * cols)]);
		force.add(vectors[x - 1 + ((y + 0) * cols)]);
		force.add(vectors[x - 1 + ((y - 1) * cols)]);
		force.mult(this.followA);
		
		this.applyForce(force);
	}


	this.applyForce = function(force) {
		this.acc.add(force);
	}

	this.show = function() {
		stroke(this.hue, this.S, this.B, this.A);
		strokeWeight(1);
		line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
		this.updatePrev();
	}

	this.updatePrev = function() {
		this.prevPos.x = this.pos.x;
		this.prevPos.y = this.pos.y;
	}
	this.edges = function() {
		if (this.pos.x > width) {
			this.pos.x = random(0, this.maxspeed);
			this.updatePrev();
		}
		if (this.pos.x < 0) {
			this.pos.x = random(width, width - this.maxspeed);
			this.updatePrev();
		}
		if (this.pos.y > height) {
			this.pos.y = random(0, this.maxspeed);
			this.updatePrev();
		}
		if (this.pos.y < 0) {
			this.pos.y = (height, height - this.maxspeed);
			this.updatePrev();
		}
	}
}