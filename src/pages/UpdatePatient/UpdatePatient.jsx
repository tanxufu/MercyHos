import { NavLink } from 'react-router-dom';

import chevronRight from '../../assets/icons/chevron-right.svg';
import PatientForm from '../../components/PatientForm';

function UpdatePatient() {
    return (
        <div className='update-patient'>
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
                            <NavLink to='#'>Cập nhập thông tin</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <PatientForm title='Cập nhập thông tin' isEdit={true} />
            </div>
        </div>
    );
}

export default UpdatePatient;
