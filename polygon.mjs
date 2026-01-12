import {Shape2D} from "./shape2D.mjs";

//Polygon class implementation
export class RegularPolygon extends Shape2D{
  numSides;
  sideLength;

  getParameters(){
    return {
      shapeType: "polygon",
      numSides: this.numSides,
      sideLength: this.sideLength,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Polygon:<br>"+ JSON.stringify({
      numSides: this.numSides,
      sideLength: this.sideLength,
      area: this.area,
      perimeter: this.perimeter,
    }) + "</div>";
  }
  constructor(options){
    super(options);
    this.numSides = options.numSides
    this.sideLength = options.sideLength
  }
}