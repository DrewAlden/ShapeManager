/* 
Author:     Drew Alden
Filename:   shapes.js
Purpose:    Provides a variety of shape classes divided into
            2d and 3d shapes. Calls to the backend on port 3000
            for all area, perimeter, surface area, and volume
            calculations.

            If a shape is made incorrectly, a validation function
            ensures each field is greater than its minimum value
            before creation and prints an error to the user.
*/


/*
Handles all shape creation. Dynamically creates shapes depending
on the shapeType in the options json sent in.

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
        return new Rectangle(options);
      }
      break;
    case "circle":
      if (options.radius > 0){
        return new Circle(options);
      }
      break;
    case "polygon":
      // Plus sign is used to convert linput string to a number for integer validation
      if (options.numSides > 2 && Number.isInteger(+options.numSides) && options.sideLength > 0){
        return new RegularPolygon(options);
      }
      break;
    case "box":
      if (options.length > 0 && options.width > 0 && options.height > 0){
        return new Box(options);
      }
      break;
    case "sphere":
      if (options.radius > 0){
        return new Sphere(options);
      }
      break;
    case "cylinder":
      if (options.radius > 0 && options.height > 0){
        return new Cylinder(options);
      }
      break;
    case "prism":
      if (options.baseSideLength > 0 && options.height > 0 && options.baseSideNum > 2 &&  Number.isInteger(+options.baseSideNum)){
        return new Prism(options);
      }
      break;
    case "pyramid":
      if (options.baseSideLength > 0 && options.height > 0 && options.baseSideNum > 2 && Number.isInteger(+options.baseSideNum)){
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

/*
Shape2D provides more specific functions for 2D shapes only, namely
getPerimeter() and getArea().

These functions rely on the getParameters() function to be overridden in
Shape2D's child classes.
*/
class Shape2D extends Shape{
  area;
  perimeter;

  //Gets the object's perimeter from the server. Needs getParameters() to be
  //implemented in the child class
  async getPerimeter(){
    let response = await fetch('http://localhost:3000'+'/getPerimeter',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.getParameters()),
    });
    if (!response.ok) throw new Error('Backend error');
    const data = await response.json();
    this.perimeter = data.perimeter;
    return data.perimeter;
  };

  //Gets the object's area from the server. Needs getParameters() to be
  //implemented in the child class
  async getArea(){
    let response = await fetch('http://localhost:3000'+'/getArea',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.getParameters()),
    });
    if (!response.ok) throw new Error('Backend error');
    const data = await response.json();
    this.area = data.area;
    return data.area;
  };

  constructor(options){
    super(options);
  };
}

/*
Shape2D provides more specific functions for 3D shapes only, namely
getVolume() and getSurfaceArea().

These functions rely on the getParameters() function to be overridden in
Shape3D's child classes.
*/
class Shape3D extends Shape{
  volume;
  surfaceArea;

  //Gets the object's volume from the server. Needs getParameters() to be
  //implemented in the child class
  async getVolume(){
    let response = await fetch('http://localhost:3000'+'/getVolume',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.getParameters()),
    });
    if (!response.ok) throw new Error('Backend error');
    const data = await response.json();
    this.volume = data.volume;
    return data.volume;
  };

  //Gets the object's surface area from the server. Needs getParameters()
  //to beimplemented in the child class
  async getSurfaceArea(){
    let response = await fetch('http://localhost:3000'+'/getSurfaceArea',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.getParameters()),
    });
    if (!response.ok) throw new Error('Backend error');
    const data = await response.json();
    this.surfaceArea = data.surfaceArea;
    return data.surfaceArea;
  };
  constructor(options){
    super(options);
  }
}


//Rectangle class implementation
class Rectangle extends Shape2D{
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


//Circle class implementation
class Circle extends Shape2D{
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


//Polygon class implementation
class RegularPolygon extends Shape2D{
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


//Box class implementation
class Box extends Shape3D{
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


//Sphere class implementation
class Sphere extends Shape3D{ 
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


//Cylinder class implementation
class Cylinder extends Shape3D{
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


//Prism class implementation
//The prism must have a regular polygon as its base
class Prism extends Shape3D{
  baseSideLength;
  baseSideNum;
  height;

  getParameters(){
    return {
      shapeType: "prism",
      baseSideLength: this.baseSideLength,
      baseSideNum: this.baseSideNum,
      height: this.height,
    }
  }
  displayFields(){
    return "<div style=\"color:" + this.color + "\">Prism:<br>"+ JSON.stringify({
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


//Pyramid class implementation
//The pyramid must have a regular polygon as its base
class Pyramid extends Shape3D{
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