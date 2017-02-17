
class Cell{
  constructor(loc){
    this.loc = new MyVector(loc.x, loc.y);
    this.occupied = false;
    this.color = 'pink';
    this.occupied = false;
  }

  render(){
    pf.context.strokeStyle = 'white';
    pf.context.strokeRect(this.loc.x, this.loc.y, pf.w, pf.w);
    pf.context.fillStyle = this.color;
    pf.context.fillRect(this.loc.x, this.loc.y, pf.w, pf.w);
  }
}
