import {Shape2D} from "./shape2D.mjs";

//Rectangle class implementation
export class Rectangle extends Shape2D{
  length;
  width;

  getParameters(){
    return {
      shapeType: "rectangle",
      length: this.length,
      width: this.width,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Rectangle:<br>"+ JSON.stringify({
      length: this.length,
      width: this.width,
      area: this.area,
      perimeter: this.perimeter,
    }) + "</div>";
  }
  constructor(options){
    super(options);
    this.length = options.length;
    this.width = options.width;
  }
}