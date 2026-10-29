import createDOMElement from "./createDOMElement.js";

// Render some specific elements, like all feedback details
function renderSpecificData(array, svgString, element){

  element.replaceChildren();
  
  const fragmentFeedbacks = document.createDocumentFragment();

  for (const data of array){

    const feedbackList = createDOMElement("li", null, "other-feedback");

    const button = createDOMElement("button", null, "other-feedback-upvote-icon");
    button.setAttribute("type", "button" );
    button.setAttribute("data-upvote", "upvote-count");

    // Parse the string into a DOM document
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgString, "image/svg+xml");

    // Extract the root SVG element
    const svgElement  = svgDoc.documentElement;

    // Append the node to its parent
    button.append(svgElement);

    const badgeLetter = createDOMElement("p", data.badgeLetter, "other-feedback-company-badge");

    const company = createDOMElement("h3", data.company, "other-feedback-company-name");

    const time = createDOMElement("p", `${data.daysAgo}d`, `other-feedback-time`);
    const timeSpanDescription = createDOMElement("span", "Feedback posted days ago", "visually-hidden");
    time.append(timeSpanDescription);

    const upvoteCount = createDOMElement("p", data.upvoteCount, "other-feedback-upvote-number");
    const upvoteSpanDescription = createDOMElement("span", "Upvote number", "visually-hidden");
    upvoteCount.append(upvoteSpanDescription);

    const description = createDOMElement("p", data.text, "other-feedback-description-truncated");
    description.setAttribute("data-description", "feedback-description");

    feedbackList.append(button, badgeLetter, company, time, upvoteCount, description);

    fragmentFeedbacks.append(feedbackList);
  }

  element.append(fragmentFeedbacks);
}

export default renderSpecificData;
  