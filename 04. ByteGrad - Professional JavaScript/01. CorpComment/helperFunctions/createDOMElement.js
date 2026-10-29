// Helper function to create DOM elements
function createDOMElement(element, text, className){
  const el = document.createElement(element);

  if (text != null){
    el.textContent = text;
  }

  if(className != null){
    el.classList.add(className);
  }
  
  return el;
}

export default createDOMElement;