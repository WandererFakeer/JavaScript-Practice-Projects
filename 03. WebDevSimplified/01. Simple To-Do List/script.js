import createDomElement from "./helper.js";

const formEl = document.querySelector("form");
const inputEl = document.querySelector("input");

const state = {
  addedItem: [],
};

// Render
function render() {
  const toDoListEl = document.querySelector("#to-do");

  toDoListEl.innerHTML = "";
  inputEl.value = "";

  const fragment = document.createDocumentFragment();

  state.addedItem.forEach((eachItemDetails, index) => {
    const toDoItemEl = document.createElement("li");

    const itemText = createDomElement("span", eachItemDetails);
    itemText.classList.add("to-do-item");

    const deleteButton = createDomElement("button", "Delete");
    deleteButton.setAttribute("type", "button");

    toDoItemEl.append(itemText, deleteButton);

    fragment.append(toDoItemEl);

    // "Click" Event listener
    deleteButton .addEventListener("click", () => {
      handleRemoveItem(index);
    });
  });

  toDoListEl.append(fragment);
}

// Handle adding To-Do
function handleAddItem(el) {
  if (el.value.trim() !== "") {
    state.addedItem.push(el.value);

    render();
  }
}

// Handle removing To-Do
function handleRemoveItem(index) {
  state.addedItem.splice(index, 1);

  render();
}

// "Submit" Event listener
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  handleAddItem(inputEl);
});
