// RENDER LIVE FEEDBACK WORD COUNT

import addGlobalEventListener from "./helperFunctions/createGlobalEventListener.js";

import {feedbackLetterLimitEl} from "./globalReferencesAndState.js";
import {FEEDBACK_CHARACTER_LIMIT} from "./globalReferencesAndState.js";

// Render word counter
function renderWordCounter(characterLeft){
  //const numString = extractNumberString(correctUpvoteEl.textContent);
  feedbackLetterLimitEl.textContent = characterLeft;
}

// Handler function for word counter
function handleWordCounter(e){
  const characterLength = e.target.value.length;

  const characterLeft = FEEDBACK_CHARACTER_LIMIT - characterLength;
  
  renderWordCounter(characterLeft);
}

// "input" events on "textarea" element
function eventInputWordCount(){
  addGlobalEventListener("input", "textarea", handleWordCounter);
}

export default eventInputWordCount;