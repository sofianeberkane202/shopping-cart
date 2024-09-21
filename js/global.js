const $CART = document.querySelector("[cart]");
const $OVERLAY = document.querySelector(".overlay");
const $BTN_CART = document.querySelector("[btn-cart]");
const $CLOSE_CART_BTN = document.querySelector("[close-card-btn]");
const $TOTAL_CART_PRODUCTS = document.querySelector(".total-cart-products");

const $TOTAL_CART_PRICE = document.querySelector("[total-cart]");

export function toggleCart() {
  $CART.classList.toggle("active");
  $OVERLAY.classList.toggle("hidden");
}

[$BTN_CART, $CLOSE_CART_BTN, $OVERLAY].forEach((btn) =>
  btn.addEventListener("click", toggleCart)
);

export const displaytotalCartProducts = function (numberOfProducts) {
  $TOTAL_CART_PRODUCTS.classList.remove("hidden");
  $TOTAL_CART_PRODUCTS.textContent = numberOfProducts;
};

export const hiddentotalCartProducts = function () {
  $TOTAL_CART_PRODUCTS.classList.add("hidden");
};

export const updateTotalPrice = function (total) {
  // console.log(total);
  $TOTAL_CART_PRICE.textContent = total.toFixed(2);
};
