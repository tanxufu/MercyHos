import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import chevronRight from '../../assets/icons/chevron-right.svg';
import chevronDown from '../../assets/icons/chevron-down.svg';
import searchIcon from '../../assets/icons/search.svg';
import hospitalIcon from '../../assets/icons/hospital.svg';
import stethoscopeIcon from '../../assets/icons/stethoscope.svg';
import doctorIcon from '../../assets/icons/doctor.svg';
import genderIcon from '../../assets/icons/gender.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import moneyIcon from '../../assets/icons/money.svg';
import { getDoctorsBySpecialty, getDoctorStats } from '../../apis/doctor.api';
import { useEffect, useState } from 'react';

function SelectDoctor() {
    const cacheData = JSON.parse(localStorage.getItem('appointmentPatient'));
    const appointmentType = localStorage.getItem('appointmentType');
    const [activeFilter, setActiveFilter] = useState(null);
    const [filters, setFilters] = useState({
        availability: '',
        experience: 0,
        gender: '',
        specialty: ''
    });
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
        queryKey: ['doctors', debouncedSearchQuery, filters],
        queryFn: () => {
            return getDoctorsBySpecialty(
                appointmentType === 'doctor'
                    ? filters.specialty
                    : cacheData?.specialtyId,

                filters.availability,
                filters.experience,
                filters.gender,

                debouncedSearchQuery || ''
            );
        },
        enabled: !!cacheData?.patientId
    });
    const doctors = data?.data?.data?.data;
    const activeDoctors = doctors?.filter((doctor) => doctor?.active) || [];

    // get specialty
    const { data: data2 } = useQuery({
        queryKey: ['specialty', debouncedSearchQuery],
        queryFn: () => getDoctorStats(debouncedSearchQuery),
        enabled: !!cacheData?.patientId
    });
    const specialty = data2?.data?.data?.stats;

    // save appointment data
    const handleSelectDoctor = (selectedDoctor) => {
        const appointmentData = {
            ...cacheData,
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.name,
            doctorAvailability: selectedDoctor.availability,
            specialtyId: selectedDoctor.specialty
        };

        localStorage.setItem(
            'appointmentPatient',
            JSON.stringify(appointmentData)
        );
    };

    const handleFilterActive = (filterName) => {
        if (activeFilter === filterName) {
            setActiveFilter(null);
        } else {
            setActiveFilter(filterName);
        }
    };

    const handleFilter = (type, value) => {
        setActiveFilter(null);
        setFilters((prev) => ({
            ...prev,
            [type]: value
        }));
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

                                    {appointmentType === 'doctor' ? (
                                        ''
                                    ) : (
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
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className='col-9 col-lg-12'>
                            <div className='select__main'>
                                <h2>Vui lòng chọn bác sĩ</h2>
                                <div className='select__wrapper'>
                                    {/* search */}
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

                                    {/* filter */}
                                    <div className='filter-group'>
                                        {/* chuyên khoa */}
                                        {appointmentType === 'doctor' ? (
                                            <div className='filter'>
                                                <button
                                                    className='filter__btn'
                                                    onClick={() =>
                                                        handleFilterActive(
                                                            'specialty'
                                                        )
                                                    }
                                                >
                                                    Chuyên khoa
                                                    <img
                                                        src={chevronDown}
                                                        alt=''
                                                    />
                                                </button>
                                                <div
                                                    className={`filter__dropdown ${activeFilter === 'specialty' ? 'filter__dropdown--active' : ''}`}
                                                    style={{
                                                        width: '200%'
                                                    }}
                                                >
                                                    <button
                                                        className='filter__item'
                                                        onClick={() =>
                                                            handleFilter(
                                                                'specialty',
                                                                ''
                                                            )
                                                        }
                                                    >
                                                        Tất cả ...
                                                    </button>
                                                    {specialty?.map(
                                                        (specialty) => {
                                                            return (
                                                                <button
                                                                    key={
                                                                        specialty?._id
                                                                    }
                                                                    className='filter__item'
                                                                    onClick={() =>
                                                                        handleFilter(
                                                                            'specialty',
                                                                            specialty?._id
                                                                        )
                                                                    }
                                                                    style={{
                                                                        textTransform:
                                                                            'uppercase'
                                                                    }}
                                                                >
                                                                    {
                                                                        specialty?._id
                                                                    }
                                                                </button>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            ''
                                        )}

                                        {/* lịch khám */}
                                        <div className='filter'>
                                            <button
                                                className='filter__btn'
                                                onClick={() =>
                                                    handleFilterActive(
                                                        'schedule'
                                                    )
                                                }
                                            >
                                                Lịch khám
                                                <img src={chevronDown} alt='' />
                                            </button>
                                            <div
                                                className={`filter__dropdown ${activeFilter === 'schedule' ? 'filter__dropdown--active' : ''}`}
                                            >
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'availability',
                                                            ''
                                                        )
                                                    }
                                                >
                                                    Tất cả ...
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'availability',
                                                            'Thứ 2'
                                                        )
                                                    }
                                                >
                                                    THỨ 2
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'availability',
                                                            'Thứ 3'
                                                        )
                                                    }
                                                >
                                                    THỨ 3
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'availability',
                                                            'Thứ 4'
                                                        )
                                                    }
                                                >
                                                    THỨ 4
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'availability',
                                                            'Thứ 5'
                                                        )
                                                    }
                                                >
                                                    THỨ 5
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'availability',
                                                            'Thứ 6'
                                                        )
                                                    }
                                                >
                                                    THỨ 6
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'availability',
                                                            'Thứ 7'
                                                        )
                                                    }
                                                >
                                                    THỨ 7
                                                </button>
                                            </div>
                                        </div>

                                        {/* kinh nghiệm */}
                                        <div className='filter'>
                                            <button
                                                className='filter__btn'
                                                onClick={() =>
                                                    handleFilterActive(
                                                        'experience'
                                                    )
                                                }
                                            >
                                                Năm kinh nghiệm
                                                <img src={chevronDown} alt='' />
                                            </button>
                                            <div
                                                className={`filter__dropdown ${activeFilter === 'experience' ? 'filter__dropdown--active' : ''}`}
                                            >
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'experience',
                                                            ''
                                                        )
                                                    }
                                                >
                                                    Tất cả ...
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'experience',
                                                            '2'
                                                        )
                                                    }
                                                >
                                                    TRÊN 2 NĂM
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'experience',
                                                            '5'
                                                        )
                                                    }
                                                >
                                                    TRÊN 5 NĂM
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'experience',
                                                            '10'
                                                        )
                                                    }
                                                >
                                                    TRÊN 10 NĂM
                                                </button>
                                            </div>
                                        </div>

                                        {/* giới tình */}
                                        <div className='filter'>
                                            <button
                                                className='filter__btn'
                                                onClick={() =>
                                                    handleFilterActive('gender')
                                                }
                                            >
                                                Giới tính
                                                <img src={chevronDown} alt='' />
                                            </button>
                                            <div
                                                className={`filter__dropdown ${activeFilter === 'gender' ? 'filter__dropdown--active' : ''}`}
                                            >
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'gender',
                                                            ''
                                                        )
                                                    }
                                                >
                                                    Tất cả ...
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'gender',
                                                            'male'
                                                        )
                                                    }
                                                >
                                                    NAM
                                                </button>
                                                <button
                                                    className='filter__item'
                                                    onClick={() =>
                                                        handleFilter(
                                                            'gender',
                                                            'female'
                                                        )
                                                    }
                                                >
                                                    NỮ
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='select__list-group'>
                                        <ul className='select-doctor__list'>
                                            {!cacheData && (
                                                <div className='select__search-error'>
                                                    Không có dữ liệu!
                                                </div>
                                            )}
                                            {isPending && (
                                                <div className='loading'>
                                                    <div className='loader'></div>
                                                </div>
                                            )}

                                            {/* doctor list */}
                                            {activeDoctors?.map((doctor) => {
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
                                                                src={doctorIcon}
                                                                alt=''
                                                                className='select-doctor__item--icon'
                                                            />
                                                            <h3>
                                                                {doctor.name}
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
                                                                src={genderIcon}
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
                                                                src={moneyIcon}
                                                                alt=''
                                                            />
                                                            <p>
                                                                Phí khám: &nbsp;
                                                                {doctor.fee}
                                                                .000đ
                                                            </p>
                                                        </div>
                                                    </Link>
                                                );
                                            })}

                                            {activeDoctors?.length === 0 && (
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
                                        to={
                                            appointmentType === 'doctor'
                                                ? '/select-patient-profile'
                                                : '/select-specialty'
                                        }
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
