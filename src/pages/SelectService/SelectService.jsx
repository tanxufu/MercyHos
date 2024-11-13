import { Link, NavLink } from 'react-router-dom';

import Button from '../../components/Button';
import chevronRight from '../../assets/icons/chevron-right.svg';
import hospitalIcon from '../../assets/icons/hospital.svg';
import stethoscopeIcon from '../../assets/icons/stethoscope.svg';
import doctorIcon from '../../assets/icons/doctor2.svg';

function SelectService() {
    const cacheData = JSON.parse(localStorage.getItem('appointmentPatient'));

    return (
        <div className='select-service'>
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
                            <NavLink to='#'>Chọn dịch vụ</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <div className='select__content'>
                    <div className='row gy-lg-3'>
                        <div className='col-3 col-lg-12'>
                            <div className='create-appointment-info'>
                                <h2>Thông tin khám</h2>
                                <ul>
                                    <li>
                                        <img
                                            src={hospitalIcon}
                                            alt='hospital-icon'
                                        />
                                        <p>Bệnh viện MercyHos</p>
                                    </li>

                                    <li>
                                        <img
                                            src={stethoscopeIcon}
                                            alt='stethoscope'
                                        />
                                        <p>
                                            Chuyên khoa:
                                            <span>
                                                {cacheData?.specialtyId}
                                            </span>
                                        </p>
                                    </li>

                                    <li>
                                        <img src={doctorIcon} alt='doctor' />
                                        <p>
                                            Bác sĩ:
                                            <span>{cacheData?.doctorName}</span>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-9 col-lg-12'>
                            <div className='select__main'>
                                <h2>Vui lòng chọn dịch vụ</h2>
                                <div className='select__wrapper'>
                                    <div className='select__list-group'>
                                        {!cacheData && (
                                            <div className='select__search-error'>
                                                Không có dữ liệu!
                                            </div>
                                        )}

                                        {cacheData && (
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Tên dịch vụ</th>
                                                        <th>Giá</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>

                                                        <td>
                                                            Khám dịch vụ
                                                            <span>
                                                                {cacheData?.doctorAvailability.join(
                                                                    ', '
                                                                )}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <span>
                                                                150.000đ
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                to='/select-date'
                                                                className='select-service__btn'
                                                            >
                                                                Chọn
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>

                                <div className='select__act'>
                                    <Link
                                        className='move-back'
                                        to='/select-doctor'
                                    >
                                        <span>Quay lại</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectService;
