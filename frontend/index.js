/*
Author:     Drew Alden
Filename:   index.js
Purpose:    Provides functionality for the index.html page.

            Requires shapes.js for all contacts to the server and
            shape manipulation

            Interacts with the server on port on localhost.
*/


import {createShape} from "./shapes.js";

//Buttons for the user to interact with to create shapes,
//clear the list, and display the list
const createShapeButton = document.getElementById("createShape");
const clearListButton = document.getElementById("clearList");
const displayShapesButton = document.getElementById("displayShapes");

//All input fields for the user
const shapeTypeInput = document.getElementById("shapeTypeInput");
const shapeColorInput = document.getElementById("shapeColorInput");
const shapeLengthInput = document.getElementById("lengthInput");
const shapeWidthInput = document.getElementById("widthInput");
const shapeHeightInput = document.getElementById("heightInput");
const shapeRadiusInput = document.getElementById("radiusInput");
const shapeNumSidesInput = document.getElementById("numSidesInput");
const shapeSideLengthInput = document.getElementById("sideLengthInput");
const shapeBaseSideLengthInput = document.getElementById("baseSideLengthInput");
const shapeBaseSideNumInput = document.getElementById("baseSideNumInput");

//Used for the inputDivArray
const colorDiv = document.getElementById("colorDiv");
const lengthDiv = document.getElementById("lengthDiv");
const widthDiv = document.getElementById("widthDiv");
const heightDiv = document.getElementById("heightDiv");
const radiusDiv = document.getElementById("radiusDiv");
const numSidesDiv = document.getElementById("numSidesDiv");
const sideLengthDiv = document.getElementById("sideLengthDiv");
const baseSideLengthDiv = document.getElementById("baseSideLengthDiv");
const baseSideNumDiv = document.getElementById("baseSideNumDiv");
const buttonsDiv = document.getElementById("buttonsDiv");

//Used to print out a list of all shapes to the user
const displayedList = document.getElementById("displayedList");

//Used to hide irrelevant inputs from the user depending on which
//shape they are creating. This is a list so it is iterable for
//the hideAllFields function
const inputDivArray = [
  colorDiv,
  lengthDiv,
  widthDiv,
  heightDiv,
  radiusDiv,
  numSidesDiv,
  sideLengthDiv,
  baseSideLengthDiv,
  baseSideNumDiv,
  buttonsDiv,
];

//Used to store the current list of shapes the user has
const shapeList = [];

/*
If the type of shape being created changes, update the
input fields visible on screen using the
updateVisibleElements function
*/
shapeTypeInput.addEventListener("change", function (e) {
  const value = e.target.value;
  updateVisibleElements(value);
});


/*
When the createShapeButton is pressed, creates a new shape
with the attributes input by the user. Also calls to the
server to get the following data if applicable:
  area
  perimeter
  volume
  surface area

If the shape couldn't be created, alert the user
*/
createShapeButton.addEventListener("click", async function (){
  let newShape = await createShape({
    shapeType: shapeTypeInput.value, 
    color: shapeColorInput.value, 
    length: shapeLengthInput.value, 
    width: shapeWidthInput.value, 
    height: shapeHeightInput.value, 
    radius: shapeRadiusInput.value, 
    numSides: shapeNumSidesInput.value, 
    sideLength: shapeSideLengthInput.value, 
    baseSideLength: shapeBaseSideLengthInput.value, 
    baseSideNum: shapeBaseSideNumInput.value});

  if(newShape != null){
    if(shapeTypeInput.value == "rectangle" || shapeTypeInput.value == "circle" || shapeTypeInput.value == "polygon"){
      newShape.getArea();
      newShape.getPerimeter();
    }
    else{
      newShape.getVolume();
      newShape.getSurfaceArea();
    }
    shapeList.push(newShape);
  }
  else{
    alert("Shape could not be created.");
  }
})

/*
When the displayShapesButton is pressed, clears the display of
shapes in displayedList, then repopulates it with the current
shapes in shapeList.

If there are no shapes, displays a warning to the user.
*/
displayShapesButton.addEventListener("click", function (){
  displayedList.innerHTML = "";
  shapeList.forEach(element => {
    displayedList.innerHTML += element.displayFields()+"<br>";
  });
  if(displayedList.innerHTML == ""){
    displayedList.innerHTML = "<div style=\"color:#ff0000\">No shapes to display</div>";
  }
})

/*
Clears the displayedList list when the clearListButton is pressed,
and updates the HTML page to match.
*/
clearListButton.addEventListener("click", function (){
  shapeList.length = 0;
  displayedList.innerHTML = "";
})

/*
Applies the "hide" css class to all fields in the inputDivArray,
and removes their "show" class. This is used to force any irrelevant
input fields to be hidden when moving to a different shape type.
*/
function hideAllFields(){
  inputDivArray.forEach(element => {
    element.classList.remove("show");
    element.classList.add("hide");
  });
}

/*
Hides all fields, then reveals those which are relevant
for the current shapeType. Does this with the hide and show
classes in main.css.

Should be called when shapeTypeInput's value is changed.
*/
function updateVisibleElements(value){
  hideAllFields();

  //Once any shape type is selected, 
  //unhide the fields that should stay for all shapes
  colorDiv.classList.remove("hide");
  buttonsDiv.classList.remove("hide");
  colorDiv.classList.add("show");
  buttonsDiv.classList.add("show");
  switch (value){
    case "rectangle":
      lengthDiv.classList.remove("hide");
      widthDiv.classList.remove("hide");
      lengthDiv.classList.add("show");
      widthDiv.classList.add("show");
      break;
    case "circle":
      radiusDiv.classList.remove("hide");
      radiusDiv.classList.add("show");
      break;
    case "polygon":
      numSidesDiv.classList.remove("hide");
      sideLengthDiv.classList.remove("hide");
      numSidesDiv.classList.add("show");
      sideLengthDiv.classList.add("show");
      break;
    case "box":
      lengthDiv.classList.remove("hide");
      widthDiv.classList.remove("hide");
      heightDiv.classList.remove("hide");
      lengthDiv.classList.add("show");
      widthDiv.classList.add("show");
      heightDiv.classList.add("show");
      break;
    case "sphere":
      radiusDiv.classList.remove("hide");
      radiusDiv.classList.add("show");
      break;
    case "cylinder":
      radiusDiv.classList.remove("hide");
      heightDiv.classList.remove("hide");
      radiusDiv.classList.add("show");
      heightDiv.classList.add("show");
      break;
    case "prism":
      baseSideNumDiv.classList.remove("hide");
      baseSideLengthDiv.classList.remove("hide");
      heightDiv.classList.remove("hide");
      baseSideNumDiv.classList.add("show");
      baseSideLengthDiv.classList.add("show");
      heightDiv.classList.add("show");
      break;
    case "pyramid":
      baseSideNumDiv.classList.remove("hide");
      baseSideLengthDiv.classList.remove("hide");
      heightDiv.classList.remove("hide");
      baseSideNumDiv.classList.add("show");
      baseSideLengthDiv.classList.add("show");
      heightDiv.classList.add("show");
      break;
    default:
      break;

  }
}