function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_view ${card.isOpen ? 'popup_opened' : '' }`}>
            <div className="popup__place-view">
                <button className="popup__close-icon" type="button" onClick={onClose}></button>
                <img className="popup__place-photo" src={card.link} alt={card.name}/>
                <p className="popup__place-title">{card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;