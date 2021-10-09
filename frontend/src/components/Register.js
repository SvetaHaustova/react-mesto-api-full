import React from 'react';
import { Link, withRouter } from "react-router-dom";

function Register({ onRegister }) {
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
        onRegister(email, password)
    }

    return (
        <div className="auth auth_type_register">
            <h2 className="auth__title">Регистрация</h2>
            <form className="form" name="login" onSubmit={handleSubmit}>
                <input className="form__input" name="email" type="email" value={email || ''} onChange={handleEmailChange} placeholder="Email" minLength="2" maxLength="40" required />
                <input className="form__input" name="password" type="password" value={password || ''} onChange={handlePasswordChange} placeholder="Пароль" minLength="8" maxLength="200" required />
                <button className="form__save-button">Зарегистрироваться</button>
            </form>
            <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default withRouter(Register);