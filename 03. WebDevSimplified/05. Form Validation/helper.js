// Create DOM element and add textContent
function createDOMElement(element, text) {
  const el = document.createElement(element);
  el.textContent = text;
  return el;
}

export default createDOMElement;
