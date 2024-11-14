import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import AppContext from '../../contexts/app.context';
import chevronRight from '../../assets/icons/chevron-right.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import logo from '../../../public/logo.svg';
import Button from '../../components/Button';
import {
    getAppointment,
    getAppointmentsOnUser,
    updateAppointment
} from '../../apis/appointment.api';
import { showNotification } from '../../utils/notification';

function UserMedicalBill() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appointmentId = queryParams.get('id');
    const { user } = useContext(AppContext);
    const userId = user._id;
    const [visitStatus, setVisitStatus] = useState('Sắp tới');

    // list appointments
    const { data, isPending } = useQuery({
        queryKey: ['appointments', userId, visitStatus],
        queryFn: () => {
            console.log('fetch');
            return getAppointmentsOnUser(userId, visitStatus);
        },
        enabled: !!userId
    });
    // patients
    const appointments = data?.data?.data?.data;

    // appointment
    const { data: appointmentData, isPending: appointmentDataPending } =
        useQuery({
            queryKey: ['appointment', appointmentId],
            queryFn: () => getAppointment(appointmentId),
            enabled: !!appointmentId
        });
    const appointment = appointmentData?.data?.data?.data;

    // cancel appointment
    const cancelAppointmentMutation = useMutation({
        mutationFn: (body) => {
            updateAppointment(appointmentId, body);
        },
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                'Bạn đã huỷ lịch hẹn thành công!'
            );
            setVisitStatus('Đã huỷ');

            setTimeout(() => {
                queryClient.invalidateQueries(['appointments', userId]);
                navigate('/user-medical-bill');
            }, 1000);
        },
        onError: (error) => {
            showNotification('error', 'Thất bại!', error?.message);
        }
    });

    const handleCancelAppointment = () => {
        const data = {
            visitStatus: 'Đã huỷ'
        };
        cancelAppointmentMutation.mutate(data);
    };

    const filterItems = ['Sắp tới', 'Đã khám', 'Đã huỷ'];

    const handleFilter = (item) => {
        setVisitStatus(item);
        document
            .querySelector('.user-medical-bill__filter-item--active')
            ?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
    };

    return (
        <div className='user-medical-bill'>
            {appointmentId ? (
                <>
                    <span className='user-medical-bill-info__breadcrumb'>
                        <Link to='/user-medical-bill'>Danh sách</Link>
                        <img src={chevronRight} alt='' />
                    </span>
                    <h1>Phiếu khám bệnh</h1>
                </>
            ) : (
                <>
                    <h1>Danh sách phiếu khám bệnh</h1>
                    <span>Thông tin danh sách phiếu khám bệnh</span>
                </>
            )}

            {appointmentId ? (
                <>
                    <article className='medical-bill-card'>
                        {appointmentDataPending && (
                            <div className='loading'>
                                <div className='loader'></div>
                            </div>
                        )}
                        {!appointmentDataPending && (
                            <>
                                <div className='medical-bill-card__logo'>
                                    <img
                                        src={logo}
                                        alt=''
                                        className='medical-bill-card__logo-img'
                                    />
                                    <h2 className='medical-bill-card__logo-title'>
                                        Bệnh viện Mercy
                                        <span className='medical-bill-card__logo-blue'>
                                            Hos
                                        </span>
                                    </h2>
                                </div>

                                <div className='medical-bill-card__content'>
                                    <h2>Phiếu khám bệnh</h2>
                                    <p>
                                        <span>Chuyên khoa: </span>
                                        {appointment?.doctor?.specialty}
                                    </p>
                                    <p>
                                        <span>Bác sĩ: </span>
                                        {appointment?.doctor?.name}
                                    </p>
                                    <span className='medical-bill-card__number'>
                                        {appointment?.medicalBill}
                                    </span>
                                    <p className='medical-bill-card__info'>
                                        <span>Ngày khám:&nbsp;</span>

                                        {dayjs(
                                            appointment?.dateVisit?.split(
                                                'T'
                                            )[0]
                                        ).format('DD-MM-YYYY')}
                                    </p>
                                    <p className='medical-bill-card__info'>
                                        <span>Giờ khám:&nbsp;</span>
                                        {appointment?.timeVisit}
                                    </p>
                                    <p className='medical-bill-card__info'>
                                        <span>Họ tên:&nbsp;</span>
                                        {appointment?.patient?.name}
                                    </p>
                                    <p className='medical-bill-card__info'>
                                        <span>Giới tính:&nbsp;</span>
                                        {appointment?.patient?.gender}
                                    </p>
                                    <p className='medical-bill-card__info'>
                                        <span>Ngày sinh:&nbsp;</span>
                                        {dayjs(
                                            appointment?.patient?.dob?.split(
                                                'T'
                                            )[0]
                                        ).format('DD-MM-YYYY')}
                                    </p>
                                    <p className='medical-bill-card__info'>
                                        <span>Tỉnh/TP:&nbsp;</span>
                                        {appointment?.patient?.province}
                                    </p>
                                    <p className='medical-bill-card__info'>
                                        <span>Phí khám:&nbsp;</span>
                                        {appointment?.doctor?.fee}.000đ
                                    </p>
                                </div>

                                {appointment?.visitStatus !== 'Sắp tới' && (
                                    <div
                                        className={`medical-bill-card__status ${appointment?.visitStatus === 'Đã huỷ' && 'medical-bill-card__status--cancel'}`}
                                    >
                                        {appointment?.visitStatus === 'Đã huỷ'
                                            ? 'Đã huỷ'
                                            : 'Đã khám'}
                                    </div>
                                )}
                            </>
                        )}
                    </article>
                    {!appointmentDataPending &&
                        (appointment?.visitStatus !== 'Sắp tới' ? (
                            <></>
                        ) : (
                            <Button
                                className={`medical-bill-card__cancel `}
                                onClick={() => handleCancelAppointment()}
                            >
                                <img src={cancelIcon} alt='' />
                                Huỷ lịch hẹn
                            </Button>
                        ))}
                </>
            ) : (
                <>
                    <nav className='user-medical-bill__filter'>
                        {filterItems.map((item, index) => (
                            <div
                                key={index}
                                className={`user-medical-bill__filter-item ${
                                    visitStatus === item
                                        ? 'user-medical-bill__filter-item--active'
                                        : ''
                                }`}
                                onClick={() => handleFilter(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </nav>
                    <ul className='user-medical-bill__list'>
                        {isPending && (
                            <div className='loading'>
                                <div className='loader'></div>
                            </div>
                        )}

                        {appointments?.length < 1 && (
                            <div className='no-data'>
                                <p>Bạn chưa có thông tin phiếu khám.</p>
                            </div>
                        )}

                        {appointments?.map((appointment) => {
                            return (
                                <li key={appointment?._id}>
                                    <Link
                                        to={`/user-medical-bill?id=${appointment?._id}`}
                                        className='medical-bill-item'
                                    >
                                        <div className='medical-bill-item__top'>
                                            <div>
                                                <p>
                                                    <span>Mã phiếu: </span>
                                                    {appointment?.medicalBill}
                                                </p>
                                                <h2>
                                                    {appointment?.patient?.name}
                                                </h2>
                                            </div>
                                            <div
                                                className={`medical-bill-item__payment ${appointment?.visitStatus === 'Đã huỷ' ? 'medical-bill-item__payment--cancel' : ''}  ${
                                                    appointment?.feeStatus !==
                                                    'Chưa thanh toán'
                                                        ? 'medical-bill-item__payment--pay'
                                                        : ''
                                                }`}
                                            >
                                                {appointment?.feeStatus ===
                                                    'Chưa thanh toán' &&
                                                appointment?.visitStatus ===
                                                    'Đã huỷ'
                                                    ? 'Đã huỷ'
                                                    : appointment?.feeStatus ===
                                                        'Chưa thanh toán'
                                                      ? 'Chưa thanh toán'
                                                      : 'Đã thanh toán'}
                                            </div>
                                        </div>

                                        <div className='medical-bill-item__info'>
                                            <h3>
                                                {appointment?.doctor?.specialty}
                                            </h3>
                                            <p>
                                                <span>Bác sĩ: </span>
                                                {appointment?.doctor?.name}
                                            </p>

                                            <p>
                                                <span>Ngày khám: </span>
                                                {dayjs(
                                                    appointment?.dateVisit?.split(
                                                        'T'
                                                    )[0]
                                                ).format('DD-MM-YYYY')}
                                            </p>

                                            <p>
                                                <span>Giờ khám: </span>
                                                {appointment?.timeVisit}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}

export default UserMedicalBill;
