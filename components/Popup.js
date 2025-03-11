class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector(".popup__close"); //we currently don't have access to the closeBtn but DO have access to popupElement, where the closBtn is inside of
  }

  _handleEscapeClose(evt) {
    if (evt.key == "Escape") {
      //TODO: ccall the close method
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose); //anytime any of our popups open the modal, it will set the escape listener
  }

  //TODO: Remove the class from the popup element
  close() {
    this._popupElement.classList.remove("popup_visible");
    //TODO: remove the escape listener
    document.removeEventListener("keydown", this._handleEscapeClose);
  }

  //Creating the method for "addTodoPopup.setEventListeners();":
  setEventListeners() {
    // this._popupCloseBtn.addEventListener("click", () => {
    //   this.close(); //the close method is a method of the class and we call class methods by the "this" object
    // });

    //this one listener will handle the close button (above) and modal listener to allow closing the form outside of it
    this._popupElement.addEventListener("mousedown", (evt) => {
      //if the event target's classList contains "popup__close" or "popup"
      // //then close the modal
      if (
        evt.target.classList.contains("popup_visible") ||
        evt.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
