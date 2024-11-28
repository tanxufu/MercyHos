/* eslint-disable react/prop-types */
function Modal({ children, modal, modalClose, className }) {
    return (
        <div className={`modal ${modal ? 'modal__show' : ''} ${className}`}>
            {children}
            <div className='modal-overlay' onClick={() => modalClose()}></div>
        </div>
    );
}

export default Modal;
