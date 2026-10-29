// RENDER FILTER COMPANY BUTTONS

import createDOMElement from "./helperFunctions/createDOMElement.js";

import {filterCompaniesEl} from "./globalReferencesAndState.js";
import {state} from "./globalReferencesAndState.js";

// Render filter company names
function renderFilterCompanyNames(names){

  const fragmentFilterCompanies = document.createDocumentFragment();

  for (const name of names){

    const hashtagCompanyButton = createDOMElement("button", `#${name}`, "hashtag-company");
    hashtagCompanyButton.setAttribute("type", "button");
    hashtagCompanyButton.setAttribute("data-filter-by-company", "company");

    fragmentFilterCompanies.append(hashtagCompanyButton);
  }

  filterCompaniesEl.append(fragmentFilterCompanies);
}

// Helper function to get the company names from array of objects
function getCompanyNames(array){
  return array.map((obj) => obj.company);
}

// Set filter company names and render
async function filterCompanyNames(){

  const array = [...state.data];

  // Get all the company names
  const companyNamesArray = getCompanyNames(array);

  // Get only the unique names of companies
  const uniqueCompanyNames = [...new Set(companyNamesArray)];

  renderFilterCompanyNames(uniqueCompanyNames);
}

export default filterCompanyNames;
