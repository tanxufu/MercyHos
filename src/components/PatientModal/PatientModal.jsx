/* eslint-disable react/prop-types */
import { Controller, useForm } from 'react-hook-form';
import { ConfigProvider, DatePicker, Select } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'antd/locale/vi_VN.js';
import 'dayjs/locale/vi';

import Button from '../Button';
import Modal from '../Modal';
import pencilIcon from '../../assets/icons/pencil.svg';
import plusIcon from '../../assets/icons/plus.svg';
import FormGroup from '../FormGroup';
import schema from '../../utils/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    createPatient,
    getPatient,
    updatePatient
} from '../../apis/patient.api';
import { useEffect, useState } from 'react';
import { showNotification } from '../../utils/notification';
import { getAllUsers } from '../../apis/user.api';
import axios from 'axios';

dayjs.extend(utc);
dayjs.locale('vi');

const patientSchema = schema.omit([
    'password',
    'passwordConfirm',
    'passwordCurrent'
]);

function PatientModal({ id, modalClose }) {
    const queryClient = useQueryClient();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    // hook form
    const {
        register,
        control,
        handleSubmit,
        reset,
        // setError,
        formState: { errors }
    } = useForm({ resolver: yupResolver(patientSchema) });

    // get data in edit
    const { data } = useQuery({
        queryKey: ['patient', id],
        queryFn: () => getPatient(id),
        enabled: !!id
    });
    const patient = data?.data?.data?.data;

    // get users
    const { data: userData } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers()
    });
    let users = userData?.data?.data?.data || [];

    // fill form with data: patient
    useEffect(() => {
        if (id && patient) {
            reset({
                ...patient,
                dob: dayjs(patient.dob),
                owner: patient?.owner?.id
            });
        }
    }, [id, patient, reset]);

    // handle submit
    const mutation = useMutation({
        mutationFn: (body) => {
            if (id) {
                return updatePatient(id, body);
            } else {
                return createPatient(body);
            }
        },
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                id
                    ? 'Cập nhập hồ sơ bệnh nhân thành công!'
                    : 'Tạo hồ sơ bệnh nhân thành công!'
            );
            queryClient.invalidateQueries(['patient', id]);
            modalClose();
        },
        onError: (error) => {
            console.log(error);

            showNotification(
                'error',
                'Lỗi Server!',
                id
                    ? 'Cập nhật thất bại. Vui lòng thử lại sau!'
                    : 'Tạo mới thất bại. Vui lòng thử lại sau!'
            );
        }
    });

    const onSubmit = handleSubmit((data) => {
        // console.log(data);
        mutation.mutate(data);
    });

    // get provinces
    useEffect(() => {
        axios.get('https://provinces.open-api.vn/api/').then((res) => {
            setProvinces(res.data);
        });
    }, []);

    // get districts
    useEffect(() => {
        if (selectedProvince) {
            axios
                .get(
                    `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
                )
                .then((res) => {
                    setDistricts(res.data.districts);
                    setWards([]);
                });
        }
    }, [selectedProvince]);

    // get wards
    useEffect(() => {
        if (selectedDistrict) {
            axios
                .get(
                    `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
                )
                .then((res) => {
                    setWards(res.data.wards);
                });
        }
    }, [selectedDistrict]);

    return (
        <Modal modal={true} modalClose={modalClose}>
            <div
                className='modal-content'
                style={{ '--content-width': '800px' }}
            >
                <h2>
                    {' '}
                    {!id ? (
                        <img src={plusIcon} alt='' />
                    ) : (
                        <img src={pencilIcon} alt='' />
                    )}
                    {!id ? 'Thêm người dùng' : 'Cập nhật người dùng'}
                </h2>

                <form onSubmit={onSubmit}>
                    <div className='row gx-4'>
                        <div className='col-6'>
                            <FormGroup
                                type='text'
                                name='name'
                                label='Họ và tên (có dấu)'
                                placeHolder='Nhập họ và tên bệnh nhân'
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
                            <FormGroup
                                type='text'
                                name='phone'
                                label='Số điện thoại'
                                placeHolder='Nhập số điện thoại'
                                register={register}
                                errorMessage={errors.phone?.message}
                            />
                        </div>

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
                                                        value: 'Nam',
                                                        label: 'Nam'
                                                    },
                                                    {
                                                        value: 'Nữ',
                                                        label: 'Nữ'
                                                    },
                                                    {
                                                        value: 'Khác',
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
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <FormGroup
                                type='text'
                                name='occupation'
                                label='Nghề nghiệp'
                                placeHolder='Nhập nghề nghiệp'
                                register={register}
                                errorMessage={errors.occupation?.message}
                            />
                        </div>

                        <div className='col-6'>
                            <FormGroup
                                type='text'
                                name='email'
                                label='Địa chỉ Email'
                                placeHolder='Nhập địa chỉ email'
                                register={register}
                                errorMessage={errors.email?.message}
                            />
                        </div>
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <FormGroup
                                type='text'
                                name='idCard'
                                label='Số CCCD/Passport'
                                placeHolder='Nhập số CCCD/Passport'
                                register={register}
                                errorMessage={errors.idCard?.message}
                            />
                        </div>

                        <div className='col-6'>
                            <FormGroup
                                type='text'
                                name='ethnicity'
                                label='Dân tộc'
                                placeHolder='Nhập dân tộc'
                                register={register}
                                errorMessage={errors.ethnicity?.message}
                            />
                        </div>
                    </div>

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>
                                    Tỉnh / Thành
                                </label>
                                <Controller
                                    name='province'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                showSearch
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn tỉnh thành'
                                                value={field.value}
                                                onChange={(value, option) => {
                                                    setSelectedProvince(value);
                                                    field.onChange(
                                                        option.label
                                                    );
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
                                                options={provinces.map(
                                                    (province) => ({
                                                        value: province.code,
                                                        label: province.name
                                                    })
                                                )}
                                            />
                                            {errors?.province ? (
                                                <p className='form-group__error'>
                                                    {errors.province?.message}
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
                                    Quận / Huyện
                                </label>
                                <Controller
                                    name='district'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                showSearch
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn quận huyện'
                                                value={field.value}
                                                onChange={(value, option) => {
                                                    setSelectedDistrict(value);
                                                    field.onChange(
                                                        option.label
                                                    );
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
                                                options={districts.map(
                                                    (district) => ({
                                                        value: district.code,
                                                        label: district.name
                                                    })
                                                )}
                                            />
                                            {errors?.district ? (
                                                <p className='form-group__error'>
                                                    {errors.district?.message}
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
                                    Phường / Xã
                                </label>
                                <Controller
                                    name='ward'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                showSearch
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn phường xã'
                                                value={field.value}
                                                onChange={(value, option) =>
                                                    field.onChange(option.label)
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
                                                options={wards.map((ward) => ({
                                                    value: ward.code,
                                                    label: ward.name
                                                }))}
                                            />
                                            {errors?.ward ? (
                                                <p className='form-group__error'>
                                                    {errors.ward?.message}
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
                            <FormGroup
                                type='text'
                                name='address'
                                label='Địa chỉ'
                                placeHolder='Nhập địa chỉ'
                                register={register}
                                errorMessage={errors.address?.message}
                            />
                        </div>
                    </div>

                    <div className='row gx-4'>
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
                                            {errors?.owner ? (
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

                        {id && (
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
                        )}
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

export default PatientModal;
