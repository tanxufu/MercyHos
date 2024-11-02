import styles from './Modal.module.scss';
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, children, className }) {
    return (
        <div
            className={`${styles.bgModal} ${isOpen ? styles.isOpen : styles.onClose}`}
            onClick={() => {
                onClose();
            }}
        >
            <div
                className={`${styles.Modal} ${isOpen ? styles.isOpen : styles.onClose} ${className}`}
            >
                {children}
            </div>
        </div>
    );
}
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    className: PropTypes.element
};

export default Modal;
