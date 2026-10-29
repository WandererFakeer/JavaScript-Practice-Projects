// DOM references
const userInput = document.querySelector("input");
const saveInputButton = document.querySelector("#save-input");
const saveTabButton = document.querySelector("#save-tab");
const deleteButton = document.querySelector("#delete");
const linksList = document.querySelector("#saved-links");

const STORAGE_KEY = "Saved Links";

const state = {
  urlArray: []
};

// Function to render full list
function render() {
  // Create empty DocumentFragment
  const fragment = document.createDocumentFragment();
  
  state.urlArray.forEach((url) => {
    const list = document.createElement("li");
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.textContent = url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";

    list.append(anchor);
    fragment.append(list);
  });
  
  // Replace existing list items with the newly created ones
  linksList.replaceChildren(fragment);
  
  // Disabled "Delete All" button at the start and if there is nothing to delete
  deleteButton.disabled = (state.urlArray.length === 0);
}

// Function to set localStorage on entire array
function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.urlArray));
}

// Function to validate URL (http or https)
function properURL(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}

// Function to reset input field
function resetInput() {
  userInput.value = "";
}

// Function to check validity of user input
function validityInput(input) {
  // If no "input" found, just return
  if (!input) {
    return;
  }

  // Check if "input" is a valid URL with "properURL()"
  if (!properURL(input)) {
    alert("Enter a valid URL starting with HTTP or HTTPS");

    // Reset input field with "resetInput()"
    resetInput();
    return;
  }

  // Check if "input" is already added before
  if (state.urlArray.includes(input)) {
    alert("Duplicate URL: it is already saved.");

    // Reset input field with "resetInput()"
    resetInput();
    return;
  }

  return input;
}

// Function to push URL to array
function addToArray(url) {
  state.urlArray.push(url);
  alert("Link Saved");
  
  // Persist the updated array
  persist();
}

// Function to handle save input
function handleSaveInput() {
  const userValue = userInput.value.trim();

  // Add URL to array only if it passes "validityInput()"
  if (validityInput(userValue)) {
    addToArray(userValue);
  }

  // Render DOM
  render();

  // Reset input field with "resetInput()"
  resetInput();
}

// Functio to handle save current tab
function handleSaveTab() {
  
  // Grab the URL of the current page
  const tab = window.location.href;

  // Add URL to array only if it passes "validityInput()"
  if (validityInput(tab)) {
    addToArray(tab);
  }

  // Render DOM
  render();
}

// Function to to handle delete all
function handleDelete() {
  state.urlArray = [];

  // Delete localStorage
  localStorage.removeItem(STORAGE_KEY);
  
  render();
  
  alert("Saved links are removed");
}

// Function to load from storage
function loadFromStorage() {
  const storage = localStorage.getItem(STORAGE_KEY);

  if (storage) {
    state.urlArray = JSON.parse(storage);
  }
}

// Initialize
loadFromStorage();
render();

// Event listeners
saveInputButton.addEventListener("click", handleSaveInput);

saveTabButton.addEventListener("click", handleSaveTab);

deleteButton.addEventListener("dblclick", handleDelete);
