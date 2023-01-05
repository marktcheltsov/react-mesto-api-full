import React from "react";

function ImagePopup({isClose, isOpen}) {
    return (
        <div className={`popup popup-image ${isOpen.opened ? 'popup_opened' : ''}`}>
        <div className="popup-image__container">
            <img className="popup-image__img" src={isOpen.link}/>
            <h2 className="popup-image__title">{isOpen.name}</h2>
            <button className="popup__close-button popup-image__close-button" type="button" onClick={isClose}></button>
        </div>
    </div>
    )
}

export default ImagePopup