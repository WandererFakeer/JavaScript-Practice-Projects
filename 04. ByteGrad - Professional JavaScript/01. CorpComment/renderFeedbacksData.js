// RENDER FEEDBACKS

import renderSpecificData from "./helperFunctions/renderSpecificData.js";

import {spinnerEl, feedbacksListEl} from "./globalReferencesAndState.js";
import {BASE_URL, UPVOTE_SVG_MARKUP, state} from "./globalReferencesAndState.js";

// Render feedback
function renderFeedbacksData(){
  renderSpecificData(state.data, UPVOTE_SVG_MARKUP, feedbacksListEl);
  spinnerEl.classList.add("loader-disable");
}

// Get Fetch data
async function getFetchData(){
  const response = await fetch(`${BASE_URL}/feedbacks`);

  try{
    if(!response.ok){
      return;
    }

    return await response.json();
  }

  catch(error){
    console.log(error);
  }
  
}

// Set Fetch data and render
async function feedbacksData(){
  const rawData = await getFetchData() ?? null;
  
  if(rawData){
    state.data = rawData?.feedbacks;

    renderFeedbacksData();
  }
   
}

export default feedbacksData;
