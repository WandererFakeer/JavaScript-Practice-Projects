import createDOMElement from "./createDOMElement.js";

// Helper function to render loading spinner
function createRenderLoadingSpinner(addExtraClass, parentEl){
  
  const loadingSpinner = createDOMElement("span", null, "spinner");
  loadingSpinner.classList.add(addExtraClass);

  parentEl.append(loadingSpinner);
  
  return loadingSpinner;
}

export default createRenderLoadingSpinner;