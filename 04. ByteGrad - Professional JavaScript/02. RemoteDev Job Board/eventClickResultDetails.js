/* 
  // 1. SHOW JOB DETAILS SECTION WHEN CLICKED ON ANY SEARCH RESULT
  // 2. SHOW APPROPRIATE SEARCH RESULTS WHEN CLICKED ON RELEVANT OR RECENT BUTTON
  // 3. SHOW PROPER PAGE NAVIGATION PAGINATION NUMBER AND BUTTONS
*/

import addGlobalEventListener from "./helperFunctions/addGlobalEventListener.js";
import getDataFromFetch from "./helperFunctions/getDataFromFetch.js";
import createRenderLoadingSpinner from "./helperFunctions/createRenderLoadingSpinner.js";
import createRenderDetailsSection from "./helperFunctions/createRenderDetailsSection.js";
import createRenderErrorMessage from "./helperFunctions/createRenderErrorMessage.js";

import {pageHeaderEl, searchDetailsSectionEl} from "./globalReferencesAndState.js";
import {BASE_URL, state} from "./globalReferencesAndState.js";

let loadingSpinner = null;

// Render loading spinner
function renderLoadingSpinner(){
  searchDetailsSectionEl.replaceChildren();

  loadingSpinner = createRenderLoadingSpinner("search-details-spinner", searchDetailsSectionEl);
}

// Render error message if error happens
function renderErrorMessage(){
  createRenderErrorMessage("Sorry, could not find your selected job", pageHeaderEl);
}

// Render job details
function renderJobDetails(){
  loadingSpinner.remove();
  createRenderDetailsSection(state.chosenJobDetails, searchDetailsSectionEl);
}

// Handler function for "search-result" class
async function handleJobDetails(e){
  
  // Render loading spinner
  renderLoadingSpinner();

  const parent = e.target.closest(".search-result");
  const jobId = Number(parent.dataset.jobId);

  try{

    const data = await getDataFromFetch(`${BASE_URL}/${jobId}`);

    state.chosenJobDetails = data?.jobItem;

    // Render job details
    renderJobDetails();
  }

  catch(error){
    // Render error message if error happens
    renderErrorMessage();
    
    loadingSpinner.remove();
  }

}

// "click" Event listener
function eventClickResultDetails(){
  addGlobalEventListener("click", ".search-result", handleJobDetails);
}

export default eventClickResultDetails;