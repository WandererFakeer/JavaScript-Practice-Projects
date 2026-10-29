// RENDER FEEDBACKS
// RENDER FILTER COMPANY BUTTONS
// RENDER FULL FEEDBACK WHEN CLICKED
// RENDER UPVOTE WHEN CLICKED
// RENDER ONLY COMPANY FEEDBACK WHEN CLICKED ON FILTER BUTTON
// RENDER LIVE FEEDBACK WORD COUNT
// SEND LIVE FEEDBACK DATA TO SERVER
// RENDER LIVE FEEDBACK

import feedbacksData from "./renderFeedbacksData.js";
import filterCompanyNames from "./renderFilterCompanyNames.js";
import eventFullDescription from "./eventFullDescription.js";
import eventUpvote from "./eventUpvote.js";
import eventFilterFeedbacks from "./eventFilterFeedbacks.js";
import eventInputWordCount from "./eventInputWordCount.js";
import eventFormSubmit from "./eventFormSubmit.js";

// Initialize
async function init(){
  await feedbacksData();
  await filterCompanyNames();
}

init();

// Event listener for showing the full feedback description
eventFullDescription();

// Event listener for upvoting
eventUpvote();

// Event listener for filtering feedbacks by company name
eventFilterFeedbacks();

// Event listener word counter
eventInputWordCount();

// Event listener for form submission
eventFormSubmit();