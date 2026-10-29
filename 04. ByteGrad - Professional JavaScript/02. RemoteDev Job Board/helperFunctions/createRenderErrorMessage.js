// Helper function to render error message
function createRenderErrorMessage(errorMessage, parentEl){
  
  const error = document.createElement("p");
  error.textContent = errorMessage;
  error.classList.toggle("error-element");
  
  parentEl.append(error);

  setTimeout(() => {
    if(parentEl.querySelector(".error-element")){
      parentEl.removeChild(error);
    }
  }, 4000)
  
}

export default createRenderErrorMessage;