/* eslint-disable react/prop-types */
import Button from '../Button';
import Modal from '../Modal';
import xCircle from '../../assets/icons/x-circle.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDoctor } from '../../apis/doctor.api';
import { showNotification } from '../../utils/notification';
import { deleteUser } from '../../apis/user.api';
import { deleteAppointment } from '../../apis/appointment.api';

function DeleteModal({ modal, modalClose, id }) {
    const queryClient = useQueryClient();

    // handle delete
    const deleteMutation = useMutation({
        mutationFn: () => {
            const endpoints = {
                doctorDelete: deleteDoctor,
                userDelete: deleteUser,
                appointmentDelete: deleteAppointment
                // appointmentDelete: getAppointment
            };
            const deleteFn = endpoints[modal];
            if (!deleteFn) {
                throw new Error('Invalid modal type');
            }
            return deleteFn(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries([modal, id]);
            modalClose();
            showNotification('success', 'Xoá thành công!', '');
        },

        onError: (error) => {
            console.log(error);
            showNotification(
                'error',
                'Thất bại!',
                'Xoá thất bại. Vui lòng thử lại sau!'
            );
        }
    });

    const handleDelete = () => {
        deleteMutation.mutate(id);
    };

    return (
        <Modal modal={true} modalClose={modalClose}>
            <div
                className='modal-content delete-modal-content'
                style={{ '--content-width': '400px' }}
            >
                <h2>
                    <img src={xCircle} alt='' />
                    Xác nhận
                </h2>
                <p>
                    Chắc chắn xoá{' '}
                    <span>
                        {
                            {
                                doctorDelete: 'Bác sĩ ',
                                userDelete: 'Người dùng ',
                                appointmentDelete: 'Lịch hẹn '
                            }[modal]
                        }
                    </span>
                    này?
                </p>
                <div className='modal-content__act delete-modal-content__act'>
                    <Button
                        className='modal-content__outline'
                        onClick={() => modalClose()}
                    >
                        Huỷ
                    </Button>

                    <Button
                        className='modal-content__delete'
                        onClick={() => handleDelete()}
                    >
                        Xoá
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteModal;
