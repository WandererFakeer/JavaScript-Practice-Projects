// DOM references
const emojiContainer = document.querySelector("#emoji-container");
const userInput = document.querySelector("input");
const addEnd = document.querySelector("#add-end");
const addBeginning = document.querySelector("#add-beginning");
const removeEnd = document.querySelector("#remove-end");
const removeBeginning = document.querySelector("#remove-beginning");

const SAVE_EMOJI = "My Emojis";

// State object
const state = {
  emojiArray: ["💻", "🚆", "😴"]
}

// Function to render
function render(){
  // Create empty DocumentFragment
  const fragment = document.createDocumentFragment();
  
  state.emojiArray.forEach( (emoji) => {
    const list = document.createElement("li");
    list.textContent = emoji;
    fragment.append(list);
  } )
  
  // Replace existing list items with the newly created ones
  emojiContainer.replaceChildren(fragment);
  
  // Remove buttons visibility based on game state 
  const isEmpty = (state.emojiArray.length === 0);
  removeEnd.disabled = isEmpty;
  removeBeginning.disabled = isEmpty;
}

// Function to set localStorage on entire array
function persist(){
  return localStorage.setItem(SAVE_EMOJI, JSON.stringify(state.emojiArray));
}

// Function to reset user input
function resetInput(){
  userInput.value = "";
}

// Function to check if input is duplicate 
function isDuplicate(emoji){
  return state.emojiArray.includes(emoji);
}

// Function to handle adding emoji
function handleAdd(value, addingPosition){
  
  // If nothing is entered, just return
  if(!value){
    
    // Reset input
    resetInput();
    return;
  }
 
  if(isDuplicate(value)){
    alert("Duplicate emoji: You already entered it");
    
    // Reset input
    resetInput();
    return;
  }
  
  (addingPosition === "push") ? state.emojiArray.push(value) : state.emojiArray.unshift(value);
  
  // Persist the updated array
  persist();
  
  render();
  
  // Reset input
  resetInput();
}

// Function to handle add emoji to end
function handleAddEnd(){
  const userValue = userInput.value.trim();
  
  // Handle adding emoji with "handleAdd()"
  handleAdd(userValue, "push"); 
}

// Function to handle add emoji to beginning
function handleAddBeginning(){
  const userValue = userInput.value.trim();
  
  // Handle adding emoji with "handleAdd()"
  handleAdd(userValue, "unshift"); 
}

// Function to handle removing emoji
function handleRemove(removingPosition){
 
  if (state.emojiArray.length === 0) {
    return;
  }
  
  (removingPosition === "pop") ? state.emojiArray.pop() : state.emojiArray.shift();
  // Persist the updated array
  persist();
 
  render();
}

// Function to handle remove emoji from end
function handleRemoveEnd(){
 handleRemove("pop");
}

// Function to handle remove emoji from start
function handleRemoveBeginning(){
 handleRemove("shift"); 
}

// Function to load from storage
function loadFromStorage(){
  const storage = localStorage.getItem(SAVE_EMOJI);
  
  if (storage){
    state.emojiArray = JSON.parse(storage);
  }
}

// Initialize
loadFromStorage();
render();

// Event listeners
addEnd.addEventListener("click", handleAddEnd);

addBeginning.addEventListener("click", handleAddBeginning);

removeEnd.addEventListener("click", handleRemoveEnd);

removeBeginning.addEventListener("click", handleRemoveBeginning);