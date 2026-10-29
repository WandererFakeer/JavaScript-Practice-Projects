/*
   Let's create an emoji slot machine!
   
   - Request emoji food data from the API resource below.
        - Write a function that takes in the data and returns a new array of only
        fruit emoji objects

        - Write a function to get 9 random fruits from the new array of fruit 
*/

const query =
  "https://apis.scrimba.com/emojihub/api/all/category/food-and-drink";

const ulEl = document.querySelector("ul");

const state = {
  data: [],
};

function render() {
  const fragment = document.createDocumentFragment();

  for (const detail of state.data) {
    const li = document.createElement("li");
    li.innerHTML = detail.htmlCode;

    fragment.append(li);
  }

  ulEl.append(fragment);
}

// Get response from API Call
async function getResponse() {
  try {
    const response = await fetch(query);

    if (!response.ok) {
      return;
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// Filter only fruits data
function filterFruits(obj) {
  return obj.group.includes("fruit");
}

// Get only the fruits array
async function makeFruitArray() {
  const data = await getResponse();

  const fruitsArray = data.filter((obj) => filterFruits(obj));

  return fruitsArray;
}

// Helper function to get random element from given array
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

// Get 9 randomly chosen fruits objects
async function getRandomFruits() {
  const randomData = await makeFruitArray();

  const data = [];

  for (let i = 1; i <= 9; i++) {
    data.push(getRandomElement(randomData));
  }

  state.data = data;

  render();

  return state.data;
}

getRandomFruits();
