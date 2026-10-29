/* 
  SHOW APPROPRIATE SEARCH RESULTS WHEN CLICKED ON RELEVANT OR RECENT BUTTON 
*/

import addGlobalEventListener from "./helperFunctions/addGlobalEventListener.js";
import createRenderSearchResultSection from "./helperFunctions/createRenderSearchResultSection.js";

import { searchSortingRelevantButtonEl, searchSortingRecentButtonEl, searchResultsListEl, paginationBackButtonEl, paginationNextButtonEl } from "./globalReferencesAndState.js";

import { state, RESULTS_PER_PAGE } from "./globalReferencesAndState.js";

import createRenderPaginationButtonAndPageNumber from "./helperFunctions/createRenderPaginationButtonAndPageNumber.js";

// Render sorting buttons
function renderSortingButton(){
  searchSortingRelevantButtonEl.classList.toggle("sorting-button-active");
  searchSortingRecentButtonEl.classList.toggle("sorting-button-active");
}

// Render the first page
function renderFirstPageSearchResults(START_INDEX, END_INDEX){
  createRenderSearchResultSection(state.chosenJobTitleJobsList.slice(START_INDEX, END_INDEX), searchResultsListEl);
}

// Handler function for "job-search-navigation" class
function handleSearchSorting(e){
  const target = e.target;

  const isRelevantButton = target.classList.contains("relevant-button");
  const isRecentButton = target.classList.contains("recent-button");

  // Sort jobs according to relevance or recency
  if(isRelevantButton){
    state.chosenJobTitleJobsList.sort((objA, objB) => {

      // A negative value indicates that objA should come before objB
      return objB.relevanceScore - objA.relevanceScore; 
    });

  }

  else if(isRecentButton){
    state.chosenJobTitleJobsList.sort((objA, objB) => {

      // A positive value indicates that objA should come after objB
      return objA.daysAgo - objB.daysAgo;
    });

  }

  state.currentPageNumber = 1;
  const START_INDEX = RESULTS_PER_PAGE * state.currentPageNumber - RESULTS_PER_PAGE;
  const END_INDEX = RESULTS_PER_PAGE * state.currentPageNumber;

  // render sorting buttons
  renderSortingButton();
  
  // Render pagination button and page number
  createRenderPaginationButtonAndPageNumber(paginationBackButtonEl, paginationNextButtonEl, state.currentPageNumber, state.chosenJobTitleJobsList, RESULTS_PER_PAGE);

  // Render the first page results
  renderFirstPageSearchResults(START_INDEX, END_INDEX);
}

// "click" Event listener
function eventSearchResultsSorting(){
  addGlobalEventListener("click", ".job-search-navigation", handleSearchSorting);
}

export default eventSearchResultsSorting;

export {renderSortingButton}