import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handledFormSubmit }) {
    //to get the popupselctor to the parent class, we need to pass it from the child class
    // to do that we need to call the super class
    // this method calls the instructor of the parent class
    super({ popupSelector }); //this is not descructuring (we're creating an object literal and we're giving it a popupselector property)
    this._popupForm = this._popupElement.querySelector(".popup__form");
    //save handleFormSubmit to the this object
    this._handleFormSubmit = handledFormSubmit;
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    const values = {};
    this._inputList.forEach((input) => {
      //TODO:
      //add a key/value pair to the values object for the  each input
      //the key is input.name
      //the vale is input.value
      //need to use brackrt notation, not dot notation
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
      this.close();
      this._popupForm.reset();
    });
  }
}

export default PopupWithForm;
