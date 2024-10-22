import { Link } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';

function RegisterLayoutLogo() {
    return (
        <div className='register-logo'>
            <Link to='/'>
                <img src={logo} alt='logo' className='register-logo__icon' />
            </Link>

            <p className='register-logo__name'>
                Mercy<span className='register-logo__name--grey'>Hos</span>
            </p>
        </div>
    );
}

export default RegisterLayoutLogo;
