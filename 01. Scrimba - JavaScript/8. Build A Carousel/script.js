// DOM references
const photos = document.querySelectorAll("img");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const caption = document.querySelector("#dog-name");

const state = {
  currentSlide: 0
};

// Function to render
function render(){
  caption.textContent = `${state.currentSlide + 1} out of ${
    photos.length
  } images: ${photos[state.currentSlide].alt}`;
}

// Function to move to previous slide
function handlePreviousButton(){
  
  // Hide current slide
  photos[state.currentSlide].hidden = true;
  
  // Update "currentSlide"
  if(state.currentSlide === 0){
    state.currentSlide = (photos.length - 1);
  }
  
  else{
    state.currentSlide--;
  }
  
  // Show the updated slide
  photos[state.currentSlide].hidden = false;
  
  // Render DOM
  render();
}

// Function to move to next slide
function handleNextButton(){
  
  // Hide current slide
  photos[state.currentSlide].hidden = true;
  
  // Update "currentSlide"
  if(state.currentSlide === (photos.length - 1)){
    state.currentSlide = 0;
  }
  
  else{
    state.currentSlide++;
  }
  
  // Show the new slide
  photos[state.currentSlide].hidden = false;
  
  // Render DOM
  render();
}

// Initialize
render();

// Event listeners
previousButton.addEventListener("click", handlePreviousButton);

nextButton.addEventListener("click", handleNextButton);

// Automated slide transition
setInterval(handleNextButton, 10000);