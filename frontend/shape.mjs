/* 
Author:     Drew Alden
Filename:   shapes.js
Purpose:    Provides a shape class which will be divided into
            2d and 3d shapes. Calls to the backend is on port 3000
            for all area, perimeter, surface area, and volume
            calculations in children.

            If a shape is made incorrectly, a validation function
            ensures each field is greater than its minimum value
            before creation and prints an error to the user.
*/


/*
Handles all shape creation. Dynamically creates shapes depending
on the shapeType in the options json sent in.

Imports modules dynamically to avoid circular imports

If a shape can't be created of that type, returns null and
alerts the user.
*/
export async function createShape(options){

  //Checks to make sure the backend can be contacted before trying to make the shape
  let response = await fetch('http://localhost:3000'+'/');
  if (!response.ok){
    alert("Problem contacting the backend");
    return null;
  }
  switch (options.shapeType){
    case "rectangle":
      if (options.length > 0 && options.width > 0){
        const { Rectangle } = await import("./rectangle.mjs");
        return new Rectangle(options);
      }
      break;
    case "circle":
      if (options.radius > 0){
        const { Circle } = await import("./circle.mjs");
        return new Circle(options);
      }
      break;
    case "polygon":
      // Plus sign is used to convert linput string to a number for integer validation
      if (options.numSides > 2 && Number.isInteger(+options.numSides) && options.sideLength > 0){
        const { RegularPolygon } = await import("./polygon.mjs");
        return new RegularPolygon(options);
      }
      break;
    case "box":
      if (options.length > 0 && options.width > 0 && options.height > 0){
        const { Box } = await import("./box.mjs");
        return new Box(options);
      }
      break;
    case "sphere":
      if (options.radius > 0){
        const { Sphere } = await import("./sphere.mjs");
        return new Sphere(options);
      }
      break;
    case "cylinder":
      if (options.radius > 0 && options.height > 0){
        const { Cylinder } = await import("./cylinder.mjs");
        return new Cylinder(options);
      }
      break;
    case "prism":
      if (options.baseSideLength > 0 && options.height > 0 && options.baseSideNum > 2 &&  Number.isInteger(+options.baseSideNum)){
        const { Prism } = await import("./prism.mjs");
        return new Prism(options);
      }
      break;
    case "pyramid":
      if (options.baseSideLength > 0 && options.height > 0 && options.baseSideNum > 2 && Number.isInteger(+options.baseSideNum)){
        const { Pyramid } = await import("./pyramid.mjs");
        return new Pyramid(options);
      }
      break;
    default:
      alert("Invalid shape");
      return null;
  }
  return null;
}

/*
Provides the names for basic functions that can be called on a shape.
These functions are overridden in its child classes
*/
export class Shape{
  color;

  displayFields(){
    alert("displayFields() function not overridden in child class");
    return -1;
  }
  getParameters(){
    alert("getParameters() function not overridden in child class");
    return -1;
  }
  async getArea(){
    alert("Area not available for object type. Try surface area if it's a 3D object.");
    return -1;
  }
  async getPerimeter(){
    alert("Perimeter not available for object type.");
    return -1;
  }
  async getVolume(){
    alert("Volume not available for object type.");
    return -1;
  }
  async getSurfaceArea(){
    alert("Surface area not available for object type. Try area if it's a 2D object.");
    return -1;
  }
  constructor(options){
    this.color = options.color;
  }
}