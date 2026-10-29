// Helper function to create DOM elements
function createDOMElement(element, text, classList) {
  const el = document.createElement(element);

  if (text !== null) {
    el.textContent = text || "Unavailable";
  }

  if (classList != null) {
    el.classList.add(classList);
  }

  return el;
}

export default createDOMElement;
