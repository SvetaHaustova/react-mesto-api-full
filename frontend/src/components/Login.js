import React from 'react';
import { withRouter } from "react-router-dom";

function Login({ onLogin }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        onLogin(email, password)
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="form" name="login" onSubmit={handleSubmit}>
                <input className="form__input" name="email" type="email" value={email || ''} onChange={handleEmailChange} placeholder="Email" minLength="2" maxLength="40" required />
                <input className="form__input" name="password" type="password" value={password || ''} onChange={handlePasswordChange} placeholder="Пароль" minLength="8" maxLength="200" required />
                <button className="form__save-button">Войти</button>
            </form>
        </div>
    )
}

export default withRouter(Login);