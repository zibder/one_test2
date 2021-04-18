import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhotoImage = this._popupElement.querySelector(".popup__image");
    this._popupPhotoFigcaption = this._popupElement.querySelector(
      ".popup__figcaption"
    );
  }

  open(link, name) {
    this._popupPhotoImage.src = link;
    this._popupPhotoFigcaption.textContent = name;
    this._popupPhotoImage.alt = `Изображение места: ${name.textContent}`;
    super.open();
  }
}