import {
    BankTwoTone,
    CalendarTwoTone,
    CloseOutlined,

    ContactsTwoTone,
    EnvironmentTwoTone,
    GlobalOutlined,
    HeartTwoTone,
    IdcardTwoTone,
    MailTwoTone,
    ManOutlined,
    PhoneTwoTone,
    WomanOutlined
} from '@ant-design/icons';
import PropTypes from 'prop-types';

function DetailInfo({ onClose }) {
    return (
        <div className='container'>
            <div className='detailInfo'>
                <div className='detailInfo__head'>
                    <h3 className='detailInfo__cap'>Chi tiết hồ sơ</h3>
                    <button onClick={onClose}>
                        <CloseOutlined  className='detailInfo__btn' />
                    </button>
                </div>
                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <ContactsTwoTone />
                        <span className='detailInfo__desc'>Họ và tên:</span>
                    </p>
                    <span className='detailInfo__nd'>342342342</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <CalendarTwoTone />
                        <span className='detailInfo__desc'>Ngày sinh:</span>
                    </p>
                    <span className='detailInfo__nd'>21123</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <PhoneTwoTone />
                        <span className='detailInfo__desc'>Số điện thoại:</span>
                    </p>
                    <span className='detailInfo__nd'>áđâsđasad</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <ManOutlined style={{ color: '#1677ff' }} />
                        <WomanOutlined style={{ color: '#1677ff' }} />
                        <span className='detailInfo__desc'>Giới tính:</span>
                    </p>
                    <span className='detailInfo__nd'>ÁĐÂSDSA</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <IdcardTwoTone />
                        <span className='detailInfo__desc'>CCCD:</span>
                    </p>
                    <span className='detailInfo__nd'>32432342</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <MailTwoTone />
                        <span className='detailInfo__desc'>Email:</span>
                    </p>
                    <span className='detailInfo__nd'>32432342</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <BankTwoTone />
                        <span className='detailInfo__desc'>Nghề nghiệp:</span>
                    </p>
                    <span className='detailInfo__nd'>53245523452</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <GlobalOutlined style={{ color: '#1677ff' }} />
                        <span className='detailInfo__desc'>Quốc gia:</span>
                    </p>
                    <span className='detailInfo__nd'>3532523</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <EnvironmentTwoTone />
                        <span className='detailInfo__desc'>Địa chỉ:</span>
                    </p>
                    <span className='detailInfo__nd'>32443342</span>
                </div>

                <div className='detailInfo__item'>
                    <p className='detailInfo__title'>
                        <HeartTwoTone />
                        <span className='detailInfo__desc'>Dân tộc:</span>
                    </p>
                    <span className='detailInfo__nd'>32432534432</span>
                </div>
            </div>
        </div>
    );
}
DetailInfo.propTypes = {
    onClose: PropTypes.func.isRequired
};

export default DetailInfo;
