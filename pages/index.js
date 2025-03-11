////////////////////////////////////////STEP 4: PER BRIEF/////////////////////////////////////////////////////
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

//We need to import destructure
//Allows you to pull the values of the properties(from constants.js) that are inside an object
//like below in parentheses) and assign them to variables
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
///////////////////////////////////////STEP 5: We exported, now we import//////////////////////////////////////
import FormValidator from "../components/FormValidator.js";
//////////////////////////////////Project 8: Created Section class, now import it//////////////////////////////
import Section from "../components/Section.js";

//Importing the Popupform class
import PopupWithForm from "../components/PopupWithForm.js";

import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form"); //or "const addTodoForm = document.forms["add-todo-form"]; per Code Reviewer
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
//const todoTemplate = document.querySelector("#todo-template"); --> REMOVED
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

//we can right a function and pass it if it is true or false
//If it clicked and already completed. we need to pass "False" so we decrement the # of todos, otherwise we need to incrmenet it
function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false); //this ensures the total is decremented
}

//Created a reusable generateTodo function:
function generateTodo(item) {
  const todo = new Todo(item, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
}

//Function to render todos
const renderTodo = (data) => {
  const todoElement = generateTodo(data);
  section.addItem(todoElement);
};

//Let's create our popup instance:
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handledFormSubmit: (formValues) => {
    const newTodo = { ...formValues, id: uuidv4(), completed: false };
    initialTodos.push(newTodo);

    renderTodo(newTodo);
    todoCounter.updateTotal(true); //Increases the total count of increments when adding a form box

    newTodoValidator.resetValidation();
  },
});

// this clode will set the event listeners: void "addTodoCloseBtn.addEventListener("click", () => { addTodoPopup.close(); });" &
// the submit listener for the form & replace the "addTodoForm.addEventListener("submit", (evt)....""
addTodoPopup.setEventListeners();

///////////////////////////////////////STEP 5: Instantiate//////////////////////////////////////
// This is what happens when you call "new" and then the class (it calls the constructor function and returns an instance of the class)
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
//In index.js, you’ll need to create an instance of the FormValidator class and
//call its enableValidation() method.
//Inside the class you call it using (this._) but outside the class you, you use the class name you picked DOT method name
newTodoValidator.enableValidation();

////////////////////////////////Project 8: Created Section class, imported it, now we have to instantiate it//////////////////////////////
//pass an object with the properties 'item', 'renderer', and a containerSelector (todo__list)
//Generate todo item
//Add it to the todo list
//(Refer to the forEach loop in this file)

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: renderTodo, //use the renderTodo function to render each todo item
  containerSelector: ".todos__list", //The container where todo items will be added
});

//call Section instance's renderItems method
section.renderItems();

// Add event listener to open the add todo popup
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open(); //this is how you call the method of the class instance (in this case "addToDoPopup" )
});

//
//
//
//
//
//
//
//
//
//
//
//
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CODE THAT HAS BEEN MOVED AROUND OR DELETED/////////////////////////////////////////////

//Getting ride of (replacing code) -> Popup.js
/*const openModal = (modal) => {
  modal.classList.add("popup_visible");
}; */

//Getting ride of (replacing code) -> Popup.js
/*const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};*/

// // The logic in this function should all be handled in the Todo class.
// const renderTodo = (data) => {
//   // TASK 3: CREATING THE Todo CLASS:
//   // Instantiate Todo class, using `new Todo()`
//   //typically when you instantiate a class, you will be assigning that class to a varaible ("todo")
//   //let's then pass it the data ("data") and the selector, chosen from hard coded string (for simplicity), "#todo-template"
//   // const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);

//   // NEXT STEP: Use `getView()` to obtain the finished todo item element & return the todo item element:
//   //OUTSIDE the class: you call the method like this - "todo.getView()" (name of the instance(DOT)method name.
//   const todoElement = todo.getView();
//   todosList.append(todoElement);
// };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CODE THAT HAS BEEN MOVED AROUND OR DELETED/////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CODE THAT HAS BEEN MOVED AROUND OR DELETED/////////////////////////////////////////////

// Taken out because of the code: addTodoPopup.setEventListeners();
// addTodoCloseBtn.addEventListener("click", () => {
//   addTodoPopup.close();
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CODE THAT HAS BEEN MOVED AROUND OR DELETED/////////////////////////////////////////////
////////////////////Moved in code selector in PopupWithForm && above in handledFormSubmit: (evt)//////////////////////////////////

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   ///////////////////////////////////////////////STEP 4:////////////////////////////////////////////////////////////////
//   //this "uidv4()" will give a new attibute added a different id # (the for "" will match the id "")
//   const id = uuidv4(); //add id below
//   const values = { name, date, id };

//   renderTodo(values); //New Function created

//   //closeModal(addTodoPopupEl); (submit form button) is now being replaed with:
//   addTodoPopup.close();

//   /////////////////////////////STEP 6: Resetting the form and form controls after submission///////////////////////////
//   addTodoForm.reset(); //Clears Form Inputs
//   newTodoValidator.resetValidation(); //Resets the validation after submission
// });

//Getting rid of old code because of new code being written (PROJECT 8) USE addItem method instead of newTodoValidator
//initialTodos.forEach(renderTodo);

//     //TODO: move code from existing submission handler to shere
//     const name = evt.target.name.value;
//     const dateInput = evt.target.date.value;
//     // Create a date object and adjust for timezone
//     const date = new Date(dateInput);
//     date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
//     //this "uidv4()" will give a new attibute added a different id # (the for "" will match the id "")
//     const id = uuidv4(); //add id below
//     const values = { name, date, id };
//     renderTodo(values); //New Function created
//     //closeModal(addTodoPopupEl); (submit form button) is now being replaed with:
//     addTodoPopup.close();
//   },
// });
