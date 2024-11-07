import { DashboardOutlined, DockerOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';


const { Header, Content, Footer, Sider } = Layout;
const items = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: <Link to="/admin">Dashboard</Link>,
  },
  {
    key: '2',
    icon: <UserOutlined />,
    label: <Link to="/admin/users">Quản lý người dùng</Link>,
  },
  {
    key: '3',
    icon: <DockerOutlined />,
    label: <Link to="/admin/doctormanagement">Quản lý bác sĩ</Link>,
  },
];
function AdminLayout({ children }) {
  
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

   
    return (
        <div>
            <Layout style={{ width: '100vw', height: '100vh' }}>
                <Sider
                    breakpoint='lg'
                    collapsedWidth='0'
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className='demo-logo-vertical' />
                    <Menu
                        theme='dark'
                        mode='inline'
                        defaultSelectedKeys={['4']}
                        items={items}
                       
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            textAlign: 'center',
                            fontSize: 24,
                            fontWeight: 600,
                            padding: 10,
                            background: colorBgContainer
                        }}
                    >
                        Trang quản trị
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px 0'
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG
                            }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Ant Design ©{new Date().getFullYear()} Created by Ant
                        UED
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
}
AdminLayout.propTypes = {
    children: PropTypes.node
};
export default AdminLayout;
