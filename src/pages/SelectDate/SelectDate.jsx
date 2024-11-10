import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DatePicker, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';
// import { useQuery } from '@tanstack/react-query';

import chevronRight from '../../assets/icons/chevron-right.svg';
import hospitalIcon from '../../assets/icons/hospital.svg';
import stethoscopeIcon from '../../assets/icons/stethoscope.svg';
import doctorIcon from '../../assets/icons/doctor2.svg';
import medicalIcon from '../../assets/icons/medical.svg';
import calendar from '../../assets/icons/calendar-date.svg';
// import { getAppointmentOnDoctors } from '../../apis/doctor.api';

dayjs.extend(utc);
dayjs.locale('vi');

function SelectDate() {
    const [date, setDate] = useState(null);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const cacheData = JSON.parse(localStorage.getItem('appointmentPatient'));

    const availableDays = cacheData?.doctorAvailability;
    // const doctorId = cacheData?.doctorId;

    // const { data } = useQuery({
    //     queryKey: ['doctorAppointment', doctorId],
    //     queryFn: () => getAppointmentOnDoctors(doctorId),
    //     enabled: !!doctorId
    // });

    // console.log(data);

    const availableWeekdays = availableDays?.map((day) => {
        switch (day) {
            case 'Thứ 2':
                return 1;
            case 'Thứ 3':
                return 2;
            case 'Thứ 4':
                return 3;
            case 'Thứ 5':
                return 4;
            case 'Thứ 6':
                return 5;
            case 'Thứ 7':
                return 6;

            default:
                return null;
        }
    });

    const disabledDate = (current) => {
        if (current < dayjs().startOf('day')) {
            return true;
        }

        if (current > dayjs().endOf('month').add(2, 'week')) {
            return true;
        }

        return !availableWeekdays?.includes(current.day());
    };

    const handleDateChange = (date, dateString) => {
        setDate(dateString);
        setIsTimeVisible(true);
        if (window.innerWidth <= 992) {
            window.scrollTo({ top: 500, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 246, behavior: 'smooth' });
        }

        const appointmentData = {
            ...cacheData,
            appointmentDate: dateString
        };

        localStorage.setItem(
            'appointmentPatient',
            JSON.stringify(appointmentData)
        );
    };

    const handleSelectTime = (time) => {
        const appointmentData = {
            ...cacheData,
            appointmentTime: time
        };

        localStorage.setItem(
            'appointmentPatient',
            JSON.stringify(appointmentData)
        );
    };

    const morningTimes = ['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00'];
    const afternoonTimes = ['13:30 - 14:30', '14:30 - 15:30', '15:30 - 16:30'];

    return (
        <div className='select-date'>
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

                                    <li>
                                        <img src={medicalIcon} alt='doctor' />
                                        <p>
                                            Dịch vụ:
                                            <span>Khám dịch vụ</span>
                                        </p>
                                    </li>

                                    {date && (
                                        <li>
                                            <img src={calendar} alt='doctor' />
                                            <p>
                                                Ngày khám:
                                                <span>
                                                    {dayjs(date).format(
                                                        'DD/MM/YYYY'
                                                    )}
                                                </span>
                                            </p>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        <div className='col-9 col-lg-12'>
                            <div className='select__main'>
                                <h2>Vui lòng chọn ngày khám</h2>
                                {!cacheData && (
                                    <div className='select__search-error'>
                                        Không có dữ liệu!
                                    </div>
                                )}

                                {cacheData && (
                                    <div className='select-date__main'>
                                        <ConfigProvider locale={locale}>
                                            <DatePicker
                                                getPopupContainer={(
                                                    triggerNode
                                                ) => {
                                                    return triggerNode.parentNode;
                                                }}
                                                open={true}
                                                onChange={handleDateChange}
                                                // value={}
                                                placement='bottomRight'
                                                className='select-date__picker'
                                                format='YYYY-MM-DD'
                                                disabledDate={disabledDate}
                                            />
                                        </ConfigProvider>
                                    </div>
                                )}

                                {isTimeVisible && (
                                    <div className='select-time'>
                                        <p className='select-time__label'>
                                            Buổi sáng
                                        </p>
                                        <div className='select-time__list'>
                                            {morningTimes.map((time, index) => {
                                                return (
                                                    <Link
                                                        to='/confirm-appointment'
                                                        key={index}
                                                        className='select-time__item'
                                                        onClick={() =>
                                                            handleSelectTime(
                                                                time
                                                            )
                                                        }
                                                    >
                                                        {time}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                        <p className='select-time__label'>
                                            Buổi chiều
                                        </p>
                                        <div className='select-time__list'>
                                            {afternoonTimes.map(
                                                (time, index) => {
                                                    return (
                                                        <Link
                                                            to='/confirm-appointment'
                                                            key={index}
                                                            className='select-time__item'
                                                            onClick={() =>
                                                                handleSelectTime(
                                                                    time
                                                                )
                                                            }
                                                        >
                                                            {time}
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className='select__act'>
                                    <Link
                                        className='move-back'
                                        to='/select-service'
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

export default SelectDate;
