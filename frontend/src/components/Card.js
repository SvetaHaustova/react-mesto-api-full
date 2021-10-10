import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const cardDeleteButtonClassName = (`place__delete-button ${isOwn ? '' : 'place__delete-button_hidden'}`);
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = (`place__like ${isLiked ? 'place__like_active' : ''}`);

    function handleCardClick() {
        onCardClick(card);
    }
    
    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="place">
            <img className="place__photo" src={card.link} alt={card.name} onClick={handleCardClick}/>
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
            <div className="place__description">
                <h2 className="place__title">{card.name}</h2>
                <div className="place__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <p className="place__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;