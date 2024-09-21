import { View } from "./View.js";
export class StoreView extends View {
  #parentElement = document.querySelector(".store__products");
  #data;
  _generateMarkup() {
    return `
      <article class="store__product flex flex-column flex-center-y" data-id="${
        this.#data.id
      }">
        <div class="store__image-product ">
          <img src="${this.#data.image}" alt="">
        </div>

        <div class="store__product-info pd-block-16 self-x-start flex flex-column flex-between-start ">
          <p class="name label-small-bold uppercase" style="${
            this.#data.title.length > 35
              ? `--fs-label:1.4rem`
              : `--fs-label:1.6rem`
          }">${this.#data.title}</p>
          <p class="price label-logo">$${this.#data.price}</p>
        </div>

        <div class="add-to-cart-buttons">
              <button class="add-to-cart display-icon-small ${
                this.#data.isChecked ? `display-hidden` : ""
              }" add-to-cart-btn>
                <span class="material-symbols-outlined">shopping_bag</span>
              </button>

              <button
                class="add-to-cart display-icon-small ${
                  this.#data.isChecked ? "" : `display-hidden`
                } fill-shopping-icon"
                add-to-cart-btn>
              <span class="material-symbols-outlined">shopping_bag</span>
              </button>
        </div>
      </article>
    `;
  }

  toggle(parent) {
    const [btnUnchecked, btnChecked] = Array.from(
      parent.querySelectorAll(".add-to-cart")
    );
    btnUnchecked.classList.add("display-hidden");
    btnChecked.classList.remove("display-hidden");
  }

  uncheckedProduct(productID) {
    const product = this.#parentElement.querySelector(
      `[data-id="${productID}"]`
    );
    const [btnChecked, btnUnchecked] = Array.from(
      product.querySelectorAll(".add-to-cart")
    );
    btnChecked.classList.remove("display-hidden");
    btnUnchecked.classList.add("display-hidden");
  }

  addHandlerAddProductToCart(handler) {
    this.parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest("[add-to-cart-btn]");
      if (!btn) return;
      this.toggle(btn.closest(".add-to-cart-buttons"));
      const productID = +btn.closest(".store__product").dataset.id;
      handler(productID);
    });
  }

  // getters && setters
  get parentElement() {
    return this.#parentElement;
  }

  get data() {
    this.#data;
  }

  set data(data) {
    this.#data = data;
  }
}

// id, category, description, image, price, rating, title
