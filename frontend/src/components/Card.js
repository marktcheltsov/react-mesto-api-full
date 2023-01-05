import React, { useState, useContext } from "react";
import CurrentUserContext from '../context/CurrentUserContext.js'

function Card({handleClick, title, url, likes, owner, onCardLike, card, onCardRemove}) {
  const user = useContext(CurrentUserContext);
  const isOwn = owner === user._id;
  const isLiked = likes.some(i => i._id === user._id);
  const [likeCounter, setLikeCounter] = useState(likes.length)

  function cardAddLike() {
    onCardLike(card, user, (likes)=>{
      setLikeCounter(likes)
      console.log('dddd')
    })
  }

  function cardRemove() {
    onCardRemove(card)
  }

  const cardDeleteButtonClassName = (
    `element__delete-icon ${isOwn ? 'element__delete-icon_visible' : 'element__delete-icon_hidden'}`
  ); 

  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );

 function openPopupImage() {
  handleClick(title, url)
 }

    return (
        <div className="element">
        <button className={cardDeleteButtonClassName} onClick={cardRemove}></button>
        <div className="element__img-block">
          <img className="element__image" src={url} onClick={openPopupImage}/>
        </div>
        <div className="element__text-block">
          <h2 className="element__title">{title}</h2>
          <div className="element__like-block">
            <button className={cardLikeButtonClassName} onClick={cardAddLike}></button>
            <p className="element__like-counter">{likeCounter}</p>
          </div>
        </div>
      </div>
    )
}

export default Card