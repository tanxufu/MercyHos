import chevronRight from '../../assets/icons/chevron-right.svg';

function Procedure() {
    return (
        <div className='procedure'>
            <div className='procedure__top'>
                <div className='container'>
                    <div className='procedure__heading'>
                        <h1>Quy trình đặt khám bệnh</h1>
                    </div>
                </div>
            </div>

            <div className='procedure__content'>
                <ul className='procedure__timeline'>
                    <li>
                        <p className='procedure__step'>Bước 1</p>
                        <div className='procedure__info'>
                            <h3>Đặt lịch khám</h3>
                            <ul>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Đăng nhập phần mềm trên website.
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Chọn hình thức đặt khám: Theo ngày hoặc theo
                                    bác sĩ.
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Nhập thông tin bệnh nhân.
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Chọn thông tin khám: Chuyên khoa, bác sĩ,
                                    ngày khám, giờ khám.
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <p className='procedure__step'>Bước 2</p>
                        <div className='procedure__info'>
                            <h3>
                                Xác nhận Người bệnh đến bệnh viện khám theo hẹn
                            </h3>
                            <ul>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Sau khi đặt khám thành công phiếu khám điện
                                    tử sẽ được gửi qua email, và trên phần mềm.
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Người bệnh sẽ đến trực tiếp phòng khám trước
                                    giờ hẹn 15-30 phút để khám bệnh .
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <p className='procedure__step'>Bước 3</p>
                        <div className='procedure__info'>
                            <h3>Khám và thực hiện cận lâm sàng</h3>
                            <ul>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Người bệnh khám tại các phòng khám chuyên
                                    khoa theo sự hướng dẫn của nhân viên y tế.
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Thực hiện cận lâm sàng (nếu có) và đóng phí
                                    tại các quầy thu ngân
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Khi đủ kết quả cận lâm sàng, người bệnh quay
                                    lại phòng khám gặp Bác sĩ nhận toa thuốc.
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <p className='procedure__step'>Bước 4</p>
                        <div className='procedure__info'>
                            <h3>Nhận thuốc</h3>
                            <ul>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Đến nhà thuốc khu A hoặc khu B mua thuốc,
                                    thanh toán tiền thuốc tại quầy hoặc trừ vào
                                    tài khoản thẻ khám bệnh (nếu có).
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li>
                        <p className='procedure__step'>Bước 5</p>
                        <div className='procedure__info'>
                            <h3>Đặt lịch tái khám</h3>
                            <ul>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Sử dụng phần mềm đặt hẹn tái khám như BƯỚC
                                    1.
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Chọn bác sĩ khám và ngày tái khám theo thông
                                    tin trên toa thuốc.
                                </li>
                                <li>
                                    <img src={chevronRight} alt='' />
                                    Nhập thông tin người bệnh bằng số hồ sơ đã
                                    khám.
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Procedure;
