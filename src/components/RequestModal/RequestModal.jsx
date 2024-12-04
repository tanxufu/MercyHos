/* eslint-disable react/prop-types */
import Button from '../Button';
import Modal from '../Modal';
import informationIcon from '../../assets/icons/information.svg';
import { useQuery } from '@tanstack/react-query';
import { getAppointment } from '../../apis/appointment.api';
import dayjs from 'dayjs';

function RequestModal({ id, modalClose }) {
    const { data, isPending } = useQuery({
        queryKey: ['appointment', id],
        queryFn: () => getAppointment(id),
        enabled: !!id
    });
    const appointment = data?.data?.data?.data || {};

    return (
        <Modal modal={true} modalClose={modalClose}>
            <div
                className='modal-content info-modal-content'
                style={{ '--content-width': '800px' }}
            >
                <h2>
                    <img src={informationIcon} alt='' />
                    {appointment?.changeRequest?.status === 'approved'
                        ? 'Thông tin lịch cũ'
                        : 'Thông tin lịch đổi'}
                </h2>

                {isPending && (
                    <div className='loading'>
                        <div className='loader'></div>
                    </div>
                )}

                {!isPending && (
                    <article className='info-modal'>
                        <div className='info-modal__name'>
                            <label>Mã phiếu</label>
                            {appointment?.medicalBill}
                        </div>

                        <div></div>

                        <div>
                            <label>Ngày khám </label>
                            {dayjs(
                                appointment?.changeRequest?.newDateVisit
                            ).format('DD-MM-YYYY')}
                        </div>

                        <div>
                            <label>Giờ khám </label>
                            {appointment?.changeRequest?.newTimeVisit}
                        </div>

                        <div>
                            <label>Bệnh nhân</label>
                            {appointment?.patient?.name}
                        </div>

                        <div>
                            <label>Bác sĩ</label>
                            {appointment?.changeRequest?.newDoctor?.name}
                        </div>

                        <div>
                            <label>Chuyên khoa</label>
                            {appointment?.changeRequest?.newDoctor?.specialty}
                        </div>

                        <div>
                            <label>Cập nhật</label>
                            {dayjs(appointment?.updatedAt).format(
                                'DD-MM-YYYY HH:mm'
                            )}
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

export default RequestModal;
