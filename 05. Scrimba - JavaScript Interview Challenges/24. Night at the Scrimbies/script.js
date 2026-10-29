import podcasts from "./data.js";

/* Night at the Scrimbies 

It's time for the Scrimbies, a prestigious award show for podcast hosts.
We need to assemble a list of podcast hosts so we can start handing out awards. 

Write a function that takes in the podcast data and
returns a flat array of podcast hosts. There are quite a few ways to approach
this, but try solving the problem using reduce(). 

Once you have a flat array of hosts, write a second function to randomly assign each host a prize
from the awards array. 

Example output: ["🏆 Alex Booker", "⭐ Bob Smith", "💎 Camilla Lambert" ...] 

*/

const awards = ["🏆", "⭐", "💎", "🥇", "👑"];

const ulEl = document.querySelector("ul");

const state = {
  randomAwardsForHosts: [],
};

function render() {
  const fragment = document.createDocumentFragment();

  for (const detail of state.randomAwardsForHosts) {
    const li = document.createElement("li");
    li.textContent = detail;

    fragment.append(li);
  }

  ulEl.append(fragment);
}

// Get all the hosts array
function getHosts(data) {
  return data.reduce(
    (hostsArray, currentValue) => hostsArray.concat(currentValue.hosts),
    [],
  );
}

// Helper function to get a random element from array
function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// Assign random awards to hosts
function assignAwards(data) {
  const hostsArray = getHosts(data);

  const array = [];

  for (const host of hostsArray) {
    array.push(`${getRandomElement(awards)} ${host}`);
  }

  state.randomAwardsForHosts = array;

  render();

  state.randomAwardsForHosts;
}

assignAwards(podcasts);
