function Star() {

  //Create random vars
  this.bornX = width/2;
  this.bornY = height/2;
  this.x = random(-this.bornX, this.bornX);
  this.y = random(-this.bornY, this.bornY);
  this.z = random(width);
  this.colorValue = (random(50, 255));
  this.color = color(random(0.8, 1)*this.colorValue,random(0.8, 1)*this.colorValue,random(0.8, 1)*this.colorValue);
  this.radius = random(1,5);


  //Store Z value for future
  this.pz = this.z;

  this.move = function() {
    this.z = this.z - speed;

    //Check if Z is out of bound, if true then reset vars
    if (this.z < 1 ) {
      this.z = width;
      this.x = random(-this.bornX, this.bornX);
      this.y = random(-this.bornY, this.bornY);
      this.pz = this.z;
    }
  }

  this.display = function() {

    //Calculate star new position
    var nx = map(this.x / this.z, 0, 1, 0, width);
    var ny = map(this.y / this.z, 0, 1, 0, height);
    var r = map(this.z, 0, width, this.radius, 0);

    //Draw star
    fill(this.color);
    noStroke();
    ellipse(nx, ny, r, r);

    //Calculate previous x,y position for line
    var px = map(this.x / this.pz, 0, 1, 0, width);
    var py = map(this.y / this.pz, 0, 1, 0, height);

    //Draw Line
    stroke(this.color);
    strokeWeight(r);
    line(nx, ny, px, py);

    //Reset previous Z value
    this.pz = this.z
  }
}
