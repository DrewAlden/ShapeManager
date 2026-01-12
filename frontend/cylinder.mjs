import {Shape3D} from "./shape3D.mjs";

//Cylinder class implementation
export class Cylinder extends Shape3D{
  radius;
  height;

  getParameters(){
    return {
      shapeType: "cylinder",
      radius: this.radius,
      height: this.height,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Cylinder:<br>"+ JSON.stringify({
      radius: this.radius,
      height: this.height,
      volume: this.volume,
      surfaceArea: this.surfaceArea,
    }) + "</div>";
  }
  constructor(options){
    super(options);
    this.radius = options.radius
    this.height = options.height
  }
}