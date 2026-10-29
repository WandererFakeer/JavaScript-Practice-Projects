/* 
Scrimba mascot Pumpkin has won the grand prize at an international 
cat show. Below are Pumpkin's scores from the judges, as well as all the 
prizes he's won. In all the excitement of victory,
they've become a jumbled mess of nested arrays. Let's 
help Pumpkin by sorting it out. 

Write a function to flatten nested arrays of strings or
numbers into a single array. There's a method
for this, but pratice both doing it manually and using the method. 

Example input: [1, [4,5], [4,7,6,4], 3, 5]
Example output: [1, 4, 5, 4, 7, 6, 4, 3, 5]
*/

const kittyPrizes = [
  ["💰", "🐟", "🐟"],
  "🏆",
  "💐",
  "💵",
  ["💵", "🏆"],
  ["🐟", "💐", "💐"],
  "💵",
  "💵",
  ["🐟"],
  "🐟",
];

const contentEl = document.querySelector("h1");

function flatten(array) {
  /*
  for (const elem of array) {
    if (typeof elem !== "object") {
      flattenedArray.push(elem);
    } else {
      for (const innerElem of elem) {
        if (typeof innerElem !== "object") {
          flattenedArray.push(innerElem);
        }
      }
    }
  }
  */

  return array.flat();
}

contentEl.textContent = flatten(kittyPrizes);
