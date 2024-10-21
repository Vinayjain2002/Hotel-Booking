import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menu.css'; // Make sure to create this CSS file
import FadeIn from 'react-fade-in';
import { GlobalContext } from '../../utils/Context';

const MainMenu = () => {
    const { menuOpen, setMenuOpen } = useContext(GlobalContext);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : 'visible';
    }, [menuOpen]);

    let menuOptions = [
        { name: 'Home', path: '/' },
        { name: 'Bookings', path: '/bookings' },
        { name: 'Edit Account', path: '/profile' },
        { name: 'Log Out', path: '/logout' },
    ];

    if (user && user.isManager) {
        let lOpt = menuOptions.slice(3, 5);
        menuOptions = menuOptions.slice(0, 3);
        menuOptions.push({ name: 'Dashboard', path: '/dashboard' });
        menuOptions = menuOptions.concat(lOpt);
    }

    return (
        <div className={`main-menu-container ${menuOpen ? 'open' : ''}`}>
            {menuOpen && (
                <div className="menu-content">
                    <FadeIn delay={200}>
                        <div className="user-details">
                            <div className="details">
                                <p className="name-text">Hi, {user.name}</p>
                                <p className="name-text small">@{user.username}</p>
                            </div>
                        </div>
                    </FadeIn>
                    <ul className="list-items">
                        {menuOptions.map((mp, i) => (
                            <li key={i}>
                                <FadeIn delay={300 * (i + 1)}>
                                    <Link
                                        onClick={() => setMenuOpen(false)}
                                        to={mp.path}
                                    >
                                        {mp.name}
                                    </Link>
                                </FadeIn>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MainMenu;
