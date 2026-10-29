// RENDER FULL FEEDBACK WHEN CLICKED

import addGlobalEventListener from "./helperFunctions/createGlobalEventListener.js";

// Render full feedback description
function renderFeedbackFullDescription(e){
  const targetEl = e.target;
  targetEl.classList.toggle("other-feedback-description-truncated");
  targetEl.classList.toggle("other-feedback-description");
}

// Handler function for "[data-description]" data attribute
function handleFullDescription(e){
  renderFeedbackFullDescription(e);
}

// "click" events on "[data-description]" data attribute
function eventFullDescription(){
  addGlobalEventListener("click", "[data-description]", handleFullDescription);
}

export default eventFullDescription;