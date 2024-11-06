/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

function Button(props) {
    const {
        className = '',
        isLoading,
        disabled,
        children,
        to,
        ...rest
    } = props;

    const baseClassName = disabled
        ? `${className} cursor-not-allowed`
        : className;

    const newClassName = isLoading
        ? `loading-btn ${baseClassName}`
        : `primary-btn ${baseClassName}`;

    if (to) {
        return (
            <Link to={to} className={newClassName} {...rest}>
                {children}

                {isLoading && <span className='loading-btn__icon'></span>}
            </Link>
        );
    }

    return (
        <button className={newClassName} disabled={disabled} {...rest}>
            {children}

            {isLoading && <span className='loading-btn__icon'></span>}
        </button>
    );
}

export default Button;
