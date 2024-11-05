import { NavLink } from 'react-router-dom';

import chevronRight from '../../assets/icons/chevron-right.svg';
import PatientForm from '../../components/PatientForm';

function CreateProfile() {
    return (
        <div className='create-profile'>
            <nav className='breadcrumb'>
                <div className='container'>
                    <ul className='breadcrumb__list'>
                        <li className='breadcrumb__item'>
                            <NavLink to='/'>Trang chủ</NavLink>
                        </li>

                        <li className='breadcrumb__item breadcrumb__item--active'>
                            <img
                                src={chevronRight}
                                alt=''
                                className='breadcrumb__icon'
                            />
                            <NavLink to='#'>Tạo hồ sơ bệnh nhân</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <PatientForm title='Tạo hồ sơ mới' />
            </div>
        </div>
    );
}

export default CreateProfile;
