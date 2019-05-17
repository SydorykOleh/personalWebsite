class Particle {

	constructor(radius, angle){
		this.pos = p5.Vector.fromAngle(angle);
		this.pos.mult(radius*1);
		this.scale = 20;
		this.r = this.scale/4;
		this.lengthX = random(-this.scale/2,this.scale/2);
		this.lengthY = random(-this.scale/2,this.scale/2);
		this.dir  = createVector(0,0);

		//randomize starting pos
		this.pos.rotate(random(-PI/6, 0));

		//set direction
		this.dir.add(this.pos);
		this.dir.mult(-0.005);


	}	

	update (){
		//add movement to position
		this.pos.add(this.dir);
		this.pos.add(random(-1,0),random(-1,1));

		//convert position vector to angle and magnitude
		var angle = this.pos.heading();
		var magnitude = this.pos.mag();

		//constrain pos of flake using angle
		angle = constrain(angle, -PI/6, 0);

		//convert back to position
		this.pos = p5.Vector.fromAngle(angle);
		this.pos.setMag(magnitude);
	}

	show (){
		//Draw line

		stroke(128, 195, 255, 3);
		strokeWeight(20);
		line(this.pos.x, this.pos.y, this.pos.x+this.lengthX*5, this.pos.y+this.lengthY*3);

		stroke(128, 195, 255, 6);
		strokeWeight(10);
		line(this.pos.x, this.pos.y, this.pos.x+this.lengthX*2, this.pos.y+this.lengthY*2);

		stroke(215, 235, 255, 12);
		strokeWeight(3);
		line(this.pos.x, this.pos.y, this.pos.x+this.lengthX, this.pos.y+this.lengthY);
		

		stroke(215, 235, 255, 50);
		strokeWeight(1);
		line(this.pos.x, this.pos.y, this.pos.x+(this.lengthX/2), this.pos.y+(this.lengthY/2));


		//noStroke();
	}


  intersects(snowflake) {
    let result = false;   
    for (let s of snowflake) {
      let d = dist(s.pos.x, s.pos.y, this.pos.x, this.pos.y); 
      if (d < this.r) {
        result = true;
        break;
      }
    }
    return result;
  }


	finished() {
    	return (this.pos.x < 1);
	}
}