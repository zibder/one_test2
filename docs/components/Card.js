export default class Card {
    constructor({
            name,
            link,
            _id,
            owner,
            likes
        },
        actualId,
        cardTplSelector,
        cardSelector,
        handleCardClick,
        deleteCard,
        likeCard
    ) {
        this._name = name;
        this._link = link;
        this._id = _id;
        this._ownerID = owner._id;
        this._likes = likes;

        this._actualId = actualId;
        this._cardTplSelector = cardTplSelector;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._deleteCard = deleteCard;
        this._likeCard = likeCard;
        this._addLikeCard = this._addLikeCard;
        this._disLikeCard = this._disLikeCard;

        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector(".card__image");
        this._figcaption = this._element.querySelector(".card__text");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");
        this._counter = this._element.querySelector(".card__like-counter");
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTplSelector)
            .content.querySelector(".card")
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._figcaption.textContent = this._name;

        //для наших карточек отображаем кнопку "удалить"
        if (this._actualId === this._ownerID) {
            this._deleteButton.classList.add(".card__delete-button");
            this._deleteButton.style.display = 'block';
        } else {
            this._deleteButton.setAttribute("disabled", true);
            this._deleteButton.classList.remove(".card__delete-button");
            this._deleteButton.style.display = 'none';
        }

        this._counter.textContent  =this._likes.length;

        if (this.isLikeOrNot()) { 
            
            this._addLikeCard();
            
        } else {
            
            this._disLikeCard();
            
        }

        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._likeCard(this._id);
        });

        this._deleteButton.addEventListener("click", (evt) => {
            this._deleteCard(evt.target.closest(this._cardSelector), this._id);
        });

        this._cardImage.addEventListener("click", () => {
            this._handleCardClick(this._link, this._figcaption);
        });
    }

    _addLikeCard() {
        this._likeButton.classList.add("card__like-button_active");
    }

    _disLikeCard() {
        this._likeButton.classList.remove("card__like-button_active");
    }

    isLikeOrNot() {
        return this._likes.some((user) => {
            return user._id === this._actualId;
        });        
    }

    setLikes(likes){
        this._counter.textContent =likes.length;
        this._likes=likes;
    }

    counterLikes() {
        return this._counter;
    }

}