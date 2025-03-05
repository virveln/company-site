import '../../styles/navbar.css';
import { useState } from "react";
import { Link } from 'react-router-dom';

import logo from '/vite.svg';
import NavMenu from './NavMenu';

// import 'tailwind-hamburgers';
import classNames from 'classnames';

const NavMobile = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (

        <nav className="fixed top-0 w-full h-20 bg-white z-[1000] flex md:hidden justify-between px-5 navbar-shadow">
            <Link to="/" className="flex items-center p-0"><img src={logo} alt='logo' className='' /></Link>

            <div className={classNames(`tham tham-e-squeeze tham-w-6 `, { 'tham-active': menuOpen })} onClick={toggleMenu}>
                <div className="tham-box ">
                    <div className="tham-inner" />
                </div>
            </div>
            <div
                className={`absolute top-0 left-0 w-full h-screen bg-white flex flex-col justify-center items-center space-y-6 transform transition-all duration-300 z-[1001] ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <NavMenu closeMenu={toggleMenu} />
            </div>

        </nav>
    );
};

export default NavMobile;