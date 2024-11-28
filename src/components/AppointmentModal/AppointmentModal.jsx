/* eslint-disable react/prop-types */
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConfigProvider, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'antd/locale/vi_VN.js';
import 'dayjs/locale/vi';

import Button from '../Button';
import Modal from '../Modal';
import pencilIcon from '../../assets/icons/pencil.svg';
import plusIcon from '../../assets/icons/plus.svg';
// import FormGroup from '../FormGroup';
import appointmentSchema from '../../utils/appointment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createAppointment,
    getAppointment,
    updateAppointment
} from '../../apis/appointment.api';
import { getAllPatients, getPatient } from '../../apis/patient.api';
import {
    getAllDoctors,
    getAppointmentOnDoctors,
    getDoctor
} from '../../apis/doctor.api';
import { useEffect, useState } from 'react';
import { showNotification } from '../../utils/notification';

dayjs.extend(utc);
dayjs.locale('vi');

const schema = appointmentSchema;

function AppointmentModal({ id, modalClose, doctorSite }) {
    const queryClient = useQueryClient();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [pickDate, setPickDate] = useState(null);

    // form hook
    const {
        register,
        control,
        handleSubmit,
        reset,
        // setError,
        setValue,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: {
            visitStatus: 'Sắp tới',
            feeStatus: 'Chưa thanh toán'
        },
        resolver: yupResolver(schema)
    });

    // get appointment
    const { data } = useQuery({
        queryKey: ['appointment', id],
        queryFn: () => getAppointment(id),
        enabled: !!id
    });
    const appointment = data?.data?.data?.data || {};

    // get patients
    const { data: patientsData } = useQuery({
        queryKey: ['patients'],
        queryFn: () => getAllPatients()
    });
    let patients = patientsData?.data?.data?.data || [];
    const activePatients = patients?.filter((patient) => patient.active) || [];

    // get patient
    const { data: patientData } = useQuery({
        queryKey: ['patient', selectedPatient || appointment?.patient?.id],
        queryFn: () => getPatient(selectedPatient || appointment?.patient?.id),
        enabled: !!selectedPatient || !!appointment?.patient?.id
    });
    let patient = patientData?.data?.data?.data || [];

    // get doctors
    const { data: doctorsData } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => getAllDoctors()
    });
    let doctors = doctorsData?.data?.data?.data || [];

    // get doctor availability
    const { data: doctorData } = useQuery({
        queryKey: ['doctor', selectedDoctor || appointment?.doctor?.id],
        queryFn: () => getDoctor(selectedDoctor || appointment?.doctor?.id),
        enabled: !!selectedDoctor || !!appointment?.doctor?.id
    });
    let doctorAvailability = doctorData?.data?.data?.data?.availability || [];

    // get appointments on doctor
    const { data: doctorAppointmentsData } = useQuery({
        queryKey: [
            'doctorAppointment',
            selectedDoctor || appointment?.doctor?.id
        ],
        queryFn: () =>
            getAppointmentOnDoctors(selectedDoctor || appointment?.doctor?.id),
        enabled: !!selectedDoctor || !!appointment?.doctor?.id
    });
    const doctorAppointments = doctorAppointmentsData?.data?.data?.data || [];

    const appointmentsMap = doctorAppointments?.reduce((acc, appointment) => {
        if (appointment?.visitStatus !== 'Đã huỷ') {
            const date = dayjs(appointment.dateVisit).format('DD-MM-YYYY');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(appointment.timeVisit);
        }

        return acc;
    }, {});

    const availableWeekdays = doctorAvailability?.map((day) => {
        switch (day) {
            case 'Thứ 2':
                return 1;
            case 'Thứ 3':
                return 2;
            case 'Thứ 4':
                return 3;
            case 'Thứ 5':
                return 4;
            case 'Thứ 6':
                return 5;
            case 'Thứ 7':
                return 6;

            default:
                return null;
        }
    });

    const disabledDate = (current) => {
        if (current < dayjs().startOf('day')) {
            return true;
        }

        if (current > dayjs().endOf('month').add(2, 'week')) {
            return true;
        }

        if (current.isSame(dayjs(), 'day')) {
            return true;
        }

        return !availableWeekdays?.includes(current.day());
    };

    const bookedTimeByDate = appointmentsMap[pickDate];

    const timeSlots = [
        '8:00 - 9:00',
        '9:00 - 10:00',
        '10:00 - 11:00',
        '13:30 - 14:30',
        '14:30 - 15:30',
        '15:30 - 16:30'
    ];

    const availableTimeSlots = timeSlots.filter(
        (slot) => !bookedTimeByDate?.includes(slot)
    );

    const handlePatientChange = (patientId) => {
        setSelectedPatient(patientId);
    };

    const handleDoctorChange = (doctorId) => {
        setSelectedDoctor(doctorId);
    };

    const handleDateChange = (date, dateString) => {
        setPickDate(dateString);
    };

    // handle submit

    useEffect(() => {
        if (id && appointment) {
            setPickDate(dayjs(appointment?.dateVisit).format('DD-MM-YYYY'));
            reset({
                ...appointment,
                patient: appointment?.patient?.id,
                doctor: appointment?.doctor?.id
            });
        }
    }, [id, appointment, reset]);

    const mutation = useMutation({
        mutationFn: (body) => {
            if (id) {
                return updateAppointment(id, body);
            } else {
                return createAppointment(body);
            }
        },
        onSuccess: () => {
            // console.log('success');

            showNotification(
                'success',
                'Thành công!',
                id ? 'Cập nhật thành công!' : 'Tạo lịch khám thành công!'
            );
            queryClient.invalidateQueries(['appointment', id]);
            modalClose();
        },
        onError: (error) => {
            console.log(error);
            showNotification(
                'error',
                'Lỗi Server!',
                'Tạo mới thất bại. Vui lòng thử lại sau!'
            );
        }
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        let appointmentData = {};

        if (id) {
            const isRequest =
                dayjs(data?.dateVisit)
                    .utc()
                    .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') !==
                    appointment?.dateVisit ||
                data?.timeVisit !== appointment?.timeVisit ||
                data?.doctor !== appointment?.doctor?.id;

            const changeRequest = isRequest
                ? {
                      newDoctor: data?.doctor,
                      newDateVisit: data?.dateVisit,
                      newTimeVisit: data?.timeVisit,
                      requestedBy: 'doctor',
                      status: 'pending'
                  }
                : {};

            appointmentData = {
                ...data,
                doctor: appointment?.doctor?.id,
                dateVisit: appointment?.dateVisit,
                timeVisit: appointment?.timeVisit,
                changeRequest,
                user: patient?.owner?.id || appointment?.patient?.owner?.id
            };
        } else {
            appointmentData = {
                ...data,
                user: patient?.owner?.id || appointment?.patient?.owner?.id
            };
        }

        console.log(appointmentData);
        mutation.mutate(appointmentData);
    });

    return (
        <Modal modal={true} modalClose={modalClose}>
            <div
                className='modal-content appointment-modal-content'
                style={{ '--content-width': '800px' }}
            >
                <h2>
                    {!id ? (
                        <img src={plusIcon} alt='' />
                    ) : (
                        <img src={pencilIcon} alt='' />
                    )}
                    {!id ? 'Thêm lịch khám' : 'Cập nhật lịch khám'}
                </h2>

                <form onSubmit={onSubmit}>
                    <div className='row gx-4'>
                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>Bệnh nhân</label>
                                <Controller
                                    name='patient'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                showSearch
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn hồ sơ khám bệnh'
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    handlePatientChange(value);
                                                }}
                                                disabled={doctorSite || id}
                                                optionFilterProp='label'
                                                filterSort={(
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        )
                                                }
                                                options={activePatients?.map(
                                                    (patient) => ({
                                                        value: patient?.id,
                                                        label: `${patient?.name}: ${patient?.phone}`
                                                    })
                                                )}
                                            />
                                            {errors?.patient ? (
                                                <p className='form-group__error'>
                                                    {errors.patient?.message}
                                                </p>
                                            ) : (
                                                <p className='form-group__error'></p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>Bác sĩ</label>
                                <Controller
                                    name='doctor'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                showSearch
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn bác sĩ khám bệnh'
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    handleDoctorChange(value);
                                                }}
                                                disabled={doctorSite}
                                                optionFilterProp='label'
                                                filterSort={(
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        )
                                                }
                                                options={doctors?.map(
                                                    (doctor) => ({
                                                        value: doctor?.id,
                                                        label: `${doctor?.name}: ${doctor?.specialty}`
                                                    })
                                                )}
                                            />
                                            {errors?.doctor ? (
                                                <p className='form-group__error'>
                                                    {errors.doctor?.message}
                                                </p>
                                            ) : (
                                                <p className='form-group__error'></p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <div className='patient-form__col'>
                                <label className='patient-form__label'>
                                    Ngày khám bệnh
                                </label>
                                <Controller
                                    name='dateVisit'
                                    control={control}
                                    register={register}
                                    render={({
                                        field: { onChange, value }
                                    }) => (
                                        <ConfigProvider locale={locale}>
                                            <DatePicker
                                                onChange={(date) => {
                                                    const normalizedDate = date
                                                        ? dayjs(date)
                                                              .utc(true)
                                                              .startOf('day')
                                                        : null;
                                                    handleDateChange(
                                                        normalizedDate,
                                                        date?.format(
                                                            'DD-MM-YYYY'
                                                        )
                                                    );
                                                    onChange(normalizedDate);
                                                }}
                                                value={
                                                    value
                                                        ? dayjs(value)
                                                              .utc(true)
                                                              .startOf('day')
                                                        : null
                                                }
                                                disabledDate={disabledDate}
                                                placement='bottomRight'
                                                className='patient-form__date'
                                                format='DD-MM-YYYY'
                                                placeholder='Chọn ngày khám'
                                            />
                                            {errors.dateVisit?.message ? (
                                                <p className='form-group__error'>
                                                    {errors.dateVisit?.message}
                                                </p>
                                            ) : (
                                                <p className='form-group__error'></p>
                                            )}
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>
                                    Giờ khám bệnh
                                </label>
                                <Controller
                                    name='timeVisit'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                showSearch
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn giờ khám'
                                                value={field.value}
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                optionFilterProp='label'
                                                filterSort={(
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        .toLowerCase()
                                                        .localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            ).toLowerCase()
                                                        )
                                                }
                                                options={availableTimeSlots?.map(
                                                    (time) => ({
                                                        value: time,
                                                        label: time
                                                    })
                                                )}
                                            />
                                            {errors?.timeVisit ? (
                                                <p className='form-group__error'>
                                                    {errors.timeVisit?.message}
                                                </p>
                                            ) : (
                                                <p className='form-group__error'></p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>
                                    Trạng thái
                                </label>
                                <Controller
                                    name='visitStatus'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn trạng thái'
                                                value={getValues('visitStatus')}
                                                onChange={(value) =>
                                                    setValue(
                                                        'visitStatus',
                                                        value
                                                    )
                                                }
                                                options={[
                                                    {
                                                        value: 'Sắp tới',
                                                        label: 'Sắp tới'
                                                    },
                                                    {
                                                        value: 'Đã khám',
                                                        label: 'Đã khám'
                                                    },
                                                    ...(!doctorSite
                                                        ? [
                                                              {
                                                                  value: 'Đã huỷ',
                                                                  label: 'Đã huỷ'
                                                              }
                                                          ]
                                                        : [])
                                                ]}
                                            />
                                            {errors?.visitStatus ? (
                                                <p className='form-group__error'>
                                                    {
                                                        errors.visitStatus
                                                            ?.message
                                                    }
                                                </p>
                                            ) : (
                                                <p className='form-group__error'></p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>
                                    Thanh toán
                                </label>
                                <Controller
                                    name='feeStatus'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn thanh toán'
                                                value={getValues('feeStatus')}
                                                onChange={(value) =>
                                                    setValue('feeStatus', value)
                                                }
                                                options={[
                                                    {
                                                        value: 'Chưa thanh toán',
                                                        label: 'Chưa thanh toán'
                                                    },
                                                    {
                                                        value: 'Đã thanh toán',
                                                        label: 'Đã thanh toán'
                                                    }
                                                ]}
                                            />
                                            {errors?.feeStatus ? (
                                                <p className='form-group__error'>
                                                    {errors.feeStatus?.message}
                                                </p>
                                            ) : (
                                                <p className='form-group__error'></p>
                                            )}
                                        </>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='modal-content__act'>
                        <Button
                            className='modal-content__cancel'
                            onClick={() => modalClose()}
                        >
                            Đóng
                        </Button>

                        <Button className='modal-content__update'>
                            {id ? 'Cập nhập' : 'Tạo mới'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default AppointmentModal;
