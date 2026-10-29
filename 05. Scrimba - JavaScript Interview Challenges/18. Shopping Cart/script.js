import shoppingCart from "./data.js";

/*  
    Use reduce() to total the groceries. 
    Then find a method that will round the total to 2 decimal places.
*/

const contentEl = document.querySelector("h1");

function total(array) {
  const totalCost = array.reduce(
    (currentValue, currentElement) => currentValue + currentElement.price,
    0,
  );

  return totalCost.toFixed(2);
}

contentEl.textContent = total(shoppingCart);
