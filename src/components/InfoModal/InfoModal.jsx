/* eslint-disable react/prop-types */
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import Modal from '../Modal';
import { getDoctor } from '../../apis/doctor.api';
import informationIcon from '../../assets/icons/information.svg';
import Button from '../Button';
import { getUser } from '../../apis/user.api';
import { getPatient } from '../../apis/patient.api';
import { getAppointment } from '../../apis/appointment.api';

function InfoModal({ modal, id, modalClose }) {
    const { data, isPending } = useQuery({
        queryKey: ['entity', { modal, id }],
        queryFn: () => {
            const endpoints = {
                doctorInfo: getDoctor,
                userInfo: getUser,
                patientInfo: getPatient,
                appointmentInfo: getAppointment
            };
            const fetchFn = endpoints[modal];
            if (!fetchFn) {
                throw new Error('Invalid modal type');
            }
            return fetchFn(id);
        },
        enabled: !!id
    });
    const info = data?.data?.data?.data;
    // console.log(info);

    return (
        <Modal modal={true} modalClose={modalClose}>
            <div
                className='modal-content info-modal-content'
                style={{ '--content-width': '800px' }}
            >
                <h2>
                    <img src={informationIcon} alt='' />
                    Thông tin chi tiết
                </h2>

                {isPending && (
                    <div className='loading'>
                        <div className='loader'></div>
                    </div>
                )}

                {/* doctor info */}
                {!isPending && modal === 'doctorInfo' && (
                    <article className='info-modal'>
                        <div className='info-modal__name'>
                            <label>Họ và tên</label>
                            {info?.name}
                        </div>
                        <div></div>
                        <div>
                            <label>Chuyên khoa</label>
                            {info?.specialty}
                        </div>

                        <div>
                            <label>Kinh nghiệm</label>
                            {info?.experience} năm
                        </div>

                        <div>
                            <label>Giới tính</label>
                            {info?.gender === 'male' ? 'Nam' : 'Nữ'}
                        </div>

                        <div>
                            <label>Ngày sinh</label>
                            {dayjs(info?.dob).format('DD-MM-YYYY')}
                        </div>

                        <div>
                            <label>Số điện thoại</label>
                            {info?.phone}
                        </div>

                        <div>
                            <label>Email</label>
                            {info?.email}
                        </div>

                        <div>
                            <label>Lịch khám</label>
                            {info?.availability.join(', ')}
                        </div>

                        <div>
                            <label>Phí khám</label>
                            {info?.fee}.000đ
                        </div>

                        <div
                            className={`${info?.active === true ? 'info-modal__active' : 'info-modal__active--false'}`}
                        >
                            <label>Trạng thái</label>
                            {info?.active === true
                                ? 'Đang hoạt động'
                                : 'Ngưng hoạt động'}
                        </div>
                    </article>
                )}

                {/* user info */}
                {!isPending && modal === 'userInfo' && (
                    <article className='info-modal'>
                        <div className='info-modal__name'>
                            <label>Người dùng</label>
                            {info?.name}
                        </div>

                        <div>
                            <label>Email</label>
                            {info?.email}
                        </div>

                        <div>
                            <label>Role</label>
                            {info?.role}
                        </div>

                        <div
                            className={`${info?.active === true ? 'info-modal__active' : 'info-modal__active--false'}`}
                        >
                            <label>Trạng thái</label>
                            {info?.active === true
                                ? 'Đang hoạt động'
                                : 'Ngưng hoạt động'}
                        </div>
                    </article>
                )}

                {/* patient info */}
                {!isPending && modal === 'patientInfo' && (
                    <article className='info-modal'>
                        <div className='info-modal__name'>
                            <label>Họ và tên</label>
                            {info?.name}
                        </div>
                        <div></div>
                        <div>
                            <label>Giới tính</label>
                            {info?.gender}
                        </div>

                        <div>
                            <label>Ngày sinh</label>
                            {dayjs(info?.dob).format('DD-MM-YYYY')}
                        </div>

                        <div>
                            <label>Số điện thoại</label>
                            {info?.phone}
                        </div>

                        <div>
                            <label>Email</label>
                            {info?.email}
                        </div>

                        <div>
                            <label>Nghề nghiệp</label>
                            {info?.occupation}
                        </div>

                        <div>
                            <label>CCCD</label>
                            {info?.idCard || 'Chưa cập nhập'}
                        </div>

                        <div>
                            <label>Dân tộc</label>
                            {info?.ethnicity || 'Chưa cập nhập'}
                        </div>

                        <div>
                            <label>Địa chỉ</label>
                            {`${info?.address}, ${info?.district}, ${info?.ward}, ${info?.province}`}
                        </div>

                        <div
                            className={`${info?.active === true ? 'info-modal__active' : 'info-modal__active--false'}`}
                        >
                            <label>Trạng thái</label>
                            {info?.active === true
                                ? 'Đang hoạt động'
                                : 'Ngưng hoạt động'}
                        </div>
                    </article>
                )}

                {/* appointment info */}
                {!isPending && modal === 'appointmentInfo' && (
                    <article className='info-modal'>
                        <div className='info-modal__name'>
                            <label>Mã phiếu</label>
                            {info?.medicalBill}
                        </div>

                        <div></div>

                        <div>
                            <label>Ngày khám</label>
                            {dayjs(info?.dateVisit).format('DD-MM-YYYY')}
                        </div>

                        <div>
                            <label>Giờ khám</label>
                            {info?.timeVisit}
                        </div>

                        <div>
                            <label>Bác sĩ</label>
                            {info?.doctor.name}
                        </div>

                        <div>
                            <label>Chuyên khoa</label>
                            {info?.doctor.specialty}
                        </div>

                        <div>
                            <label>Bệnh nhân</label>
                            {info?.patient?.name}
                        </div>

                        <div>
                            <label>Giới tính</label>
                            {info?.patient?.gender}
                        </div>

                        <div
                            className={`${info?.feeStatus === 'Đã thanh toán' ? 'info-modal__active' : 'info-modal__active--false'}`}
                        >
                            <label>Thanh toán</label>
                            {info?.feeStatus}
                        </div>

                        <div>
                            <label>Phí khám</label>
                            {info?.doctor?.fee}.000đ
                        </div>

                        <div
                            className={`${info?.visitStatus === 'Đã khám' ? 'info-modal__active' : info?.visitStatus === 'Đã huỷ' ? 'info-modal__active--false' : 'info-modal__active--true'}`}
                        >
                            <label>Trạng thái</label>
                            {info?.visitStatus}
                        </div>

                        <div>
                            <label>Cập nhật</label>
                            {dayjs(info?.updateAt).format('DD-MM-YYYY HH:mm')}
                        </div>
                    </article>
                )}

                <div className='modal-content__act'>
                    <Button
                        className='modal-content__cancel'
                        onClick={() => modalClose()}
                    >
                        Đóng
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default InfoModal;
