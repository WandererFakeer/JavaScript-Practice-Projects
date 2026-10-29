const spinnerEl = document.querySelector(".loader");
const feedbacksListEl = document.querySelector(".other-feedbacks-list-container");
const filterCompaniesEl = document.querySelector(".filter-companies");
const feedbackLetterLimitEl = document.querySelector(".form-feedback-letter-limit");
const textareaEl = document.querySelector("textarea");

const BASE_URL = "https://bytegrad.com/course-assets/js/1/api";

const UPVOTE_SVG_MARKUP = `<svg class="upvote-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.1018 16.9814C5.02785 16.9814 4.45387 15.7165 5.16108 14.9083L10.6829 8.59762C11.3801 7.80079 12.6197 7.80079 13.3169 8.59762L18.8388 14.9083C19.5459 15.7165 18.972 16.9814 17.898 16.9814H6.1018Z"></path> </g></svg>`;

const FEEDBACK_CHARACTER_LIMIT = 150;

const state = {
  data: [], 
  userEnteredData: {}, 
};

export {spinnerEl, feedbacksListEl, filterCompaniesEl, feedbackLetterLimitEl, textareaEl};

export {BASE_URL, UPVOTE_SVG_MARKUP, FEEDBACK_CHARACTER_LIMIT, state};