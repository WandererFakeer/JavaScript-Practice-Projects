/* We Come in Peace!  
We've received what (we assume) is a message of peace and brotherhood from 
an alien planet. They almost got it right, but the messages are 
backward. Write functions to reverse the backward messages so we can 
read what they have to say! 
*/

const title = ":htraE no od ot ffutS";
const messages = [
  "maerc eci yrT",
  "rewoT leffiE tisiV",
  "noom eht ot snamuh etacoleR",
  "egrahc ni stac tuP",
];

const state = {
  heading: "",
  toDoList: [],
};

const mainEl = document.querySelector("main");

function render() {
  mainEl.replaceChildren();

  const h1 = document.createElement("h1");
  h1.textContent = state.heading;

  const ul = document.createElement("ul");

  const fragment = document.createDocumentFragment();

  for (const toDo of state.toDoList) {
    const li = document.createElement("li");
    li.textContent = toDo;

    fragment.append(li);
  }

  ul.append(fragment);

  mainEl.append(h1, ul);
}

/* Step 1: Reverse a string
Write a function that takes in a string and returns the reverse 
of that string. An interviewer may want to check if you know your
string methods, or may want to know if you can reverse a string manually. 
Practice both ways! 

Example input: !htrae ot emocleW
Example output: Welcome to earth!
*/

function reverseString(string) {
  let correctSentence = "";

  for (let i = string.length - 1; i >= 0; i--) {
    correctSentence += string[i];
  }

  state.heading = correctSentence;

  render();

  return correctSentence;
}

/*
Step 2: Now we'll reverse all strings in an array. Write a function that takes in
an array of strings and returns a new array with all strings reversed.

You can use reuse your reverseString() function, use string methods, or 
reverse the strings manually. 
*/

function reverseStringsInArray(arr) {
  const listOfToDos = arr.map((string) => {
    const correctSentence = reverseString(string);

    state.toDoList.push(correctSentence);

    return correctSentence;
  });

  render();

  return listOfToDos;
}

reverseString(title);
reverseStringsInArray(messages);
