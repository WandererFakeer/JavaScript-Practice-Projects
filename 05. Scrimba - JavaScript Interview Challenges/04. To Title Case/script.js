/* toTitleCase
Write a function that will capitalize every word in a sentence.  

Example Input: "everything, everywhere, all at once"
Example Output: "Everything, Everywhere, All At Once"
*/

/* 
First, write a function that takes in one word and 
capitalizes the first letter of that word.

Example Input: "scrimba"
Example Output: "Scrimba"

Hint: Trying using slice() and .toUpperCase()
*/

const contentEl = document.querySelector("h1");

function capitalizeWord(word) {
  return `${word[0].toUpperCase()}${word.slice(1)}`;
}

function toTitleCase(string) {
  const array = string.split(" ");
  const titleCaseArray = array.map((word) => capitalizeWord(word));

  return titleCaseArray.join(" ");
}

contentEl.textContent = toTitleCase("everything, everywhere, all at once");
