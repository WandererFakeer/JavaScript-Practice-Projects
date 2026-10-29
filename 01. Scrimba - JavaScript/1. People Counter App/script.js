// DOM references
const enterCounter = document.querySelector("#enter-count");
const incrementButton = document.querySelector("#increment");
const saveButton = document.querySelector("#save");
const savedCount = document.querySelector("#saved-count");

// Save state variables as object
const state = {
  currentEntry: 0,
  savedArray: [],
};

// Function to render
function render() {
  enterCounter.textContent = state.currentEntry;
  savedCount.textContent = state.savedArray.join(" - ");
}

// Function to handle the increment
function handleIncrement() {
  state.currentEntry += 1;

  // render
  render();
}

// Function to reset state property
function resetCurrent() {
  state.currentEntry = 0;
}

// Function to handle save
function handleSave() {
  state.savedArray.push(state.currentEntry);

  // Reset
  resetCurrent();

  // render
  render();
}

// Initial render
render();

// Event listeners
incrementButton.addEventListener("click", handleIncrement);

saveButton.addEventListener("click", handleSave);
