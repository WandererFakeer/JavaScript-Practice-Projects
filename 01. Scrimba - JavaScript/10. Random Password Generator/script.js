// DOM references
const passwordInput = document.querySelector("input");
const button = document.querySelector("button");
const passwordPlaces = document.querySelectorAll(".password");
const announce = document.querySelector("#announcement-section");

const NUMBER_OF_PASSWORD_PLACES = passwordPlaces.length;

// ASCII ranges
const FIXED_VARIABLES = {
  ASCII_A: 65,
  ASCII_Z: 90,
  ASCII_a: 97,
  ASCII_z: 122,
  START1: 39,
  END1: 47,
  START2: 58,
  END2: 64,
  START3: 91,
  END3: 96,
  START4: 123,
  END4: 126,
};

const state = {
  capitalAlphaArray: fillArray(
    FIXED_VARIABLES.ASCII_A,
    FIXED_VARIABLES.ASCII_Z
  ),
  smallAlphaArray: fillArray(FIXED_VARIABLES.ASCII_a, FIXED_VARIABLES.ASCII_z),
  specialCharsArray: [
    ...fillArray(FIXED_VARIABLES.START1, FIXED_VARIABLES.END1),
    ...fillArray(FIXED_VARIABLES.START2, FIXED_VARIABLES.END2),
    ...fillArray(FIXED_VARIABLES.START3, FIXED_VARIABLES.END3),
    ...fillArray(FIXED_VARIABLES.START4, FIXED_VARIABLES.END4),
  ],
  numbersArray: fillNumber(),
  allCharsArray: [],
  generatedPasswords: [],
};

// Get "state.allCharsArray" with "allArrays()"
state.allCharsArray = allArrays();

// Function to read on-screen
function announcement(message) {
  announce.textContent = "";

  setTimeout(() => {
    announce.textContent = message;
  }, 250);
}

// Function to render
function render() {
  passwordPlaces.forEach((password, index) => {
    const generatedValue = state.generatedPasswords[index];

    // Add "generated-password" only if "generatedValue" is a string and has more than 0 strings
    if (typeof generatedValue === "string" && generatedValue.length > 0) {
      password.textContent = generatedValue;
      password.classList.add("generated-password");
    } else {
      password.textContent = "...";
      password.classList.remove("generated-password");
    }
  });
}

// Function to fill arrays with strings from UTF-16 numbers
function fillArray(minNum, maxNum) {
  return Array.from({ length: maxNum - minNum + 1 }, (_, i) =>
    String.fromCharCode(minNum + i)
  );
}

// Function to fill arrays with strings from 0 - 9
function fillNumber() {
  return Array.from({ length: 10 }, (_, i) => String(i));
}

// Function to push all arrays into one big array
function allArrays() {
  return [
    ...state.capitalAlphaArray,
    ...state.smallAlphaArray,
    ...state.specialCharsArray,
    ...state.numbersArray,
  ];
}

// Function to check if input is invalid
function isInputInvalid(inputLength) {
  return Number.isNaN(inputLength) || inputLength < 8 || inputLength > 64;
}

// Function to get random string character from "state.allCharsArray"
function generateRandomChar() {
  const randomIndex = Math.floor(Math.random() * state.allCharsArray.length);
  return state.allCharsArray[randomIndex];
}

// Function to generate a random password of user specified length
function generateARandomPassword(passwordLength) {
  let passwordString = "";

  for (let i = 0; i < passwordLength; i++) {
    passwordString += generateRandomChar();
  }

  return passwordString;
}

// Function to reset state
function resetState() {
  state.generatedPasswords = [];
}

// Function to handle passwords generation
function handleGeneratePasswords() {
  // Truncate the user input value
  const PASSWORD_LENGTH = Math.trunc(passwordInput.valueAsNumber);

  // Check if user input is invalid
  if (isInputInvalid(PASSWORD_LENGTH)) {
    alert("Password length must be between 8 and 64");

    // Reset the previously generated passwords
    resetState();
    render();
    return;
  }

  // Reset state to stop unlimited array growth
  resetState();

  // Generate "NUMBER_OF_PASSWORD_PLACES" passwords
  state.generatedPasswords = Array.from(
    { length: NUMBER_OF_PASSWORD_PLACES },
    () => generateARandomPassword(PASSWORD_LENGTH)
  );

  render();

  announcement(`The generated passwords are: ${state.generatedPasswords}`);
}

// Function to copy password
function handleClipboardCopy(e) {
  // Find the currently targetted element
  const currentElement = e.currentTarget;
  const text = currentElement.textContent.trim();

  if (!text || text === "...") {
    return;
  }

  // Write text to user's system clipboard
  navigator.clipboard
    .writeText(text)
    .then(() => alert(`The copied password is: ${text}`))
    .catch((error) => alert(`Copy failed: ${error}`));
}

// Initialize
render();

// Event listeners
button.addEventListener("click", handleGeneratePasswords);

passwordPlaces.forEach((password) => {
  password.addEventListener("click", handleClipboardCopy);
});
