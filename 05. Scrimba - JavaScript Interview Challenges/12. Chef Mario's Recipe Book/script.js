/* Chef Mario's Recipe Book 
Chef Mario was in the middle of writing his cookbook masterpiece
when he spilled coffee on his keyboard! Now all his recipes have repeat
ingredients.

Help save Chef Mario's cookbook by writing a function that takes in an array 
and returns a new array with all the duplicates removed. 

Example input: ["🌈 rainbow", "🦄 unicorn", "🍭 lollipops", "🦄 unicorn", "🍭 lollipops"];
Example output: ["🌈 rainbow", "🦄 unicorn", "🍭 lollipops"];
*/

const eggScrambleRecipe = [
  "🥓 bacon",
  "🥓 bacon",
  "🍳 eggs",
  "🫑 green peppers",
  "🧀 cheese",
  "🌶️ hot sauce",
  "🥓 bacon",
  "🥦 broccoli",
  "🧀 cheese",
  "🥦 broccoli",
  "🌶️ hot sauce",
];

const ulEl = document.querySelector("ul");

let state = [];

function render() {
  const fragment = document.createDocumentFragment();

  for (const elem of state) {
    const li = document.createElement("li");
    li.textContent = elem;

    fragment.append(li);
  }

  ulEl.append(fragment);
}

function removeDupesFromArray(array) {
  /*
  for (const elem of array) {
    if (!state.includes(elem)) {
      state.push(elem);
    }
  }
  */

  state = [...new Set(array)];

  render();

  return state;
}

removeDupesFromArray(eggScrambleRecipe);
