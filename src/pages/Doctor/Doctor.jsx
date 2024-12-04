import { useContext, useState } from 'react';
import {
    CalendarFilled,
    DashboardFilled,
    LogoutOutlined,
    SettingFilled
} from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';

import { showNotification } from '../../utils/notification';
import { logoutAccount } from '../../apis/auth.api';
import AppContext from '../../contexts/app.context';
import logo from '../../../public/logo.svg';
import doctorAvt from '../../assets/icons/doctor-avt.svg';
import doctorAvtFemale from '../../assets/icons/doctor-avt-female.svg';
import DoctorAppointmentManagement from '../../components/DoctorAppointmentManagement';
import DoctorProfile from '../../components/DoctorProfile';
import DoctorDashboard from '../../components/DoctorDashboard';
import { getUserFromLS } from '../../utils/auth';
import { getDoctorOnUser } from '../../apis/doctor.api';

const { Header, Sider } = Layout;
function Doctor() {
    const [selectedKey, setSelectedKey] = useState('1');
    const { setIsAuthenticated, setUser } = useContext(AppContext);

    const userId = getUserFromLS()?._id;

    // get doctor
    const { data } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => getDoctorOnUser(userId),
        enabled: !!userId
    });
    const doctor = data?.data?.data?.data[0];

    // logout
    const logoutMutation = useMutation({
        mutationFn: () => logoutAccount()
    });

    const handleLogout = () => {
        logoutMutation.mutate(
            {},
            {
                onSuccess: () => {
                    showNotification('success', 'Đăng xuất thành công!', '');

                    setUser(null);
                    setIsAuthenticated(false);
                },
                onError: (error) => {
                    console.error(error);
                    showNotification(
                        'error',
                        'Đăng xuất thất bại!',
                        'Có lỗi xảy ra vui lòng thử lại sau!'
                    );
                }
            }
        );
    };

    return (
        <Layout className='doctor-layout'>
            <Sider className='doctor-layout__sider' trigger={null} collapsible>
                <div className='demo-logo-vertical'>
                    <Link to='/'>
                        <div>
                            <img src={logo} alt='' />
                            <h1>
                                Mercy
                                <span>Hos</span>
                            </h1>
                        </div>
                    </Link>
                </div>
                <Menu
                    theme='light'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    onClick={(e) => {
                        setSelectedKey(e.key);
                        if (e.key === '4') {
                            handleLogout();
                        }
                    }}
                    items={[
                        {
                            key: '1',
                            icon: <DashboardFilled />,
                            label: 'TỔNG QUAN'
                        },
                        {
                            key: '2',
                            icon: <CalendarFilled />,
                            label: 'LỊCH KHÁM'
                        },
                        {
                            key: '3',
                            icon: <SettingFilled />,
                            label: 'CÀI ĐẶT'
                        },
                        {
                            key: '4',
                            icon: <LogoutOutlined />,
                            label: 'ĐĂNG XUẤT'
                        }
                    ]}
                />
            </Sider>
            <Layout className='doctor-layout'>
                <Header
                    className='doctor-layout-header'
                    style={{
                        padding: 0,
                        background: '#f5f5f5'
                    }}
                >
                    <FontAwesomeIcon
                        icon={faBell}
                        size='xl'
                        style={{
                            color: '#7f8f98',
                            width: '24px',
                            height: '24px',
                            cursor: 'pointer'
                        }}
                    />

                    <div className='doctor-layout-header__doctor'>
                        <div className='doctor-layout-header__avt'>
                            <img
                                src={
                                    doctor?.gender === 'male' ||
                                    doctor?.gender === 'Nam'
                                        ? doctorAvt
                                        : doctorAvtFemale
                                }
                                alt=''
                            />
                        </div>

                        <div className='doctor-layout-header__name'>
                            <p>{doctor?.name}</p>
                            <span>{doctor?.specialty}</span>
                        </div>
                    </div>
                </Header>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={selectedKey}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeOut'
                        }}
                    >
                        {selectedKey === '1' && (
                            <DoctorDashboard doctorId={doctor?.id} />
                        )}
                        {selectedKey === '2' && (
                            <DoctorAppointmentManagement
                                doctorId={doctor?.id}
                            />
                        )}
                        {selectedKey === '3' && (
                            <DoctorProfile doctorId={doctor?.id} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </Layout>
        </Layout>
    );
}

export default Doctor;
