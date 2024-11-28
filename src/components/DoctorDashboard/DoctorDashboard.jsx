/* eslint-disable react/prop-types */
import { Layout, theme } from 'antd';

import DoctorAppointmentManagement from '../DoctorAppointmentManagement';
import documentIcon from '../../assets/icons/user-profile.svg';
import documentCheck from '../../assets/icons/document-check.svg';
import groupIcon from '../../assets/icons/user-group.svg';
import clockIcon from '../../assets/icons/clock.svg';
import { useQuery } from '@tanstack/react-query';
import { getAppointmentsOnDoctor } from '../../apis/appointment.api';

const { Content } = Layout;
function DoctorDashboard({ doctorId }) {
    const {
        token: { colorBgContainer }
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
            <div className='row gx-0'>
                <div className='col-3'>
                    <Content
                        className='doctor-layout__content'
                        style={{
                            marginTop: 24,
                            padding: 24,
                            // minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: 20
                        }}
                    >
                        <div className='doctor-dashboard__activity'>
                            <h2>Tổng hoạt động</h2>

                            {/* <div className='doctor-dashboard__activity--row'> */}
                            <div
                                className='doctor-dashboard__activity--item'
                                style={{ background: '#FFF59878' }}
                            >
                                <img src={documentIcon} alt='' />
                                <p>Tổng Lịch Khám</p>
                                <span>{appointments?.length}</span>
                            </div>

                            <div
                                className='doctor-dashboard__activity--item'
                                style={{ background: '#A4FFBD66' }}
                            >
                                <img src={documentCheck} alt='' />

                                <p>Đã Hoàn Thành</p>
                                <span>
                                    {
                                        appointments?.filter(
                                            (appointment) =>
                                                appointment.visitStatus ===
                                                'Đã khám'
                                        ).length
                                    }
                                </span>
                            </div>
                            {/* </div> */}

                            {/* <div className='doctor-dashboard__activity--row'> */}
                            <div
                                className='doctor-dashboard__activity--item'
                                style={{ background: '#CCA4FF6B' }}
                            >
                                <img src={clockIcon} alt='' />

                                <p>Lịch Khám Sắp Tới</p>

                                <span>
                                    {
                                        appointments?.filter(
                                            (appointment) =>
                                                appointment.visitStatus ===
                                                'Sắp tới'
                                        ).length
                                    }
                                </span>
                            </div>

                            <div
                                className='doctor-dashboard__activity--item'
                                style={{ background: '#A4D2FF66' }}
                            >
                                <img src={groupIcon} alt='' />

                                <p>Tổng Bệnh Nhân</p>

                                <span>
                                    {
                                        new Set(
                                            appointments?.map(
                                                (appointment) =>
                                                    appointment.patient.id &&
                                                    appointment.visitStatus !==
                                                        'Đã huỷ'
                                            )
                                        ).size
                                    }
                                </span>
                            </div>
                        </div>
                        {/* </div> */}
                    </Content>
                </div>

                <div className='col-9'>
                    <DoctorAppointmentManagement
                        doctorId={doctorId}
                        hide
                        pageSize={6}
                    />
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;
