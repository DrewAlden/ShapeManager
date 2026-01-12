/*
Author:     Drew Alden
Filename:   server.mjs
Purpose:    Server implementation using express. Endpoints for
            creating shapes, getting their areas, perimeters,
            volumes, and surface areas.

            Runs on port 3000
*/

import express from 'express'
import cors from 'cors'

const app = express()

//Overrides CORS security to allow the server to work without an SSL certificate
app.use(
  cors({
    origin: '*',
  })
)

//Used to parse json coming in to the server from the frontend
app.use(express.json());


app.get('/', (req, res) => {
  const response = {
    message: "Hello",
  };
  console.log('Server contacted by frontend');
  res.json(response)
})

app.post('/getArea', (req, res) => {
  let calculatedArea = -1;
  console.log('Server contacted by frontend:');
  console.log(req.body);
  switch (req.body.shapeType){
    case "rectangle":
      calculatedArea = req.body.length * req.body.width;
      break;
    case "circle":
      calculatedArea = Math.PI * (req.body.radius ** 2);
      break;
    case "polygon":
      if (req.body.numSides < 3 || req.body.sideLength <= 0){
        break;
      }
      calculatedArea = ((0.25/Math.tan(Math.PI/req.body.numSides)) * req.body.sideLength * req.body.sideLength * req.body.numSides);
      if (calculatedArea === Number.NaN){
        calculatedArea = -1;
      }
      break;
    default:
      break;
  }
  res.json({
    area: calculatedArea,
  });
  console.log(calculatedArea);
})

app.post('/getPerimeter', (req, res) => {
  let calculatedPerimeter = -1;
  console.log('Server contacted by frontend:');
  console.log(req.body);
  switch (req.body.shapeType){
    case "rectangle":
      calculatedPerimeter = (req.body.length + req.body.width) * 2;
      break;
    case "circle":
      calculatedPerimeter = 2 * Math.PI * req.body.radius;
      break;
    case "polygon":
      calculatedPerimeter = req.body.numSides * req.body.sideLength;
      break;
    default:
      break;
  }
  res.json({
    perimeter: calculatedPerimeter,
  });
  console.log(calculatedPerimeter);
})

app.post('/getVolume', (req, res) => {
  let calculatedVolume = -1;
  console.log('Server contacted by frontend:');
  console.log(req.body);
  switch (req.body.shapeType){
    case "box":
      calculatedVolume = req.body.length * req.body.width * req.body.height;
      break;
    case "sphere":
      calculatedVolume = (4.0/3.0) * (Math.PI * (req.body.radius ** 3));
      break;
    case "cylinder":
      calculatedVolume = (Math.PI * (req.body.radius ** 2) * req.body.height);
      break;
    case "prism":
      if (req.body.baseSideNum < 3 || req.body.baseSideLength <= 0){
        break;
      }
      calculatedVolume = (req.body.height * ((0.25/Math.tan(Math.PI/req.body.baseSideNum)) * req.body.baseSideLength * req.body.baseSideLength * req.body.baseSideNum));
      if (calculatedVolume === Number.NaN){
        calculatedVolume = -1;
      }
      break;
    case "pyramid":
      if (req.body.baseSideNum < 3 || req.body.baseSideLength <= 0){
        break;
      }
      calculatedVolume = (req.body.height * ((0.25/Math.tan(Math.PI/req.body.baseSideNum)) * req.body.baseSideLength * req.body.baseSideLength * req.body.baseSideNum))/3.0;
      if (calculatedVolume === Number.NaN){
        calculatedVolume = -1;
      }
      break;
    default:
      break;
  }
  res.json({
    volume: calculatedVolume,
  });
  console.log(calculatedVolume);
})


app.post('/getSurfaceArea', (req, res) => {
  let calculatedSurfaceArea = -1;
  console.log('Server contacted by frontend:');
  console.log(req.body);
  switch (req.body.shapeType){
    case "box":
      calculatedSurfaceArea = 2 * (req.body.length * req.body.width + req.body.length * req.body.height + req.body.width * req.body.height);
      break;
    case "sphere":
      calculatedSurfaceArea = 4 * Math.PI * (req.body.radius ** 2);
      break;
    case "cylinder":
      calculatedSurfaceArea = 2 * (Math.PI * (req.body.radius ** 2)) + (2 * Math.PI * req.body.radius * req.body.height);
      break;
    case "prism":
      if (req.body.baseSideNum < 3 || req.body.baseSideLength <= 0){
        break;
      }
      calculatedSurfaceArea = 2 * ((0.25/Math.tan(Math.PI/req.body.baseSideNum)) * (req.body.baseSideLength ** 2) * req.body.baseSideNum) + req.body.baseSideNum * req.body.baseSideLength * req.body.height;
      if (calculatedSurfaceArea === Number.NaN){
        calculatedSurfaceArea = -1;
      }
      break;
    case "pyramid":
      if (req.body.baseSideNum < 3 || req.body.baseSideLength <= 0){
        break;
      }
      calculatedSurfaceArea = ((0.25/Math.tan(Math.PI/req.body.baseSideNum)) * (req.body.baseSideLength ** 2) * req.body.baseSideNum) + 0.5 * req.body.baseSideNum * req.body.baseSideLength * Math.sqrt((req.body.height ** 2) + ((req.body.baseSideLength ** 2)/4.0)/((Math.tan(Math.PI / req.body.baseSideNum))**2));
      if (calculatedSurfaceArea === Number.NaN){
        calculatedSurfaceArea = -1;
      }
      break;
    default:
      break;
  }
  res.json({
    surfaceArea: calculatedSurfaceArea,
  });
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})