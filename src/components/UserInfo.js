export default class UserInfo {
  constructor({nameElement, captionElement, avatarElement}) {
    this._nameElement = document.querySelector(nameElement);
    this._captionElement = document.querySelector(captionElement);
    this._avatarElement = document.querySelector(avatarElement);
    this._id=0;
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._captionElement.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._captionElement.textContent = about;
  }

  setAvatar({avatar}) {
      this._avatarElement.src = avatar;
  }

  setUserId({ _id }) {
    this._id = _id;
  }
}