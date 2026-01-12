import {Shape3D} from "./shape3D.mjs";

//Box class implementation
export class Box extends Shape3D{
  length;
  width;
  height;

  getParameters(){
    return {
      shapeType: "box",
      length: this.length,
      width: this.width,
      height: this.height,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Box:<br>"+ JSON.stringify({
      length: this.length,
      width: this.width,
      height: this.height,
      volume: this.volume,
      surfaceArea: this.surfaceArea,
    }) + "</div>";
  }
  constructor(options){
    super(options);
    this.length = options.length
    this.width = options.width
    this.height = options.height
  }
}