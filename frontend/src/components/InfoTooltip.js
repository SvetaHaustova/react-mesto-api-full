import success from '../images/popup/success.svg';
import error from '../images/popup/error.svg';

function InfoTooltip({ isOpen, onClose, status }) {
    return (
        <div className={`popup popup_type_info-tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_type_info-tooltip">
                <button className="popup__close-icon" type="button" onClick={onClose}></button>
                <img className="popup__info-image" src={status ? success : error} alt={status ? "Успешно" : "Ошибка"} />
                <p className="popup__info-text">{status
                    ? "Вы успешно зарегистрировались!"
                    : "Что-то пошло не так! Попробуйте ещё раз."}
                </p>
            </div>
        </div>
    )
}

export default InfoTooltip;