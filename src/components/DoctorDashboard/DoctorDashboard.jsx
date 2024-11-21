/* eslint-disable react/prop-types */
import { Layout, theme } from 'antd';

import DoctorAppointmentManagement from '../DoctorAppointmentManagement';
import documentIcon from '../../assets/icons/user-profile.svg';
import documentCheck from '../../assets/icons/document-check.svg';
import groupIcon from '../../assets/icons/user-group.svg';
import clockIcon from '../../assets/icons/clock.svg';
import dashboardImage from '../../assets/images/doctor-dashboard.png';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsOnDoctor } from '../../apis/appointment.api';

const { Content } = Layout;
function DoctorDashboard({ doctorId }) {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    // get appointments
    const { data } = useQuery({
        queryKey: ['appointments', doctorId],
        queryFn: () => getAppointmentsOnDoctor(doctorId),
        enabled: !!doctorId
    });

    const appointments = data?.data?.data?.data;

    return (
        <div className='doctor-dashboard'>
            <div className='doctor-dashboard__row'>
                <div className='row gx-2'>
                    <div className='col-4'>
                        <Content
                            className='doctor-layout__content'
                            style={{
                                padding: 24,
                                // minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: 20
                            }}
                        >
                            <div className='doctor-dashboard__activity'>
                                <h2>Tổng hoạt động</h2>

                                <div className='doctor-dashboard__activity--row'>
                                    <div
                                        className='doctor-dashboard__activity--item'
                                        style={{ background: '#FFF59878' }}
                                    >
                                        <img src={documentIcon} alt='' />
                                        <span>{appointments?.length}</span>
                                        <p>Tổng Lịch Khám</p>
                                    </div>

                                    <div
                                        className='doctor-dashboard__activity--item'
                                        style={{ background: '#A4FFBD66' }}
                                    >
                                        <img src={documentCheck} alt='' />
                                        <span>
                                            {
                                                appointments?.filter(
                                                    (appointment) =>
                                                        appointment.visitStatus ===
                                                        'Đã khám'
                                                ).length
                                            }
                                        </span>
                                        <p>Đã Hoàn Thành</p>
                                    </div>
                                </div>

                                <div className='doctor-dashboard__activity--row'>
                                    <div
                                        className='doctor-dashboard__activity--item'
                                        style={{ background: '#CCA4FF6B' }}
                                    >
                                        <img src={clockIcon} alt='' />
                                        <span>
                                            {
                                                appointments?.filter(
                                                    (appointment) =>
                                                        appointment.visitStatus ===
                                                        'Sắp tới'
                                                ).length
                                            }
                                        </span>
                                        <p>Lịch Khám Sắp Tới</p>
                                    </div>

                                    <div
                                        className='doctor-dashboard__activity--item'
                                        style={{ background: '#A4D2FF66' }}
                                    >
                                        <img src={groupIcon} alt='' />
                                        <span>
                                            {
                                                new Set(
                                                    appointments?.map(
                                                        (appointment) =>
                                                            appointment.patient
                                                                .id &&
                                                            appointment.visitStatus !==
                                                                'Đã huỷ'
                                                    )
                                                ).size
                                            }
                                        </span>
                                        <p>Tổng Bệnh Nhân</p>
                                    </div>
                                </div>
                            </div>
                        </Content>
                    </div>

                    <div className='col-8'>
                        <Content
                            className='doctor-layout__content'
                            style={{
                                // padding: 24,
                                // minHeight: 280,
                                height: '100%',
                                // background: colorBgContainer,
                                borderRadius: borderRadiusLG
                            }}
                        >
                            <img
                                src={dashboardImage}
                                alt=''
                                style={{ height: '100%', width: '100%' }}
                            />
                        </Content>
                    </div>
                </div>
            </div>

            <DoctorAppointmentManagement
                doctorId={doctorId}
                hide
                pageSize={4}
            />
        </div>
    );
}

export default DoctorDashboard;
