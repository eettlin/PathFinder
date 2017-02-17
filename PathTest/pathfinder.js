'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var pf;   // the global path finder object
const TWO_PI = 6.28318530718;
const FRAME_RATE=30;

function setup() {
  pf = new PathFinder();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
  pf.run();
  window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}


class PathFinder{

  constructor(){
    this.isRunning = true;
    this.mouseX = 0;
    this.mouseY = 0;
    this.w = 50;
    // get and validate canvas and context
    this.canvas = document.getElementById('canvas');
    if (!this.canvas || !this.canvas.getContext)
    throw "No valid canvas found!";
    this.context = this.canvas.getContext("2d");
    if(!this.context)
    throw "No valid context found!";

    this.grid = [];
    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);

    // init class methods
    this.init();

  }

  init(){
    this.loadGrid();

    //  add listeners
    this.canvas.addEventListener('mousedown',function(evt){
      pf.mouseX = evt.offsetX;
      pf.mouseY = evt.offsetY;
      let row = Math.floor(pf.mouseY/pf.w);
      let col = Math.floor(pf.mouseX/pf.w);
      if(pf.grid[col][row].color === "pink"){
        pf.grid[col][row].color = "black";
        pf.occupied = true;
      } else if(pf.grid[col][row].color === "black"){
        pf.grid[col][row].color = "pink";
        pf.occupied = false;
      }


    }, false );

    this.canvas.addEventListener('mousemove',function(evt){
      pf.mouseX = evt.offsetX;
      pf.mouseY = evt.offsetY;
    }, false );
  }

  run(){
    this.render();
  }

  render(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(let i = 0; i < this.cols; i++){
      for(let j = 0; j < this.rows; j++){
        this.grid[i][j].render();
      }
    }

  }

  loadGrid(){

    for(let i = 0; i < this.cols; i++){
      this.grid[i] = [];
      for(let j = 0; j < this.rows; j++){
        this.grid[i].push(new Cell(new MyVector((i*this.w), (j*this.w))));
      }
    }


  }

}
