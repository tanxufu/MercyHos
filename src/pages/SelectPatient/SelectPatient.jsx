import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Modal } from 'antd';
import dayjs from 'dayjs';

import AppContext from '../../contexts/app.context.jsx';
import Button from '../../components/Button';
import patientProfile from '../../assets/images/patientProfile.png';
import createPatient from '../../assets/icons/create-patient.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import userAvt from '../../assets/icons/user-avt.svg';
import cake from '../../assets/icons/cake.svg';
import gender from '../../assets/icons/gender.svg';
import id from '../../assets/icons/id.svg';
import location from '../../assets/icons/location.svg';
import mobi from '../../assets/icons/mobi.svg';
import edit from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import arrowRight from '../../assets/icons/arrow-right.svg';
import { deletePatient, getPatientsOnUser } from '../../apis/patient.api';
import { showNotification } from '../../utils/notification';

function SelectPatient() {
    const { user } = useContext(AppContext);
    const userId = user._id;
    const queryClient = useQueryClient();
    const [activePatientCard, setActivePatientCard] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // console.log(userId);

    const { data, isPending } = useQuery({
        queryKey: ['patients', userId],
        queryFn: () => getPatientsOnUser(userId),
        enabled: !!userId
    });
    // patients
    const patients = data?.data?.data?.data;
    const activePatients = patients?.filter((patient) => patient.active) || [];
    // console.log(activePatients);

    const deletePatientMutation = useMutation({
        mutationFn: () => deletePatient(activePatientCard),
        onSuccess: () => {
            setActivePatientCard(null);
            setModalOpen(false);
            queryClient.invalidateQueries(['patients', userId]);
            showNotification('success', 'Bạn đã xoá hồ sơ  thành công!', '');
        },

        onError: (error) => {
            console.log(error);
        }
    });

    const handleDeletePatient = () => {
        deletePatientMutation.mutate(activePatientCard);
    };

    const handlePatientClick = (id) => {
        if (activePatientCard !== id) {
            setActivePatientCard(id);
        }
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
        <div className='select-patient'>
            <nav className='breadcrumb'>
                <div className='container'>
                    <ul className='breadcrumb__list'>
                        <li className='breadcrumb__item'>
                            <NavLink to='/'>Trang chủ</NavLink>
                        </li>

                        <li className='breadcrumb__item breadcrumb__item--active'>
                            <img
                                src={chevronRight}
                                alt=''
                                className='breadcrumb__icon'
                            />
                            <NavLink to='#'>Chọn hồ sơ bệnh nhân</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='container'>
                <div className='select-patient__main'>
                    {isPending && (
                        <div className='loading'>
                            <div className='loader'></div>
                        </div>
                    )}

                    {activePatients?.length > 0 && (
                        <div className='has-patient'>
                            <h1>Chọn hồ sơ bệnh nhân</h1>
                            {activePatients?.map((patient) => {
                                return (
                                    <article
                                        key={patient.id}
                                        className={`patient-card ${activePatientCard === patient.id ? 'patient-card--active' : ''} `}
                                        onClick={() =>
                                            handlePatientClick(patient.id)
                                        }
                                    >
                                        <div className='patient-card__info'>
                                            <div className='patient-card__row'>
                                                <div className='patient-card__label patient-card__name'>
                                                    <img src={userAvt} alt='' />
                                                    <span>{patient.name}</span>
                                                </div>
                                            </div>
                                            <div className='patient-card__row'>
                                                <div className='patient-card__label'>
                                                    <img src={cake} alt='' />
                                                    <span>Ngày sinh</span>
                                                </div>
                                                <div className='patient-card__desc'>
                                                    {dayjs(
                                                        patient.dob.split(
                                                            'T'
                                                        )[0]
                                                    ).format('DD-MM-YYYY')}
                                                </div>
                                            </div>
                                            <div className='patient-card__row'>
                                                <div className='patient-card__label'>
                                                    <img src={mobi} alt='' />
                                                    <span>Số điện thoại</span>
                                                </div>
                                                <div className='patient-card__desc'>
                                                    {patient.phone}
                                                </div>
                                            </div>
                                            {activePatientCard ===
                                                patient.id && (
                                                <>
                                                    <div className='patient-card__row'>
                                                        <div className='patient-card__label'>
                                                            <img
                                                                src={gender}
                                                                alt=''
                                                            />
                                                            <span>
                                                                Giới tính
                                                            </span>
                                                        </div>
                                                        <div className='patient-card__desc'>
                                                            {patient.gender}
                                                        </div>
                                                    </div>
                                                    <div className='patient-card__row'>
                                                        <div className='patient-card__label'>
                                                            <img
                                                                src={id}
                                                                alt=''
                                                            />
                                                            <span>
                                                                Nghề Nghiệp
                                                            </span>
                                                        </div>
                                                        <div className='patient-card__desc'>
                                                            {patient.occupation}
                                                        </div>
                                                    </div>
                                                    <div className='patient-card__row'>
                                                        <div className='patient-card__label'>
                                                            <img
                                                                src={location}
                                                                alt=''
                                                            />
                                                            <span>Địa chỉ</span>
                                                        </div>
                                                        <div className='patient-card__desc'>
                                                            {`${patient.address}, ${patient.ward}, ${patient.district}, ${patient.province}`}
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {activePatientCard === patient.id && (
                                            <div className='patient-card__act'>
                                                <Button
                                                    className='patient-card__btn patient-card__delete'
                                                    onClick={() =>
                                                        setModalOpen(true)
                                                    }
                                                >
                                                    <img
                                                        src={deleteIcon}
                                                        alt=''
                                                    />
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
                                                    to={`/select-specialty`}
                                                    onClick={() =>
                                                        handleSavePatientId(
                                                            activePatientCard
                                                        )
                                                    }
                                                    className='patient-card__btn patient-card__next'
                                                >
                                                    Tiếp tục
                                                    <img
                                                        src={arrowRight}
                                                        alt=''
                                                    />
                                                </Button>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                            <Modal
                                className='delete-modal'
                                title='Cảnh báo!'
                                centered
                                open={modalOpen}
                                onOk={() => handleDeletePatient()}
                                onCancel={() => setModalOpen(false)}
                            >
                                <p>Bạn có chắc muốn xoá hồ sơ bệnh nhân này?</p>
                            </Modal>
                        </div>
                    )}

                    {!isPending && activePatients < 1 && (
                        <div className='no-patient'>
                            <img
                                src={patientProfile}
                                alt=''
                                className='no-patient__img'
                            />
                            <p>
                                Bạn chưa có hồ sơ bệnh nhân, vui lòng tạo hồ sơ
                                để được đặt khám.
                            </p>
                            <Button
                                className='create-patient-btn'
                                to='/create-patient-profile'
                            >
                                <img src={createPatient} alt='' />
                                Tạo hồ sơ
                            </Button>
                        </div>
                    )}

                    <div className='select-patient__act'>
                        <Link className='move-back' to='/'>
                            <span>Quay lại</span>
                        </Link>
                        {activePatients?.length > 0 && (
                            <Button
                                className='create-patient-btn'
                                to='/create-patient-profile'
                            >
                                <img src={createPatient} alt='' />
                                Tạo hồ sơ
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SelectPatient;
