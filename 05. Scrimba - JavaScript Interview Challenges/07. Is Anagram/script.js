/* 

Anagrams are groups of words that can be spelled with the same letters. 
For example, the letters in "pea" can be rearrange to spell "ape", and 
the letters in "allergy" can be rearranged to spell "gallery."

Write a function to check if two strings of lowercase letters are anagrams. 
Return true if the word is an anagram. Return false if it isn't. 

Example input: "allergy", "gallery"
Example output: true

Example input: "rainbow", "crossbow"
Example output: false

*/

const contentEl = document.querySelector("h1");

function isAnagram(firstString, secondString) {
  if (firstString.length !== secondString.length) {
    return false;
  }

  return (
    firstString.split("").sort().join("") ===
    secondString.split("").sort().join("")
  );
}

contentEl.textContent = isAnagram("allergy", "gallery");
