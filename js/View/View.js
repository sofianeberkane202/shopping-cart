export class View {
  render(data) {
    this.data = data;
    const markup = this._generateMarkup();
    this.parentElement.insertAdjacentHTML("beforeend", markup);
  }

  clear() {
    this.parentElement.innerHTML = "";
  }
}
