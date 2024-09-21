import {
  CATEGORIES_API,
  PRODUCTS_PER_CATEGORIES,
  PRODUCTS_CATEGORIES,
  PRODUCTS_API,
} from "../config.js";

import "../modules/CartModule.js";
import { CartModule } from "../modules/CartModule.js";
import { CartObserver } from "../observers/CartObserver.js";
import { ProductFactory } from "../factories/ProductFactory.js";
import { StoreView } from "../View/storeView.js";
import { CartView } from "../View/cartView.js";

import * as global from "../global.js";

// Instantitation the componenets
const cartModule = new CartModule(PRODUCTS_API);
const productFactory = new ProductFactory();
const cartObserver = new CartObserver();
const storeView = new StoreView();
const cartView = new CartView();

const controllerLoadData = async function () {
  await cartModule.fetchProducts();
  const data = cartModule.products;

  await cartModule.getCartItemFromLocalStorage();

  // if (cartModule.cart.size) displaytotalCartProducts(cartModule.cart.size);
  data.forEach((productData) => {
    const product = productFactory.createProduct(productData);

    if (cartModule.cart.has(product.id)) {
      product.isChecked = true;
      handleCartProduct(product.id, cartModule.cart.get(product.id));
    }

    cartObserver.notify("INIT", product);
  });

  // set total price

  global.updateTotalPrice(cartModule.totalCart);
};

const handleCartProduct = function (productID, quantity) {
  const productData = cartModule.getProduct(productID);
  const product = productFactory.createCartProduct(productData, quantity);

  // render the product in the cart
  cartView.render(product);
  // update the UI of a number of products in the cart
  if (cartModule.cart.size > 0)
    global.displaytotalCartProducts(cartModule.cart.size);
};

const controllerAddPtoductToCart = async function (productID, quantity = 1) {
  if (cartModule.cart.has(productID)) return;

  // add product in the cart container
  await cartModule.setProductInCart(productID, quantity);

  global.updateTotalPrice(cartModule.totalCart);

  handleCartProduct(productID, quantity);
};

const controllerProductQuantity = function (productID, newQuantity) {
  // console.log("product", productID, newQuantity);

  cartModule.setProductInCart(productID, newQuantity);
  global.updateTotalPrice(cartModule.totalCart);
};

const controllerDeletionProduct = async function (productID) {
  await cartModule.deleteProductInCart(productID);
  cartView.clear();
  for (const [id, quantity] of Array.from(cartModule.cart.entries())) {
    handleCartProduct(id, quantity);
  }

  storeView.uncheckedProduct(productID);
  global.updateTotalPrice(cartModule.totalCart);

  if (!cartModule.cart.size) hiddentotalCartProducts();
};

const init = function () {
  cartObserver.notify("EVENTS");
  controllerLoadData();
};

// Subscribe the observer function to CartObserver
cartObserver.subsecribe("INIT", storeView.render.bind(storeView));

// cartObserver.subsecribe("EVENTS", cartView.render.bind(cartView));
cartObserver.subsecribe(
  "EVENTS",
  storeView.addHandlerAddProductToCart.bind(
    storeView,
    controllerAddPtoductToCart
  )
);

cartObserver.subsecribe(
  "EVENTS",
  cartView.addHandlerQuantityOfProduct.bind(cartView, controllerProductQuantity)
);

cartObserver.subsecribe(
  "EVENTS",
  cartView.addHandlerDeletionProduct.bind(cartView, controllerDeletionProduct)
);

init();
