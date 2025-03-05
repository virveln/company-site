import '../../styles/navbar.css';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import logo from '/vite.svg';

const NavDesktop = () => {
    return (
        <nav className="w-full max-w-[1200px] h-20 px-5 md:px-8 mx-auto hidden md:flex md:justify-between">
                <Link to="/" className="flex items-center p-0"><img src={logo} alt='logo' className='' /></Link>
                <NavMenu />
        </nav>
    );
};

export default NavDesktop;