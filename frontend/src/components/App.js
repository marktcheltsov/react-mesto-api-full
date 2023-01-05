import React, { useEffect, useState } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupImage from "./ImagePopup.js";
import CurrentUserContext from "../context/CurrentUserContext.js";
import CardContext from "../context/CardContext.js";
import myApi from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditCardPopupOpen, setIsEditCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  function handleUpdateUser(user) {
    const userName = user.name;
    const userAbout = user.about;
    myApi
      .pushNewUserInfo(userName, userAbout)
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setСurrentUser({ name: userName, about: userAbout });
        closeAllPopup();
      });
  }

  function handleCardDelete(card) {
    myApi
      .removeCard(card._id)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setCards((item) =>
        item.filter((element) => element !== card)
        );
      });
  }

  function handleCardLike(card, user, callback) {
    const isLiked = card.likes.some((i) => i._id === user._id);
    if (isLiked) {
      myApi
        .deleteLike(card._id, isLiked)
        .catch((err) => {
          console.log(err);
        })
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
          callback(newCard.likes.length);
        });
    } else {
      myApi
        .addLike(card._id, !isLiked)
        .catch((err) => {
          console.log(err);
        })
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
          callback(newCard.likes.length);
        });
    }
  }

  function handleUpdateAvatar(link) {
    myApi
      .pushNewAvatar(link)
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        setСurrentUser({ avatar: link });
        closeAllPopup();
      });
  }

  useEffect(() => {
    myApi
      .getCards()
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setCards(res);
      });
    myApi
      .getUserInfoFromServer()
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setСurrentUser(res);
      });
  }, []);

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsEditCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsEditCardPopupOpen(true);
  }

  function handleAddPlaceSubmit(name, link) {
    myApi
      .pushCard(name, link)
      .catch((err) => {
        console.log(err);
      })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopup();
      });
  }

  function handleCardClick(name, link) {
    setSelectedCard({ opened: true, name: name, link: link });
  }

  return (
    <CardContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardRemove={handleCardDelete}
          />
          <Footer />
          <AddPlacePopup
            isClose={closeAllPopup}
            isOpen={isEditCardPopupOpen}
            handleSubmit={handleAddPlaceSubmit}
          ></AddPlacePopup>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          ></EditProfilePopup>
          <PopupWithForm
            name="remove"
            title="Вы уверены?"
            id=""
            btnText="да"
          ></PopupWithForm>
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            isClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupImage isClose={closeAllPopup} isOpen={selectedCard} />
            <div className="element">
              <button className="element__delete-icon"></button>
              <div className="element__img-block">
                <img className="element__image" />
              </div>
              <div className="element__text-block">
                <h2 className="element__title"></h2>
                <div className="element__like-block">
                  <button className="element__like"></button>
                  <p className="element__like-counter">0</p>
                </div>
              </div>
            </div>
        </div>
      </CurrentUserContext.Provider>
    </CardContext.Provider>
  );
}
export default App;
