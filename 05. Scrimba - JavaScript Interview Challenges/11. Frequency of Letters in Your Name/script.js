/* 
How often do the letters in your name repeat? 

Write a function that counts how many times each letter of your name
occurs. Your function should take in your first and last name and return
an object where the keys are each character in your name, and the value
is how many times that character appears in your name. 

Example input: "Peggy Porth"
Example output: {p: 2, e: 1, g: 2, y: 1, o: 1, r: 1, t: 1, h: 1}

Your function should NOT count spaces and should not be case sensitive (a
lowercase t and a capital T should be considered the same character).

*/

const ulEl = document.querySelector("ul");

const state = {};

function render() {
  const fragment = document.createDocumentFragment();

  for (const [key, value] of Object.entries(state)) {
    const li = document.createElement("li");

    const h2 = document.createElement("h2");
    h2.textContent = key;

    const p = document.createElement("p");
    p.textContent = value;

    li.append(h2, p);

    fragment.append(li);
  }

  ulEl.append(fragment);
}

function sanitizeString(string) {
  return string.toLowerCase().split(" ").join("").trim();
}

function countChars(string) {
  const sanitizedString = sanitizeString(string);

  for (const letter of sanitizedString) {
    letter in state ? (state[letter] = state[letter] + 1) : (state[letter] = 1);
  }

  render();

  return state;
}

countChars("Peggy Porth");
