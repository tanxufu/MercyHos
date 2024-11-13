import { Link, NavLink } from 'react-router-dom';
// import { useContext } from 'react';

import banner1 from '../../assets/img/banner1.png';
import banner2 from '../../assets/img/banner2.png';
import banner3 from '../../assets/img/banner3.png';
import list1 from '../../assets/icon/listgroup1.png';
import list2 from '../../assets/icon/listgroup2.png';
import list3 from '../../assets/icon/listgroup3.png';
import zaloqr from '../../assets/images/zaloqr.jpg';
import support from '../../assets/icons/support.svg';
import facebook from '../../assets/icons/facebook.svg';
import fbqr from '../../assets/icons/fbqr.svg';

// import AppContext from '../../contexts/app.context';

function Home() {
    const handleSelectBooking = (type) => {
        localStorage.setItem('appointmentType', type);
    };
    return (
        <div className='home'>
            <div className='home__top'>
                <div className='container'>
                    <div className='slideshow'>
                        <div className='row gx-2 gy-lg-2'>
                            <div className='col-8 col-lg-12'>
                                <div className='slideshow__img-wrap'>
                                    <img
                                        src={banner1}
                                        alt=''
                                        className='slideshow__img'
                                    />
                                </div>
                            </div>

                            <div className='col-4 col-lg-12'>
                                <div className='slideshow-right'>
                                    <div className='slideshow__img-wrap'>
                                        <img
                                            src={banner2}
                                            alt=''
                                            className='slideshow__img'
                                        />
                                    </div>
                                    <div className='slideshow__img-wrap'>
                                        <img
                                            src={banner3}
                                            alt=''
                                            className='slideshow__img'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='listgroup'>
                        <div className='row row-cols-3 gx-2 gx-md-1 row-cols-md-2 gy-md-1 '>
                            <div className='col'>
                                <Link
                                    to='/select-patient-profile'
                                    className='listgroup__link'
                                    onClick={() =>
                                        handleSelectBooking('specialty')
                                    }
                                >
                                    <img
                                        src={list1}
                                        alt=''
                                        className='listgroup__img'
                                    />

                                    <h3>Đặt khám theo chuyên khoa</h3>
                                </Link>
                            </div>

                            <div className='col'>
                                <NavLink
                                    to='/select-patient-profile'
                                    className='listgroup__link'
                                    onClick={() =>
                                        handleSelectBooking('doctor')
                                    }
                                >
                                    <img
                                        src={list2}
                                        alt=''
                                        className='listgroup__img'
                                    />

                                    <h3>Đặt khám theo bác sĩ</h3>
                                </NavLink>
                            </div>
                            <div className='col'>
                                <NavLink
                                    to='/profile'
                                    className='listgroup__link'
                                >
                                    <img
                                        src={list3}
                                        alt=''
                                        className='listgroup__img'
                                    />
                                    <h3>Tra cứu thông tin</h3>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='home__bot'>
                <div className='container'>
                    <div className='support'>
                        <div className='support__top'>
                            <p className='support__label'>HỖ TRỢ</p>
                            <h2 className='support__title'>
                                CÁC HÌNH THỨC HỖ TRỢ
                            </h2>
                        </div>
                        <div className='support__list'>
                            <div className='row row-cols-4 row-cols-lg-2 gx-md-2 gy-lg-2'>
                                <div className='col'>
                                    <Link to='#'>
                                        <article className='support-item'>
                                            <img
                                                src={support}
                                                alt=''
                                                className='support-item__img'
                                            />
                                            <p className='support-item__name'>
                                                Hỗ trợ đặt khám
                                            </p>
                                            <p className='support-item__link'>
                                                1900-1900
                                            </p>
                                        </article>
                                    </Link>
                                </div>
                                <div className='col'>
                                    <Link to='#'>
                                        <article className='support-item'>
                                            <img
                                                src={facebook}
                                                alt=''
                                                className='support-item__img'
                                            />
                                            <p className='support-item__name'>
                                                Fanpage Facebook
                                            </p>
                                            <p className='support-item__link'>
                                                Bấm vào đây
                                            </p>
                                        </article>
                                    </Link>
                                </div>
                                <div className='col'>
                                    <Link to='#'>
                                        <article className='support-item'>
                                            <img
                                                src={zaloqr}
                                                alt=''
                                                className='support-item__img'
                                            />
                                            <p className='support-item__name'>
                                                Hỗ trợ Zalo
                                            </p>
                                            <p className='support-item__link'>
                                                Bấm vào đây
                                            </p>
                                        </article>
                                    </Link>
                                </div>
                                <div className='col'>
                                    <Link to='#'>
                                        <article className='support-item'>
                                            <img
                                                src={fbqr}
                                                alt=''
                                                className='support-item__img'
                                            />
                                            <p className='support-item__name'>
                                                Chat Facebook
                                            </p>
                                            <p className='support-item__link'>
                                                Bấm vào đây
                                            </p>
                                        </article>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
