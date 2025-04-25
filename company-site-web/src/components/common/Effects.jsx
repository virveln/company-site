import PropTypes from 'prop-types';

export function UnderlineFromCenterEffect({ color }) {
    return (
        <span className={`absolute bottom-[-5px] left-0 w-full h-[1.5px] ${color} transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom`}></span>
    )
}

UnderlineFromCenterEffect.propTypes = {
    color: PropTypes.string.isRequired,
};


export function UnderlineLeftToRightEffect({ color }) {
    return (
        <span className={`absolute bottom-[-5px] left-0 w-full h-[1.5px] ${color} transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-left rounded-lg`}></span>
    )
}

UnderlineLeftToRightEffect.propTypes = {
    color: PropTypes.string.isRequired,
};