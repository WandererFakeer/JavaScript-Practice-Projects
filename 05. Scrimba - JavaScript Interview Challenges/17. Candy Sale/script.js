import products from "./data.js";

/*
   It's the day after Halloween 🎃 and all the candy is on sale!
   
   To buy up all the candy, use map() and filter() to put all the
   candy into a `shoppingCart` array. 
   
   The new array should contain only the item and the price, like
   this: 
   
   Expected output: 
   [
    {item: "🍭", price: 2.99},
    {item: "🍫", price: 1.99}, 
    {item: "🍬", price: 0.89}
    ]
*/

const ulEl = document.querySelector("ul");

const state = {
  candyData: [],
};

function render() {
  const fragment = document.createDocumentFragment();

  for (const detail of state.candyData) {
    const li = document.createElement("li");

    const h2 = document.createElement("h2");
    h2.textContent = `Item: ${detail.item}`;

    const p = document.createElement("p");
    p.textContent = `Price: ${detail.price}`;

    li.append(h2, p);

    fragment.append(li);
  }

  ulEl.append(fragment);
}

function getSaleItems(data) {
  state.candyData = data.filter((item) => item.type === "sweet");

  render();

  return state.candyData;
}

getSaleItems(products);
