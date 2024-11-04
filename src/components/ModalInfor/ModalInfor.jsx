import gender from '../../assets/icons/gender.png';
import doctor from '../../assets/icons/doctor.png';
import dollar from '../../assets/icons/dollar.png';
import calendar from '../../assets/icons/calendar.png';
import medical from '../../assets/icons/medical.png';
function ModalInfor() {
    return (
        <div className='container'>
            <div className='doctorInfor'>
                <div className='doctorInfor__item'>
                    <div className='doctorInfor__title'>
                        <img src={doctor} alt='' className='doctorInfor__img' />
                        <span>BS:</span>
                    </div>
                    <span className='doctorInfor__desc'>Nguyen Van A</span>
                </div>
                <div className='doctorInfor__item'>
                    <div className='doctorInfor__title'>
                        <img src={gender} alt='' className='doctorInfor__img' />
                        <span>Giới tính: </span>
                    </div>
                    <span className='doctorInfor__desc'>Nam</span>
                </div>
                <div className='doctorInfor__item'>
                    <div className='doctorInfor__title'>
                        <img
                            src={medical}
                            alt=''
                            className='doctorInfor__img'
                        />
                        <span>Chuyên khoa: </span>
                    </div>
                    <span className='doctorInfor__desc'>Hô hấp</span>
                </div>
                <div className='doctorInfor__item'>
                    <div className='doctorInfor__title'>
                        <img
                            src={calendar}
                            alt=''
                            className='doctorInfor__img'
                        />
                        <span>Lịch khám: </span>
                    </div>
                    <span className='doctorInfor__desc'>Thứ 7</span>
                </div>
                <div className='doctorInfor__item'>
                    <div className='doctorInfor__title'>
                        <img src={dollar} alt='' className='doctorInfor__img' />
                        <span>Gía khám: </span>
                    </div>
                    <span className='doctorInfor__desc'>150.000</span>
                </div>
            </div>
        </div>
    );
}

export default ModalInfor;
