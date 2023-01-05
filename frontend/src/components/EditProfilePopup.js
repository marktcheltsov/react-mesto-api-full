import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from './PopupWithForm.js'
import CurrentUserContext from '../context/CurrentUserContext.js'

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
          });
    }

    useEffect(()=>{
        setName(currentUser.name)
        setDescription(currentUser.about)
    }, [currentUser, isOpen])

return(
    <PopupWithForm name="profile" title="Редактировать профиль" id="" isClose={ onClose } isOpen={ isOpen } btnText="Сохранить" onSubmit={ handleSubmit }>
    <div className="popup__input-container">
        <input type="text" className="popup__input popup__input_type_name" required value={name || ''} onChange={ handleChangeName } minLength="2" maxLength="40" name="name"/>
        <p className="popup__input-error-text"></p>
      </div>
      <div className="popup__input-container">
        <input type="text" className="popup__input popup__input_type_about" required value={description || ''} onChange={ handleChangeDescription } minLength="2" maxLength="200" name="about"/>
        <p className="popup__input-error-text"></p>
      </div>
    </PopupWithForm>
)

}

export default EditProfilePopup;