/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';

import dayjs from 'dayjs';

import userAvt from '../../assets/icons/user-avt.svg';
import cake from '../../assets/icons/cake.svg';
import genderIcon from '../../assets/icons/gender.svg';
import location from '../../assets/icons/location.svg';
import bagIcon from '../../assets/icons/bag.svg';
import mobi from '../../assets/icons/mobi.svg';
import edit from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { deletePatient } from '../../apis/patient.api';
import { showNotification } from '../../utils/notification';
import Button from '../Button';
import AppContext from '../../contexts/app.context';

function PatientCard({
    id,
    name,
    dob,
    phone,
    gender,
    occupation,
    ward,
    district,
    address,
    province,
    activePatientCard,
    onPatientClick
}) {
    const { user } = useContext(AppContext);
    const userId = user._id;
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);

    const appointmentType = localStorage.getItem('appointmentType');

    // handle delete
    const deletePatientMutation = useMutation({
        mutationFn: () => deletePatient(activePatientCard),
        onSuccess: () => {
            // setActivePatientCard(null);
            setModalOpen(false);
            queryClient.invalidateQueries(['patients', userId]);
            showNotification('success', 'Bạn đã xoá hồ sơ  thành công!', '');
        },

        onError: (error) => {
            console.log(error);
            showNotification(
                'error',
                'Thất bại!',
                'Xoá hồ sơ thất bại. Vui lòng thử lại sau!'
            );
        }
    });

    const handleDeletePatient = () => {
        deletePatientMutation.mutate(activePatientCard);
    };

    const handleSavePatientId = (patientId) => {
        const appointmentData = {
            patientId
        };
        localStorage.setItem(
            'appointmentPatient',
            JSON.stringify(appointmentData)
        );
    };

    return (
        <article
            className={`patient-card ${activePatientCard === id ? 'patient-card--active' : ''} `}
            onClick={() => onPatientClick(id)}
        >
            <div className='patient-card__info'>
                <div className='patient-card__row'>
                    <div className='patient-card__label patient-card__name'>
                        <img src={userAvt} alt='' />
                        <span>{name}</span>
                    </div>
                </div>
                <div className='patient-card__row'>
                    <div className='patient-card__label'>
                        <img src={cake} alt='' />
                        <span>Ngày sinh</span>
                    </div>
                    <div className='patient-card__desc'>
                        {dayjs(dob.split('T')[0]).format('DD-MM-YYYY')}
                    </div>
                </div>
                <div className='patient-card__row'>
                    <div className='patient-card__label'>
                        <img src={mobi} alt='' />
                        <span>Số điện thoại</span>
                    </div>
                    <div className='patient-card__desc'>{phone}</div>
                </div>
                {activePatientCard === id && (
                    <>
                        <div className='patient-card__row'>
                            <div className='patient-card__label'>
                                <img src={genderIcon} alt='' />
                                <span>Giới tính</span>
                            </div>
                            <div className='patient-card__desc'>{gender}</div>
                        </div>
                        <div className='patient-card__row'>
                            <div className='patient-card__label'>
                                <img src={bagIcon} alt='' />
                                <span>Nghề Nghiệp</span>
                            </div>
                            <div className='patient-card__desc'>
                                {occupation}
                            </div>
                        </div>
                        <div className='patient-card__row'>
                            <div className='patient-card__label'>
                                <img src={location} alt='' />
                                <span>Địa chỉ</span>
                            </div>
                            <div className='patient-card__desc'>
                                {`${address}, ${ward}, ${district}, ${province}`}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {activePatientCard === id && (
                <div className='patient-card__act'>
                    <Button
                        className='patient-card__btn patient-card__delete'
                        onClick={() => setModalOpen(true)}
                    >
                        <img src={deleteIcon} alt='' />
                        Xoá
                    </Button>
                    <Button
                        to={`/update-patient-profile?id=${activePatientCard}`}
                        className='patient-card__btn patient-card__edit'
                    >
                        <img src={edit} alt='' />
                        Sửa
                    </Button>

                    <Button
                        to={
                            appointmentType === 'doctor'
                                ? '/select-doctor'
                                : `/select-specialty`
                        }
                        onClick={() => handleSavePatientId(activePatientCard)}
                        className='patient-card__btn patient-card__next'
                    >
                        Tiếp tục
                        <img src={arrowRight} alt='' />
                    </Button>
                </div>
            )}

            <Modal
                className='delete-modal'
                title='Cảnh báo!'
                cancelText='Đóng'
                okText='Xoá'
                centered
                open={modalOpen}
                onOk={() => handleDeletePatient()}
                onCancel={() => setModalOpen(false)}
            >
                <p>Bạn có chắc muốn xoá hồ sơ bệnh nhân này?</p>
            </Modal>
        </article>
    );
}

export default PatientCard;