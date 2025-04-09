import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import URL_ENDPOINTS from '../utils/urlEndpoints';

const PageHeader = ({ bgImage, heading, subHeading }) => {
    // Use the location to get the current path
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const lastPathSegment = pathParts[pathParts.length - 2] + '/';
    // Check if the route matches any tenant-related subpages
    const isTenantPage = lastPathSegment.startsWith(URL_ENDPOINTS.FOR_TENANT);

    return (
        <div className="relative">
            {bgImage ? (
                <div className="absolute w-full h-[300px] z-[-10] bg-cover bg-center "
                    style={{ backgroundImage: `url(${bgImage})` }}>
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
            ) : (
                // <div className='absolute w-full h-[300px] z-[-10] bg-[linear-gradient(336deg,_var(--primary-color)_5%,_var(--secondary-color)_57%)]'></div>
                <div className='absolute w-full h-[300px] z-[-10] bg-[linear-gradient(160deg,_var(--primary-color-hover)_20%,_rgba(255,255,255,1)_100%)]'></div>
            )}
            <div className="max-w-[1200px] h-[300px] mx-auto px-5 md:px-8 pt-10 [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)] ">
                <div className={`${isTenantPage ? 'hidden md:block' : 'block'}`}>
                    <h1 className=" mb-5 text-3xl sm:text-4xl text-white font-medium ">{heading}</h1>
                    <p className="max-w-160 mt-4 text-lg text-white font-medium ">{subHeading}</p>
                </div>
            </div>
        </div>
    );
};

PageHeader.propTypes = {
    bgImage: PropTypes.string,
    heading: PropTypes.string.isRequired,
    subHeading: PropTypes.string
};

export default PageHeader;