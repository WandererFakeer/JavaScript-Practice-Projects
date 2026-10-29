import createDOMElement from "./helper.js";

const formErrorListEl = document.querySelector("#form-error-list");
const errorSectionEl = document.querySelector("#error-section");
const formEl = document.querySelector("#form");
const thanksPageEl = document.querySelector("#thanks-page");

const state = {
  status: "submit",
  data: {},
  errors: [],
};

// Render
function render() {
  // Remove all previous nodes
  formErrorListEl.replaceChildren();
  thanksPageEl.replaceChildren();

  const isSubmitted = state.status === "submitted";

  errorSectionEl.hidden = isSubmitted;
  formEl.classList.toggle("form-hide", isSubmitted);
  thanksPageEl.hidden = !isSubmitted;

  // If data not submitted, show errors
  if (!isSubmitted) {
    const fragment = document.createDocumentFragment();

    state.errors.forEach((error) => {
      const errorItem = createDOMElement("li", error);
      fragment.append(errorItem);
    });

    formErrorListEl.append(fragment);
  } else {
    const thanksHeading = createDOMElement("h1", "Thank you for creating a new account");

    const backAnchor = createDOMElement("a", "Back to sign up page");
    backAnchor.href = "index.html";

    thanksPageEl.append(thanksHeading, backAnchor);
  }
}

// Get form data
function getFormData(element) {
  const formData = new FormData(element);
  return Object.fromEntries(formData);
}

// Validate form data
function validation(obj) {
  const array = [];

  if (!obj.username || obj.username.length < 6) {
    array.push("Username must be at least 6 characters long");
  }

  if (!obj.password || obj.password.length < 10) {
    array.push("Password must be at least 10 characters long");
  }

  if (obj.password && obj.password.length >= 10 && obj["password-confirmation"] !== obj.password) {
    array.push("Password must match");
  }

  if (!obj.agree) {
    array.push("You must accept the terms");
  }

  return array;
}

// Handle submission
function handleSubmit(e) {
  e.preventDefault();

  // Set data, error and status fields
  state.data = getFormData(formEl);
  state.errors = validation(state.data);

  state.status = state.errors.length === 0 ? "submitted" : "submit";

  render();
}

// Event listener
formEl.addEventListener("submit", handleSubmit);
