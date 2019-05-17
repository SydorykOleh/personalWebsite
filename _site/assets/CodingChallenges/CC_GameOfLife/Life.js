function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var gridSize = 25;
var rows;
var cols;
var grid;

function setup(){
  createCanvas(windowWidth,windowHeight);

  rows = floor(width/gridSize);
  cols = floor(height/gridSize);


  //Create 2D array
  grid = make2DArray(cols, rows);

  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){    
      grid[i][j] = floor(random(2));
    }
  }


function draw(){

  frameRate(10);


  //draw grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let y = i * gridSize;
      let x = j * gridSize;
      if (grid[i][j] == 1) {
        fill(200, 80, 20);
        stroke(60);
        rect(x, y, gridSize, gridSize);
      } else {
        fill(40, 40, 40);
        stroke(60);
        rect(x, y, gridSize, gridSize);
      }
    }
  }

  let next = make2DArray(cols, rows);

  //Compute cells
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){

      let state = grid[i][j];

      let neighbors = countNeighbors(grid, i, j);    
      if(state == 0 && neighbors == 3 ){
        next[i][j] = 1;
      } else if(state == 1 && (neighbors < 2 || neighbors > 3)){
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}