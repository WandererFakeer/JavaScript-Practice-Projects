/*
  Oh no, our emoji flower bed is infested with mammals, trees and leaves!
  Without changing the API query, write a function to transform your 
  data before it's displayed. The function should eliminate
  everything but bugs and flowers.
*/

const query =
  "https://apis.scrimba.com/emojihub/api/all/category/animals-and-nature";

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

// Filter only bugs and flowers
function filterOnBugsAndFlowers(obj) {
  const group = obj.group;

  return group.includes("bug") || group.includes("flower");
}

async function clearTheGarden() {
  const data = await getResponse();

  state.data = data.filter((obj) => filterOnBugsAndFlowers(obj));

  render();

  return state.data;
}

clearTheGarden();
