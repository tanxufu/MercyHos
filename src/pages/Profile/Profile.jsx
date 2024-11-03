// import { PhoneOutlined } from "@ant-design/icons";
import {
    BellTwoTone,
    BookTwoTone,
    CloudTwoTone,
    PlusOutlined
} from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import ProfileInfo from '../../components/profileInfo/profileInfo';
// import { useHistory } from 'react-router-dom';
function Profile() {
    return (
        <div className='container'>
            <div className='profile'>
                <div className='profile__sidebar '>
                    <NavLink to={'/infor'}>
                        <Button
                            type='primary'
                            className='profile__button'
                            icon={<PlusOutlined />}
                        >
                            Thêm hồ sơ
                        </Button>
                    </NavLink>
                    <nav className='profile__menu'>
                        <ul className='profile__list'>
                            <li className='profile__link'>
                                <BookTwoTone />
                                <span className='profile__content'>
                                    Hồ sơ bệnh nhân
                                </span>
                            </li>
                            <li className='profile__link'>
                                <CloudTwoTone />
                                <span className='profile__content'>
                                    Phiếu khám bệnh
                                </span>
                            </li>
                            <li className='profile__link'>
                                <BellTwoTone />
                                <span className='profile__content'>
                                    Thông báo
                                </span>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className='profile__detail'>
                    <h2>Danh sách hồ sơ</h2>
                    <ProfileInfo />
                </div>
            </div>
        </div>
    );
}

export default Profile;
