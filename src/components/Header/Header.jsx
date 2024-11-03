import logo from '../../../public/logo.svg';
import { Dropdown, Input, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const items = [
    {
        label: 'Hồ sơ',
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
function Header() {
    return (
        <>
            <div className='container'>
                <header className='header'>
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
                                    onSearch={onSearch}
                                />
                            </div>

                            <NavLink to='/profile' className='top-act__avatar'>
                                <button className='top-act__btn'>
                                    <Dropdown.Button
                                        menu={menuProps}
                                        placement='bottom'
                                        icon={
                                            <UserOutlined className='top-act__icon' />
                                        }
                                      
                                    >
                                        Tài khoản
                                    </Dropdown.Button>
                                </button>
                            </NavLink>
                            <FontAwesomeIcon
                                icon={faBell}
                                size='xl'
                                style={{ color: '#00a8ff' }}
                                className='top-act__noti'
                            />
                        </div>
                    </div>
                </header>
            </div>
        </>
    );
}

export default Header;
