/* eslint-disable react/prop-types */
import { ConfigProvider, DatePicker, Layout, theme } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import locale from 'antd/locale/vi_VN.js';
import 'dayjs/locale/vi';

import doctorBg from '../../assets/images/doctor-bg.png';
import doctorAvt from '../../assets/icons/doctor-avt.svg';
import doctorAvtFemale from '../../assets/icons/doctor-avt-female.svg';
import Button from '../Button';
import { getDoctor } from '../../apis/doctor.api';
import FormGroup from '../FormGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import doctorSchema from '../../utils/doctor';
import { useEffect } from 'react';

dayjs.extend(utc);
dayjs.locale('vi');

const { Content } = Layout;
const schema = doctorSchema.omit(['experience', 'specialty', 'owner']);

function DoctorProfile({ doctorId }) {
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken();

    // hook form
    const {
        register,
        control,
        // handleSubmit,
        reset,
        // setError,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    // get doctor
    const { data } = useQuery({
        queryKey: ['users', doctorId],
        queryFn: () => getDoctor(doctorId),
        enabled: !!doctorId
    });
    const doctor = data?.data?.data?.data;

    // fill form with data: doctor
    useEffect(() => {
        reset({
            ...doctor,
            dob: dayjs(doctor?.dob)
        });
    }, [doctor, reset]);

    return (
        <Content
            className='doctor-layout__content'
            style={{
                // padding: 24,
                margin: '24px 40px',
                minHeight: 280,
                height: '100%',
                background: colorBgContainer,
                borderRadius: borderRadiusLG
            }}
        >
            <div className='doctor-profile'>
                <div className='doctor-profile__top'>
                    <div className='doctor-profile__bg'>
                        <img src={doctorBg} alt='' />
                    </div>

                    <div className='doctor-profile-header'>
                        <div className='doctor-profile-header__avt'>
                            <img
                                src={
                                    doctor?.gender === 'male' ||
                                    doctor?.gender === 'Nam'
                                        ? doctorAvt
                                        : doctorAvtFemale
                                }
                                alt=''
                            />
                        </div>
                        <div className='doctor-profile-header__name'>
                            <h1>{doctor?.name}</h1>
                            <p>{doctor?.specialty}</p>
                        </div>
                    </div>
                </div>

                <div className='doctor-profile-edit'>
                    <h2>Chỉnh sửa hồ sơ</h2>

                    <form className='doctor-profile-form'>
                        <div className='row gx-5'>
                            <div className='col-6'>
                                <FormGroup
                                    type='text'
                                    name='name'
                                    label='Họ Tên'
                                    placeHolder='Nhập họ và tên'
                                    register={register}
                                    errorMessage={errors.name?.message}
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

                        <div className='row gx-5'>
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
                                                        const normalizedDate =
                                                            date
                                                                ? dayjs(date)
                                                                      .utc(true)
                                                                      .startOf(
                                                                          'day'
                                                                      )
                                                                : null;
                                                        onChange(
                                                            normalizedDate
                                                        );
                                                    }}
                                                    value={
                                                        value
                                                            ? dayjs(value)
                                                                  .utc(true)
                                                                  .startOf(
                                                                      'day'
                                                                  )
                                                            : null
                                                    }
                                                    placement='bottomRight'
                                                    className='patient-form__date'
                                                    format='YYYY-MM-DD'
                                                    placeholder='Chọn ngày sinh'
                                                />
                                                {/* {submit && errors.dob?.message ? (
                                            <p className='form-group__error'>
                                                {errors.dob?.message}
                                            </p>
                                        ) : (
                                            <p className='form-group__error'></p>
                                        )} */}
                                            </ConfigProvider>
                                        )}
                                    />
                                </div>
                            </div>

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
                        </div>

                        <div className='row gx-5'>
                            <div className='col-6'>
                                <FormGroup
                                    type='number'
                                    name='fee'
                                    label='Phí khám bệnh (.000đ)'
                                    placeHolder='Nhập phí khám bệnh'
                                    register={register}
                                    errorMessage={errors.fee?.message}
                                />
                            </div>

                            <div className='col-6'>
                                <FormGroup
                                    type='text'
                                    name='availability'
                                    label='Lịch khám'
                                    placeHolder='Nhập lịch khám'
                                    register={register}
                                    errorMessage={errors.availability?.message}
                                />
                            </div>
                        </div>

                        <div className='row gx-5'>
                            <div className='col-6'>
                                <Button className='doctor-profile-form__btn'>
                                    Lưu hồ sơ
                                </Button>
                            </div>

                            <div className='col-6'>
                                <div className='doctor-profile-form__createdAt'>
                                    Đã tham gia vào ngày&nbsp;
                                    <span>
                                        {dayjs(doctor?.create_at).format(
                                            'DD-MM-YYYY'
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Content>
    );
}

export default DoctorProfile;
