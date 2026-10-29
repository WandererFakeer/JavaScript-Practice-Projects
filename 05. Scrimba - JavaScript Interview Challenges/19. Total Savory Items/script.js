import shoppingCart from "./data.js";

/*
Use reduce() and only reduce() to calculate and return 
the total cost of only the savory
items in the shopping cart.

Expected output: 9.97  
*/

const contentEl = document.querySelector("h1");

// Helper function to get only savory items details
function savoryItemsArray(array, item) {
  const isSavory = item.type === "savory";

  if (isSavory) {
    array.push(item);
  }
  return array;
}

// Helper function to get only savory items details with reduce
function savoryItems(array) {
  return array.reduce(
    (savoryArray, item) => savoryItemsArray(savoryArray, item),
    [],
  );
}

function totalSavory(array) {
  const savoryArray = savoryItems(array);

  const totalCostOfSavory = savoryArray.reduce(
    (sum, currentValue) => sum + currentValue.price,
    0,
  );

  return totalCostOfSavory.toFixed(2);
}

contentEl.textContent = totalSavory(shoppingCart);
