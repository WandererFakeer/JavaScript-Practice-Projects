// RENDER ONLY COMPANY FEEDBACK WHEN CLICKED ON FILTER BUTTON

import renderSpecificData from "./helperFunctions/renderSpecificData.js";
import addGlobalEventListener from "./helperFunctions/createGlobalEventListener.js";

import {feedbacksListEl} from "./globalReferencesAndState.js";
import {UPVOTE_SVG_MARKUP, state} from "./globalReferencesAndState.js";

// Render the filtered company feedback details
function renderFilterFeedbacks(fullData){
  renderSpecificData(fullData, UPVOTE_SVG_MARKUP, feedbacksListEl);
}

// Extract specific company data
function getSpecificCompanyData(array, name){
  return array.filter((obj) => obj.company === name);
}

// Handler function for "[data-filter-by-company]" data attribute
function handleClickFilter(e){
  const data = [...state.data];

  const companyName = e.target.textContent.slice(1);

  const uniqueCompanyFullData = getSpecificCompanyData(data, companyName);

  renderFilterFeedbacks(uniqueCompanyFullData);
}

// "click" events on "[data-filter-by-company]" data attribute
function eventFilterFeedbacks(){
  addGlobalEventListener("click", "[data-filter-by-company]", handleClickFilter);
}

export default eventFilterFeedbacks;