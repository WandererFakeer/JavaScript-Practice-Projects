const ulEl = document.querySelector("ul");

const emojis = {
  smile: "😊",
  angry: "😠",
  party: "🎉",
  heart: "💜",
  cat: "🐱",
  dog: "🐕",
};

const state = {
  emojiWords: [],
  emojiedSentences: [],
};

function render() {
  ulEl.replaceChildren();

  const fragment = document.createDocumentFragment();

  for (const [index, emojiSentence] of state.emojiedSentences.entries()) {
    const li = document.createElement("li");

    const h2 = document.createElement("h2");
    h2.textContent = state.emojiWords[index];

    const p = document.createElement("p");
    p.textContent = emojiSentence;

    li.append(h2, p);

    fragment.append(li);
  }

  ulEl.append(fragment);
}

/* 1. Write a function that checks if a lowercase word starts and 
ends with a colon. If it does, remove the colons and
look up the word in the emoji object. If the word is in the 
emojis object, return the corresponding emoji.
If it isn't, return the original word.

Example input: ":party:"
Example output: 🎉

Example input: ":flower:"
Example output: "flower"
*/

// Helper function to extract string
function potentialEmoji(string) {
  if (string.startsWith(":") && string.endsWith(":")) {
    return string.slice(1, -1);
  }

  return string;
}

// Return emojified word
function emojifyWord(word) {
  word = potentialEmoji(word.toLowerCase());

  if (word in emojis) {
    state.emojiWords.push(emojis[word]);
    render();

    return emojis[word];
  }

  state.emojiWords.push(word);
  render();

  return word;
}

/* 2. Write a function to find any emoji shortcodes in a phrase.
Your function should map over each word in the phrase, emojify any word
that begins and ends with a colon, then return the emojified phrase. 
Feel free to use your emojify function from the previous exercise!

Example input: "I :heart: my :cat:"
Example output: "I 💜 my 🐱"

Example input: "I :heart: my elephant"
Example output: "I 💜 my elephant"
*/

// Return emojified phrase
function emojifyPhrase(phrase) {
  const wordsArray = phrase.split(" ");

  const sentenceEmojified = wordsArray
    .map((word) => emojifyWord(word))
    .join(" ");

  state.emojiedSentences.push(sentenceEmojified);

  render();

  return sentenceEmojified;
}

emojifyWord(":party:");
emojifyPhrase("I :heart: my elephant");

emojifyWord(":dog:");
emojifyPhrase("I :heart: my :flower:");
