export class ProductFactory {
  createProduct(productData) {
    const { category, description, id, image, price, rating, title } =
      productData;
    return new Product(id, category, description, image, price, rating, title);
  }

  createCartProduct(productData, quantity = 1) {
    const { id, image, price, title } = productData;
    return {
      id,
      image,
      price,
      title,
      quantity,
    };
  }
}

class Product {
  #id;
  #category;
  #description;
  #image;
  #price;
  #rating;
  #title;
  #isChecked = false;
  constructor(id, category, description, image, price, rating, title) {
    this.#id = id;
    this.#category = category;
    this.#description = description;
    this.#image = image;
    this.#price = price;
    this.#rating = rating;
    this.#title = title;
  }

  // getters && setters
  get id() {
    return this.#id;
  }
  get category() {
    return this.#category;
  }
  get description() {
    return this.#description;
  }
  get image() {
    return this.#image;
  }
  get price() {
    return this.#price;
  }
  get rating() {
    return this.#rating;
  }
  get title() {
    return this.#title;
  }

  get isChecked() {
    return this.#isChecked;
  }

  set id(id) {
    this.#id = id;
  }
  set category(category) {
    this.#category = category;
  }
  set description(description) {
    this.#description = description;
  }
  set image(image) {
    this.#image = image;
  }
  set price(price) {
    this.#price = price;
  }
  set rating(rating) {
    this.#rating = rating;
  }
  set title(title) {
    this.#title = title;
  }
  set isChecked(isChecked) {
    this.#isChecked = isChecked;
  }
}
