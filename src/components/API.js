export default class API {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    loadUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    editProfile(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    removeCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    likeCard(id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    removeLikeCard(id) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: data.link,
        }),
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
    }
  }