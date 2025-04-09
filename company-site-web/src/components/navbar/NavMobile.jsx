import '../../styles/navbar.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import NavMenu from './NavMenu';
import logo from '/vite.svg';

const NavMobile = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="fixed top-0 w-full h-20 bg-white z-[1000] flex md:hidden justify-between px-5 navbar-shadow">
            {/* Logo */}
            <Link to="/" className="flex items-center p-0"><img src={logo} alt='logo' className='' /></Link>

            {/* Hamburgermenu X ||| */}
            <div className={classNames(`tham tham-e-squeeze tham-w-6 `, { 'tham-active': menuOpen })} onClick={toggleMenu}>
                <div className="tham-box ">
                    <div className="tham-inner " />
                </div>
            </div>
            {/* Overlay background with opacity */}
            {menuOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-[1000]" onClick={toggleMenu}></div>
            )}
            {/* Nav items */}
            <div className={`absolute top-0 right-0 min-w-[70%] h-screen bg-white flex flex-col justify-center items-center space-y-6 transform transition-all duration-300 z-[1001] ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`} >
                <NavMenu closeMenu={toggleMenu} />
            </div>

        </nav>
    );
};

export default NavMobile;