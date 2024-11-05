/* eslint-disable react/prop-types */
import { DatePicker, ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/vi_VN';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

import schema from '../../utils/rules';
import FormGroup from '../../components/FormGroup';
import Button from '../../components/Button';
import createPatient from '../../assets/icons/create-patient.svg';
import resetIcon from '../../assets/icons/reset.svg';
import AppContext from '../../contexts/app.context';
import {
    createPatientOnUser,
    getPatient,
    updatePatient
} from '../../apis/patient.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '../../utils/notification';
import { useLocation, useNavigate } from 'react-router-dom';

dayjs.locale('vi');

const patientSchema = schema.omit(['password', 'passwordConfirm']);

function PatientForm({ title, isEdit = false }) {
    const queryClient = useQueryClient();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const patientId = queryParams.get('id');

    const navigate = useNavigate();
    const [submit, setSubmit] = useState(false);
    const { user } = useContext(AppContext);
    const userId = user._id;

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

    // fill form with data: patient
    useEffect(() => {
        if (isEdit && patient) {
            reset({
                ...patient,
                dob: dayjs(patient.dob)
            });
        }
    }, [isEdit, patient, reset]);

    const mutation = useMutation({
        mutationFn: (body) => {
            if (isEdit) {
                updatePatient(patientId, body);
            } else {
                createPatientOnUser(userId, body);
            }
        },
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                isEdit
                    ? 'Bạn đã cập nhập thành công'
                    : 'Bạn đã tạo hồ sơ thành công!'
            );
            queryClient.invalidateQueries(['patients', userId]);
            navigate('/select-patient-profile');
        },
        onError: (error) => {
            console.log(error);
            showNotification(
                'error',
                'Lỗi Server!',
                'Tạo hồ sơ thất bại. Vui lòng thử lại sau!'
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
                                            onChange={(date) => onChange(date)}
                                            value={value}
                                            placement='bottomRight'
                                            className='patient-form__date'
                                            format='YYYY-MM-DD'
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
                        <FormGroup
                            type='text'
                            name='gender'
                            label={<>Giới tính{<sup>*</sup>}</>}
                            placeHolder={`Vui lòng nhập 'Nam'  'Nữ' hoặc 'Khác'`}
                            register={register}
                            errorMessage={submit && errors.gender?.message}
                        />
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
                        <FormGroup
                            type='text'
                            name='province'
                            label={<>Tỉnh/Thành{<sup>*</sup>}</>}
                            placeHolder='Nhập tỉnh thành phố'
                            register={register}
                            errorMessage={submit && errors.province?.message}
                        />
                    </div>

                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='district'
                            label={<>Quận/Huyện{<sup>*</sup>}</>}
                            placeHolder='Nhập quận huyện'
                            register={register}
                            errorMessage={submit && errors.district?.message}
                        />
                    </div>
                </div>
            </div>

            <div className='patient-form__row'>
                <div className='row'>
                    <div className='col-6 col-md-12'>
                        <FormGroup
                            type='text'
                            name='ward'
                            label={<>Phường/Xã{<sup>*</sup>}</>}
                            placeHolder='Nhập phường xã'
                            register={register}
                            errorMessage={submit && errors.ward?.message}
                        />
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
