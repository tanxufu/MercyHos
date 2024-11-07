import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import chevronRight from '../../assets/icons/chevron-right.svg';
import hospitalIcon from '../../assets/icons/hospital.svg';
import searchIcon from '../../assets/icons/search.svg';
import { useQuery } from '@tanstack/react-query';
import { getDoctorStats } from '../../apis/doctor.api';

function SelectSpecialty() {
    const [searchQuery, setSearchQuery] = useState('');
    const patientId = JSON.parse(localStorage.getItem('appointmentPatient'));
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isPending, isError } = useQuery({
        queryKey: ['specialty', debouncedSearchQuery],
        queryFn: () => getDoctorStats(debouncedSearchQuery),
        enabled: !!patientId
    });
    const specialty = data?.data?.data?.stats;

    // save appointment data
    const handleSelectSpecialty = (selectedSpecialty) => {
        const appointmentData = {
            ...patientId,
            specialtyId: selectedSpecialty
        };

        localStorage.setItem(
            'appointmentPatient',
            JSON.stringify(appointmentData)
        );
    };

    return (
        <div className='select-specialty'>
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
                            <NavLink to='#'>Chọn chuyên khoa</NavLink>
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
                                </ul>
                            </div>
                        </div>

                        <div className='col-9 col-lg-12'>
                            <div className='select__main'>
                                <h2>Vui lòng chọn chuyên khoa</h2>
                                <div className='select__wrapper'>
                                    <div className='search-group'>
                                        <img
                                            src={searchIcon}
                                            alt='search-icon'
                                        />
                                        <input
                                            type='text'
                                            placeholder='Tìm nhanh chuyên khoa'
                                            value={searchQuery}
                                            onChange={(e) =>
                                                setSearchQuery(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className='select__list-group'>
                                        <ul className='select-specialty__list'>
                                            {!patientId && (
                                                <div className='select__search-error'>
                                                    Không có dữ liệu!
                                                </div>
                                            )}
                                            {isPending && (
                                                <div className='loading'>
                                                    <div className='loader'></div>
                                                </div>
                                            )}

                                            {specialty?.map((specialty) => {
                                                return (
                                                    <Link
                                                        to='/select-doctor'
                                                        key={specialty._id}
                                                        className='select-specialty__item'
                                                        onClick={() =>
                                                            handleSelectSpecialty(
                                                                specialty._id
                                                            )
                                                        }
                                                    >
                                                        <li>{specialty._id}</li>
                                                    </Link>
                                                );
                                            })}
                                            {isError && !specialty && (
                                                <div className='select__search-error'>
                                                    Không tìm thấy chuyên khoa!
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div className='select__act'>
                                    <Link
                                        className='move-back'
                                        to='/select-patient-profile'
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

export default SelectSpecialty;
