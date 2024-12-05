/* eslint-disable react/prop-types */

import { DatePicker, ConfigProvider, Select } from 'antd';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'antd/locale/vi_VN.js';
import 'dayjs/locale/vi';

import schema from '../../utils/rules';
import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import createPatient from '../../assets/icons/create-patient.svg';
import resetIcon from '../../assets/icons/reset.svg';
import AppContext from '../../contexts/app.context.jsx';
import {
    createPatientOnUser,
    getPatient,
    updatePatient
} from '../../apis/patient.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '../../utils/notification';

dayjs.extend(utc);
dayjs.locale('vi');

const patientSchema = schema.omit([
    'password',
    'passwordConfirm',
    'passwordCurrent',
    'active',
    'owner'
]);

function PatientForm({ title, isEdit = false }) {
    const queryClient = useQueryClient();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const prevPath = location.state?.prevPath;

    const patientId = queryParams.get('id');

    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const { user } = useContext(AppContext);
    const userId = user._id;

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
        queryKey: ['patient', patientId],
        queryFn: () => getPatient(patientId),
        enabled: isEdit
    });
    const patient = data?.data?.data?.data;
    // console.log(patient);

    // fill form with data: patient
    useEffect(() => {
        if (isEdit && patient) {
            reset({
                ...patient,
                dob: dayjs(patient.dob)
            });
        }
    }, [isEdit, patient, reset]);

    console.log(prevPath);

    const mutation = useMutation({
        mutationFn: (body) => {
            if (isEdit) {
                return updatePatient(patientId, body);
            } else {
                return createPatientOnUser(userId, body);
            }
        },
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                isEdit
                    ? 'Bạn đã cập nhập hồ sơ thành công!'
                    : 'Bạn đã tạo hồ sơ thành công!'
            );
            queryClient.invalidateQueries(['patients', userId]);

            if (prevPath === '/select-patient-profile') {
                navigate('/select-patient-profile');
            } else {
                navigate('/profile');
            }
        },
        onError: (error) => {
            console.log(error);
            showNotification(
                'error',
                'Lỗi Server!',
                isEdit
                    ? 'Cập nhật thất bại. Vui lòng thử lại sau!'
                    : 'Tạo hồ sơ thất bại. Vui lòng thử lại sau!'
            );
        }
    });

    const onSubmit = handleSubmit((data) => {
        // console.log(data);
        mutation.mutate(data);
    });

    const handleReset = () => {
        reset();
        setSubmit(false);
    };

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
        <form className='patient-form' noValidate onSubmit={onSubmit}>
            <div className='patient-form__heading'>
                <h1>{title}</h1>
                <span>Nhập thông tin bệnh nhân</span>
            </div>
            <p className='patient-form__desc'>
                Vui lòng cung cấp thông tin chính xác để được phục vụ tốt nhất.
                Trong trường hợp cung cấp sai thông tin bệnh nhân & điện thoại,
                việc xác nhận cuộc hẹn sẽ không hiệu lực trước khi đặt khám.
            </p>

            <span className='patient-form__note'>
                (*) Thông tin bắt buộc nhập
            </span>

            <div className='patient-form__row'>
                <div className='row'>
                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='name'
                            label={<>Họ và tên (có dấu){<sup>*</sup>}</>}
                            placeHolder='Ví dụ: Nguyễn Văn Bảo'
                            register={register}
                            errorMessage={submit && errors.name?.message}
                        />
                    </div>

                    <div className='col-6 col-md-12'>
                        <div className='patient-form__col'>
                            <label className='patient-form__label'>
                                Ngày tháng năm sinh<sup>*</sup>
                            </label>
                            <Controller
                                name='dob'
                                control={control}
                                register={register}
                                render={({ field: { onChange, value } }) => (
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
                                        {submit && errors.dob?.message ? (
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
            </div>

            <div className='patient-form__row'>
                <div className='row'>
                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='phone'
                            label={<>Số điện thoại{<sup>*</sup>}</>}
                            placeHolder='Nhập số điện thoại'
                            register={register}
                            errorMessage={submit && errors.phone?.message}
                        />
                    </div>

                    <div className='col-6 col-md-12'>
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
            </div>

            <div className='patient-form__row'>
                <div className='row'>
                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='occupation'
                            label={<>Nghề nghiệp{<sup>*</sup>}</>}
                            placeHolder='Nhập nghề nghiệp'
                            register={register}
                            errorMessage={submit && errors.occupation?.message}
                        />
                    </div>

                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='email'
                            label={<>Địa chỉ Email{<sup>*</sup>}</>}
                            placeHolder='Nhập địa chỉ email'
                            register={register}
                            errorMessage={submit && errors.email?.message}
                        />
                    </div>
                </div>
            </div>

            <div className='patient-form__row'>
                <div className='row'>
                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='idCard'
                            label='Số CCCD/Passport'
                            placeHolder='Nhập số CCCD/Passport'
                            register={register}
                            errorMessage={submit && errors.idCard?.message}
                        />
                    </div>

                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='ethnicity'
                            label='Dân tộc'
                            placeHolder='Nhập dân tộc'
                            register={register}
                            errorMessage={submit && errors.ethnicity?.message}
                        />
                    </div>
                </div>
            </div>

            <div className='patient-form__row'>
                <div className='row'>
                    <div className='col-6 col-md-12'>
                        <div className='form__col'>
                            <label className='form__label'>
                                Tỉnh / Thành<sup>*</sup>
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
                                                field.onChange(option.label);
                                            }}
                                            optionFilterProp='label'
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '')
                                                    .toLowerCase()
                                                    .localeCompare(
                                                        (
                                                            optionB?.label ?? ''
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

                    <div className='col-6 col-md-12'>
                        <div className='form__col'>
                            <label className='form__label'>
                                Quận / Huyện<sup>*</sup>
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
                                                field.onChange(option.label);
                                            }}
                                            optionFilterProp='label'
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '')
                                                    .toLowerCase()
                                                    .localeCompare(
                                                        (
                                                            optionB?.label ?? ''
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
            </div>

            <div className='patient-form__row'>
                <div className='row'>
                    <div className='col-6 col-md-12'>
                        {/* address */}
                        <div className='form__col'>
                            <label className='form__label'>
                                Phường / Xã<sup>*</sup>
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
                                            filterSort={(optionA, optionB) =>
                                                (optionA?.label ?? '')
                                                    .toLowerCase()
                                                    .localeCompare(
                                                        (
                                                            optionB?.label ?? ''
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

                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='address'
                            label={<>Địa chỉ{<sup>*</sup>}</>}
                            placeHolder='Nhập địa chỉ'
                            register={register}
                            errorMessage={submit && errors.address?.message}
                        />
                    </div>
                </div>
            </div>

            <div className='patient-form__act'>
                {isEdit ? (
                    <></>
                ) : (
                    <Button
                        className='patient-form__reset'
                        onClick={handleReset}
                    >
                        <img src={resetIcon} alt='' />
                        Nhập lại
                    </Button>
                )}

                <Button
                    type='submit'
                    className='patient-form__submit'
                    onClick={() => setSubmit(true)}
                >
                    <img src={createPatient} alt='' />
                    {isEdit ? 'Cập nhập' : 'Tạo mới'}
                </Button>
            </div>
        </form>
    );
}

export default PatientForm;
