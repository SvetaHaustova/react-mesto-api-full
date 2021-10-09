import PopupWithForm from './PopupWithForm';
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" button="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input id="name-input" className="popup__input popup__input_type_name" value={name || ''} onChange={handleNameChange} type="text" name="name" placeholder="Имя" minLength="2" maxLength="40" required/>
            <span className="popup__input-error name-input-error"></span>
            <input id="profession-input" className="popup__input popup__input_type_profession" value={description || ''} onChange={handleDescriptionChange} type="text" name="about" placeholder="Род деятельности" minLength="2" maxLength="200" required/>
            <span className="popup__input-error profession-input-error"></span>
        </PopupWithForm>
    )
    
}

export default EditProfilePopup;