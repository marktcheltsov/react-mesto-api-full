import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isClose, isOpen, onUpdateAvatar }) {
  const [avatar, setAvatar] = useState("");

  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatar);
  }

  useEffect(() => {
    setAvatar("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      id=""
      isClose={isClose}
      isOpen={isOpen}
      btnText="Сохранить"
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          className="popup__input"
          placeholder="Ссылка на аватар"
          value={avatar}
          type="url"
          required
          name="link"
          onChange={handleChangeAvatar}
        />
        <p className="popup__input-error-text"></p>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
