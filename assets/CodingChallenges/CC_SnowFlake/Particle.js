class Particle {

	constructor(radius, angle, Xmax,Ymax,Ymin){
		this.pos = p5.Vector.fromAngle(angle);
		this.pos.mult(radius*1);
		this.scale = 10;
		this.r = this.scale/4;
		this.lengthX = random(-this.scale/2,this.scale/2);
		this.lengthY = random(-this.scale/2,this.scale/2);
		this.dir  = createVector(0,0);

		//randomize starting pos
		this.pos.rotate(random(0, -PI/6));

		//set direction
		this.dir.add(this.pos);
		this.dir.mult(-0.005);


		//randomization paramenters
		this.randomXmax = Xmax;
		this.randomYmin = Ymin;
		this.randomYmax = Ymax;

	}	

	update (){
		//add movement to position
		this.pos.add(this.dir);
		this.pos.add(random(this.randomXmax, 0),random(this.randomYmin, this.randomYmax));

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

		/*
		stroke(128, 195, 255, 3);
		strokeWeight(20);
		line(this.pos.x, this.pos.y, this.pos.x+this.lengthX*5, this.pos.y+this.lengthY*3);
		
		stroke(128, 195, 255, 6);
		strokeWeight(5);
		line(this.pos.x, this.pos.y, this.pos.x+this.lengthX*2, this.pos.y+this.lengthY*2);
			*/
		stroke(60, 150, 200, 12);
		strokeWeight(3);
		line(this.pos.x, this.pos.y, this.pos.x+this.lengthX, this.pos.y+this.lengthY);
		

		stroke(215, 235, 255, 40);
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