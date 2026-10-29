// Custom function to create DOM element and add text content
function createDomElement(element, text) {
  const el = document.createElement(element);
  el.textContent = text;
  return el;
}

export default createDomElement;
