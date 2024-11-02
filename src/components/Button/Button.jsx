/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
function Button(props) {
    const { className = '', isLoading, disabled, children, ...rest } = props;
    const baseClassName = disabled
        ? `${className} cursor-not-allowed`
        : className;

    const newClassName = isLoading
        ? `loading-btn ${baseClassName}`
        : `primary-btn ${baseClassName}`;

    return (
        <button className={newClassName} disabled={disabled} {...rest}>
            {children}

            {isLoading && <span className='loading-btn__icon'></span>}
        </button>
    );
}

export default Button;
