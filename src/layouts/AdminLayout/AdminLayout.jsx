import { useContext, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    CalendarOutlined,
    TeamOutlined,
    UsergroupAddOutlined,
    ProfileOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useMutation } from '@tanstack/react-query';

import DoctorManagement from '../../components/DoctorManagement';
import UserManagement from '../../components/UserManagement';
import AppointmentManagement from '../../components/AppointmentManagement';
import PatientManagement from '../../components/PatientManagement';
import { showNotification } from '../../utils/notification';
import { logoutAccount } from '../../apis/auth.api';
import AppContext from '../../contexts/app.context';

const { Header, Sider, Content } = Layout;

function AdminLayout() {
    const [selectedKey, setSelectedKey] = useState('1');
    const { setIsAuthenticated, setUser } = useContext(AppContext);

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

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
        <Layout>
            <Sider
                className='admin-layout__sider'
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Menu
                    theme='dark'
                    mode='inline'
                    defaultSelectedKeys={['1']}
                    onClick={(e) => {
                        setSelectedKey(e.key);
                        if (e.key === '5') {
                            handleLogout();
                        }
                    }}
                    items={[
                        {
                            key: '1',
                            icon: <UsergroupAddOutlined />,
                            label: 'QL BÁC SĨ'
                        },
                        {
                            key: '2',
                            icon: <CalendarOutlined />,
                            label: 'QL LỊCH KHÁM'
                        },
                        {
                            key: '3',
                            icon: <TeamOutlined />,
                            label: 'QL NGƯỜI DÙNG'
                        },

                        {
                            key: '4',
                            icon: <ProfileOutlined />,
                            label: 'QL HỒ SƠ'
                        },

                        {
                            key: '5',
                            icon: <LogoutOutlined />,
                            label: 'ĐĂNG XUẤT'
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer
                    }}
                >
                    <Button
                        type='text'
                        icon={
                            collapsed ? (
                                <MenuUnfoldOutlined />
                            ) : (
                                <MenuFoldOutlined />
                            )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64
                        }}
                    />
                </Header>
                <Content
                    className='admin-layout__content'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    {selectedKey === '1' && <DoctorManagement />}
                    {selectedKey === '2' && <AppointmentManagement />}
                    {selectedKey === '3' && <UserManagement />}
                    {selectedKey === '4' && <PatientManagement />}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
