import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import envelopeIcon from '../../assets/icons/envelope.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import { useContext, useState } from 'react';
import AppContext from '../../contexts/app.context';
import { getAppointmentsOnUser } from '../../apis/appointment.api';
import { useQuery } from '@tanstack/react-query';
import { Pagination } from 'antd';

function UserNotification() {
    const { user } = useContext(AppContext);
    const userId = user._id;
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isPending } = useQuery({
        queryKey: ['appointments', userId, '', currentPage],
        queryFn: () => getAppointmentsOnUser(userId, '', currentPage, 6),
        enabled: !!userId
    });
    // patients
    const appointments = data?.data?.data?.data;
    const totalPages = data?.data?.total || 0;

    const today = new Date();
    const formattedToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();

    // Pagination
    const handlePaginationChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='user-notifications'>
            <h1>Danh sách thông báo</h1>
            <span>Nhấp vào để xem thông tin chi tiết</span>

            <ul className='user-notifications__list'>
                {isPending && (
                    <div className='loading'>
                        <div className='loader'></div>
                    </div>
                )}

                {appointments?.length < 1 && (
                    <div className='no-data'>
                        <p>Bạn chưa có thông báo.</p>
                    </div>
                )}

                {appointments?.map((appointment) => {
                    return (
                        <li key={appointment?._id}>
                            <Link
                                to={`/user-medical-bill?id=${appointment?._id}`}
                                className='user-notifications__link'
                            >
                                <div className='user-notifications__info'>
                                    <div className='user-notifications__message'>
                                        <div
                                            className={
                                                appointment?.dateVisit <
                                                    formattedToday ||
                                                appointment?.visitStatus ===
                                                    'Đã huỷ' ||
                                                appointment?.visitStatus ===
                                                    'Đã khám'
                                                    ? ''
                                                    : `user-notifications__message-dot`
                                            }
                                        ></div>
                                        <img
                                            src={envelopeIcon}
                                            alt=''
                                            className='user-notifications__message--icon'
                                        />
                                    </div>
                                    {appointment?.changeRequest?.status ===
                                        'pending' && (
                                        <p>
                                            Bạn có yêu cầu thay đổi lịch
                                            khám!&nbsp;
                                            <i>Nhấn xem chi tiết</i>
                                        </p>
                                    )}

                                    {appointment?.changeRequest?.status !==
                                        'pending' && (
                                        <p>
                                            Bạn có lịch khám vào ngày&nbsp;
                                            {dayjs(
                                                appointment?.dateVisit?.split(
                                                    'T'
                                                )[0]
                                            ).format('DD-MM-YYYY')}
                                            {appointment?.visitStatus ===
                                            'Đã huỷ' ? (
                                                <i>(Đã huỷ)</i>
                                            ) : appointment?.visitStatus ===
                                              'Đã khám' ? (
                                                <i>(Hoàn thành)</i>
                                            ) : appointment?.dateVisit <
                                              formattedToday ? (
                                                <i>(Quá hạn)</i>
                                            ) : (
                                                ''
                                            )}
                                        </p>
                                    )}

                                    <img
                                        className='user-notifications__icon'
                                        src={chevronRight}
                                        alt=''
                                    />
                                </div>
                                <span>
                                    {dayjs(
                                        appointment?.createdAt?.split('T')[0]
                                    ).format('DD-MM-YYYY')}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <Pagination
                className='user-medical-bill__pagination'
                align='end'
                pageSize={6}
                total={appointments?.length >= 1 ? totalPages : 0}
                onChange={handlePaginationChange}
                hideOnSinglePage={true}
            />
        </div>
    );
}

export default UserNotification;
