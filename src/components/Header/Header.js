import React, { useContext } from 'react';
import "./header.css"; // Ensure you have relevant styles here
import { GlobalContext } from '../../utils/Context';
import { PageTitle } from '../GlobalStyles/PageStyles';
import HotelLogo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

const Header = (props) => {
    const { setMenuOpen, menuOpen } = useContext(GlobalContext);
    const pageName = props.page;

    const user = JSON.parse(localStorage.getItem('user'));

    const getFirstName = (name) => {
        const names = name.split(" ");
        return names.length > 0 ? names[0] : name;
    };

    return (
        <header
            className="fixed-header"
            style={menuOpen ? { backgroundColor: '#fff', backdropFilter: 'blur(0px)' } : pageName === 'Home' ? {} : { background: 'white' }}
        >
            <div className="content">
                <div className="brand">
                    <Link to="/">
                        <div className="logo">
                            <img src={HotelLogo} alt="Logo" />
                        </div>
                    </Link>
                    <PageTitle style={menuOpen ? { color: 'black' } : {}}>{pageName}</PageTitle>
                </div>
                {user && (
                    <div className="collection" style={{ display: 'flex', alignItems: 'center' }}>
                        <p className='user-name' style={{ display: `${pageName === 'Home' && !menuOpen ? 'block' : 'none'}` }}>
                            Hello, {getFirstName(user.name)}
                        </p>
                        <div className={`menu-icon ${menuOpen ? 'close-icon' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="leftright"></div>
                            <div className="rightleft"></div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
