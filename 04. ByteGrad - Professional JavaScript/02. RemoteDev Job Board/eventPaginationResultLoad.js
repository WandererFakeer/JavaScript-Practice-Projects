/* 
  SHOW PROPER PAGE NAVIGATION PAGINATION NUMBER AND BUTTONS 
*/

import addGlobalEventListener from "./helperFunctions/addGlobalEventListener.js";
import createRenderSearchResultSection from "./helperFunctions/createRenderSearchResultSection.js";
import createRenderPaginationButtonAndPageNumber from "./helperFunctions/createRenderPaginationButtonAndPageNumber.js";

import {searchResultsListEl, paginationBackButtonEl, paginationNextButtonEl} from "./globalReferencesAndState.js";
import {state, RESULTS_PER_PAGE} from "./globalReferencesAndState.js";

// Render page search results
function renderSearchResults(START_INDEX, END_INDEX){
  createRenderSearchResultSection(state.chosenJobTitleJobsList.slice(START_INDEX, END_INDEX), searchResultsListEl);
}

// Handler function for "pagination-list" class
function handlePaginationClick(e){
  const target = e.target;

  const isBackPagination = target.classList.contains("pagination-back");
  const isNextPagination = target.classList.contains("pagination-next");

  if(isBackPagination){
    state.currentPageNumber -= 1;
  }

  else if(isNextPagination){
    state.currentPageNumber += 1;
  }

  const START_INDEX = RESULTS_PER_PAGE * state.currentPageNumber - RESULTS_PER_PAGE;
  const END_INDEX = RESULTS_PER_PAGE * state.currentPageNumber;

  // Render pagination button and page number
  createRenderPaginationButtonAndPageNumber(paginationBackButtonEl, paginationNextButtonEl, state.currentPageNumber ,state.chosenJobTitleJobsList, RESULTS_PER_PAGE);
  
  // Render search results
  renderSearchResults(START_INDEX, END_INDEX);
}

// "click" Event listener on "pagination-list" class
function eventPaginationResultLoad(){
  addGlobalEventListener("click", ".pagination-list", handlePaginationClick);
}

export default eventPaginationResultLoad;
