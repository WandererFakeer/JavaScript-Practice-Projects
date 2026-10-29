// Helper function to create element
function createCustomElement(element, className, text) {
  const el = document.createElement(element);

  if (className) {
    el.classList.add(className);
  }

  if (text) {
    el.textContent = text;
  }

  return el;
}

export default createCustomElement;
