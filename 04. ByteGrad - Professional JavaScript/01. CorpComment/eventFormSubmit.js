// RENDER LIVE FEEDBACK

import addGlobalEventListener from "./helperFunctions/createGlobalEventListener.js";
import renderSpecificData from "./helperFunctions/renderSpecificData.js";

import {feedbacksListEl, feedbackLetterLimitEl, textareaEl} from "./globalReferencesAndState.js";
import {UPVOTE_SVG_MARKUP, FEEDBACK_CHARACTER_LIMIT, state } from "./globalReferencesAndState.js";

import sendFeedbackToServer from "./sendFeedbackToServer.js";

// Render textArea correct border
function renderTextAreaBorder(errorSubmission){

  // Remove classList after 2000ms
  if(!errorSubmission){
    textareaEl.classList.add("textarea-correct");

    setTimeout(() => {
      textareaEl.classList.remove("textarea-correct");
    }, 2000);
  }

  else{
    textareaEl.classList.add("textarea-incorrect");

    setTimeout(() => {
      textareaEl.classList.remove("textarea-incorrect");
    }, 2000);

    // Focus textArea after incorrect typing
    textareaEl.focus();
  }
  
  feedbackLetterLimitEl.textContent = FEEDBACK_CHARACTER_LIMIT;
}

// Render successful form submission
function renderSuccessfulSubmission(){
  renderSpecificData(state.data, UPVOTE_SVG_MARKUP, feedbacksListEl);
  textareaEl.value = "";
}

// Helper function to extract substring
function extractSubstring(text){

  const startIndex = text.indexOf("#");

  const spaceCharacterIndex = text.indexOf(" ", startIndex);

  const endIndex = (spaceCharacterIndex !== -1) ? spaceCharacterIndex : text.length;

  const substring = text.substring(startIndex, endIndex).substring(1);

  if(substring){
    return substring;
  }
  
}

// Handler function for form submission
function handleFormSubmit(e){
  e.preventDefault();

  const text = textareaEl.value;

  const hasHash = text.includes("#");
 
  const errorSubmission = !hasHash;

  renderTextAreaBorder(errorSubmission);

  if(!hasHash){
    return;
  }

  const companyName = extractSubstring(text);

  if(companyName){
    state.userEnteredData = {
      company: companyName,
      badgeLetter: companyName[0].toUpperCase(), 
      upvoteCount: 0, 
      daysAgo: 0, 
      text: text,
    }, 

    state.data.push(state.userEnteredData);

    renderSuccessfulSubmission();

    sendFeedbackToServer();
  }
  
}

// "submit" events on "form" element
function eventFormSubmit(){
  addGlobalEventListener("submit", "#form", handleFormSubmit);
}

export default eventFormSubmit;