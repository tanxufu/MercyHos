import Avatar from 'antd/es/avatar/avatar';
import logo from '../../../public/logo.svg';
import menuIcon from '../../assets/icons/menu.svg';
import homeIcon from '../../assets/icons/home.svg';
import processIcon from '../../assets/icons/process.svg';
import informationIcon from '../../assets/icons/information.svg';
import questionIcon from '../../assets/icons/question.svg';
import phoneIcon from '../../assets/icons/phone.svg';
import closeIcon from '../../assets/icons/close.svg';
import userAvt from '../../assets/icons/user-avt.svg';
import userProfile from '../../assets/icons/user-profile.svg';
import ticket from '../../assets/icons/ticket.svg';
import setting from '../../assets/icons/setting.svg';
import Button from '../Button';
import AppContext from '../../contexts/app.context.jsx';
import { logoutAccount } from '../../apis/auth.api';
import { showNotification } from '../../utils/notification';
import { getCurrentUser } from '../../apis/user.api.js';
import { getAppointmentsOnUser } from '../../apis/appointment.api.js';

// import { Input } from 'antd';
import { useContext, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Badge } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import dayjs from 'dayjs';

function Header() {
    const { isAuthenticated, setIsAuthenticated, setUser } =
        useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    // console.log(isAuthenticated, user);
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getCurrentUser()
    });
    const user = data?.data?.data?.data;
    // console.log(user);

    const userId = user?.id;

    const { data: appointments } = useQuery({
        queryKey: ['appointments', userId, ''],
        queryFn: () => getAppointmentsOnUser(userId, ''),
        enabled: !!userId
    });
    // patients
    const notifications = appointments?.data?.data?.data;

    const datesArray = notifications
        ?.filter(
            (appointment) =>
                appointment?.visitStatus !== 'Đã huỷ' &&
                appointment?.visitStatus !== 'Đã khám'
        )
        ?.map((appointment) => appointment.dateVisit)
        ?.filter((date, index, self) => self.indexOf(date) === index);

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

    const items = [
        {
            key: '1',
            label: (
                <div className='dropdown__user' to='/profile'>
                    <img src={userAvt} alt='' className='dropdown__user-avt' />
                    <p>
                        Xin chào!
                        <span className='dropdown__user-label'>
                            {user?.name}
                        </span>
                    </p>
                </div>
            )
        },
        {
            key: '2',
            label: (
                <a className='dropdown__link' href='/profile'>
                    <img src={userProfile} alt='' className='dropdown__icon' />
                    Hồ sơ bệnh nhân
                </a>
            )
        },
        {
            key: '3',
            label: (
                <a className='dropdown__link' href='/user-medical-bill'>
                    <img src={ticket} alt='' className='dropdown__icon' />
                    Phiếu khám bệnh
                </a>
            )
        },
        {
            key: '4',
            label: (
                <a className='dropdown__link' href='/account-setting'>
                    <img src={setting} alt='' className='dropdown__icon' />
                    Cài đặt tài khoản
                </a>
            )
        },
        {
            key: '5',
            label: (
                <button
                    className='dropdown__link dropdown__logout'
                    onClick={handleLogout}
                >
                    <LogoutOutlined
                        style={{ marginLeft: 2, width: 22, height: 22 }}
                    />
                    Đăng xuất
                </button>
            )
        }
    ];

    const today = new Date();
    const formattedToday = new Date(today.setHours(0, 0, 0, 0)).toISOString();

    const hasFutureDate = datesArray?.some((dateStr) => {
        const date = dayjs(dateStr).format('YYYY-MM-DD');
        return date > formattedToday;
    });

    return (
        <>
            <header className='header'>
                <div className='container'>
                    <div className='top-bar'>
                        <button
                            className='top-bar__more d-none d-lg-flex'
                            onClick={toggleMenu}
                        >
                            <img
                                src={menuIcon}
                                alt=''
                                className='top-bar__more--icon'
                            />
                        </button>

                        <Link to='/'>
                            <div className='logo'>
                                <img src={logo} alt='' className='logo__img' />
                                <h1 className='logo__title'>
                                    Mercy
                                    <span className='logo__title--blue'>
                                        Hos
                                    </span>
                                </h1>
                            </div>
                        </Link>

                        <nav
                            className={`navbar ${isMenuOpen ? 'navbar--open' : ''}`}
                        >
                            <ul className='navbar__list'>
                                <li className='navbar__logo d-none d-lg-flex'>
                                    <Link to='/' onClick={closeMenu}>
                                        <div>
                                            <img
                                                src={logo}
                                                alt=''
                                                className='navbar__logo--img'
                                            />
                                            <h1 className='navbar__logo--title'>
                                                Mercy
                                                <span className='navbar__logo--title-blue'>
                                                    Hos
                                                </span>
                                            </h1>
                                        </div>
                                    </Link>

                                    <button
                                        className='navbar__close-btn'
                                        onClick={closeMenu}
                                    >
                                        <img
                                            src={closeIcon}
                                            alt=''
                                            className='navbar__close-btn--icon'
                                        />
                                    </button>
                                </li>
                                {isAuthenticated ? (
                                    <>
                                        <li className='navbar__btn navbar__user d-none d-lg-flex'>
                                            <img
                                                src={userAvt}
                                                alt=''
                                                className='dropdown__icon'
                                            />
                                            <p>
                                                Xin chào
                                                <span className='navbar__user-name'>
                                                    &nbsp;{user?.name}
                                                </span>
                                            </p>
                                        </li>
                                        <li
                                            onClick={closeMenu}
                                            className='d-none d-lg-flex'
                                        >
                                            <NavLink
                                                to='/profile'
                                                className='navbar__link'
                                            >
                                                <img
                                                    src={userProfile}
                                                    alt=''
                                                    className='navbar__link--icon d-none d-lg-block'
                                                />
                                                Hồ sơ bệnh nhân
                                            </NavLink>
                                        </li>
                                        <li
                                            onClick={closeMenu}
                                            className='d-none d-lg-flex'
                                        >
                                            <NavLink
                                                to='/user-medical-bill'
                                                className='navbar__link'
                                            >
                                                <img
                                                    src={ticket}
                                                    alt=''
                                                    className='navbar__link--icon d-none d-lg-block'
                                                />
                                                Phiếu khám bệnh
                                            </NavLink>
                                        </li>
                                        <li
                                            onClick={closeMenu}
                                            className='d-none d-lg-flex'
                                        >
                                            <NavLink
                                                to='/account-setting'
                                                className='navbar__link navbar__link--user'
                                            >
                                                <img
                                                    src={setting}
                                                    alt=''
                                                    className='navbar__link--icon d-none d-lg-block'
                                                />
                                                Cài đặt tài khoản
                                            </NavLink>
                                        </li>
                                    </>
                                ) : (
                                    <li className='navbar__btn d-none d-lg-flex'>
                                        <Button
                                            className='navbar__login-btn'
                                            to='/login'
                                        >
                                            Đăng nhập tài khoản
                                        </Button>
                                    </li>
                                )}
                                <li onClick={closeMenu}>
                                    <NavLink to='/' className='navbar__link'>
                                        <img
                                            src={homeIcon}
                                            alt=''
                                            className='navbar__link--icon d-none d-lg-block'
                                        />
                                        Trang chủ
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/introduction'
                                        className='navbar__link'
                                    >
                                        <img
                                            src={informationIcon}
                                            alt=''
                                            className='navbar__link--icon d-none d-lg-block'
                                        />
                                        Giới thiệu
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/procedure'
                                        className='navbar__link'
                                    >
                                        <img
                                            src={processIcon}
                                            alt=''
                                            className='navbar__link--icon d-none d-lg-block'
                                        />
                                        Quy trình
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/qa' className='navbar__link'>
                                        <img
                                            src={questionIcon}
                                            alt=''
                                            className='navbar__link--icon d-none d-lg-block'
                                        />
                                        Thắc mắc
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to='/contact'
                                        className='navbar__link'
                                    >
                                        <img
                                            src={phoneIcon}
                                            alt=''
                                            className='navbar__link--icon d-none d-lg-block'
                                        />
                                        Liên hệ
                                    </NavLink>
                                </li>
                                {isAuthenticated && (
                                    <li
                                        className='navbar__logout d-none d-lg-flex'
                                        onClick={toggleMenu}
                                    >
                                        <button
                                            className='navbar__logout-btn navbar__link'
                                            onClick={handleLogout}
                                        >
                                            <LogoutOutlined
                                                style={{
                                                    marginLeft: 2
                                                }}
                                            />
                                            Đăng xuất
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                        <div className='top-act'>
                            {/* <div className='top-act__search'>
                                <Search
                                    placeholder='Tìm kiếm chuyên khoa'
                                    allowClear
                                    enterButton
                                    size='large'
                                    onSearch={onSearch}
                                />
                            </div> */}

                            {!isAuthenticated ? (
                                <Button
                                    to='/login'
                                    className='btn-login d-lg-none'
                                >
                                    Đăng nhập
                                </Button>
                            ) : (
                                <Dropdown
                                    menu={{
                                        items
                                    }}
                                    placement='bottomRight'
                                    overlayClassName='dropdown'
                                    // open={true}
                                >
                                    <button className='btn-avatar d-lg-none'>
                                        <Avatar
                                            shape='square'
                                            size='small'
                                            icon={<UserOutlined />}
                                            className='btn-avatar__icon'
                                        />
                                        {user?.name}
                                    </button>
                                </Dropdown>
                            )}

                            <Badge
                                dot={datesArray?.length > 0 && hasFutureDate}
                            >
                                <Link to='/user-notifications'>
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        size='xl'
                                        style={{
                                            color: '#00a8ff',
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Link>
                            </Badge>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
