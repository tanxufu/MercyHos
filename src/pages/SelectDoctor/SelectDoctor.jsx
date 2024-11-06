import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import chevronRight from '../../assets/icons/chevron-right.svg';
import searchIcon from '../../assets/icons/search.svg';
import hospitalIcon from '../../assets/icons/hospital.svg';
import stethoscopeIcon from '../../assets/icons/stethoscope.svg';
import doctorIcon from '../../assets/icons/doctor.svg';
import genderIcon from '../../assets/icons/gender.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import moneyIcon from '../../assets/icons/money.svg';
import { getDoctorsBySpecialty } from '../../apis/doctor.api';
import { useEffect, useState } from 'react';

function SelectDoctor() {
    const cacheData = JSON.parse(localStorage.getItem('appointmentPatient'));
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isPending } = useQuery({
        queryKey: ['doctors', debouncedSearchQuery],
        queryFn: () => {
            return getDoctorsBySpecialty(
                cacheData?.specialtyId,
                debouncedSearchQuery || ''
            );
        },
        enabled: !!cacheData.patientId
    });
    const doctorsBySpecialty = data?.data?.data?.data;

    // save appointment data
    const handleSelectDoctor = (selectedDoctor) => {
        const appointmentData = {
            ...cacheData,
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            doctorAvailability: selectedDoctor.availability
        };

        localStorage.setItem(
            'appointmentPatient',
            JSON.stringify(appointmentData)
        );
    };

    return (
        <div className='select-doctor'>
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
                            <NavLink to='#'>Chọn bác sĩ</NavLink>
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
                                </ul>
                            </div>
                        </div>

                        <div className='col-9 col-lg-12'>
                            <div className='select__main'>
                                <h2>Vui lòng chọn bác sĩ</h2>
                                <div className='select__wrapper'>
                                    <div className='search-group'>
                                        <img
                                            src={searchIcon}
                                            alt='search-icon'
                                        />
                                        <input
                                            type='text'
                                            placeholder='Tìm nhanh bác sĩ'
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className='select__list-group'>
                                        <ul className='select-doctor__list'>
                                            {isPending && (
                                                <div className='loading'>
                                                    <div className='loader'></div>
                                                </div>
                                            )}

                                            {/* doctor list */}
                                            {doctorsBySpecialty?.map(
                                                (doctor) => {
                                                    return (
                                                        <Link
                                                            to='/select-service'
                                                            key={doctor.id}
                                                            className='select-doctor__item'
                                                            onClick={() =>
                                                                handleSelectDoctor(
                                                                    doctor
                                                                )
                                                            }
                                                        >
                                                            <div>
                                                                <img
                                                                    src={
                                                                        doctorIcon
                                                                    }
                                                                    alt=''
                                                                    className='select-doctor__item--icon'
                                                                />
                                                                <h3>
                                                                    {
                                                                        doctor.name
                                                                    }
                                                                </h3>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    src={
                                                                        stethoscopeIcon
                                                                    }
                                                                    alt=''
                                                                />
                                                                <p>
                                                                    Chuyên khoa:
                                                                    &nbsp;
                                                                    {
                                                                        doctor.specialty
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    src={
                                                                        genderIcon
                                                                    }
                                                                    alt=''
                                                                />
                                                                <p>
                                                                    Giới tính:
                                                                    &nbsp;
                                                                    {doctor.gender ===
                                                                    'male'
                                                                        ? 'Nam'
                                                                        : 'Nữ'}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    src={
                                                                        calendarIcon
                                                                    }
                                                                    alt=''
                                                                />
                                                                <p>
                                                                    Lịch khám:
                                                                    &nbsp;
                                                                    {doctor.availability.join(
                                                                        ', '
                                                                    )}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <img
                                                                    src={
                                                                        moneyIcon
                                                                    }
                                                                    alt=''
                                                                />
                                                                <p>
                                                                    Phí khám:
                                                                    &nbsp;
                                                                    {doctor.fee}
                                                                </p>
                                                            </div>
                                                        </Link>
                                                    );
                                                }
                                            )}

                                            {doctorsBySpecialty?.length ===
                                                0 && (
                                                <div className='select__search-error'>
                                                    Không tìm thấy bác sĩ!
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className='select__act'>
                                    <Link
                                        className='move-back'
                                        to='/select-specialty'
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

export default SelectDoctor;
