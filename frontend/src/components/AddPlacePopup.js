import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        },
        handleInputsClean())
    }

    function handleInputsClean() {
        setName('');
        setLink('');
    }

    return (
        <PopupWithForm name="add" title="Новое место" button="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="title-input" className="popup__input popup__input_type_title" value={name} onChange={handleNameChange} type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required/>
            <span className="popup__input-error title-input-error"></span>
            <input id="link-input" className="popup__input popup__input_type_link" value={link} onChange={handleLinkChange} type="url" name="link" placeholder="Ссылка на картинку" required/>
            <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;