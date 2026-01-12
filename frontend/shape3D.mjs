import {Shape} from "./shape.mjs";

/*
Shape3D provides more specific functions for 3D shapes only, namely
getVolume() and getSurfaceArea().

These functions rely on the getParameters() function to be overridden in
Shape3D's child classes.
*/
export class Shape3D extends Shape{
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