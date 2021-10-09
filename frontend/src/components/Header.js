import logo from '../images/logo/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ userEmail, loggedIn, onSignOut }) {
    const { pathname } = useLocation();
    const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
    
    return (
        <header className="header">
            <img className="logo" src={logo} alt="Логотип Mesto Russia"/>
            <div>
                {loggedIn ? 
                    (<div className="header__wrap">
                        <p className="header__email">{userEmail}</p>
                        <Link className="header__sign-out" to="" onClick={onSignOut}>Выйти</Link>
                    </div>) : (<Link to={linkRoute} className="header__link">{linkText}</Link>)
                }
            </div>
        </header>
    );
}

export default Header;