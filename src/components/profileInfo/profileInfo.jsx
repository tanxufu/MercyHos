import {
    ContactsTwoTone,
    DownOutlined,
    EnvironmentTwoTone,
   
    PhoneTwoTone
} from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../modal';
import DetailInfo from '../DetailInfo/DetailInfo';
// import { useHistory } from 'react-router-dom';
import showDeleteConfirm from '../ModalDelete/ModalDelete';
function ProfileInfo() {
    const [isOpen, setIsOpen] = useState(false);
    // const history = useHistory();

    // // Thông tin bệnh nhân mẫu
    // const patient = {
    //     name: 'NGUYEN QUOC HUY',
    //     phone: '0387350605',
    //     address:
    //         'THAN BINH-XA THAN CUU NGHIA-HUYEN CHAU THANH-TINH TIEN GIANG-VIET NAM'
    // };

    // // Hàm xử lý khi nhấn nút Sửa
    // const handleEdit = () => {
    //     // Điều hướng đến trang sửa thông tin
    //     history.push('/sua-ho-so');
    // };

    // // Hàm xử lý khi nhấn nút Xóa
    // const handleDelete = () => {
    //     // Thực hiện logic xóa ở đây
    //     console.log('Xóa hồ sơ');
    // };
    return (
        <div className='profile-info'>
            <div className='profile-item'>
                <p className='profile-title'>
                    <ContactsTwoTone />
                    <span>name</span>
                </p>
            </div>

            <div className='profile-item'>
                <p className='profile-title'>
                    <PhoneTwoTone />
                    <span>Điện thoại:</span>
                </p>
                <span className='profile-desc'>phone</span>
            </div>

            <div className='profile-item'>
                <p className='profile-title'>
                    <EnvironmentTwoTone />
                    <span>Địa chỉ:</span>
                </p>
                <span className='profile-desc'>231423432</span>
            </div>
            <div className='profile-btn-right'>
                <div className='profile-btn'>
                        <Button
                        onClick={showDeleteConfirm}
                            color='danger'
                            variant='solid'
                            className='profile-linkbtn'
                        >
                            Xoá
                        </Button>
                    <NavLink>
                        <Button
                            color='primary'
                            variant='solid'
                            className='profile-linkbtn'
                        >
                            Sửa
                        </Button>
                    </NavLink>
                    <Button
                        onClick={() => {
                            setIsOpen(true);
                        }}
                        type='primary'
                        shape='circle'
                        icon={<DownOutlined />}
                        size={'small'}
                        className='profile-linkbtn'
                    />
                </div>
            </div>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false);
                }}
            >
                <DetailInfo
                    onClose={() => {
                        setIsOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}

export default ProfileInfo;
