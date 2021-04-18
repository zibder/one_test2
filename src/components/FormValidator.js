export default class FormValidator {
  constructor(settingObject, formSelector) {
    this._inputSelector = settingObject.inputSelector;
    this._submitButtonSelector = settingObject.submitButtonSelector;
    this._inactiveButtonClass = settingObject.inactiveButtonClass;
    this._inputErrorClass = settingObject.inputErrorClass;
    this._errorClass = settingObject.errorClass;

    this._element = formSelector;
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._element.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    this._errorElement = this._element.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute("disabled", true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._element.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._element.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}