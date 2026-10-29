import addGlobalEventListener from "./helperFunctions/addGlobalEventListener.js";

let target = null;

// Function for dragstart event
function handleMouseDragStart(e) {
  target = e.target;
  target.classList.add("task-list-item-dragged");
}

// Function for dragsover event
function handleMouseDragOver(e) {
  e.preventDefault();
}

// Function for drop event
function handleMouseDrop(e) {
  e.target.append(target);
  target.classList.remove("task-list-item-dragged");
}

// event listener drag And drop
function eventDragAndDropsetup(){

  addGlobalEventListener("dragstart", ".task-list-item", handleMouseDragStart);

  addGlobalEventListener("dragover", "[data-task]", handleMouseDragOver);

  addGlobalEventListener("drop", "[data-task]", handleMouseDrop);

}

export default eventDragAndDropsetup;