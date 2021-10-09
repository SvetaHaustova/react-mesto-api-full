import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">

            <section className="profile">
                <div className="profile__avatar-edit">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Фото-аватар"/>
                    <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <div className="profile__edit">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
            </section>
            
            <section className="elements">
                <ul className="elements__list">
                    {
                        cards.map((card) => (
                            <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                        ))
                    }
                </ul>
            </section>

        </main>
    );
}

export default Main;