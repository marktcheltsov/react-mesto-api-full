import React, { useEffect, useState } from "react";
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup({isClose , isOpen, handleSubmit}) {
    const [name, setName] = useState('')
    const [link, setLink] = useState('')

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleCardSubmit(e) {
        e.preventDefault();
        handleSubmit(name, link);
    }

    useEffect(()=>{
      setName('')
      setLink('')
    }, [isOpen])
    
    return(
        <PopupWithForm name="cards" title="Новое место" id="" isClose={isClose} btnText="Создать" isOpen={isOpen} onSubmit={handleCardSubmit}>
        <div className="popup__input-container">
          <input type="text" className="popup__input" id="popup-cards__input_type_name" placeholder="Название" value={name} onChange={handleChangeName} required minLength="2" maxLength="30" name="name"/>
          <p className="popup__input-error-text"></p>
        </div>
        <div className="popup__input-container">
          <input className="popup__input" id="popup-cards__input_type_link" placeholder="Ссылка на картинку" value={link} onChange={handleChangeLink} type="url"  required name="link"/>
          <p className="popup__input-error-text"></p>
        </div>
      </PopupWithForm> 
)
}

export default AddPlacePopup;