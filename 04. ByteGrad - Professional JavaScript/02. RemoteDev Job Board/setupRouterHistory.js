/*
  // SET UP THE ROUTER HISTORY TO -
    // 1. NAVIGATE BACK / FORWARD WITH "HASHCHANGE"
    // 2. NAVIGATE DIRECT URL WITH "DOMCONTENTLOADED"
*/

import createRenderLoadingSpinner from "./helperFunctions/createRenderLoadingSpinner.js";
import createRenderDetailsSection from "./helperFunctions/createRenderDetailsSection.js";
import createRenderErrorMessage from "./helperFunctions/createRenderErrorMessage.js";

import getDataFromFetch from "./helperFunctions/getDataFromFetch.js";

import {pageHeaderEl, searchDetailsSectionEl} from "./globalReferencesAndState.js";

import { BASE_URL, state } from "./globalReferencesAndState.js";

let loadingSpinner = null;

// Render loading spinner
function renderLoadingSpinner(){
  searchDetailsSectionEl.replaceChildren();

  loadingSpinner = createRenderLoadingSpinner("search-details-spinner", searchDetailsSectionEl);
}

// Render error message if error happens
function renderErrorMessage(){
  createRenderErrorMessage("Sorry, could not find any job with this address", pageHeaderEl);
}

// Render job details
function renderJobDetails(){
  loadingSpinner.remove();
  createRenderDetailsSection(state.chosenJobDetails, searchDetailsSectionEl);
}

// Handler function for "hashchange" and "DOMContentLoaded" events
async function handleRouterHistory(){
  const id = window.location.hash.slice(1);
  
  if(!id){

    return;
  }

  // Render loading spinner
  renderLoadingSpinner();

  try{

    const data = await getDataFromFetch(`${BASE_URL}/${id}`);

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

// Event handlers "hashchange" when the hash of the URL has changed
window.addEventListener("hashchange", handleRouterHistory);

// Event handlers "DOMContentLoaded" when the HTML document has been completely parsed, and all deferred scripts have downloaded and executed
window.addEventListener("DOMContentLoaded", handleRouterHistory);
