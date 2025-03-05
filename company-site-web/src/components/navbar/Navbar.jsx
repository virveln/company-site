import NavMobile from './NavMobile';
import NavDesktop from './NavDesktop';

const Navbar = () => {
    return (
        <>
            <header className='navbar-shadow fixed top-0 bg-white w-full h-20 z-[1000] '>
                <NavMobile />
                <NavDesktop />
            </header>
        </>
    );
};

export default Navbar;