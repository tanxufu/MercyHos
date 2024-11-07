import { Button } from 'antd';
import empty from '../../assets/img/empty.png';
import Bread from '../Breadcrumb/Breadcrumb';
import { NavLink } from 'react-router-dom';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

function EmptyPatientProfile() {
    const breadcrumbItems = [
        {
            href: '/',
            title: (
                <>
                    <HomeOutlined />
                    <span>Trang chủ</span>
                </>
            )
        },
        {
            title: (
                <>
                    <InfoCircleOutlined />
                    <span>Chưa có hồ sơ</span>
                </>
            )
        }
    ];
    return (
        <>
            <div className='container'>
                <Bread items={breadcrumbItems} />
                <div className='emptyProfile'>
                    <img src={empty} alt='' className='emptyProfile__img' />
                    <span className='emptyProfile__title'>
                        Bạn chưa có hồ sơ bệnh nhân, vui lòng tạo hồ sơ để được
                        đặt khám.
                    </span>
                    <NavLink to={'/infor'}>
                        <Button type='primary' className='emptyProfile__btn'>
                            Tạo hồ sơ
                        </Button>
                    </NavLink>
                </div>
            </div>
        </>
    );
}

export default EmptyPatientProfile;
