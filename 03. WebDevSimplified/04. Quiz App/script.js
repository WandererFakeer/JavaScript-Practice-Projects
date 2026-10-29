const form = document.querySelector("#form");
const questionsAndOptionsEl = document.querySelectorAll(".answer-and-options");
const congratsBannerEl = document.querySelector("#congrats-banner");

const state = {
  data: {},
  isAnswerCorrect: [],
  isAllAnswerCorrect: false,
};

// Render
function render() {
  questionsAndOptionsEl.forEach((questionAndOptionEl, index) => {
    const isCorrect = state.isAnswerCorrect[index];

    questionAndOptionEl.classList.toggle("correct-answer", isCorrect);
    questionAndOptionEl.classList.toggle("incorrect-answer", !isCorrect);
  });

  if (state.isAllAnswerCorrect) {
    congratsBannerEl.hidden = !state.isAllAnswerCorrect;

    setTimeout(() => {
      congratsBannerEl.hidden = state.isAllAnswerCorrect;
    }, 2000);
  }
}

// Get form data
function formData(el) {
  const formData = new FormData(el);
  return Object.fromEntries(formData);
}

// Check if user answer and given correct answer are same or not
function checkAnswer(choice) {
  const CORRECT_ANSWERS = [{ "answer-one": "Hi" }, { "answer-two": "Recursion" }, { "answer-three": "element.dataset.count" }];

  const array = [];

  CORRECT_ANSWERS.forEach((obj) => {
    const [currentKey, currentCorrectAnswer] = Object.entries(obj)[0];

    // If the answer is correct, push true. Else push false
    currentCorrectAnswer === choice[currentKey] ? array.push(true) : array.push(false);

    return array;
  });

  return array;
}

// Check if a given input is true or not
function isAllTrue(item) {
  return item === true;
}

// Handle submit function
function handleSubmit(e) {
  e.preventDefault();

  // Set data, isAnswerCorrect array and isAllAnswerCorrect boolean
  state.data = formData(form);
  state.isAnswerCorrect = checkAnswer(state.data);
  state.isAllAnswerCorrect = state.isAnswerCorrect.every((item) => isAllTrue(item));

  render();
}

// Event handler
form.addEventListener("submit", handleSubmit);
