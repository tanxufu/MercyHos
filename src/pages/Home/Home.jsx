import banner1 from '../../assets/img/banner1.png';
import banner2 from '../../assets/img/banner2.png';
import banner3 from '../../assets/img/banner3.png';
import list1 from '../../assets/icon/listgroup1.png';
import list2 from '../../assets/icon/listgroup2.png';
import list3 from '../../assets/icon/listgroup3.png';
import { NavLink } from 'react-router-dom';

function Home() {
    return (
        <div className='container'>
            <div className='slideshow'>
                <div className='slideshow__inner'>
                    <img src={banner1} alt='' className='slideshow__left' />
                    <div className='slideshow__item'>
                        <div>
                            <img
                                src={banner2}
                                alt=''
                                className='slideshow__img'
                            />
                        </div>
                        <div>
                            <img
                                src={banner3}
                                alt=''
                                className='slideshow__img'
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ul className='listgroup '>
                <li className='listgroup__item'>
                    <NavLink href='#!' className='listgroup__link'>
                        <div className='listgroup__wrapper'>
                            <img
                                src={list1}
                                alt=''
                                className='listgroup__img'
                            />
                        </div>
                        <h3>Đặt khám theo chuyên khoa</h3>
                    </NavLink>
                </li>

                <li className='listgroup__item'>
                    <NavLink href='#!' className='listgroup__link'>
                        <div className='listgroup__wrapper'>
                            <img
                                src={list2}
                                alt=''
                                className='listgroup__img'
                            />
                        </div>
                        <h3>Đặt khám theo bác sĩ</h3>
                    </NavLink>
                </li>
                <li className='listgroup__item'>
                    <NavLink href='#!' className='listgroup__link'>
                        <div className='listgroup__wrapper'>
                            <img
                                src={list3}
                                alt=''
                                className='listgroup__img'
                            />
                        </div>
                        <h3>Tra cứu thông tin</h3>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Home;
