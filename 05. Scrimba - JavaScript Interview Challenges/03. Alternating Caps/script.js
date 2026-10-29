/* Alternating Caps 
Write a function that takes in a string of letters
and returns a sentence in which every other letter is capitalized.

Example input: "I'm so happy it's Monday"
Example output: "I'M So hApPy iT'S MoNdAy"
*/

const contentEl = document.querySelector("h1");

function alternatingCaps(string) {
  let sentence = "";
  for (let i = 0; i < string.length; i++) {
    i % 2 === 0
      ? (sentence += string[i].toUpperCase())
      : (sentence += string[i]);
  }

  return sentence;
}

contentEl.textContent = alternatingCaps("I'm so happy it's Monday");
