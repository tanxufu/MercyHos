import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import AppContext from '../../contexts/app.context';
import chevronRight from '../../assets/icons/chevron-right.svg';
import cancelIcon from '../../assets/icons/cancel.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import logo from '../../../public/logo.svg';
import Button from '../../components/Button';
import {
    getAppointment,
    getAppointmentsOnUser,
    updateAppointment
} from '../../apis/appointment.api';
import { showNotification } from '../../utils/notification';
import { AnimatePresence, motion } from 'framer-motion';
import { Pagination } from 'antd';

function UserMedicalBill() {
    const queryClient = useQueryClient();
    // const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const appointmentId = queryParams.get('id');
    const { user } = useContext(AppContext);
    const userId = user._id;
    const [visitStatus, setVisitStatus] = useState('Sắp tới');

    const [currentPage, setCurrentPage] = useState(1);

    // list appointments
    const { data, isPending } = useQuery({
        queryKey: ['appointments', userId, visitStatus, currentPage],
        queryFn: () => {
            // console.log('fetch');
            return getAppointmentsOnUser(userId, visitStatus, currentPage, 3);
        },
        enabled: !!userId
    });
    // appointments
    const appointments = data?.data?.data?.data;
    const totalPages = data?.data?.total || 0;

    // appointment
    const { data: appointmentData, isPending: appointmentDataPending } =
        useQuery({
            queryKey: ['appointment', appointmentId],
            queryFn: () => getAppointment(appointmentId),
            enabled: !!appointmentId
        });
    const appointment = appointmentData?.data?.data?.data;

    // handle
    const mutation = useMutation({
        mutationFn: (body) => {
            updateAppointment(appointmentId, body);
        },
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                'Bạn đã thực hiện thay đổi thành công!'
            );

            setTimeout(() => {
                queryClient.invalidateQueries(['appointment', appointmentId]);
            }, 500);
        },
        onError: (error) => {
            showNotification('error', 'Thất bại!', error?.message);
        }
    });

    // cancel appointment
    const handleCancelAppointment = () => {
        const today = new Date();
        const oneDayInMs = 24 * 60 * 60 * 1000;
        const dateVisit = new Date(appointment?.dateVisit);

        if (dateVisit - today <= oneDayInMs) {
            showNotification(
                'error',
                'Thông báo!',
                'Không thể huỷ lịch hẹn trước ngày khám 1 ngày!'
            );
            return;
        }

        const data = {
            visitStatus: 'Đã huỷ'
        };
        mutation.mutate(data);
    };

    // reject appointment
    const handleRejectRequest = () => {
        const data = {
            changeRequest: {
                ...appointment?.changeRequest,
                status: 'rejected'
            }
        };

        mutation.mutate(data);
    };

    // approve appointment
    // when approve change request changeRequest filed will save the pre appointment
    const handleApproveAppointment = () => {
        const data = {
            doctor: appointment?.changeRequest?.newDoctor,
            dateVisit: appointment?.changeRequest?.newDateVisit,
            timeVisit: appointment?.changeRequest?.newTimeVisit,
            changeRequest: {
                newDoctor: appointment?.doctor,
                newTimeVisit: appointment?.timeVisit,
                newDateVisit: appointment?.dateVisit,
                status: 'approved'
            }
        };

        mutation.mutate(data);
    };

    const filterItems = ['Sắp tới', 'Đã khám', 'Đã huỷ'];

    // filter
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

    // Pagination
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
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

                    {appointment?.changeRequest?.status === 'pending' && (
                        <p className='user-medical-bill-info__note'>
                            (*) Vì lý do nội bộ. Bệnh viện đã gửi yêu cầu thay
                            đổi lịch hẹn của bạn. Chân thành xin lỗi vì sự bất
                            tiện này.
                            <br />
                            <span>
                                Vui lòng phê duyệt hoặc từ chối yêu cầu này
                                trước ngày khám 1 ngày!
                            </span>
                            <b>
                                <img src={arrowRight} alt='' />
                                Là thông tin được yêu cầu thay đổi, mọi thông
                                tin khác giữ nguyên.
                            </b>
                        </p>
                    )}

                    {appointment?.changeRequest?.status === 'approved' && (
                        <p className='user-medical-bill-info__note'>
                            (*) Lịch hẹn của bạn đã thay đổi theo yêu cầu phía
                            Bệnh viện.
                        </p>
                    )}
                </>
            ) : (
                <>
                    <h1>Danh sách phiếu khám bệnh</h1>
                    <span>Thông tin danh sách phiếu khám bệnh</span>
                </>
            )}

            {/* bill info */}
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
                                    <div className='medical-bill-card__col'>
                                        <p>
                                            <span>Chuyên khoa: </span>
                                            {appointment?.doctor?.specialty}
                                        </p>
                                        {/* has request */}
                                        {appointment?.changeRequest?.status ===
                                            'pending' &&
                                            appointment?.changeRequest
                                                ?.newDoctor?.specialty !==
                                                appointment?.doctor
                                                    ?.specialty && (
                                                <p className='medical-bill-card__change'>
                                                    {/* <img
                                                        src={arrowRight}
                                                        alt=''
                                                    /> */}
                                                    <span>Chuyên khoa: </span>
                                                    {
                                                        appointment
                                                            ?.changeRequest
                                                            ?.newDoctor
                                                            ?.specialty
                                                    }
                                                </p>
                                            )}
                                    </div>
                                    <div className='medical-bill-card__col'>
                                        <p>
                                            <span>Bác sĩ: </span>
                                            {appointment?.doctor?.name}
                                        </p>
                                        {/* has request */}
                                        {appointment?.changeRequest?.status ===
                                            'pending' &&
                                            appointment?.changeRequest
                                                ?.newDoctor?.id !==
                                                appointment?.doctor?.id && (
                                                <p className='medical-bill-card__change'>
                                                    <span>Bác sĩ: </span>
                                                    {
                                                        appointment
                                                            ?.changeRequest
                                                            ?.newDoctor?.name
                                                    }
                                                </p>
                                            )}
                                    </div>

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

                                        {/* has request */}
                                        {appointment?.changeRequest?.status ===
                                            'pending' &&
                                            appointment?.changeRequest
                                                ?.newDateVisit !==
                                                appointment?.dateVisit && (
                                                <p className='medical-bill-card__change'>
                                                    {dayjs(
                                                        appointment?.changeRequest?.newDateVisit?.split(
                                                            'T'
                                                        )[0]
                                                    ).format('DD-MM-YYYY')}
                                                </p>
                                            )}
                                    </p>
                                    <p className='medical-bill-card__info'>
                                        <span>Giờ khám:&nbsp;</span>
                                        {appointment?.timeVisit}

                                        {/* has request */}
                                        {appointment?.changeRequest?.status ===
                                            'pending' &&
                                            appointment?.changeRequest
                                                ?.newTimeVisit !==
                                                appointment?.timeVisit && (
                                                <p className='medical-bill-card__change'>
                                                    {
                                                        appointment
                                                            ?.changeRequest
                                                            ?.newTimeVisit
                                                    }
                                                </p>
                                            )}
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
                    {appointment?.changeRequest?.status === 'pending' &&
                        appointment?.visitStatus === 'Sắp tới' && (
                            <div className='medical-bill-card__act'>
                                <Button
                                    className={`medical-bill-card__approve`}
                                    onClick={() => handleApproveAppointment()}
                                >
                                    Đồng ý thay đổi
                                </Button>
                                <Button
                                    className={`medical-bill-card__cancel`}
                                    onClick={() => handleRejectRequest()}
                                >
                                    Giữ lịch hẹn cũ
                                </Button>
                            </div>
                        )}

                    {!appointmentDataPending &&
                        appointment?.changeRequest?.status !== 'pending' &&
                        (appointment?.visitStatus !== 'Sắp tới' ? (
                            <></>
                        ) : (
                            <div className='medical-bill-card__act'>
                                <Button
                                    className={`medical-bill-card__cancel `}
                                    onClick={() => handleCancelAppointment()}
                                >
                                    <img src={cancelIcon} alt='' />
                                    Huỷ lịch hẹn
                                </Button>
                            </div>
                        ))}
                </>
            ) : (
                // list bill
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
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={appointments}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.3,
                                ease: 'easeOut'
                            }}
                        >
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
                                                            <span>
                                                                Mã phiếu:{' '}
                                                            </span>
                                                            {
                                                                appointment?.medicalBill
                                                            }
                                                        </p>
                                                        <h2>
                                                            {
                                                                appointment
                                                                    ?.patient
                                                                    ?.name
                                                            }
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
                                                        {
                                                            appointment?.doctor
                                                                ?.specialty
                                                        }
                                                    </h3>
                                                    <p>
                                                        <span>Bác sĩ: </span>
                                                        {
                                                            appointment?.doctor
                                                                ?.name
                                                        }
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
                        </motion.div>
                    </AnimatePresence>
                    <Pagination
                        className='user-medical-bill__pagination'
                        align='end'
                        pageSize={3}
                        total={appointments?.length > 1 ? totalPages : 0}
                        onChange={handlePaginationChange}
                        hideOnSinglePage={true}
                    />
                </>
            )}
        </div>
    );
}

export default UserMedicalBill;
