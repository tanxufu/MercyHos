import logo from '../../../public/logo.svg';
import { Dropdown, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../../contexts/app.context';

const { Search } = Input;

function Header({ onLogout, userName = 'Tai khoan' }) {
    const { isAuthenticated } = useContext(AppContext);
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        if (e.key === '1') {
            if (isAuthenticated) {
                // Nếu người dùng đã đăng nhập, điều hướng đến trang hồ sơ
                navigate('/profile');
            } else {
                // Nếu người dùng chưa đăng nhập, điều hướng đến trang đăng nhập
                navigate('/login');
            }
        } else if (e.key === '3') {
            onLogout();
            message.success('Đăng xuất thành công!');
        }
    };
    const items = [
        {
            label: <span to='/profile'>Ho so</span>,

            key: '1',
            icon: <UserOutlined />
        },
        {
            label: 'Đăng xuất',
            key: '3',
            icon: <UserOutlined />,
            danger: true
        }
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick
    };

    return (
        <>
            <header className='header'>
                <div className='container'>
                    <div className='top-bar'>
                        <div className='logo'>
                            <img src={logo} alt='' className='logo__img' />
                            <h1 className='logo__title'>MercyHos</h1>
                        </div>
                        <nav className='navbar'>
                            <ul className='navbar__list'>
                                <li>
                                    <NavLink to={'/'} className='navbar__link'>
                                        Trang chủ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'} className='navbar__link'>
                                        Giới thiệu
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'} className='navbar__link'>
                                        Quy trình
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'} className='navbar__link'>
                                        Thắc mắc
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/'} className='navbar__link'>
                                        Liên hệ
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <div className='top-act'>
                            <div className='top-act__search'>
                                <Search
                                    placeholder='Tìm kiếm chuyên khoa'
                                    allowClear
                                    enterButton
                                    size='large'
                                />
                            </div>

                            <div className='top-act__avatar'>
                                <Dropdown.Button
                                    
                                    menu={menuProps}
                                    placement='bottom'
                                    icon={
                                        <UserOutlined className='top-act__icon' />
                                    }
                                >
                                    {userName}  
                                </Dropdown.Button>
                            </div>
                            <FontAwesomeIcon
                                icon={faBell}
                                size='xl'
                                style={{ color: '#00a8ff' }}
                                className='top-act__noti'
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
Header.propTypes = {
    onLogout: PropTypes.func.isRequired,
    userName: PropTypes.string // Không cần .isRequired nếu có giá trị mặc định
};

export default Header;
