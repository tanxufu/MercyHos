import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import AppContext from '../../contexts/app.context';
import { deletePatient, getPatientsOnUser } from '../../apis/patient.api';
import Button from '../../components/Button';
import userNoLine from '../../assets/icons/user-noline.svg';
import createPatient from '../../assets/icons/create-patient.svg';
import cake from '../../assets/icons/cake.svg';
import gender from '../../assets/icons/gender.svg';
import bagIcon from '../../assets/icons/bag.svg';
import location from '../../assets/icons/location.svg';
import mobi from '../../assets/icons/mobi.svg';
import idIcon from '../../assets/icons/id.svg';
import groupIcon from '../../assets/icons/group.svg';
import emailIcon from '../../assets/icons/email.svg';
import edit from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import { showNotification } from '../../utils/notification';
import { Modal } from 'antd';

function Profile() {
    const { user } = useContext(AppContext);
    const userId = user._id;
    const queryClient = useQueryClient();
    const [activePatient, setActivePatient] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPatientId, setSelectedPatientId] = useState(null);

    const { data, isPending } = useQuery({
        queryKey: ['patients', userId],
        queryFn: () => getPatientsOnUser(userId),
        enabled: !!userId
    });
    // patients
    const patients = data?.data?.data?.data;
    const activePatients = patients?.filter((patient) => patient.active) || [];
    // console.log(activePatients);

    const handlePatientClick = (id) => {
        if (activePatient !== id) {
            setActivePatient(id);
        } else {
            setActivePatient(null);
        }
    };

    // delete
    const deletePatientMutation = useMutation({
        mutationFn: (id) => deletePatient(id),
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

    const handleDeletePatient = (id) => {
        console.log(id);
        deletePatientMutation.mutate(id);
    };

    return (
        <div className='patients-records'>
            <h1>Danh sách hồ sơ bệnh nhân</h1>
            <span>Nhấp vào để xem thông tin chi tiết hồ sơ</span>

            {isPending && (
                <div className='loading'>
                    <div className='loader'></div>
                </div>
            )}

            {!isPending && activePatients?.length < 1 && (
                <div>
                    <p className='no-data'>Bạn chưa có hồ sơ.</p>
                </div>
            )}

            {activePatients?.map((patient) => {
                return (
                    <article
                        key={patient?.id}
                        className={`patients-records__item ${activePatient === patient?.id ? 'patients-records__item--active' : ''} `}
                    >
                        <div
                            className='patients-records__info'
                            onClick={() => handlePatientClick(patient?.id)}
                        >
                            <div className='patients-records__info--name'>
                                <label>
                                    <img src={userNoLine} alt='' />
                                    Họ và tên
                                </label>
                                {patient?.name}
                            </div>
                            <div></div>
                            <div>
                                <label>
                                    <img src={gender} alt='' />
                                    Giới tính
                                </label>
                                {patient?.gender}
                            </div>
                            <div>
                                <label>
                                    <img src={cake} alt='' />
                                    Ngày sinh
                                </label>
                                {dayjs(patient?.dob?.split('T')[0]).format(
                                    'DD-MM-YYYY'
                                )}
                            </div>
                            <div>
                                <label>
                                    <img src={mobi} alt='' />
                                    Số điện thoại
                                </label>
                                {patient?.phone}
                            </div>
                            <div>
                                <label>
                                    <img src={emailIcon} alt='' />
                                    Email
                                </label>
                                {patient?.email}
                            </div>

                            {activePatient === patient?.id && (
                                <>
                                    <div>
                                        <label>
                                            <img src={bagIcon} alt='' />
                                            Nghề nghiệp
                                        </label>
                                        {patient?.occupation}
                                    </div>
                                    <div>
                                        <label>
                                            <img src={idIcon} alt='' />
                                            CCCD
                                        </label>
                                        {patient?.idCard || 'Chưa cập nhập'}
                                    </div>
                                    <div>
                                        <label>
                                            <img src={groupIcon} alt='' />
                                            Dân tộc
                                        </label>
                                        {patient?.ethnicity || 'Chưa cập nhập'}
                                    </div>
                                    <div>
                                        <label>
                                            <img src={location} alt='' />
                                            Địa chỉ
                                        </label>
                                        {`${patient?.address}, ${patient?.ward}, ${patient?.district}, ${patient?.province}`}
                                    </div>
                                </>
                            )}
                        </div>

                        <div className='patients-records__act'>
                            <Button
                                className='patients-records__btn patients-records__delete'
                                onClick={() => {
                                    setModalOpen(true);
                                    setSelectedPatientId(patient?.id);
                                }}
                            >
                                <img src={deleteIcon} alt='' />
                                Xoá hồ sơ
                            </Button>
                            <Button
                                to={`/update-patient-profile?id=${patient?.id}`}
                                className='patients-records__btn patients-records__edit'
                            >
                                <img src={edit} alt='' />
                                Sửa hồ sơ
                            </Button>
                            <Modal
                                className='delete-modal'
                                title='Xác nhận!'
                                cancelText='Đóng'
                                okText='Xoá'
                                centered
                                open={modalOpen}
                                onOk={() =>
                                    handleDeletePatient(selectedPatientId)
                                }
                                onCancel={() => setModalOpen(false)}
                            >
                                <p>
                                    Bạn có chắc muốn xoá hồ sơ bệnh nhân này?{' '}
                                    {/* {selectedPatientId} */}
                                </p>
                            </Modal>
                        </div>
                    </article>
                );
            })}
            {!isPending && (
                <Button
                    className='create-patient-btn patients-records__add'
                    to='/create-patient-profile'
                >
                    <img src={createPatient} alt='' />
                    Thêm hồ sơ mới
                </Button>
            )}
        </div>
    );
}

export default Profile;
