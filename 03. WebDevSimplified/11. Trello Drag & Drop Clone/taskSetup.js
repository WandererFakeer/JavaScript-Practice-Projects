import addGlobalEventListener from "./helperFunctions/addGlobalEventListener.js";

import {formEl, taskListsEl, enteredTasksEl} from "./globalReferencesAndState.js";
import state from "./globalReferencesAndState.js";

// Render task set up
function renderTaskSetup(){

  for (const [key, value] of Object.entries(state.addedItems)){

    if(value){
      // Find the "ul" with data attribute, to add to
      const targetListToAddTo = taskListsEl.find((list) => list.dataset.task === key);

      const li = document.createElement("li");
      li.textContent = value;
      li.classList.add("task-list-item");
      li.setAttribute("draggable", "true");
  
      targetListToAddTo.append(li);

      // Find the "input" with name attribute
      const targetInput = enteredTasksEl.find((input) => input.name === key);
      targetInput.value = "";
    }
  }

}

// Get Form Data
function formData(el){
  const formData = new FormData(el);
  return Object.fromEntries(formData);
}

// Handler User Data
function handleUserData(e){
  e.preventDefault();
  
  state.addedItems = formData(formEl);
  
  renderTaskSetup();

}

// Event listener
function eventUserData(){
  addGlobalEventListener("change", "#form", handleUserData);
}

export default eventUserData;