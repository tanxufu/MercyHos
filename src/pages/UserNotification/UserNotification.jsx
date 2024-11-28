import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import envelopeIcon from '../../assets/icons/envelope.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import { useContext } from 'react';
import AppContext from '../../contexts/app.context';
import { getAppointmentsOnUser } from '../../apis/appointment.api';
import { useQuery } from '@tanstack/react-query';

function UserNotification() {
    const { user } = useContext(AppContext);
    const userId = user._id;

    const { data, isPending } = useQuery({
        queryKey: ['appointments', userId, ''],
        queryFn: () => getAppointmentsOnUser(userId, ''),
        enabled: !!userId
    });
    // patients
    const appointments = data?.data?.data?.data;

    const today = new Date();
    const formattedToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();

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
                                                    'Đã huỷ'
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
        </div>
    );
}

export default UserNotification;
