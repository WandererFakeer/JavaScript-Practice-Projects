/* Find anagrams in an array   

When two words have the exact same letters, they are anagrams. 

Write a function to determine which strings in the array are 
anagrams of a given string.

Your function should take two parameters: the phrase you want to compare to
the anagrams, and an array of anagrams. The function should return
a new array of anagrams that match the phrase. 

Example input: treat, ["tater", "tree", "teart", "tetra", "heart", "hamster"]
Example output: ["tater", "teart", "tetra"]

 */

const anagrams = ["tater", "tree", "teart", "tetra", "heart", "hamster"];

const ulEl = document.querySelector("ul");

const state = {
  anagramsArray: [],
};

function render() {
  const fragment = document.createDocumentFragment();

  for (const detail of state.anagramsArray) {
    const li = document.createElement("li");
    li.textContent = detail;

    fragment.append(li);
  }

  ulEl.append(fragment);
}

// Sanitize string
function sanitizeString(string) {
  return string.toLowerCase().split(" ").join("");
}

// Check if 2 strings are anagram or not
function isAnagram(firstString, secondString) {
  firstString = sanitizeString(firstString);
  secondString = sanitizeString(secondString);

  let count = 0;

  if (firstString.length !== secondString.length) {
    return false;
  }

  for (const letter of firstString) {
    if (secondString.includes(letter)) {
      count += 1;
    }
  }

  if (count === firstString.length) {
    return true;
  }

  return false;
}

function isAnagramInArray(anagram, array) {
  state.anagramsArray = array.filter((item) => isAnagram(item, anagram));

  render();

  return state.anagramsArray;
}

isAnagramInArray("treat", anagrams);
