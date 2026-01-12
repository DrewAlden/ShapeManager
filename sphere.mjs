import {Shape3D} from "./shape3D.mjs";

//Sphere class implementation
export class Sphere extends Shape3D{ 
  radius;

  getParameters(){
    return {
      shapeType: "sphere",
      radius: this.radius,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Sphere:<br>"+ JSON.stringify({
      radius: this.radius,
      volume: this.volume,
      surfaceArea: this.surfaceArea,
    }) + "</div>";
  }
  constructor(options){
    super(options);
    this.radius = options.radius
  }
}