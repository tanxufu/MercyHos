import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import AppContext from '../../contexts/app.context.jsx';
import Button from '../../components/Button';
import patientProfile from '../../assets/images/patientProfile.png';
import createPatient from '../../assets/icons/create-patient.svg';
import chevronRight from '../../assets/icons/chevron-right.svg';
import { getPatientsOnUser } from '../../apis/patient.api';
import PatientCard from '../../components/PatientCard/PatientCard.jsx';

function SelectPatient() {
    const { user } = useContext(AppContext);
    const userId = user._id;
    const [activePatientCard, setActivePatientCard] = useState(null);

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

    const handlePatientClick = (id) => {
        if (activePatientCard !== id) {
            setActivePatientCard(id);
        }
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
                                    <PatientCard
                                        key={patient?.id}
                                        patient={patient}
                                        activePatientCard={activePatientCard}
                                        onPatientClick={handlePatientClick}
                                    />
                                );
                            })}
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
                                state={{ prevPath: location.pathname }}
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
