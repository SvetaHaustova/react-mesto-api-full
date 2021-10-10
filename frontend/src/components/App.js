import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import * as auth from '../utils/auth';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {

    const history = useHistory();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({ isOpen: false, name: '', link: '', _id: '' });
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState('');

    React.useEffect(() => {   
        if (loggedIn) {
            Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([user, cards]) => {
                setCurrentUser(user.data);
                setCards(cards.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [loggedIn])

    React.useEffect(() => {
        auth.checkToken()
        .then((data) => {
            setUserEmail(data.email);
            setLoggedIn(true);
            history.push('/');
        })
        .catch((err) => {
            console.log(err);
        })
    }, [history])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard({ isOpen: true, name: card.name, link: card.link, _id: card._id });
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
        setSelectedCard({ isOpen: false, name: '', link: '', _id: '' });
    }

    function handleUpdateUser(data) {
        api.editUserInfo({name: data.name, profession: data.about})
        .then((res) => {
            setCurrentUser(res.data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar(data) {
        api.editAvatarUser({ avatar: data.avatar })
        .then((res) => {
            setCurrentUser(res.data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlaceSubmit(data) {
        api.addNewCard({ name: data.name, link: data.link })
        .then((newCard) => {
            setCards([newCard.data, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((res) => {
            setCards((state) => state.map((c) => c._id === card._id ? res.data : c));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id))
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleRegister(email, password) {
        auth.register(email, password)
        .then((res) => {
            if (res) {
                setStatus(true);
                setIsInfoTooltipPopupOpen(true);
                history.push('/sign-in');
            }
        })
        .catch((err) => {
            setStatus(false);
            setIsInfoTooltipPopupOpen(true);
            console.log(err);
        })
    }

    function handleLogin(email, password) {
        auth.authorize(email, password)
        .then((data) => {
            setUserEmail(data.email);
            setLoggedIn(true);
            history.push('/');
        })
        .catch((err) => {
            setStatus(false);
            setIsInfoTooltipPopupOpen(true);
            console.log(err);
        })
    }

    function handleSignOut() {
        setLoggedIn(false);
        setUserEmail('');
        history.push('/sign-in');
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="body">
                <div className="page">
                    <Header userEmail={userEmail} loggedIn={loggedIn} onSignOut={handleSignOut} />
                    <ProtectedRoute 
                        exact path="/"
                        component={Main}
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                        loggedIn={loggedIn}
                    />
                    <Switch>
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister} />
                        </Route>
                        <Route path="/sign-in">
                            <Login onLogin={handleLogin} />
                        </Route>
                    </Switch>
                    <ProtectedRoute
                        exact path="/"
                        component={Footer}
                        loggedIn={loggedIn}
                    />
                </div>    
            
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                
                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <PopupWithForm name="confirm" title="Вы уверены?" button="Да" />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} status={status} />

            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;
