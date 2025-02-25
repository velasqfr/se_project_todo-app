////////////////////////////////////////STEP 4: PER BRIEF/////////////////////////////////////////////////////
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//We need to import destructure
//Allows you to pull the values of the properties(from constants.js) that are inside an object
//like below in parentheses) and assign them to variables
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
///////////////////////////////////////STEP 5: We exported, now we import//////////////////////////////////////
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template"); --> REMOVED
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  // TASK 3: CREATING THE Todo CLASS:
  // Instantiate Todo class, using `new Todo()`
  //typically when you instantiate a class, you will be assigning that class to a varaible ("todo")
  //let's then pass it the data ("data") and the selector, chosen from hard coded string (for simplicity), "#todo-template"
  const todo = new Todo(data, "#todo-template");

  // NEXT STEP: Use `getView()` to obtain the finished todo item element & return the todo item element:
  //OUTSIDE the class: you call the method like this - "todo.getView()" (name of the instance(DOT)method name.
  const todoElement = todo.getView();

  return todoElement;

  //TO BE REMOVED:
  /* 
  todoNameEl.textContent = data.name;
  todoCheckboxEl.checked = data.completed;

  // Apply id and for attributes.
  // The id will initially be undefined for new todos.
  todoCheckboxEl.id = `todo-${data.id}`;
  todoLabel.setAttribute("for", `todo-${data.id}`);

  // If a due date has been set, parsing this it with `new Date` will return a
  // number. If so, we display a string version of the due date in the todo.
  const dueDate = new Date(data.date);
  if (!isNaN(dueDate)) {
    todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  todoDeleteBtn.addEventListener("click", () => {
    todoElement.remove();
  }); */
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  ///////////////////////////////////////////////STEP 4:////////////////////////////////////////////////////////////////
  //this "uidv4()" will give a new attibute added a different id # (the for "" will match the id "")
  const id = uuidv4(); //add id below
  const values = { name, date, id };
  const todo = generateTodo(values);
  todosList.append(todo);

  closeModal(addTodoPopup);
  /////////////////////////////STEP 6: Resetting the form and form controls after submission///////////////////////////
  addTodoForm.reset(); //Clears Form Inputs
  newTodoValidator.resetValidation(); //Resets the validation after submission
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});

///////////////////////////////////////STEP 5: Instantiate//////////////////////////////////////
// This is what happens when you call "new" and then the class (it calls the constructor function and returns an instance of the class)
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
//In index.js, you’ll need to create an instance of the FormValidator class and
//call its enableValidation() method.
//Inside the class you call it using (this._) but outside the class you, you use the class name you picked DOT method name
newTodoValidator.enableValidation();
