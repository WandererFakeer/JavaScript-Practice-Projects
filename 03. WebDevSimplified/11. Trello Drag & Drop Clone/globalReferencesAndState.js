const formEl = document.querySelector("#form");
const taskListsEl = Array.from(document.querySelectorAll("[data-task]"));
const enteredTasksEl = Array.from(document.querySelectorAll(".entered-task"));

const state = {
  addedItems: [], 
};

export {formEl, taskListsEl, enteredTasksEl};
export default state;
