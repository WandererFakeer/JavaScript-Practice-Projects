// DOM reference
const mainBody = document.querySelector("main");

const dogURL = "https://dog.ceo/api/breeds/image/random";

// Function to return data from API
async function dogReq() {
  const response = await fetch(dogURL);

  const data = await response.json();

  return data.message;
}

// Function to render
async function render() {
  const dogData = await dogReq();

  const dogImage = document.createElement("img");

  dogImage.src = dogData;

  dogImage.alt = "Random images of dogs from Dog API";

  mainBody.append(dogImage);
}

// Render DOM
render();