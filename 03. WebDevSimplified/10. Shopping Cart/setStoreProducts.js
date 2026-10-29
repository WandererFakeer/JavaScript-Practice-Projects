import createDOMElement from "./helperFunctions/createDOMElement.js";

import {productsListEl} from "./globalReferencesAndState.js";
import {IMAGE_FORMAT, currencyFormatter, state} from "./globalReferencesAndState.js";

// Render store products
function renderStoreProducts() {
  const fragment = document.createDocumentFragment();

  for(const data of state.data){
    const list = createDOMElement("li", null, "product-item");

    const image = createDOMElement("img", null, "product-image");
    image.src = `${IMAGE_FORMAT}${data.imageColor}/${data.imageColor}`;

    const productDetails = createDOMElement("div", null, "product-details");

    const productVariety = createDOMElement("h2", data.category, "product-variety");

    const productName = createDOMElement("h3", data.name, "product-name");

    const productPrice = createDOMElement("p", currencyFormatter.format(data.priceCents / 100), "product-price");

    const AddToCartButton = createDOMElement("button", "Add To Cart", "add-to-cart");
    AddToCartButton.setAttribute("type", "button");
    AddToCartButton.setAttribute("data-item-id", data.id);

    productDetails.append(productVariety, productName, productPrice, AddToCartButton);

    list.append(image, productDetails);

    fragment.append(list);
  };

  productsListEl.append(fragment);
}

// Get items data back from "items.json"
async function readItemsData() {
  const response = await fetch("items.json");
  return await response.json();
}

// Set store data to render
async function setStoreProducts() {
  state.data = await readItemsData();

  renderStoreProducts();
}

export default setStoreProducts;
