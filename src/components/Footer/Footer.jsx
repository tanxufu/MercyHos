import logo from '../../../public/logo.svg';
function Footer() {
    return (
        <div className='container '>
            <footer className='footer '>
                <div className='footer-section brand'>
                    <img src={logo} alt='babble logo' className='footer-logo' />
                    <p className='footer-title'>MercyHos</p>
                    <p>Copyright © 2022 UIHUT all rights reserved.</p>
                </div>

                <div className='footer-section links'>
                    <h3>Dịch vụ y tế</h3>
                    <a href='#'>Đặt khám tại cơ sở</a>
                    <a href='#'>Đặt khám theo bắc sĩ</a>
                </div>

                <div className='footer-section company'>
                    <h3>Liên hệ hợp tác</h3>
                    <a href='#'>Quảng cáo</a>
                    <a href='#'>Tuyển dụng</a>
                </div>

                <div className='footer-section listen-on'>
                    <h3>Về MercyHos</h3>
                    <div className='platform-icons'>
                        <a href='#'>Giới thiệu</a>
                        <a href='#'>Điều khoản dịch vụ</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default Footer;
