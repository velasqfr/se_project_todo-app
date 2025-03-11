class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element
  constructor(todos, selector) {
    this._element = document.querySelector(selector); // select the appropriate element
    this._completed = todos.filter((todo) => todo.completed).length; // number of completed todos
    this._total = todos.length; // the total number of todos
    this._updateText(); //Call the method to update the text content
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.
  updateCompleted = (increment) => {
    // if increment is true, add 1 to this._completed. Otherwise,
    // subtract 1. In either case, call the method to update
    // the text content.
    if (increment) {
      this._completed += 1; //Increases
    } else {
      this._completed -= 1; //Decreases
    }
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.
  updateTotal = (increment) => {
    // if increment is true, add 1 to this._total. Otherwise,
    // subtract 1. In either case, call the method to update the
    // text content.
    if (increment) {
      this._total += 1; // Increase total when adding a new todo
    } else {
      this._total -= 1; // Decrease total when delteing a todo
    }
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    // Call this in the constructor, and whenever the counts get updated.
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
