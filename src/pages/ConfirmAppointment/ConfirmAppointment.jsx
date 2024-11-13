import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import Button from '../../components/Button';
import { getPatient } from '../../apis/patient.api';
import chevronRight from '../../assets/icons/chevron-right.svg';
import hospitalIcon from '../../assets/icons/hospital.svg';
import userNoLine from '../../assets/icons/user-noline.svg';
import cake from '../../assets/icons/cake.svg';
import gender from '../../assets/icons/gender.svg';
import bagIcon from '../../assets/icons/bag.svg';
import location from '../../assets/icons/location.svg';
import mobi from '../../assets/icons/mobi.svg';
import emailIcon from '../../assets/icons/email.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { createAppointment } from '../../apis/appointment.api';
import { showNotification } from '../../utils/notification';
import { useContext, useEffect } from 'react';
import AppContext from '../../contexts/app.context';

function ConfirmAppointment() {
    const navigate = useNavigate();
    const { user } = useContext(AppContext);
    const userId = user._id;

    const cacheData = JSON.parse(localStorage.getItem('appointmentPatient'));
    const { patientId } = cacheData;

    const { data } = useQuery({
        queryKey: ['patient', patientId],
        queryFn: () => getPatient(patientId),
        enabled: !!patientId
    });
    const patient = data?.data?.data?.data;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const createAppointmentMutation = useMutation({
        mutationKey: ['appointment', patientId],
        mutationFn: (body) => createAppointment(body),
        onSuccess: () => {
            // console.log('success');
            showNotification(
                'success',
                'Thành công!',
                'Bạn đã đặt lịch khám thành công!'
            );
            navigate('/');
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message;
            if (errorMessage) {
                showNotification('error', 'Lỗi!', errorMessage);
            } else {
                showNotification(
                    'error',
                    'Lỗi Server!',
                    'Đã có lỗi xảy ra vui lòng thử lại sau!'
                );
            }
        }
    });

    const handleSubmit = (data) => {
        const appointmentData = {
            user: userId,
            patient: patientId,
            doctor: data.doctorId,
            dateVisit: dayjs(data.appointmentDate).format('YYYY-MM-DD'),
            timeVisit: data.appointmentTime,
            visitStatus: 'Sắp tới',
            feeStatus: 'Chưa thanh toán'
        };
        // console.log(appointmentData);
        createAppointmentMutation.mutateAsync(appointmentData);
    };

    return (
        <div className='confirm-appointment'>
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
                            <NavLink to='#'>Xác nhận thông tin</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <div className='select__content'>
                    <div className='row gy-lg-3'>
                        <div className='col-3 col-lg-12'>
                            <div className='create-appointment-info'>
                                <h2>Thông tin</h2>
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
                            {/* appointment confirm */}
                            <div className='select__main'>
                                <h2>Xác nhận thông tin khám</h2>
                                <div className='select__wrapper'>
                                    <div className='select__list-group'>
                                        <div className='confirm-appointment__info'>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Chuyên khoa</th>
                                                        <th>Dịch vụ</th>
                                                        <th>Bác sĩ</th>
                                                        <th>Giờ khám</th>
                                                        <th>Phí khám</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>
                                                            {
                                                                cacheData?.specialtyId
                                                            }
                                                        </td>
                                                        <td>Khám dịch vụ</td>
                                                        <td>
                                                            {
                                                                cacheData?.doctorName
                                                            }
                                                        </td>
                                                        <td>{`${dayjs(cacheData?.appointmentDate).format('DD/MM/YY')} ${cacheData?.appointmentTime?.split(' ')[0]}`}</td>
                                                        <td>150.000đ</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* patient info */}
                            <div className='select__main select__main--bot'>
                                <h2>Thông tin bệnh nhân</h2>
                                <div className='select__wrapper'>
                                    <ul className='confirm-appointment__patient'>
                                        <li>
                                            <div>
                                                <img src={userNoLine} alt='' />
                                                Họ và tên
                                            </div>
                                            {patient?.name}
                                        </li>
                                        <li>
                                            <div>
                                                <img src={gender} alt='' />
                                                Giới tính
                                            </div>
                                            Nam
                                        </li>
                                        <li>
                                            <div>
                                                <img src={cake} alt='' />
                                                Ngày sinh
                                            </div>
                                            {dayjs(
                                                patient?.dob?.split('T')[0]
                                            ).format('DD-MM-YYYY')}
                                        </li>
                                        <li>
                                            <div>
                                                <img src={mobi} alt='' />
                                                Số điện thoại
                                            </div>
                                            {patient?.phone}
                                        </li>
                                        <li>
                                            <div>
                                                <img src={emailIcon} alt='' />
                                                Email
                                            </div>
                                            {patient?.email}
                                        </li>
                                        <li>
                                            <div>
                                                <img src={bagIcon} alt='' />
                                                Nghề nghiệp
                                            </div>
                                            {patient?.occupation}
                                        </li>
                                        <li>
                                            <div>
                                                <img src={location} alt='' />
                                                Địa chỉ
                                            </div>
                                            {`${patient?.address}, ${patient?.ward}, ${patient?.district}, ${patient?.province}`}
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='select__act confirm-appointment__act'>
                                <Link className='move-back' to='/select-date'>
                                    <span>Quay lại</span>
                                </Link>
                                <Button
                                    onClick={() => handleSubmit(cacheData)}
                                    className='confirm-appointment__btn'
                                >
                                    Xác nhận
                                    <img src={arrowRight} alt='' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmAppointment;
