/////////////////////////////STEP 5: CREATING THE FORM VALIDATOR CLASS/////////////////////////////////////////////////////////////////
//Create Class, create contstructor, specificy parameters, then log parameters to console, and finally export.
class FormValidator {
  constructor(settings, formEl) {
    //No need to use queryselector because it already has been used in Index.JS
    this._formEl = formEl;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }

  _showInputError = (inputElement) => {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  _hideInputError = (inputElement) => {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _disableButton() {
    if (this._submitButton) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._inactiveButtonClass);
    }
  }

  _enableButton() {
    if (this._submitButton) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector // added for the enable and disabled submit button
    );

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /////////////////////////////////////////STEP 6. RESETTING THE FORM AND FORM CONTROL AFTER SUBMISSION//////////////////////////////////////
  //It shouldn’t require any parameters.
  //It should reset the form’s inputs.
  //It should disable the submit button.

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement); //Hide errror messages
      inputElement.value = ""; //Clear input values
    });
    this._disableButton(); ///disable the submit button
  }

  enableValidation() {
    this._setEventListeners();

    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Prevent default form submission
    });
  }
}

//Export
export default FormValidator;
