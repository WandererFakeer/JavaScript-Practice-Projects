import createDOMElement from "./createDOMElement.js";
import createDayPosted from "./createDayPosted.js";

// Helper function to render job details section
function createRenderDetailsSection(array, parentEl){

  const qualificationsFragment = document.createDocumentFragment();

  const reviewsFragment = document.createDocumentFragment();

  const header = createDOMElement("header", null, "job-details-header");

  const headerImage = createDOMElement("img", null, "cover-image");
  headerImage.src = array.coverImgURL;
  
  const applyLink = createDOMElement("a", "Apply 🡵", "job-apply-link");
  applyLink.href = array.companyURL;
  applyLink.setAttribute("target", "_blank");

  header.append(headerImage, applyLink);

  const nameJobTitleSection = createDOMElement("section", null, "search-details-name-job-title-section");
  nameJobTitleSection.setAttribute("aria-labelledby", "job-title");

  const badgeDayBookmarkDiv = createDOMElement("div", null, "search-details-badge-and-day-posted-and-bookmark");

  const companyBadge = createDOMElement("p", array.badgeLetters, "search-details-company-badge");

  const dayBookmarkDiv = createDOMElement("div", null, "search-details-day-posted-and-bookmark");

  const posted = createDOMElement("p", createDayPosted(array.daysAgo), "search-details-day");

  const bookmarkButton = createDOMElement("button", "⛉", "bookmark-button");
  
  dayBookmarkDiv.append(posted, bookmarkButton);
  
  badgeDayBookmarkDiv.append(companyBadge, dayBookmarkDiv);

  const jobTitleCompanyDiv = createDOMElement("div", null, "search-details-job-title-and-company");

  const jobTitle = createDOMElement("h2", array.title, "search-details-company-job-title");
  jobTitle.id = "job-title";

  const companyName = createDOMElement("p", array.company, "search-details-company-name");

  const jobDescription = createDOMElement("p", array.description, "search-details-job-full-description");

  const jobHighlightsDiv = createDOMElement("div", null, "search-details-job-highlights");

  const duration = createDOMElement("p", array.duration, "search-details-job-duration");

  const salary = createDOMElement("p", array.salary, "search-details-job-salary");

  const location = createDOMElement("p", array.location, "search-details-job-location");

  jobHighlightsDiv.append(duration, salary, location);

  jobTitleCompanyDiv.append(jobTitle, companyName, jobDescription, jobHighlightsDiv);

  nameJobTitleSection.append(badgeDayBookmarkDiv, jobTitleCompanyDiv);

  const qualificationsSection = createDOMElement("section", null, "qualifications-section");
  qualificationsSection.setAttribute("aria-labelledby", "qualifications");

  const qualificationHeaderDiv = createDOMElement("div", null, "qualification-header");

  const qualificationsHeading = createDOMElement("h2", "Qualifications", "qualifications-heading");
  qualificationsHeading.id = "qualifications";

  const qualificationsOther = createDOMElement("p", "Other qualifications may apply", "qualifications-other");
  
  qualificationHeaderDiv.append(qualificationsHeading, qualificationsOther); 

  const qualificationsList = createDOMElement("ul", null, "qualifications-list");

  for (const qualification of array.qualifications){
    const li = createDOMElement("li", qualification, "qualification");

    qualificationsFragment.append(li);
  }

  qualificationsList.append(qualificationsFragment);

  qualificationsSection.append(qualificationHeaderDiv, qualificationsList);


  const reviewsSection = createDOMElement("section", null, "reviews-section");
  reviewsSection.setAttribute("aria-labelledby", "reviews");

  const reviewHeaderDiv = createDOMElement("div", null, "reviews-header");

  const reviewsHeading = createDOMElement("h2", "Reviews", "reviews-heading");
  reviewsHeading.id = "reviews";

  const reviewsOther = createDOMElement("p", "Recent things people are saying", "reviews-other");
  
  reviewHeaderDiv.append(reviewsHeading, reviewsOther); 

  const reviewsList = createDOMElement("ul", null, "reviews-list");

  for (const review of array.reviews){
    const li = createDOMElement("li", review, "review");

    reviewsFragment.append(li);
  }

  reviewsList.append(reviewsFragment);

  reviewsSection.append(reviewHeaderDiv, reviewsList);

  parentEl.append(header, nameJobTitleSection, qualificationsSection, reviewsSection);
  parentEl.classList.add("search-details-section-with-details");
  parentEl.classList.remove("search-details-section");

}

export default createRenderDetailsSection;