/* eslint-disable react/prop-types */
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ConfigProvider, DatePicker, Select } from 'antd';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'antd/locale/vi_VN.js';
import 'dayjs/locale/vi';

import FormGroup from '../FormGroup';
import Modal from '../Modal';
import doctorSchema from '../../utils/doctor';
import Button from '../Button';
// import { useState } from 'react';
import { getAllUsers } from '../../apis/user.api';
import { createDoctor, editDoctor, getDoctor } from '../../apis/doctor.api';
import { showNotification } from '../../utils/notification';
import pencilIcon from '../../assets/icons/pencil.svg';
import plusIcon from '../../assets/icons/plus.svg';

dayjs.extend(utc);
dayjs.locale('vi');

const schema = doctorSchema;

function DoctorModal({ modalClose, id }) {
    const queryClient = useQueryClient();

    // form hook
    const {
        register,
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    // get users
    const { data } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers()
    });
    let users = data?.data?.data?.data || [];

    // get doctor
    const { data: doctorData } = useQuery({
        queryKey: ['doctor', id],
        queryFn: () => getDoctor(id),
        enabled: !!id
    });
    const doctor = doctorData?.data?.data?.data;

    // fill form with data: doctor
    useEffect(() => {
        if (id && doctor) {
            reset({
                ...doctor,
                dob: dayjs(doctor.dob),
                owner: doctor?.owner?.id,
                phone: doctor?.phone?.startsWith('0')
                    ? doctor?.phone
                    : `0${doctor?.phone?.split(' ')[1]}`
            });
        }
    }, [id, doctor, reset]);

    // handle form
    const mutation = useMutation({
        mutationFn: (body) => {
            if (id) {
                // console.log(id, body);
                return editDoctor(id, body);
            } else {
                return createDoctor(body);
            }
        },
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                id
                    ? 'Cập nhật Bác sĩ thành công!'
                    : 'Tạo mới Bác sĩ thành công!'
            );
            queryClient.invalidateQueries(['doctor', id]);
            modalClose();
        },
        onError: (error) => {
            console.log(error);
            const errorCode = error.response?.data?.error?.code;

            if (errorCode === 11000) {
                setError('errorOwner', {
                    type: 'server',
                    message: 'Tài khoản đã được sử dụng!'
                });
            } else {
                showNotification(
                    'error',
                    'Lỗi Server!',
                    id
                        ? 'Cập nhật thất bại. Vui lòng thử lại sau!'
                        : 'Tạo mới thất bại. Vui lòng thử lại sau!'
                );
            }
        }
    });

    const onSubmit = handleSubmit((data) => {
        // console.log(data);
        mutation.mutate(data);
    });

    return (
        <Modal modal={true} modalClose={modalClose}>
            <div
                className='modal-content doctor-modal-content'
                style={{ '--content-width': '800px' }}
            >
                <h2>
                    {!id ? (
                        <img src={plusIcon} alt='' />
                    ) : (
                        <img src={pencilIcon} alt='' />
                    )}
                    {!id ? 'Thêm bác sĩ' : 'Cập nhật bác sĩ'}
                </h2>

                <form onSubmit={onSubmit}>
                    <div className='row gx-4'>
                        <div className='col-6'>
                            <FormGroup
                                type='text'
                                name='name'
                                label={<>Họ và tên (có dấu)</>}
                                placeHolder='Nhập họ và tên'
                                register={register}
                                errorMessage={errors.name?.message}
                            />
                        </div>

                        <div className='col-6'>
                            <div className='patient-form__col'>
                                <label className='patient-form__label'>
                                    Ngày tháng năm sinh
                                </label>
                                <Controller
                                    name='dob'
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
                                                    onChange(normalizedDate);
                                                }}
                                                value={
                                                    value
                                                        ? dayjs(value)
                                                              .utc(true)
                                                              .startOf('day')
                                                        : null
                                                }
                                                placement='bottomRight'
                                                className='patient-form__date'
                                                format='DD-MM-YYYY'
                                                placeholder='Chọn ngày sinh'
                                            />
                                            {errors.dob?.message ? (
                                                <p className='form-group__error'>
                                                    {errors.dob?.message}
                                                </p>
                                            ) : (
                                                <p className='form-group__error'></p>
                                            )}
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>Giới tính</label>
                                <Controller
                                    name='gender'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn giới tính'
                                                value={field.value}
                                                onChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                options={[
                                                    {
                                                        value: 'male',
                                                        label: 'Nam'
                                                    },
                                                    {
                                                        value: 'female',
                                                        label: 'Nữ'
                                                    },
                                                    {
                                                        value: 'other',
                                                        label: 'Khác'
                                                    }
                                                ]}
                                            />
                                            {errors?.gender ? (
                                                <p className='form-group__error'>
                                                    {errors.gender?.message}
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
                                    Chuyên khoa
                                </label>
                                <Controller
                                    name='specialty'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn chuyên khoa'
                                                value={field.value}
                                                onChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                options={[
                                                    {
                                                        value: 'Khoa phụ khoa, khám thai',
                                                        label: 'Khoa phụ khoa, khám thai'
                                                    },
                                                    {
                                                        value: 'Khám nhi',
                                                        label: 'Khám nhi'
                                                    },
                                                    {
                                                        value: 'Khám da liệu',
                                                        label: 'Khám da liệu'
                                                    },
                                                    {
                                                        value: 'Khoa nội soi tai mũi họng',
                                                        label: 'Khoa nội soi tai mũi họng'
                                                    },
                                                    {
                                                        value: 'Khoa điều trị vết thương',
                                                        label: 'Khoa điều trị vết thương'
                                                    },
                                                    {
                                                        value: 'Khám mắt',
                                                        label: 'Khám mắt'
                                                    },
                                                    {
                                                        value: 'Khám chức năng hô hấp',
                                                        label: 'Khám chức năng hô hấp'
                                                    },
                                                    {
                                                        value: 'Khoa Hậu Môn-Trực Tràng',
                                                        label: 'Khoa Hậu Môn-Trực Tràng'
                                                    },
                                                    {
                                                        value: 'Khoa tiết niệu',
                                                        label: 'Khoa tiết niệu'
                                                    },
                                                    {
                                                        value: 'Khoa nội tiết',
                                                        label: 'Khoa nội tiết'
                                                    }
                                                ]}
                                            />
                                            {errors?.specialty ? (
                                                <p className='form-group__error'>
                                                    {errors.specialty?.message}
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
                            <FormGroup
                                type='text'
                                name='email'
                                label={<>Địa chỉ Email{}</>}
                                placeHolder='Nhập địa chỉ email'
                                register={register}
                                errorMessage={errors.email?.message}
                            />
                        </div>

                        <div className='col-6'>
                            <FormGroup
                                type='text'
                                name='phone'
                                label={<>Số điện thoại{}</>}
                                placeHolder='Nhập số điện thoại'
                                register={register}
                                errorMessage={errors.phone?.message}
                            />
                        </div>
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <FormGroup
                                type='number'
                                name='experience'
                                label={<>Năm kinh nghiệm{}</>}
                                placeHolder='Nhập năm kinh nghiệm'
                                register={register}
                                errorMessage={errors.experience?.message}
                            />
                        </div>

                        <div className='col-6'>
                            <FormGroup
                                type='number'
                                name='fee'
                                label={<>Phí khám bệnh{}</>}
                                value={150}
                                placeHolder='Nhập phí khám bệnh'
                                register={register}
                                errorMessage={errors.fee?.message}
                            />
                        </div>
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>Lịch khám</label>
                                <Controller
                                    name='availability'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                mode='multiple'
                                                className='form__select'
                                                placeholder='Chọn lịch khám'
                                                value={field.value}
                                                onChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                options={[
                                                    {
                                                        value: 'Thứ 2',
                                                        label: 'Thứ 2'
                                                    },
                                                    {
                                                        value: 'Thứ 3',
                                                        label: 'Thứ 3'
                                                    },
                                                    {
                                                        value: 'Thứ 4',
                                                        label: 'Thứ 4'
                                                    },
                                                    {
                                                        value: 'Thứ 5',
                                                        label: 'Thứ 5'
                                                    },
                                                    {
                                                        value: 'Thứ 6',
                                                        label: 'Thứ 6'
                                                    },
                                                    {
                                                        value: 'Thứ 7',
                                                        label: 'Thứ 7'
                                                    }
                                                ]}
                                            />
                                            {errors?.availability ? (
                                                <p className='form-group__error'>
                                                    {
                                                        errors.availability
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
                                <label className='form__label'>Tài khoản</label>
                                <Controller
                                    name='owner'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                showSearch
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn tài khoản'
                                                value={field.value}
                                                onChange={(value) =>
                                                    field.onChange(value)
                                                }
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
                                                options={users?.map((user) => ({
                                                    value: user?.id,
                                                    label: user?.email
                                                }))}
                                            />
                                            {errors?.owner ||
                                            errors?.errorOwner ? (
                                                <p className='form-group__error'>
                                                    {errors.owner?.message ||
                                                        errors.errorOwner
                                                            ?.message}
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

                    {id && (
                        <div className='row gx-4'>
                            <div className='col-6'>
                                <div className='form__col'>
                                    <label className='form__label'>
                                        Trạng thái
                                    </label>
                                    <Controller
                                        name='active'
                                        control={control}
                                        register={register}
                                        render={({ field }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    className='form__select'
                                                    placeholder='Chọn trạng thái'
                                                    value={field.value}
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    options={[
                                                        {
                                                            value: true,
                                                            label: 'Đang hoạt động'
                                                        },
                                                        {
                                                            value: false,
                                                            label: 'Ngưng hoạt động'
                                                        }
                                                    ]}
                                                />
                                                {errors?.active ? (
                                                    <p className='form-group__error'>
                                                        {errors.active?.message}
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
                    )}

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

export default DoctorModal;
