import podcasts from "./data.js";

/* Find Free Podcasts 

We have a list of podcasts and need the ability to filter by only
podcasts which are free.

Write a function that takes in the podcast data and returns a new
array of only those podcasts which are free.

Additionally, your new array should return only 
objects containing only the podcast title, rating, and whether or 
not it is paid. 

Expected output: 
[
    {title: "Scrimba Podcast", rating: 10, paid: false}, 
    {title: "Something about Witches", rating: 8, paid: false}, 
    {title: "Coding Corner", rating: 9, paid: false}
]
*/

const ulEl = document.querySelector("ul");

const state = {
  freeData: [],
};

function render() {
  const fragment = document.createDocumentFragment();

  for (const detail of state.freeData) {
    const li = document.createElement("li");

    const h2 = document.createElement("h2");
    h2.textContent = `Title: ${detail.title}`;

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${detail.rating}`;

    const isPaid = document.createElement("p");
    isPaid.textContent = `Paid: ${detail.paid}`;

    li.append(h2, rating, isPaid);

    fragment.append(li);
  }

  ulEl.append(fragment);
}

function getFreePodcasts(data) {
  state.freeData = data.filter((item) => !item.paid);

  render();

  return state.freeData;
}

getFreePodcasts(podcasts);
