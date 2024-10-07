import { View } from "./View.js";
export class CartView extends View {
  #parentElement = document.querySelector(".cart__products-content");
  #data;
  _generateMarkup() {
    return `
      <div class="cart__product flex flex-between" data-id="${this.data.id}">
        <div class="cart__product-info flex" style="--gap: 3rem">
          <div class="cart__image-product flex flex-center">
            <img src="${this.data.image}" loading="lazy" alt="">
          </div>

          <div class="cart__info-box uppercase flex-1 grid" style="gap: 0.5rem">
            <p class="name label-small-bold text-clamp-2" style="--fs-label:1.2rem">${this.data.title}</p>
            <p class="price label-small-bold">$${this.data.price}</p>
            <input class="quantity label-small" type="number" value="${this.data.quantity}" min="1">
          </div>
        </div>

        <button class="remove-product display-icon">
          <span class="material-symbols-outlined" style="color: #f00">delete</span>
        </button>
      </div>
    `;
  }

  addHandlerQuantityOfProduct(handler) {
    this.#parentElement.addEventListener("input", function (e) {
      const input = e.target.closest(".quantity");
      if (!input) return;
      const productID = +input.closest(".cart__product").dataset.id;
      const newQuantity = +input.value;
      handler(productID, newQuantity);
    });
  }

  addHandlerDeletionProduct(handler) {
    this.#parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".remove-product");
      if (!btn) return;
      const productID = +btn.closest(".cart__product").dataset.id;
      handler(productID);
    });
  }

  // getters && setters
  get parentElement() {
    return this.#parentElement;
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#data = data;
  }
}
