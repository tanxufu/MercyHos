import Avatar from 'antd/es/avatar/avatar';
import logo from '../../../public/logo.svg';
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';


const { Search } = Input;
const onSearch = (value, _e, info) => console.log(info?.source, value);

function Header() {
    
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
                                    onSearch={onSearch}
                                />
                            </div>

                            <NavLink to='/profile' className='top-act__avatar' >
                                <button className='btn-avatar' >
                                    <Avatar
                                        shape='square'
                                        size='small'
                                        icon={<UserOutlined />}
                                        className='btn-avatar__icon'
                                    />
                                    Tài khoản
                                </button>
                                <FontAwesomeIcon
                                    icon={faBell}
                                    size='xl'
                                    style={{ color: '#0187e0' }}
                                />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
