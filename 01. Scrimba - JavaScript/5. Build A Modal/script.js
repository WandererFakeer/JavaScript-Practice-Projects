// DOM references
const contactButton = document.querySelector("#contact");
const overlaySection = document.querySelector(".overlay");
const closeButton = document.querySelector("#close");

const state = {
  isOverlayVisible: false
};

// Function to render
function render(){
  overlaySection.hidden = !state.isOverlayVisible;
  
  if (state.isOverlayVisible){
    closeButton.focus();
  } 
  
  else{
    contactButton.focus();
  }
}

// Function to handle open modal
function handleOpenModal(){
  state.isOverlayVisible = true;
  render();
}

// Function to handle close modal
function handleCloseModal(){
  state.isOverlayVisible = false;
  render();
}

// Event listeners
contactButton.addEventListener("click", handleOpenModal);

closeButton.addEventListener("click", handleCloseModal);