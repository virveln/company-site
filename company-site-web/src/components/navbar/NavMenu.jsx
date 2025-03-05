import '../../styles/general.css';
import '../../styles/navbar.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import URL_ENDPOINTS from '../../utils/urlEndpoints';

const NavMenu = ({ closeMenu }) => {
    return (
        <div className="nav-menu flex flex-col md:flex-row items-center gap-[20px] sm:font-semibold text-[var(--primary-color)]">
            <NavLink to={URL_ENDPOINTS.AVALIBLE_APARTMENTS} end
                className={({ isActive }) => `relative group hover:text-[var(--primary-color-hover)] ${isActive ? 'text-[var(--primary-color-dark)]' : ''}` }
                onClick={closeMenu}> 
                Lediga lägenheter
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>

            </NavLink>
            <NavLink to={URL_ENDPOINTS.FOR_TENANT}
                className={({ isActive }) => `relative group hover:text-[var(--primary-color-hover)] ${isActive ? 'text-[var(--primary-color-dark)]' : ''}` }
                onClick={closeMenu}> 
                För hyresgäster
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
            </NavLink>
            <NavLink to={URL_ENDPOINTS.FAULT_REPORT}
                className={({ isActive }) => `relative group hover:text-[var(--primary-color-hover)] ${isActive ? 'text-[var(--primary-color-dark)]' : ''}` }
                onClick={closeMenu}> 
                Felanmälan
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
            </NavLink>
            <NavLink to={URL_ENDPOINTS.CONTACT}
                className={({ isActive }) => `relative group hover:text-[var(--primary-color-hover)] ${isActive ? 'text-[var(--primary-color-dark)]' : ''}` }
                onClick={closeMenu}> 
                Kontakt
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
            </NavLink>
            <NavLink to={URL_ENDPOINTS.ABOUT}
                className={({ isActive }) => `relative group hover:text-[var(--primary-color-hover)] ${isActive ? 'text-[var(--primary-color-dark)]' : ''}` }
                onClick={closeMenu}> 
                Om oss
                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
            </NavLink>
        </div>
    );
};

export default NavMenu;

NavMenu.propTypes = {
    closeMenu: PropTypes.func.isRequired,
};