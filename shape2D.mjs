import {Shape} from "./shape.mjs";

/*
Shape2D provides more specific functions for 2D shapes only, namely
getPerimeter() and getArea().

These functions rely on the getParameters() function to be overridden in
Shape2D's child classes.
*/
export class Shape2D extends Shape{
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