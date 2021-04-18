import "./index.css";

import {
    settingObject,
    formElementEdit,
    formElementNewCard,
    formElementAvatar,
    editProfileButton,
    addButton,
    editAvatarButton,
    nameInput,
    aboutInput
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import API from "../components/API.js";

//валидация форм
const addCardValidator = new FormValidator(settingObject, formElementNewCard);
addCardValidator.enableValidation();

const profileValidator = new FormValidator(settingObject, formElementEdit);
profileValidator.enableValidation();

const avatarValidator = new FormValidator(settingObject, formElementAvatar);
avatarValidator.enableValidation();

//попап-фотография
const popupWithPhoto = new PopupWithImage(".popup_type_image");
popupWithPhoto.setEventListeners();

//создание класса API
const api = new API({
    baseUrl: "https://mesto.nomoreparties.co/v1/cohort-22",
    headers: {
        "authorization": "d5814af8-6e6b-4959-8e01-e9085885572d",
        "Content-Type": "application/json"
    }
});

//профиль пользователя
const userInfo = new UserInfo({
    nameElement: ".profile__name",
    captionElement: ".profile__caption",
    avatarElement: ".profile__avatar"
});

//получение данных с сервера и загрузка данных карточек
Promise.all([
    api.loadUserInfo(),
    api.getInitialCards(),
])
.then((responses) => {
    if (typeof(responses[0]) != "undefined") {
        userInfo.setUserInfo(responses[0]);
        userInfo.setAvatar(responses[0]);
        userInfo.setUserId(responses[0]);
    }
    if (typeof(responses[1]) != "undefined") {
        cardList.renderItems(responses[1], userInfo._id);
    }
})
.catch((err) => {
    console.log(err);
});


//попап изменения данных
const profilePopup = new PopupWithForm(
    ".popup_type_profile",
    (name, about) => {
        profilePopup.renderLoading(true);
        api
            .editProfile(name, about)
            .then((res) => {
                userInfo.setUserInfo(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                profilePopup.renderLoading(false);
                profilePopup.close();
            });
    }
);
profilePopup.setEventListeners();

//привязываем отображение попапа на клик по кнопке
editProfileButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    profileValidator.resetValidation();
    profilePopup.open();
});

//список карточек
const cardList = new Section(
    function(item, userId) {
        const cardElement = createCard(item, userId);
        cardList.addItem(cardElement);
    },
    ".cards"
);

//функция создания карточки
const createCard = (data, userId) => {
    const card = new Card(
        {
            name: data.name,
            link: data.link,
            _id: data._id,
            owner: data.owner,
            likes: data.likes
        },
        userId,
        ".card-template",
        ".card",
        () => {
            popupWithPhoto.open(data.link, data.name);
        },
        (item, id) => {            
            deletePopup.targetObject = item;
            deletePopup.targetId = id;
            deletePopup.open();
        },
        (id) => {

            if (!card.isLikeOrNot()) { 
                
                api
                    .likeCard(id)
                    .then((data) => {
                        card._addLikeCard();
                        card.setLikes(data.likes);                     
                    })
                    .catch((err) => {
                        console.log(err);
                    });                
            } else {
                
                api
                    .removeLikeCard(id)
                    .then((data) => {
                        card._disLikeCard();
                        card.setLikes(data.likes);   
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    return card.generateCard();
};
//^^^^^^^ здесь были проблемы со скобками



//попап добавления новых карточек
const newCardPopup = new PopupWithForm(".popup_type_new-card", (name, link) => {
    newCardPopup.renderLoading(true);
    api
        .addNewCard(name, link)
        .then((res) => {
            const cardElement = createCard(res, userInfo._id);
            cardList.addItem(cardElement);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            newCardPopup.renderLoading(false);
            newCardPopup.close();
        });
});
newCardPopup.setEventListeners();

//привязка отображения формы новой карточки к клику на кнопке
addButton.addEventListener("click", () => {
    addCardValidator.resetValidation();
    newCardPopup.open();
});

//попапа обновления аватара
const avatarPopup = new PopupWithForm(".popup_type_avatar", (data) => {
    avatarPopup.renderLoading(true);    
    console.log(data);
    api
        .editAvatar(data)
        .then((res) => {
            userInfo.setAvatar(res);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            avatarPopup.renderLoading(false);
            avatarPopup.close();
        });
});
avatarPopup.setEventListeners();

//привязка отображения формы редактирования аватара к клику на кнопке
/*

editAvatarButton -- не оперделен

editAvatarButton.addButton.addEventListener("click", () => {
    avatarValidator.resetValidation();
    avatarPopup.open();
});
*/

editAvatarButton.addEventListener("click", () => {
    avatarValidator.resetValidation();
    avatarPopup.open();
});

//попап подтверждения удаления карточки
const deletePopup = new PopupWithForm(".popup_type_delete", () => {
    api.removeCard(deletePopup.targetId)
        .then(() => {
            deletePopup.targetObject.remove();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            deletePopup.close();
        });
});
deletePopup.setEventListeners();