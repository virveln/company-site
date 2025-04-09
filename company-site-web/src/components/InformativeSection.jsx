import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { UnderlineLeftToRightEffect } from './Effects';
import { FaArrowRightLong } from "react-icons/fa6";
// import exImage from '../images/apartment.jpg';

export default function HomeSection({ label, text, url, linkLabel, image }) {
    return (
        <>
            <div className="mb-10 md:mb-0 md:w-1/3 space-y-5">
                <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 leading-tight">
                    {label}
                </h2>
                <p className="text-lg leading-relaxed">
                    {text}
                </p>
                {url && (
                    <div>
                        <Link to={url} className='group relative flex items-center w-fit text-[var(--secondary-color)] font-semibold hover:text-[var(--secondary-color-hover)] transition-colors duration-300' >
                            {linkLabel}
                            <FaArrowRightLong className="ml-2" />
                            <UnderlineLeftToRightEffect color={'bg-[var(--secondary-color)]'} />
                        </Link>
                    </div>
                )}
            </div>

            {/* Image */}
            <div className="md:w-2/3">
                <img src={image} alt={label} className="w-full h-auto rounded-xl shadow-xl object-cover" />
            </div>
        </>
    )
}

HomeSection.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    linkLabel: PropTypes.string,
    image: PropTypes.string.isRequired,
};