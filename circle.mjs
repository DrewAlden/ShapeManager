import {Shape2D} from "./shape2D.mjs";

//Circle class implementation
export class Circle extends Shape2D{
  radius;

  getParameters(){
    return {
      shapeType: "circle",
      radius: this.radius,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Circle:<br>"+ JSON.stringify({
      radius: this.radius,
      area: this.area,
      perimeter: this.perimeter,
    }) + "</div>";
  }
  constructor(options){
    super(options);
    this.radius = options.radius
  }
}