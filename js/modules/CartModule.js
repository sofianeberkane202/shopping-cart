export class CartModule {
  #apiEndpoint;
  #products;
  #cart;
  #totalCart = 0;
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
    this.products = [];
    this.#cart = new Map();
    // this.#totalCart
  }

  // Fetch products from the server
  async fetchProducts() {
    try {
      const response = await fetch(this.apiEndpoint);

      if (!response.ok) throw new Error("There is Somhing was wrong");
      this.products = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  // get product data with ID;
  getProduct(productID) {
    return this.products[productID - 1];
  }

  // save product in cart
  async setProductInCart(productID, quantity = 1) {
    this.cart.set(productID, quantity);

    this.#updateCartDataFromLocalStorage();

    this.#totalCart = this.#calculateTotalCart();
  }

  async deleteProductInCart(productID) {
    this.cart.delete(productID);
    this.#updateCartDataFromLocalStorage();
    this.#totalCart = this.#calculateTotalCart();
  }

  #updateCartDataFromLocalStorage() {
    // update Local storage
    localStorage.setItem(
      "shopping-cart",
      JSON.stringify(Array.from(this.cart.entries()))
    );
  }

  // get saveItem from local storage
  async getCartItemFromLocalStorage() {
    this.cart = new Map(JSON.parse(localStorage.getItem("shopping-cart")));
    this.#totalCart = this.#calculateTotalCart();
  }

  #calculateTotalCart() {
    if (this.#cart.size === 0) return 0;
    return Array.from(this.#cart.entries()).reduce((totalPrice, product) => {
      const [id, quantity] = product;
      return totalPrice + this.#products[id - 1].price * quantity;
    }, 0);
  }

  // getter and setters
  get apiEndpoint() {
    return this.#apiEndpoint;
  }
  set apiEndpoint(apiEndpoint) {
    this.#apiEndpoint = apiEndpoint;
  }

  get products() {
    return this.#products;
  }

  set products(products) {
    this.#products = products;
  }

  get cart() {
    return this.#cart;
  }

  set cart(cart) {
    this.#cart = cart;
  }

  get totalCart() {
    return this.#totalCart;
  }

  set totalCart(totalCart) {
    this.#totalCart = totalCart;
  }
}
