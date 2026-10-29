import createDOMElement from "./helperFunctions/createDOMElement.js";
import addGlobalEventListener from "./helperFunctions/addGlobalEventListener.js"

import {navigationHeader, cartButtonEl, cartItemsNumberEl} from "./globalReferencesAndState.js";
import { IMAGE_FORMAT, CROSS_SVG, currencyFormatter, state } from "./globalReferencesAndState.js";

const cartPanel = createDOMElement("div", null, "cart-panel");

const productsDetailsList = createDOMElement("ul", null, "cart-panel-product-details");

const totalDetails = createDOMElement("div", null, "cart-panel-total-details");

// Render Cart products
function renderCartProducts() {
  
  // Remove previous render
  productsDetailsList.replaceChildren();
  totalDetails.replaceChildren();
  cartPanel.replaceChildren();

  const fragment = document.createDocumentFragment();

  for (const item of state.cartItems) {
    const li = createDOMElement("li", null, "cart-panel-product");

    const img = createDOMElement("img", null, "cart-panel-product-image");
    img.src = `${IMAGE_FORMAT}${item.product.imageColor}/${item.product.imageColor}`;

    const button = createDOMElement("button", null, "cart-panel-remove-button");
    button.setAttribute("type", "button");
    button.setAttribute("data-id", item.product.id);
    button.innerHTML = CROSS_SVG;

    const div = createDOMElement("div", null, "cart-panel-product-text-details");

    const itemName = createDOMElement("p", item.product.name, "cart-panel-product-name");

    div.append(itemName);

    if(item.quantity > 1){
      const quantity = createDOMElement("p", `x${item.quantity}`, null);
      div.append(quantity);
    }

    const price = createDOMElement("p", currencyFormatter.format(item.product.priceCents * item.quantity / 100), "cart-panel-product-price");

    div.append(price);

    li.append(img, button, div);

    fragment.append(li);
  };

  productsDetailsList.append(fragment);

  const total = createDOMElement("p", "Total", "cart-panel-price-text");

  const totalPrice = createDOMElement("p", currencyFormatter.format(state.totalPrice), "cart-panel-price-text");

  totalDetails.append(total, totalPrice);

  cartPanel.append(productsDetailsList, totalDetails);
}

// Render Cart Button
function renderCartButton(){
  cartButtonEl.hidden = (state.cartItems.length === 0);
  cartItemsNumberEl.textContent = state.cartItems.length;
}

// Render Cart Panel
function renderCartPanel(){

  if (state.cartItems.length > 0 && cartPanel.hidden) {
    if(!navigationHeader.contains(cartPanel)){
      navigationHeader.append(cartPanel);
    } 
  }

  else{
    if(navigationHeader.contains(cartPanel)){
      cartPanel.hidden = false;
      navigationHeader.removeChild(cartPanel);
    }
  }
}

// render main UI
function renderUI(){
   
  if(state.cartItems.length > 0){
    renderCartProducts();
  }

  // If added item is at least 1, show Cart Button and render Cart Panel, else hide Cart Button and Cart Panel
  renderCartButton();
  renderCartPanel();
}

// Handler Add To Cart
function handleAddDetails(e) {
  e.preventDefault();
  
  const target = e.target;

  if(!target.classList.contains("add-to-cart")){
    return;
  }

  // Get the id from which the click happened, find the product from "state.data", add and update data in "state.cartItems"
  const id = Number(target.dataset.itemId);

  const data = state.data.find((item) => item.id === id);

  const existingcartItem = state.cartItems.find((item) => item.product.id === data.id);

  if (!existingcartItem) {
    state.cartItems.push({product: data, 
      quantity: 1});
  } 
  
  else {
    existingcartItem.quantity += 1;
  }
  
  state.totalPrice += data.priceCents / 100;

  renderUI();
}

// Handler Delete Cart product
function handleRemoveDetails(e){
  const target = e.target;
  const parentEl = target.closest(".cart-panel-remove-button");

  const idToRemove = Number(parentEl.dataset.id);

  state.cartItems = state.cartItems.filter((element) => element.product.id !== idToRemove);

  state.totalPrice = state.cartItems.reduce((total, item) => {
    return total += item.product.priceCents * item.quantity / 100;
  }, 0);

  renderUI();

}

// Handle Cart Panel
function handleCartPanel(){

  cartPanel.hidden = !cartPanel.hidden;

  renderUI();
}

// "click" events on form, "cart-button" class and "cart-panel-remove-button" class
function cartProducts(){
  addGlobalEventListener("click", "#form", handleAddDetails);
  addGlobalEventListener("click", ".cart-button", handleCartPanel);
  addGlobalEventListener("click", ".cart-panel-remove-button", handleRemoveDetails);
}

export default cartProducts;