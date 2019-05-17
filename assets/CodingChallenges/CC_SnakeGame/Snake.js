function Snake(){

  this.x = (floor(random(cols)))*scl;
  this.y = (floor(random(rows)))*scl;
  this.xspeed = 0;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.restart = function(){
    this.x = (floor(random(cols)))*scl;
    this.y = (floor(random(rows)))*scl;
    this.total = 0;  
    this.tail = [];    
    pickLocation();    
    this.xspeed = 0;
    this.yspeed = 0;
    maxScore = currentScore;
    currentScore = 0;

  }

  this.eat = function(pos){
    var d = dist(this.x, this.y, pos.x, pos.y);
    if(d < 1){
      this.total++;
      currentScore++;
      return true;
    } else {
      return false;
    }
  }

  this.dir = function(x_, y_){
    this.xspeed = x_;
    this.yspeed = y_;
  }

  this.death = function(){
    for(var i = 0; i < this.tail.length; i++){
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y)
      if(d < 1){
        deadScreen();
      }
    }
  }

  this.move = function(){
    for(var i = 0; i < this.tail.length-1; i++){
      this.tail[i] = this.tail[i+1]; 
    }
    if(this.total >= 1){
      this.tail[this.total - 1] = createVector(this.x, this.y);
    }

    this.x = this.x + this.xspeed*scl;
    this.y = this.y + this.yspeed*scl;

    if(this.x > (cols-1)*scl){
      this.x = 0;
    } else if(this.x < 0){
      this.x = (cols-1)*scl;
    } else if(this.y > (rows-1)*scl){
      this.y = 0;
    } else if(this.y < 0){
      this.y = (rows-1)*scl;
    }
    
    

  }

 this.show = function(){
   for(var i = 0; i < this.tail.length; i++){
    fill(random(64,84),random(235,255),random(235,255));
    rect(this.tail[i].x, this.tail[i].y, scl-1, scl-1);
   }
   fill(64, 255, 255);
   rect(this.x+1, this.y+1, scl-1, scl-1);

 }
}
