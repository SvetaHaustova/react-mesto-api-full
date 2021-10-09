import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef(); 

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" button="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <input id="avatar-input" className="popup__input popup__input_type_avatar" ref={avatarRef} type="url" name="avatar" placeholder="Ссылка на аватар" required/>
            <span className="popup__input-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;