import {Shape3D} from "./shape3D.mjs";

//Pyramid class implementation
//The pyramid must have a regular polygon as its base
export class Pyramid extends Shape3D{
  baseSideLength;
  baseSideNum;
  height;
  
  getParameters(){
    return {
      shapeType: "pyramid",
      baseSideLength: this.baseSideLength,
      baseSideNum: this.baseSideNum,
      height: this.height,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Pyramid:<br>"+ JSON.stringify({
      baseSideLength: this.baseSideLength,
      baseSideNum: this.baseSideNum,
      height: this.height,
      volume: this.volume,
      surfaceArea: this.surfaceArea,
    }) + "</div>";
  }
  constructor(options){
    super(options);
    this.baseSideLength = options.baseSideLength
    this.baseSideNum = options.baseSideNum
    this.height = options.height
  }
}