import createDOMElement from "./createDOMElement.js";
import createDayPosted from "./createDayPosted.js";

// Helper function to render the search results per page
function createRenderSearchResultSection(array, parentEl){

  parentEl.replaceChildren();

  const fragment = document.createDocumentFragment();

  for (const data of array){
    
    const li = createDOMElement("li", null, "search-result");
    li.setAttribute("data-job-id", `${data.id}`)

    const searchLink = createDOMElement("a", null, "search-card");
    searchLink.href = `/#${data.id}`;

    const badge = createDOMElement("p", data.badgeLetters, "search-result-company-badge");

    const companyDetailsDiv = createDOMElement("div", null, "search-result-company-details");

    const title = createDOMElement("h2", data.title, "search-result-company-job-title");

    const name = createDOMElement("p", data.company, "search-result-company-name");

    const companyHighlightsDiv = createDOMElement("div", null, "search-result-company-highlights");

    const duration = createDOMElement("p", data.duration, "search-result-company-duration");

    const salary = createDOMElement("p", data.salary, "search-result-company-salary");
    
    const location = createDOMElement("p", data.location, "search-result-company-location");

    companyHighlightsDiv.append(duration, salary, location);

    companyDetailsDiv.append(title, name, companyHighlightsDiv);

    const bookmarkAndDayDiv = createDOMElement("div", null, "search-result-bookmark-and-day");

    const bookmarkButton = createDOMElement("button", "⛉", "bookmark-button");

    const day = createDOMElement("p", createDayPosted(data.daysAgo), "search-result-day");

    bookmarkAndDayDiv.append(bookmarkButton, day);

    searchLink.append(badge, companyDetailsDiv, bookmarkAndDayDiv);

    li.append(searchLink);

    fragment.append(li);

  }

  parentEl.append(fragment);

}

export default createRenderSearchResultSection;