import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function Breadcrumbs({ previousPages, currentPage }) {
    return (
        <nav className="text-sm mb-10">
            <ul className="flex flex-wrap">
                {previousPages.map((page) => (
                    <li key={page.label}>
                        <Link to={page.url} className="hover:underline">{page.label}</Link>
                        <span className='mx-2 font-bold text-[var(--primary-color)]'>/</span>
                    </li>

                ))}

                <li className="font-semibold ">
                    <span className="block sm:inline">{currentPage}</span>
                </li>
            </ul>
        </nav>
    )
}

Breadcrumbs.propTypes = {
    previousPages: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    currentPage: PropTypes.string.isRequired,
};