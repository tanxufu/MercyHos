import { Button } from 'antd';
import empty from '../../assets/img/empty.png'
import Bread from '../Breadcrumb/Breadcrumb';

function EmptyPatientProfile() {
    return (
        <>
        <div className="container">
        <div className="bread"><Bread/></div>
            <div className="emptyProfile">
                <img src={empty} alt="" className='emptyProfile__img'/>
                <span className='emptyProfile__title'>Bạn chưa có hồ sơ bệnh nhân, vui lòng tạo hồ sơ để được đặt khám.</span>
                <Button type="primary" className='emptyProfile__btn'>Tạo hồ sơ</Button>
            </div>
        </div>
        </>
     );
}

export default EmptyPatientProfile;