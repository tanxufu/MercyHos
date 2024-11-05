import { Link } from 'react-router-dom';
import logo from '../../../public/logo.svg';
function Footer() {
    return (
        <footer className='footer'>
            <div className='container'>
                <div className='footer__container'>
                    <div className='row gy-lg-3'>
                        <div className='col-6 col-lg-12'>
                            <div className='footer__main'>
                                <Link className='footer-logo' to='/'>
                                    <img
                                        src={logo}
                                        alt='babble logo'
                                        className='footer-logo__icon'
                                    />
                                    <p className='footer-logo__title'>
                                        Mercy
                                        <span className='footer-logo__title--blue'>
                                            Hos
                                        </span>
                                    </p>
                                </Link>

                                <ul className='footer-info'>
                                    <li>
                                        <span>Địa chỉ: </span>99 Nguyễn Huệ -
                                        Phường Bến Nghé - Quận 1 - TPHCM.
                                    </li>
                                    <li>
                                        <span>Website: </span>
                                        https://mercyhos.vn
                                    </li>
                                    <li>
                                        <span>Email: </span>cskh@mercyhos.vn
                                    </li>
                                    <li>
                                        <span>Điện thoại: </span>(033) 333 33333
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-2 col-lg-12'>
                            <div className='footer-section links'>
                                <h3>Dịch vụ y tế</h3>
                                <a href='#'>Đặt khám tại cơ sở</a>
                                <a href='#'>Đặt khám bác sĩ</a>
                                <a href='#'>Thanh toán viện phí</a>
                                <a href='#'>Thăm khám tại nhà</a>
                            </div>
                        </div>

                        <div className='col-2 col-lg-12'>
                            <div className='footer-section company'>
                                <h3>Liên hệ hợp tác</h3>
                                <a href='#'>Quảng cáo</a>
                                <a href='#'>Tuyển dụng</a>
                                <a href='#'>Khám sức khỏe doanh nghiệp</a>
                            </div>
                        </div>

                        <div className='col-2 col-lg-12'>
                            <div className='footer-section listen-on'>
                                <h3>Về MercyHos</h3>
                                <div className='platform-icons'>
                                    <a href='#'>Giới thiệu</a>
                                    <a href='#'>Điều khoản dịch vụ</a>
                                    <a href='#'>Chính sách sử dụng</a>
                                    <a href='#'>Quy định sử dụng</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className='footer__copryright'>
                Copyright © 2022 UIHUT all rights reserved.
            </p>
        </footer>
    );
}
export default Footer;
