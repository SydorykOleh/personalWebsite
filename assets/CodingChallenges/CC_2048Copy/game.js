
var cols = 4;
var rows = 4;
var scl  = 150;

let cells = [];

var BGColor;
var CellColor;
var CellBGColor;
var GridColor;

function setup(){
	var canvas = createCanvas(690, 690);
	canvas.parent('sketch-holder');

	BGColor = color(37,37,45);
	GridColor = color(80);
	CellColor = color(220, 190, 160);
	CellBGColor = color(100);


	//Create empty cells 2d array
	for (var i = 0; i < cols; i++) {
		cells[i] = [];
		for (var j = 0; j < rows; j++){
			cells[i][j] = new Cell(i, j);
		}
	}

}

function draw(){
	translate(width/2 - cols/2 * scl , height/2 - rows/2 * scl);
	background(BGColor);

	//Draw grid background
	fill(GridColor);
	noStroke();
	rect(-scl/20, -scl/20, scl * (rows + 2/20), scl * (cols + 2/20), scl/40);

	//draw GRID
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			cells[i][j].drawGRID();	
		}
	}
	//draw Cells
	for (var i = 0; i < cols; i++){
		for (var j = 0; j < rows; j++){
			cells[i][j].draw();	
		}
	}
	noLoop();
}

function Cell(x_, y_){

	this.x = x_;
	this.y = y_;
	this.value = floor(random(10));



	this.drawGRID = function() {
		//Draw grid
		fill(CellBGColor);
		strokeWeight(0);
		rect((this.x + 0.05) * scl, (this.y + 0.05) * scl, scl * 0.9, scl * 0.9, scl/40);
	}

	this.draw = function() {
		//Draw Cells
		if(this.value > 0){
			//Draw Cell
			if (this.value == 1){
				fill(238, 228, 218);
			}else if (this.value == 2){
				fill(236, 224, 200);
			}else if (this.value == 3){
				fill(242, 177, 121);
			}else if (this.value == 4){
				fill(245, 150, 100);
			}else if (this.value == 5){
				fill(250, 124, 95);
			}else if (this.value == 6){
				fill(246, 93, 59);
			}else if (this.value == 7){
				fill(240, 230, 220);
			}else if (this.value == 8){
				fill(240, 230, 220);
			}else if (this.value == 9){
				fill(240, 230, 220);
			}
			strokeWeight(0);
			rect((this.x + 0.05) * scl, (this.y + 0.05) * scl, scl * 0.9, scl * 0.9, scl/40);

			//Draw numbers  
			strokeWeight(0);
			textFont("monospace");
			textAlign(CENTER, CENTER);
			textStyle(BOLD);
			textSize(scl/2);
			fill(GridColor);
			//if(this.value >= 3){
			//	fill(240);
			//}
			text(pow(2, this.value), (this.x + 0.5) * scl, (this.y + 0.55) * scl);
		}
	}
}