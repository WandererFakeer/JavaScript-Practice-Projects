// RENDER UPVOTE WHEN CLICKED

import addGlobalEventListener from "./helperFunctions/createGlobalEventListener.js";

// Helper function to sanitize string (get only the number letters from the string)
function extractNumberString(string){
  let numString = "";

  for (const letter of string){
    const num = Number(letter);

    if( (num >= 1) && (num <= 9) ){
      numString += num;
    }
  }

  return numString;
}

// Render Upvote
function renderUpvoteClickButton(target){
  const parentEl = target.closest(".other-feedback");
  
  const correctUpvoteEl = parentEl.querySelector(".other-feedback-upvote-number");

  const numString = extractNumberString(correctUpvoteEl.textContent);

  correctUpvoteEl.textContent = Number(numString) + 1;

  target.classList.add("hidden-upvote-icon");
}

// Handler function for "[data-upvote]" data attribute
function handleUpvoteClickButton(e){
  const target = e.target.closest("[data-upvote]");
  
  renderUpvoteClickButton(target);
}

// "click" events on "[data-upvote]" data attribute
function eventUpvote(){
  addGlobalEventListener("click", "[data-upvote]", handleUpvoteClickButton);
}

export default eventUpvote;