//Creating Section Class

class Section {
  constructor({ items, renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //creating render property (public means no bracket)
  //anytime  we hear iterate and we have an array, think of the 'forEach' method
  renderItems() {
    this._items.forEach((item) => this._renderer(item)); //call the renderer and pass it the item as an arguement
  }

  addItem(element) {
    this._container.append(element);
  }
}

export default Section;
