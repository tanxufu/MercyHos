import { Collapse } from 'antd';

import chevronDbRight from '../../assets/icons/chevron-db-right.svg';
import { useState } from 'react';

function QandA() {
    const [activeQa, setActiveQa] = useState('common');

    const handleClick = (qa) => {
        setActiveQa(qa);
    };

    console.log(activeQa);

    return (
        <div className='qa'>
            <div className='qa__top'>
                <div className='container'>
                    <div className='qa__heading'>
                        <h1>Thắc mắc</h1>
                        <p>
                            Giải đáp các câu hỏi nhanh giúp quý khách hiểu rõ
                            hơn về sản phẩm, dịch vụ của chúng tôi.
                        </p>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className='qa__content'>
                    <div className='row gy-md-3'>
                        <div className='col-3 col-md-12'>
                            <ul>
                                <li
                                    className={`qa__link ${activeQa === 'common' ? 'qa__link--active' : ''}`}
                                    onClick={() => handleClick('common')}
                                >
                                    <img src={chevronDbRight} alt='' />
                                    Vấn đề chung
                                </li>
                                <li
                                    className={`qa__link ${activeQa === 'account' ? 'qa__link--active' : ''}`}
                                    onClick={() => handleClick('account')}
                                >
                                    <img src={chevronDbRight} alt='' />
                                    Vấn đề về tài khoản
                                </li>
                                <li
                                    className={`qa__link ${activeQa === 'booking' ? 'qa__link--active' : ''}`}
                                    onClick={() => handleClick('booking')}
                                >
                                    <img src={chevronDbRight} alt='' />
                                    Vấn đề về đặt khám
                                </li>
                                <li
                                    className={`qa__link ${activeQa === 'payment' ? 'qa__link--active' : ''}`}
                                    onClick={() => handleClick('payment')}
                                >
                                    <img src={chevronDbRight} alt='' />
                                    Vấn đề về thanh toán
                                </li>
                            </ul>
                        </div>

                        <div className='col-9 col-md-12'>
                            {/* common */}
                            <div
                                className={`${activeQa === 'common' ? 'd-block' : 'd-none'}`}
                            >
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '1',
                                            label: 'Lợi ích khi sử dụng phần mềm đăng ký khám bệnh trực tuyến này là gì?',
                                            children: (
                                                <div>
                                                    <p>
                                                        Đặt lịch khám bệnh theo
                                                        hẹn, mọi lúc mọi nơi, mà
                                                        không cần đến bệnh viện
                                                    </p>
                                                    <ul>
                                                        <li>
                                                            Không xếp hàng chờ
                                                            đợi để lấy số tiếp
                                                            nhận khám bệnh.
                                                        </li>
                                                        <li>
                                                            Giảm thời gian chờ
                                                            khám tại bệnh viện.
                                                        </li>
                                                        <li>
                                                            Thanh toán trực
                                                            tuyến từ xa, không
                                                            sử dụng tiền mặt.
                                                        </li>
                                                        <li>
                                                            Nhận thông tin phiếu
                                                            khám bệnh điện tử
                                                            qua phần mềm.
                                                        </li>
                                                        <li>
                                                            Chủ động chọn lịch
                                                            khám ( ngày khám,
                                                            khung giờ khám, bác
                                                            sỹ khám ).
                                                        </li>
                                                        <li>
                                                            Nhắc lịch tái khám,
                                                            đặt lịch tái khám tự
                                                            động.
                                                        </li>
                                                        <li>
                                                            Tra cứu kết quả khám
                                                            chữa bệnh trực tuyến
                                                            qua phần mềm.
                                                        </li>
                                                        <li>
                                                            Thanh toán viện phí,
                                                            chi phí khám chữa
                                                            bệnh trực tuyến, mọi
                                                            lúc mọi nơi.
                                                        </li>
                                                        <li>
                                                            Dễ dàng tiếp cận và
                                                            nhận các thông báo
                                                            mới, thông tin từ
                                                            bệnh viện
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '2',
                                            label: 'Làm sao để sử dụng được phần mềm đăng ký khám bệnh trực tuyến?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Có thể truy cập và sử
                                                        dụng phần mềm trên tất
                                                        cả thiết bị có thể truy
                                                        cập mạng internet. (
                                                        3G,4G,5G,Wifi, dây
                                                        mạng…..).
                                                    </li>
                                                    <li>
                                                        Máy tính bàn, laptop:
                                                        truy cập website.
                                                    </li>
                                                    <li>
                                                        Máy tính bảng và các
                                                        thiết bị khác ……
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '3',
                                            label: 'Đăng ký khám bệnh online có mất phí không?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Có phí tiện ích, khi sử
                                                        dụng dịch vụ đăng ký
                                                        khám bệnh trực tuyến qua
                                                        phần mềm ( tương tự phí
                                                        cước viễn thông qua tổng
                                                        đài ).
                                                    </li>
                                                    <li>
                                                        Hiện tại chỉ mất phí khi
                                                        đăng ký khám bệnh thành
                                                        công, ngoài ra việc sử
                                                        dụng ứng dụng và các
                                                        tính năng khác là hoàn
                                                        toàn miễn phí.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '4',
                                            label: 'Tôi có thể dùng phần mềm để đăng ký và lấy số thứ tự khám cho bệnh nhân khác không?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Phần mềm khuyến cáo
                                                        người dân, tự sử dụng
                                                        phần mềm để đăng ký khám
                                                        bệnh cho bản thân. Để tự
                                                        quản lý thông tin, hồ sơ
                                                        bệnh, lịch sử khám chữa
                                                        bệnh, kết quả khám chữa
                                                        bệnh…
                                                    </li>
                                                    <li>
                                                        Trường hợp nhờ người
                                                        khác đăng ký qua phần
                                                        mềm, hoặc chủ động đăng
                                                        ký giúp người khác ( như
                                                        thân nhân, họ hàng, ông
                                                        bà cha mẹ, người thân,
                                                        bạn bè , đồng nghiệp……)
                                                        vẫn có thể được, nếu
                                                        người đó thực sự không
                                                        có khả năng tiếp cận
                                                        phần mềm. Nhưng những
                                                        trường hợp này là trái
                                                        với quy định của phần
                                                        mềm và an toàn bảo mật
                                                        thông tin của ngành y,
                                                        các vấn đề phát sinh,
                                                        người đặt khám dùm người
                                                        khác và người nhờ người
                                                        khác đặt khám sẽ tự chịu
                                                        trách nhiệm trước pháp
                                                        luật.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '5',
                                            label: 'Phần mềm có hỗ trợ đăng ký khám 24/7 không?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Phần mềm cho phép bạn
                                                        thực hiện việc đăng ký
                                                        khám vào bất kỳ thời
                                                        điểm nào trong ngày và
                                                        bất cứ ngày nào trong
                                                        tuần, đảm bảo bạn có thể
                                                        sử dụng Phần mềm để đăng
                                                        ký khám bệnh mọi lúc mọi
                                                        nơi, mà không cần phải
                                                        đến trực tiếp bệnh viện
                                                        để thực hiện.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '6',
                                            label: 'Sau khi đăng ký khám thành công tôi nhận được phiếu khám bệnh như thế nào?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Bạn sẽ nhận được phiếu
                                                        khám bệnh điện tử trực
                                                        tiếp trên phần mềm. Mục
                                                        quản lý “ phiếu khám
                                                        bệnh”.
                                                    </li>
                                                    <li>
                                                        Nếu hồ sơ bệnh của bạn
                                                        có khai báo thông tin
                                                        email, hoặc sử dụng
                                                        email để đăng nhập phần
                                                        mềm, bạn cũng sẽ nhận
                                                        được phiếu khám bệnh
                                                        điện tử gửi qua email.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '7',
                                            label: 'Có thể thanh toán trực tuyến chi phí khám chữa bệnh bằng những phương thức nào?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Thẻ quốc tế Visa ,
                                                        Master ,JCB.
                                                    </li>
                                                    <li>
                                                        Thẻ ATM nội địa/
                                                        InternetBanking (thẻ
                                                        phải được kích hoạt tính
                                                        năng thanh toán trực
                                                        tuyến).
                                                    </li>
                                                    <li>
                                                        Ví điện tử MOMO,SMART
                                                        PAY.
                                                    </li>
                                                    <li>
                                                        Quét QRCode/ Mobile
                                                        Banking.
                                                    </li>
                                                    <li>
                                                        Thanh toán đại lý (các
                                                        cửa hàng tiện lợi).
                                                    </li>
                                                    <li>
                                                        Hỗ trợ thanh toán
                                                        (chuyển khoản).
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '8',
                                            label: 'Tôi có thể đặt khám cho người nhà tôi được không?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Quý khách có thể tạo tối
                                                        đa 10 hồ sơ bệnh nhân.
                                                        Quý khách đặt khám cho
                                                        bệnh nhân nào thì chọn
                                                        hồ sơ bệnh nhân đó.
                                                    </li>
                                                    <li>
                                                        Phần mềm và bệnh viện
                                                        khuyến cáo, trừ trường
                                                        hợp bất khả kháng, không
                                                        nên đặt dùm cho người
                                                        khác vì quy định an toàn
                                                        bảo mật thông tin sức
                                                        khỏe mỗi người.
                                                    </li>
                                                    <li>
                                                        Mọi vấn đề phát sinh từ
                                                        việc đặt khám cho người
                                                        khác, cá nhân người đặt
                                                        sẽ chịu hoàn toàn trách
                                                        nhiệm trước pháp luật.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '9',
                                            label: 'Đối tượng bệnh nhân nào có thể sử dụng qua phần mềm?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Tất cả người bệnh đều có
                                                        thể sử dụng phần mềm để
                                                        đăng ký khám bệnh trực
                                                        tuyến,nếu đủ điều kiện
                                                        tiếp cận và sử dụng phần
                                                        mềm.
                                                    </li>
                                                    <li>
                                                        Phần mềm phù hợp cho
                                                        những người bệnh có kế
                                                        hoạch khám chữa bệnh chủ
                                                        động, hoặc tình trạng
                                                        bệnh KHÔNG quá khẩn cấp.
                                                    </li>
                                                    <li>
                                                        Trong trường hợp CẤP
                                                        CỨU, người nhà nên đưa
                                                        người bệnh đến cơ sở y
                                                        tế gần nhất hoặc gọi số
                                                        cấp cứu 115 để được hỗ
                                                        trợ.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '10',
                                            label: 'Sau khi đã đăng ký khám thành công qua phần mềm, có thể hủy phiếu khám không?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Bạn có thể chủ động hủy
                                                        phiếu khám đã đặt thành
                                                        công, nếu kế hoạch khám
                                                        chữa bệnh cá nhân có
                                                        thay đổi.
                                                    </li>
                                                    <li>
                                                        Hoặc trong 1 số trường
                                                        hợp, bệnh viện có quyền
                                                        từ chối phiếu khám nếu
                                                        có sự sai lệch thông tin
                                                        bệnh nhân, sai thông tin
                                                        phiếu khám, hoặc có vấn
                                                        đề bất khả kháng phát
                                                        sinh từ phía bệnh viện.
                                                    </li>
                                                    <li>
                                                        Bạn đều sẽ được hoàn
                                                        tiền lại nếu chưa thực
                                                        sự đặt khám và khám
                                                        thành công (nhưng phải
                                                        tuân theo quy định của
                                                        phần mềm và bệnh viện).
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '11',
                                            label: 'Tôi đến bệnh viện trễ hơn so với giờ khám đã đăng ký, vậy tôi có được khám hay không?',
                                            children: (
                                                <p>
                                                    Trường hợp bạn đến trễ so
                                                    với giờ hẹn trên phiếu khám
                                                    bệnh, bạn vẫn có thể đến
                                                    bệnh viện để được thăm khám,
                                                    nhưng mọi sự tiếp nhận và
                                                    thời gian khám bệnh sẽ theo
                                                    sự sắp xếp của bệnh viện,
                                                    tùy vào tình hình thực tế
                                                    tại bệnh viện và phòng khám
                                                    lúc đó.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                            </div>

                            {/* account */}
                            <div
                                className={`${activeQa === 'account' ? 'd-block' : 'd-none'}`}
                            >
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '12',
                                            label: 'Có bao nhiêu cách để đăng nhập vào phần mềm?',
                                            children: (
                                                <p>
                                                    Đăng nhập bằng số điện thoại
                                                    di động, email, mạng xã hội
                                                    Zalo, Facebook.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '13',
                                            label: 'Mã số bệnh nhân là gì? Làm sao tôi có thể biết được mã số bệnh nhân của mình?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Mã số bệnh nhân là số hồ
                                                        sơ mà bệnh viện dùng để
                                                        quản lý thông tin của
                                                        bạn trên hệ thống dữ
                                                        liệu của bệnh viện.
                                                    </li>
                                                    <li>
                                                        Để biết được mã số bệnh
                                                        nhân của mình, bạn có
                                                        thể tham khảo gợi ý về
                                                        cách tìm mã số bệnh
                                                        nhân, và tìm thấy trong
                                                        các loại giấy tờ như:
                                                        toa thuốc, phiếu chỉ
                                                        định cận lâm sàng, các
                                                        biên lai thu tiền…
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '14',
                                            label: 'Tôi quên mã số bệnh nhân của mình thì phải làm sao?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Để tìm lại mã số bệnh
                                                        nhân, bạn có thể xem qua
                                                        gợi ý về cách tìm lại mã
                                                        số bệnh nhân, và tìm lại
                                                        trong các loại giấy tờ
                                                        khám chữa bệnh của mình.
                                                    </li>
                                                    <li>
                                                        {`Hoặc mở tính năng "Tôi quên
                                                        mã số bệnh nhân" > nhập
                                                        chính xác các thông tin yêu
                                                        cầu > bấm "Xác nhận" > và
                                                        chọn hồ sơ của mình trong
                                                        danh sách kết quả.`}
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '15',
                                            label: 'Làm sao tôi biết bên mình đã có mã số bệnh nhân chưa?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Nếu bạn đã từng thực
                                                        hiện việc khám chữa bệnh
                                                        tại bệnh viện, đồng
                                                        nghĩa với việc bạn đã có
                                                        “mã số bệnh nhân” trên
                                                        hệ thống của bệnh viện.
                                                    </li>
                                                    <li>
                                                        Khi đó, hãy tìm lại mã
                                                        số bệnh nhân của bạn
                                                        trong các loại giấy tờ
                                                        khám chữa bệnh, hoặc bạn
                                                        có thể sử dụng tính năng
                                                        “Tôi quên mã số bệnh
                                                        nhân” để tìm lại mã số
                                                        bệnh nhân của mình ngay
                                                        trên phần mềm.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '16',
                                            label: 'Tôi có thể chọn tùy ý một hồ sơ bệnh nhân của người khác để đăng ký khám bệnh cho mình không?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Trong trường hợp bạn cố
                                                        tình hay nhầm lẫn dùng
                                                        hồ sơ bệnh nhân của
                                                        người khác hoặc khai báo
                                                        sai thông tin để đăng ký
                                                        khám bệnh, bạn đã vi
                                                        phạm điều khoản sử dụng
                                                        của phần mềm và quy định
                                                        tại bệnh viện.{' '}
                                                    </li>
                                                    <li>
                                                        Bệnh viện sẽ từ chối
                                                        khám chữa bệnh, bạn sẽ
                                                        chịu hoàn toàn những
                                                        thiệt hại và tùy mức độ
                                                        có thể chịu trách nhiệm
                                                        trước pháp luật.
                                                    </li>
                                                    <li>
                                                        Vì vậy, khi đăng ký khám
                                                        bệnh bạn vui lòng
                                                        chọn/nhập và kiểm tra
                                                        chính xác hồ sơ bệnh
                                                        nhân của mình!
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />
                            </div>

                            {/* booking */}
                            <div
                                className={`${activeQa === 'booking' ? 'd-block' : 'd-none'}`}
                            >
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '17',
                                            label: 'Có thể đăng ký khám bệnh trong ngày bằng phần mềm không?',
                                            children: (
                                                <p>
                                                    Hiện tại bệnh viện hỗ trợ cả
                                                    đặt khám đăng ký trong ngày,
                                                    cho phép đặt khám trước 30
                                                    phút. Nhưng bạn không được
                                                    huỷ phiếu khám trong ngày.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '18',
                                            label: 'Có thể đăng ký khám bệnh trong khoảng thời gian nào?',
                                            children: (
                                                <p>
                                                    Bạn có thể đăng ký khám bệnh
                                                    qua phần mềm, mọi lúc mọi
                                                    nơi. Có thể đặt lịch hẹn
                                                    khám bệnh trước ngày khám
                                                    đến 30 ngày.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '19',
                                            label: 'Khi đi khám bệnh, tôi có cần chuẩn bị gì không?',
                                            children: (
                                                <p>
                                                    Bệnh nhân vui lòng đến trước
                                                    giờ hẹn 15 phút, xuất trình
                                                    phiếu khám bệnh điện tử và
                                                    giấy tờ tùy thân để được
                                                    hướng dẫn vào phòng khám
                                                    bệnh.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '20',
                                            label: 'Tôi có việc đột xuất hoặc bận không đến khám được, tôi muốn huỷ phiếu khám có được không?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Quý khách chủ động thực
                                                        hiện việc hủy phiếu trên
                                                        phần mềm.
                                                    </li>
                                                    <li>
                                                        Tiền khám bệnh sẽ hoàn
                                                        lại tài khoản của bệnh
                                                        nhân đã sử dụng thanh
                                                        toán. Phí tiện ích sẽ
                                                        không được hoàn trả.
                                                    </li>
                                                    <li>
                                                        Thời gian nhận lại tiền
                                                        khám trong tài khoản: từ
                                                        1 - 3 ngày (đối với ví
                                                        điện tử MOMO).
                                                    </li>
                                                    <li>
                                                        Các loại thẻ ATM nội
                                                        địa: từ 01 đến 05 ngày
                                                        làm việc.
                                                    </li>
                                                    <li>
                                                        Thẻ thanh toán quốc tế
                                                        (Visa/MasterCard…): từ
                                                        05 đến 45 ngày làm việc.
                                                    </li>
                                                    <li>
                                                        Trường hợp khách hàng
                                                        thanh toán bằng các cửa
                                                        hàng tiện lợi mà muốn
                                                        huỷ phiếu khám
                                                        bệnh,khách hàng vui lòng
                                                        đến cửa hàng tiện lợi
                                                        cung cấp đầy đủ thông
                                                        tin và cửa hàng sẽ kiểm
                                                        tra hoàn tiền lại (Tuỳ
                                                        theo cửa hàng có thể
                                                        nhanh hoặc chậm).
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '21',
                                            label: 'Tôi có thể thay đổi thông tin khám đã đặt qua phần mềm không?',
                                            children: (
                                                <p>
                                                    Bạn không thể thay đổi thông
                                                    tin khám trên phiếu khám
                                                    bệnh đã đặt thành công.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '22',
                                            label: 'Phần mềm có cho đăng ký khám bệnh với đối tượng bệnh nhân bhyt không?',
                                            children: (
                                                <p>
                                                    Hiện tại bệnh viện chỉ hỗ
                                                    trợ bệnh nhân đăng ký khám
                                                    dịch vụ qua ứng dụng.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '23',
                                            label: 'Nếu bác sĩ thay đổi lịch khám, tôi phải làm sao?',
                                            children: (
                                                <div>
                                                    <p>
                                                        Khi bác sĩ thay đổi lịch
                                                        khám, phần mềm sẽ gửi
                                                        thông báo cho bạn qua
                                                        tin nhắn sms, email và
                                                        trên ứng dụng.Khi nhận
                                                        được thông báo về sự
                                                        thay đổi. Bạn có thể:
                                                    </p>
                                                    <ul>
                                                        <li>
                                                            Hủy Phiếu Khám Bệnh
                                                            để nhận lại tiền
                                                            khám theo quy định
                                                            hoàn tiền.
                                                        </li>
                                                        <li>
                                                            Vẫn giữ nguyên thông
                                                            tin trên Phiếu Khám
                                                            Bệnh, và điều này
                                                            đồng nghĩa với việc
                                                            bạn chấp nhận khám
                                                            với bác sĩ thay thế
                                                            mà bệnh viện đã sắp
                                                            xếp.
                                                        </li>
                                                        <li>
                                                            {`Thay đổi thông tin khám
                                                            trên phiếu khám bệnh,
                                                            bằng cách: Đăng nhập
                                                            phần mềm > Thông Tin Tài
                                                            Khoản > Quản lý phiếu
                                                            khám bệnh > chọn vào
                                                            phiếu khám bệnh bị thay
                                                            đổi lịch khám > bấm
                                                            "Chỉnh sửa".`}
                                                        </li>
                                                    </ul>
                                                    <p>
                                                        Việc thay đổi thông tin
                                                        trên phiếu khám bệnh
                                                        phải được thực hiện theo
                                                        Quy định chỉnh sửa thông
                                                        tin trên phiếu khám
                                                        bệnh.
                                                    </p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '24',
                                            label: 'Làm sao có thể chọn đúng chuyên khoa để đăng ký khám qua phần mềm?',
                                            children: (
                                                <div>
                                                    <p>
                                                        Trường hợp tái khám, bạn
                                                        chỉ việc chọn đúng
                                                        chuyên khoa của lần khám
                                                        trước.
                                                    </p>
                                                    <p>Trường hợp khám mới:</p>
                                                    <ul>
                                                        <li>
                                                            Nếu biết chắc chuyên
                                                            khoa mình muốn đăng
                                                            ký khám, bạn chỉ
                                                            việc tìm chọn chuyên
                                                            khoa đó trong danh
                                                            sách.
                                                        </li>
                                                        <li>
                                                            Nếu chưa biết chuyên
                                                            khoa nào phù hợp,
                                                            bạn có thể gọi vào
                                                            tổng đài tư vấn chăm
                                                            sóc khách hàng của
                                                            bệnh viện hoặc tổng
                                                            đài medpro 1900 9999
                                                            hoặc liên hệ hỗ trợ
                                                            tại kênh chat mạng
                                                            xã hội facebook,
                                                            zalo.
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '25',
                                            label: 'Tôi sẽ được khám bệnh vào đúng thời gian đã chọn, sau khi đăng ký khám qua phần mềm đúng không?',
                                            children: (
                                                <div>
                                                    <p>Trả lời: Có thể.</p>
                                                    <p>
                                                        Thời gian bạn chọn khi
                                                        đăng ký khám, được xem
                                                        là thời gian khám bệnh
                                                        dự kiến. Do đặc thù của
                                                        công tác khám chữa bệnh,
                                                        sẽ không thể chính xác
                                                        thời gian khám 100%.
                                                    </p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '26',
                                            label: 'Tôi đăng ký đã bị trừ tiền nhưng sao không nhận được mã số khám bệnh?',
                                            children: (
                                                <p>
                                                    Bạn vui lòng kiểm tra thông
                                                    tin phiếu khám trong tài
                                                    khoản trên phần mềm. Hoặc
                                                    vui lòng gọi điện tổng đài
                                                    1900 9999 để được hỗ trợ.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '27',
                                            label: 'Tôi đã đăng ký thành công vậy khi đi khám tôi có phải xếp hàng gì không?',
                                            children: (
                                                <p>
                                                    Không, bạn không còn phải
                                                    xếp hàng chờ đợi để lấy số
                                                    khám bệnh, làm thủ tục đóng
                                                    tiền, bạn chỉ cần đến cửa
                                                    tiếp nhận số 1 để được hướng
                                                    dẫn vào phòng khám.
                                                </p>
                                            )
                                        }
                                    ]}
                                />
                            </div>

                            {/* payment */}
                            <div
                                className={`${activeQa === 'payment' ? 'd-block' : 'd-none'}`}
                            >
                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '28',
                                            label: 'Điều kiện để được hoàn tiền là gì?',
                                            children: (
                                                <p>
                                                    Bạn chỉ được hoàn tiền khi
                                                    thực hiện thành công yêu cầu
                                                    Hủy Phiếu Khám Bệnh trên
                                                    phần mềm theo theo quy định.
                                                </p>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '29',
                                            label: 'Hoàn tiền như thế nào? Bao lâu thì tôi nhận lại được tiền hoàn?',
                                            children: (
                                                <div>
                                                    <p>
                                                        Khi bạn thực hiện việc
                                                        thanh toán bằng phương
                                                        thức nào, thì phần mềm
                                                        sẽ hoàn tiền lại cho bạn
                                                        bằng đúng phương thức và
                                                        số tài khoản đã dùng để
                                                        thanh toán đó.
                                                    </p>
                                                    <p>
                                                        Thời gian bạn nhận được
                                                        tiền hoàn thông thường
                                                        được quy định như sau:
                                                    </p>
                                                    <ul>
                                                        <li>
                                                            Thẻ khám bệnh: 1 -
                                                            30 ngày làm việc.
                                                        </li>
                                                        <li>
                                                            Thẻ ATM nội địa: 1 -
                                                            30 ngày làm việc.
                                                        </li>
                                                        <li>
                                                            Thẻ tín dụng Visa,
                                                            MasterCard: 1 - 45
                                                            ngày làm việc.
                                                        </li>
                                                    </ul>
                                                    <p>
                                                        Tính từ thời điểm bạn
                                                        thực hiện Hủy Phiếu Khám
                                                        Bệnh thành công, nếu quá
                                                        thời gian trên bạn vẫn
                                                        chưa nhận được tiền
                                                        hoàn, vui lòng liên hệ
                                                        tổng đài 1900 9999 chúng
                                                        tôi sẽ hỗ trợ bạn.
                                                    </p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '30',
                                            label: 'Tôi không có bất kỳ một thẻ khám bệnh hoặc thẻ ngân hàng nào để thanh toán, vậy tôi phải làm sao?',
                                            children: (
                                                <div>
                                                    <p>
                                                        Bạn có thể liên hệ nhân
                                                        viên bệnh viện tại các
                                                        quầy hướng dẫn trong
                                                        bệnh viện để được hỗ trợ
                                                        làm thẻ khám bệnh miễn
                                                        phí.
                                                    </p>
                                                    <p>
                                                        Nhờ con,cháu hoặc người
                                                        thân trong gia đình có
                                                        sử dụng các phương thức
                                                        thanh toán trực tuyến để
                                                        đặt khám.
                                                    </p>

                                                    <p>
                                                        Đăng ký mới một trong
                                                        các phương thức thanh
                                                        toán trực tuyến có hỗ
                                                        trợ ngay, để tiếp tục sử
                                                        dụng trong tương lai.
                                                    </p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '31',
                                            label: 'Thông tin thanh toán của tôi có bị lộ khi tôi tiến hành thanh toán trên phần mềm không?',
                                            children: (
                                                <div>
                                                    <p>Trả lời : Không!</p>
                                                    <p>
                                                        Phần mềm và bệnh viện
                                                        hoàn toàn không thể sao
                                                        lưu lại bất kỳ thông tin
                                                        thanh toán nào của bạn.
                                                    </p>

                                                    <p>
                                                        Các thông tin của bạn
                                                        được bảo mật tại cổng
                                                        thanh toán và ngân hàng
                                                        nhà nước việt nam.
                                                    </p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '32',
                                            label: 'Tôi đăng nhập đúng tên tài khoản nhưng không thanh toán được?',
                                            children: (
                                                <ul>
                                                    <li>
                                                        Đối với thẻ khám
                                                        bệnh/ATM nội địa phải
                                                        đảm bảo đã kích hoạt
                                                        tính năng thanh toán
                                                        trực tuyến thì mới có
                                                        thể thanh toán được. Nếu
                                                        thẻ của bạn chưa kích
                                                        hoạt Thanh toán trực
                                                        tuyến thì vui lòng liên
                                                        hệ với ngân hàng phát
                                                        hành thẻ của bạn để đăng
                                                        ký.
                                                    </li>
                                                    <li>
                                                        Nếu thẻ của bạn đã đăng
                                                        ký thanh toán trực tuyến
                                                        và nhập chính xác thông
                                                        tin thanh toán nhưng vẫn
                                                        không thanh toán được,
                                                        vui lòng liên hệ 1900
                                                        9999 chúng tôi sẽ hỗ trợ
                                                        bạn.
                                                    </li>
                                                </ul>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '33',
                                            label: 'Tôi muốn đăng ký khám online nhưng đến trực tiếp bệnh viện để thanh toán được không?',
                                            children: (
                                                <div>
                                                    <p>
                                                        Trả lời : Được Hiện tại
                                                        khi đặt khám trên phần
                                                        mềm bạn có thể hoàn tất
                                                        quy trình thanh toán khi
                                                        hoàn tất khám tại bệnh
                                                        viện.
                                                    </p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />

                                <Collapse
                                    className='qa__collapse'
                                    items={[
                                        {
                                            key: '34',
                                            label: 'Tôi nhập tài khoản thẻ nhưng bấm xác thực hoài không được?',
                                            children: (
                                                <div>
                                                    <p>
                                                        Vui lòng kiểm tra chính
                                                        xác thông tin thẻ đã
                                                        nhập. Trường hợp vẫn bị
                                                        lỗi, hãy chụp ảnh màn
                                                        hình báo lỗi và gửi qua
                                                        các kênh hỗ trợ, chúng
                                                        tôi sẽ hỗ trợ bạn.
                                                    </p>
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QandA;
