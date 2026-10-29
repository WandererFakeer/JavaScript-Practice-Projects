const pageHeaderEl = document.querySelector(".page-header");
const bookmarksHeaderButtonEl = document.querySelector(".bookmarks-header-button");
const bookmarksHeaderItemsListEl = document.querySelector(".bookmarks-header-items-list");
const searchResultsSectionEl = document.querySelector(".search-results-section");
const searchResultsNumberEl = document.querySelector(".search-results-number");
const searchSortingRelevantButtonEl = document.querySelector(".relevant-button");
const searchSortingRecentButtonEl = document.querySelector(".recent-button");
const searchResultsListEl = document.querySelector(".search-results");
const searchDetailsSectionEl = document.querySelector(".search-details-section");
const paginationBackButtonEl = document.querySelector(".pagination-back");
const paginationNextButtonEl = document.querySelector(".pagination-next");

const BASE_URL = "https://bytegrad.com/course-assets/js/2/api/jobs";

const state = {
  chosenJobTitleJobsList: [], 
  chosenJobDetails: {}, 
  bookmarkedJobsList: [],  
  currentPageNumber: 1, 
};

const RESULTS_PER_PAGE = 5;

export {pageHeaderEl, bookmarksHeaderButtonEl, bookmarksHeaderItemsListEl, searchResultsSectionEl, searchResultsNumberEl, searchSortingRelevantButtonEl, searchSortingRecentButtonEl, searchResultsListEl, searchDetailsSectionEl, paginationBackButtonEl, paginationNextButtonEl};

export {BASE_URL, state, RESULTS_PER_PAGE};