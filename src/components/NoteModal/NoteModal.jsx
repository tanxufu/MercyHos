/* eslint-disable react/prop-types */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import Button from '../Button';
import Modal from '../Modal';
import pencilIcon from '../../assets/icons/pencil.svg';
import { getAppointment, updateAppointment } from '../../apis/appointment.api';
import { showNotification } from '../../utils/notification';

function NoteModal({ id, modalClose }) {
    const queryClient = useQueryClient();
    const [note, setNote] = useState('');

    const { data, isPending } = useQuery({
        queryKey: ['appointment', id],
        queryFn: () => getAppointment(id),
        enabled: !!id
    });
    const appointment = data?.data?.data?.data || {};

    const appointmentNote = appointment?.note || '';

    // Chỉ thiết lập ghi chú khi dữ liệu được tải lần đầu
    useEffect(() => {
        if (appointmentNote) {
            setNote(appointmentNote);
        }
    }, [appointmentNote]);

    // console.log(appointment);

    const mutation = useMutation({
        mutationFn: (body) => updateAppointment(id, body),
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                appointment?.note
                    ? 'Cập nhật ghi chú thành công!'
                    : 'Thêm ghi chú thành công!'
            );

            queryClient.invalidateQueries(['appointment', id]);
            modalClose();
        },
        onError: (error) => {
            console.log(error);
            showNotification(
                'error',
                'Thất bại!',
                'Sửa đổi thất bại. Vui lòng thử lại sau!'
            );
        }
    });

    const handleSubmit = () => {
        const data = { note };

        mutation.mutate(data);
    };

    return (
        <Modal modal={true} modalClose={modalClose}>
            <div
                className='modal-content info-modal-content'
                style={{ '--content-width': '800px' }}
            >
                <h2>
                    <img src={pencilIcon} alt='' />
                    {appointment?.note ? 'Thay đổi ghi chú' : 'Thêm ghi chú'}
                </h2>

                {isPending && (
                    <div className='loading'>
                        <div className='loader'></div>
                    </div>
                )}

                {!isPending && (
                    <form action=''>
                        <div className={`form-group`}>
                            <label>
                                <p className={`form-group__label `}>Ghi chú:</p>
                                <textarea
                                    className='form-group__area'
                                    type='text'
                                    name='note'
                                    placeholder='Thêm ghi chú...'
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className='modal-content__act'>
                            <Button
                                className='modal-content__cancel'
                                onClick={() => modalClose()}
                            >
                                Đóng
                            </Button>

                            <Button
                                className='modal-content__update'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSubmit();
                                }}
                            >
                                {appointment?.note ? 'Cập nhập' : 'Tạo mới'}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}

export default NoteModal;
