import products from "./data.js";

/*
    You're online shopping for holiday gifts, but money is tight
    so we need to look at the cheapest items first. 
    Use the built in sort() method to write a function that returns a new array of
    products sorted by price, cheapest to most expensive. 
    
    Output:    
    💕,0
    🍬,0.89
    🍫,0.99
    🧁,0.99
    📚,0.99
    ... continued
*/

const ulEl = document.querySelector("ul");

const state = {
  cheapestProducts: [],
};

function render() {
  const fragment = document.createDocumentFragment();

  for (const detail of state.cheapestProducts) {
    const li = document.createElement("li");

    const product = document.createElement("p");
    product.textContent = detail.product;

    const price = document.createElement("p");
    price.textContent = detail.price;

    li.append(product, price);

    fragment.append(li);
  }

  ulEl.append(fragment);
}

function ascendingSorting(first, second) {
  return first.price - second.price;
}

function sortProducts(data) {
  state.cheapestProducts = data.toSorted((firstProduct, secondProduct) =>
    ascendingSorting(firstProduct, secondProduct),
  );

  render();

  return state.cheapestProducts;
}

sortProducts(products);
