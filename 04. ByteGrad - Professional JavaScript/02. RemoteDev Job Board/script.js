/*
  // 1. LOAD THE FIRST 5 SEARCH RESULTS OF ANY SEARCH (KEEP THE RELEVANT BUTTON ACTIVE)
  // 2. SHOW JOB DETAILS SECTION WHEN CLICKED ON ANY SEARCH RESULT
  // 3. SHOW APPROPRIATE SEARCH RESULTS WHEN CLICKED ON RELEVANT OR RECENT BUTTON
  // 4. SHOW PROPER PAGE NAVIGATION PAGINATION NUMBER AND BUTTONS
  // 5. SET UP THE ROUTER HISTORY TO -
    // A) NAVIGATE BACK / FORWARD WITH "HASHCHANGE"
    // B) NAVIGATE DIRECT URL WITH "DOMCONTENTLOADED"
*/

import eventInputSearchResultLoad from "./eventInputSearchResultLoad.js";
import eventClickResultDetails from "./eventClickResultDetails.js";
import eventSearchResultsSorting from "./eventSearchResultsSorting.js";
import eventPaginationResultLoad from "./eventPaginationResultLoad.js";

import "./setupRouterHistory.js";

eventInputSearchResultLoad();

eventClickResultDetails();

eventSearchResultsSorting();

eventPaginationResultLoad();

