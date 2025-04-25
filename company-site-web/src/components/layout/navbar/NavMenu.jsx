import '../../../styles/navbar.css';
import { NavLink } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import URL_ENDPOINTS from '../../../utils/urlEndpoints';
import { UnderlineFromCenterEffect } from '../../common/Effects';
// import logo from '/vite.svg';

const navitems = [
    { title: 'Lediga lägenheter', url: URL_ENDPOINTS.AVALIBLE_APARTMENTS },
    { title: 'För hyresgäster', url: URL_ENDPOINTS.FOR_TENANT },
    // { title: 'Felanmälan', url: URL_ENDPOINTS.FAULT_REPORT },
    { title: 'Kontakt', url: URL_ENDPOINTS.CONTACT },
    { title: 'Om oss', url: URL_ENDPOINTS.ABOUT },
]

const NavMenu = ({ closeMenu }) => {
    return (
        <>

            <div className="flex flex-col gap-[40px] w-full items-end mr-20 pl-10 
                             md:flex-row md:gap-[20px] md:w-fit md:items-center md:mr-0 md:pl-0">
                {navitems.map((item, index) => (
                    <NavLink key={index} to={item.url}
                        className={({ isActive }) => `relative group text-2xl md:text-base text-[var(--primary-color)]  ${isActive ? 'font-black' : 'font-semibold'}`}
                        onClick={closeMenu}>
                        {item.title}
                    <UnderlineFromCenterEffect color={'bg-[var(--primary-color)]'}/>
                    </NavLink>
                ))}

            </div>
            {/* <div className='md:hidden mt-20'>
                <Link to="/" className="p-0"><img src={logo} alt='logo' className='w-15' /></Link>
            </div> */}
        </>
    );
};

export default NavMenu;

NavMenu.propTypes = {
    closeMenu: PropTypes.func.isRequired,
};