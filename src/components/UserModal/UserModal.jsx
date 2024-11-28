/* eslint-disable react/prop-types */
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select } from 'antd';

import Modal from '../Modal';
import FormGroup from '../FormGroup';
import schema from '../../utils/rules';
import Button from '../Button';
import pencilIcon from '../../assets/icons/pencil.svg';
import plusIcon from '../../assets/icons/plus.svg';
import { createUser, editUser, getUser } from '../../apis/user.api';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showNotification } from '../../utils/notification';

const userSchema = schema.pick([
    'name',
    'email',
    'password',
    'passwordConfirm',
    'role'
]);

function UserModal({ modalClose, id }) {
    const queryClient = useQueryClient();

    // form hook
    const {
        register,
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors }
    } = useForm(
        !id
            ? { resolver: yupResolver(userSchema) }
            : {
                  resolver: yupResolver(
                      userSchema.omit(['password', 'passwordConfirm'])
                  )
              }
    );

    // get user
    const { data } = useQuery({
        queryKey: ['user', id],
        queryFn: () => getUser(id),
        enabled: !!id
    });
    let user = data?.data?.data?.data;

    // fill form with data: user
    useEffect(() => {
        if (id && user) {
            reset({
                ...user
            });
        }
    }, [id, user, reset]);

    // handle form
    const mutation = useMutation({
        mutationFn: (body) => {
            if (id) {
                return editUser(id, body);
            } else {
                return createUser(body);
            }
        },
        onSuccess: () => {
            showNotification(
                'success',
                'Thành công!',
                id
                    ? 'Cập nhật Người dùng thành công!'
                    : 'Tạo mới Người dùng thành công!'
            );

            queryClient.invalidateQueries(['user', id]);
            modalClose();
        },
        onError: (error) => {
            console.log(error);

            const errorCode = error.response?.data?.error?.code;

            if (errorCode === 11000) {
                setError('errorEmail', {
                    type: 'server',
                    message: 'Email đã tồn tại!'
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
                                label={<>Tên người dùng</>}
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
                                errorMessage={
                                    errors.email?.message ||
                                    errors.errorEmail?.message
                                }
                            />
                        </div>
                    </div>

                    {!id && (
                        <div className='row gx-4'>
                            <div className='col-6'>
                                <FormGroup
                                    type='password'
                                    name='password'
                                    label='Mật khẩu'
                                    placeHolder='Nhập mật khẩu'
                                    register={register}
                                    errorMessage={errors.password?.message}
                                />
                            </div>

                            <div className='col-6'>
                                <FormGroup
                                    type='password'
                                    name='passwordConfirm'
                                    label='Xác nhận mật khẩu'
                                    placeHolder='Nhập lại mật khẩu'
                                    register={register}
                                    errorMessage={
                                        errors.passwordConfirm?.message
                                    }
                                />
                            </div>
                        </div>
                    )}

                    <div className='row gx-4'>
                        <div className='col-6'>
                            <div className='form__col'>
                                <label className='form__label'>Role</label>
                                <Controller
                                    name='role'
                                    control={control}
                                    register={register}
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                className='form__select'
                                                placeholder='Chọn role'
                                                value={field.value}
                                                defaultValue={{
                                                    value: 'user',
                                                    label: 'User'
                                                }}
                                                onChange={(value) =>
                                                    field.onChange(value)
                                                }
                                                options={[
                                                    {
                                                        value: 'user',
                                                        label: 'User'
                                                    },
                                                    {
                                                        value: 'doctor',
                                                        label: 'Doctor'
                                                    },
                                                    {
                                                        value: 'admin',
                                                        label: 'Admin'
                                                    }
                                                ]}
                                            />
                                            {errors?.role ? (
                                                <p className='form-group__error'>
                                                    {errors.role?.message}
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

export default UserModal;
