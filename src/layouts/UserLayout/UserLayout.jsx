/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';

import chevronRight from '../../assets/icons/chevron-right.svg';
import userProfile from '../../assets/icons/user-profile.svg';
import ticket from '../../assets/icons/ticket.svg';
import notification from '../../assets/icons/notification.svg';
import setting from '../../assets/icons/setting.svg';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function UserLayout({ children }) {
    return (
        <main>
            <Header />
            <div className='profile'>
                <nav className='breadcrumb'>
                    <div className='container'>
                        <ul className='breadcrumb__list'>
                            <li className='breadcrumb__item'>
                                <NavLink to='/'>Trang chủ</NavLink>
                            </li>

                            <li className='breadcrumb__item breadcrumb__item--active'>
                                <img
                                    src={chevronRight}
                                    alt=''
                                    className='breadcrumb__icon'
                                />
                                <NavLink to='#'>Thông tin tài khoản</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className='profile__content'>
                    <div className='container'>
                        <div className='row gx-4 gx-lg-0 gy-lg-4'>
                            <div className='col-4 col-lg-12'>
                                <ul className='profile-nav'>
                                    <li>
                                        <NavLink
                                            to='/profile'
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'profile-nav__item profile-nav__item--active'
                                                    : 'profile-nav__item'
                                            }
                                        >
                                            <img src={userProfile} alt='' />
                                            Hồ sơ bệnh nhân
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/user-medical-bill'
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'profile-nav__item profile-nav__item--active'
                                                    : 'profile-nav__item'
                                            }
                                        >
                                            <img src={ticket} alt='' />
                                            Phiếu khám bệnh
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/user-notifications'
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'profile-nav__item profile-nav__item--active'
                                                    : 'profile-nav__item'
                                            }
                                        >
                                            <img src={notification} alt='' />
                                            Thông báo
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink
                                            to='/account-setting'
                                            className={({ isActive }) =>
                                                isActive
                                                    ? 'profile-nav__item profile-nav__item--active'
                                                    : 'profile-nav__item'
                                            }
                                        >
                                            <img src={setting} alt='' />
                                            Cài đặt tài khoản
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>

                            <div className='col-8 col-lg-12'>{children}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

export default UserLayout;
