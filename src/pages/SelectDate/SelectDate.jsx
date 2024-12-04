import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { DatePicker, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'antd/locale/vi_VN';
import 'dayjs/locale/vi';

import chevronRight from '../../assets/icons/chevron-right.svg';
import hospitalIcon from '../../assets/icons/hospital.svg';
import warnIcon from '../../assets/icons/warn.svg';
import stethoscopeIcon from '../../assets/icons/stethoscope.svg';
import doctorIcon from '../../assets/icons/doctor2.svg';
import medicalIcon from '../../assets/icons/medical.svg';
import calendar from '../../assets/icons/calendar-date.svg';
import { getAppointmentOnDoctors } from '../../apis/doctor.api';

dayjs.extend(utc);
dayjs.locale('vi');

function SelectDate() {
    const [date, setDate] = useState(null);
    const [isTimeVisible, setIsTimeVisible] = useState(false);
    const cacheData = JSON.parse(localStorage.getItem('appointmentPatient'));

    const availableDays = cacheData?.doctorAvailability;
    const doctorId = cacheData?.doctorId;

    const { data } = useQuery({
        queryKey: ['doctorAppointment', doctorId],
        queryFn: () => getAppointmentOnDoctors(doctorId),
        enabled: !!doctorId
    });

    const appointments = data?.data?.data?.data || [];

    // console.log(appointments);

    const appointmentsMap = appointments?.reduce((acc, appointment) => {
        if (appointment?.visitStatus !== 'Đã huỷ') {
            const date = dayjs(appointment.dateVisit).format('DD-MM-YYYY');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(appointment.timeVisit);
        }

        return acc;
    }, {});

    // console.log(appointmentsMap);

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

        if (current > dayjs().add(4, 'week')) {
            return true;
        }

        if (current.isSame(dayjs(), 'day')) {
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

    const pickDate = cacheData?.appointmentDate;
    const bookedTimeByDate = appointmentsMap[pickDate];
    // console.log(pickDate, bookedTimeByDate);

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

    const timeSlots = [
        {
            period: 'Buổi sáng',
            times: ['8:00 - 9:00', '9:00 - 10:00', '10:00 - 11:00']
        },
        {
            period: 'Buổi chiều',
            times: ['13:30 - 14:30', '14:30 - 15:30', '15:30 - 16:30']
        }
    ];

    const updatedTimeSlots = timeSlots.map((slot) => {
        return {
            ...slot,
            times: slot.times.filter(
                (time) => !bookedTimeByDate?.includes(time)
            )
        };
    });

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
                            <NavLink to='#'>Chọn ngày khám</NavLink>
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
                                                <span>{date}</span>
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
                                                format='DD-MM-YYYY'
                                                disabledDate={disabledDate}
                                            />
                                        </ConfigProvider>
                                    </div>
                                )}

                                {/* select time */}
                                {isTimeVisible && (
                                    <div className='select-time'>
                                        {updatedTimeSlots.map((slot, index) => (
                                            <div key={index}>
                                                <p className='select-time__label'>
                                                    {slot.period}
                                                </p>
                                                <div className='select-time__list'>
                                                    {slot?.times < 1 && (
                                                        <p className='select-time__note'>
                                                            <img
                                                                src={warnIcon}
                                                                alt=''
                                                            />
                                                            Đã hết thời gian
                                                            trống trong khung
                                                            giờ này của bác sĩ!
                                                        </p>
                                                    )}
                                                    {slot?.times?.map(
                                                        (time, index) => (
                                                            <Link
                                                                to='/confirm-appointment'
                                                                key={index}
                                                                className={`select-time__item`}
                                                                onClick={() =>
                                                                    handleSelectTime(
                                                                        time
                                                                    )
                                                                }
                                                            >
                                                                {time}
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
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
