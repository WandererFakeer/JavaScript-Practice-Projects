/* 
  1. LOAD THE FIRST 5 SEARCH RESULTS OF ANY SEARCH (KEEP THE RELEVANT BUTTON ACTIVE)
  2. SHOW APPROPRIATE SEARCH RESULTS WHEN CLICKED ON RELEVANT OR RECENT BUTTON
  3. SHOW PROPER PAGE NAVIGATION PAGINATION NUMBER AND BUTTONS
*/

import addGlobalEventListener from "./helperFunctions/addGlobalEventListener.js";
import getDataFromFetch from "./helperFunctions/getDataFromFetch.js";
import createRenderLoadingSpinner from "./helperFunctions/createRenderLoadingSpinner.js";
import createRenderSearchResultSection from "./helperFunctions/createRenderSearchResultSection.js";
import createRenderErrorMessage from "./helperFunctions/createRenderErrorMessage.js";
import createRenderPaginationButtonAndPageNumber from "./helperFunctions/createRenderPaginationButtonAndPageNumber.js";

import {pageHeaderEl, searchResultsSectionEl, searchResultsNumberEl, searchSortingRelevantButtonEl, searchSortingRecentButtonEl, searchResultsListEl, paginationBackButtonEl, paginationNextButtonEl} from "./globalReferencesAndState.js";

import { BASE_URL, state, RESULTS_PER_PAGE } from "./globalReferencesAndState.js";

let loadingSpinner = null;

// Render loading spinner
function renderLoadingSpinner(){
  loadingSpinner = createRenderLoadingSpinner("search-results-spinner", searchResultsSectionEl);
}

// Render the first page search results
function renderFirstPageSearchResults(START_INDEX, END_INDEX){
  loadingSpinner.remove();
  
  createRenderSearchResultSection(state.chosenJobTitleJobsList.slice(START_INDEX, END_INDEX), searchResultsListEl);
}

// Render search results number
function renderSearchResultsNumber(){
  searchResultsNumberEl.textContent = `${state.chosenJobTitleJobsList.length} results`;
}

// Render relevant sort button
function renderRelevantSortButton(){
  searchSortingRelevantButtonEl.classList.add("sorting-button-active");
  searchSortingRecentButtonEl.classList.remove("sorting-button-active");
}

// Render pagination
function renderPagination(){
  createRenderPaginationButtonAndPageNumber(paginationBackButtonEl, paginationNextButtonEl, state.currentPageNumber, state.chosenJobTitleJobsList, RESULTS_PER_PAGE);
}

// Render error message if error happens
function renderErrorMessage(){
  createRenderErrorMessage("Something went wrong. Could not find your preferred job role", pageHeaderEl);
}

// Handler function for "form" element
async function handleSearchResults(e){
  e.preventDefault();

  // Render loading spinner
  renderLoadingSpinner();

  const inputEl = e.target.querySelector("input");

  const value = inputEl.value;

  try{
    const data = await getDataFromFetch(`${BASE_URL}?search=${value}`);

    state.chosenJobTitleJobsList = data?.jobItems;
    state.currentPageNumber = 1;

    const START_INDEX = RESULTS_PER_PAGE * state.currentPageNumber - RESULTS_PER_PAGE;
    const END_INDEX = RESULTS_PER_PAGE * state.currentPageNumber;

    // Render the first page search results
    renderFirstPageSearchResults(START_INDEX, END_INDEX);
  }

  catch(error){
    // Render error message if error happens
    renderErrorMessage();

    loadingSpinner.remove();
  }

  // Render search results number
  renderSearchResultsNumber();

  // Render relevant sort button
  renderRelevantSortButton();

  // Render pagination
  renderPagination();

  inputEl.value = "";
}

// "submit" Event listener on form element
function eventInputSearchResultLoad(){
  addGlobalEventListener("submit", "#form", handleSearchResults);
}

export default eventInputSearchResultLoad;