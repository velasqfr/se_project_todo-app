////////////////////////////TASK 3: CREATING THE Todo CLASS://///////////////////////////////////////////////////
// Instantiate Todo class, using `new Todo()`
class Todo {
  constructor(data, selector) {
    //for every arguement, you assign it a value on the "this" object, where you will then be able to acess anywhere you need it
    this._data = data;
    //we don't need the Selector, but what we do need to is find the template:
    this._templateElement = document.querySelector(selector);
  }

  ///////////////////////////TASK 3: SETTING THE PRIVATE EVENTLISTENERS://///////////////////////////////////////
  _setEventListeners() {
    //set 'change' listeners on checkbox el
    this._todoCheckboxEl.addEventListener("change", () => {
      //when clicked, change completion from true to false, or vice versa
      this._data.completed = !this._data.completed;
    });

    //TODO: Set the delete button handler:
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  /////////////////////////////////Created to organized the checkboxes code://////////////////////////////////////
  _generateCheckboxEl() {
    //First two lines: declaring the two variables
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    //Assign completed status (setting check status appropriately):
    this._todoCheckboxEl.checked = this._data.completed;
    //Establishing the relationship between the 4 the and the ID attributes:
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  /////////////////////////////////To call a new method and give "getView" function:///////////////////////////////
  getView() {
    //In some cases, we may need to refer these elements outside of this function:
    //To enable that, we replace the first "const" with the "this._", and then place it in every element function to make it available everywhere
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    //this will bring back the data and specifically, the names of the todo data items:
    //the name of the todo item is being passed as data, which we are then assign to "this._data" so data has a name property:
    this._todoNameEl.textContent = this._data.name;
    this._todoDate.textContent = this._data.date;

    //To call the functions above on "_generateCheckBoxEl()"":
    //Outside the class you reference it the name of the instance ("toDo")
    //Inside the class you reference it with the "this._"
    this._generateCheckboxEl();
    this._setEventListeners();

    //////////////////////////////////////TODO: Implement Dates://////////////////////////////////////////////////
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }

    //We have to return the element, per brief:
    return this._todoElement;
  }
}

//this is where we make use of export default class. In all of the classes that we're working on only the class will be exported
export default Todo;
