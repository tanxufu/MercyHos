import {
    CalendarTwoTone,
    ContactsTwoTone,
    EnvironmentTwoTone,
    IdcardTwoTone,
    MailTwoTone,
    PhoneTwoTone,
    SkinTwoTone
} from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import showDeleteConfirm from '../ModalDelete/ModalDelete';

function SelectProfile() {
    return (
        <div className='container'>
            <div className='selectprofile'>
                <h1>Chọn hồ sơ bệnh nhân</h1>
                <div className='selectprofile__list'>
                    <div className='selectprofile__item'>
                        <p className='selectprofile__title'>
                            <ContactsTwoTone className='selectprofile__icon' />
                            <span className='selectprofile__desc'>
                                Nguyễn Quốc Huy
                            </span>
                        </p>
                    </div>

                    <div className='selectprofile__item'>
                        <p className='selectprofile__title'>
                            <CalendarTwoTone className='selectprofile__icon' />
                            <span className='selectprofile__desc'>
                                Ngày sinh:
                            </span>
                        </p>
                        <span className='selectprofile__nd'>31/07/2003</span>
                    </div>

                    <div className='selectprofile__item'>
                        <p className='selectprofile__title'>
                            <PhoneTwoTone className='selectprofile__icon' />
                            <span className='selectprofile__desc'>
                                Số điện thoại:
                            </span>
                        </p>
                        <span className='selectprofile__nd'>432432</span>
                    </div>

                    <div className='selectprofile__item'>
                        <p className='selectprofile__title'>
                            <EnvironmentTwoTone />
                            <span className='selectprofile__desc'>
                                Địa chỉ:
                            </span>
                        </p>
                        <span className='selectprofile__nd'>HCM</span>
                    </div>

                    <div className='selectprofile__item'>
                        <p className='selectprofile__title'>
                            <SkinTwoTone className='selectprofile__icon' />
                            <span className='selectprofile__desc'>
                                Giới tính:
                            </span>
                        </p>
                        <span className='selectprofile__nd'>Nam</span>
                    </div>

                    <div className='selectprofile__item'>
                        <p className='selectprofile__title'>
                            <MailTwoTone className='selectprofile__icon' />
                            <span className='selectprofile__desc'>Email:</span>
                        </p>
                        <span className='selectprofile__nd'>32432432</span>
                    </div>

                    <div className='selectprofile__item'>
                        <p className='selectprofile__title'>
                            <IdcardTwoTone className='selectprofile__icon' />
                            <span className='selectprofile__desc'>
                                Dân tộc:
                            </span>
                        </p>
                        <span className='selectprofile__nd'>Kinh:</span>
                    </div>
                    <div className='selectprofile__button'>
                        <Button
                            color='danger'
                            variant='solid'
                            onClick={showDeleteConfirm}
                        >
                            Xoá
                        </Button>
                        <Button color='primary' variant='solid'>
                            Sửa
                        </Button>
                        <Button type='primary'>Thêm hồ sơ</Button>
                    </div>
                </div>
                <div className='selectprofile__btn'>
                    <NavLink>
                        <Button
                            type='primary'
                            block
                            style={{ width: '200px', height: '50px' }}
                        >
                            Tiếp tục
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default SelectProfile;
