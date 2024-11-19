/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormGroup from '../FormGroup';
import schema from '../../utils/rules';
import Button from '../Button';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    getCurrentUser,
    updateCurrentUser,
    updateCurrentUserPassword
} from '../../apis/user.api';
import { setUserToLS } from '../../utils/auth';
import { showNotification } from '../../utils/notification';

function AccountModal({ modal, modalClose }) {
    const getUserSchema = (modal) => {
        switch (modal) {
            case 'name':
                return schema.pick(['name']);
            case 'email':
                return schema.pick(['email']);
            case 'password':
                return schema.pick([
                    'password',
                    'passwordConfirm',
                    'passwordCurrent'
                ]);
            default:
                return schema.pick([
                    'name',
                    'email',
                    'password',
                    'passwordConfirm',
                    'passwordCurrent'
                ]);
        }
    };
    const queryClient = useQueryClient();

    const {
        register,
        reset,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({ resolver: yupResolver(getUserSchema(modal)) });

    // get user
    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: () => getCurrentUser(),
        enabled: !!modal
    });
    const user = data?.data?.data?.data;
    // console.log(user);

    // fill data
    useEffect(() => {
        if (user) {
            reset({
                name: user.name,
                email: user.email
            });
        }
    }, [modal, reset, user]);

    // handle submit
    const updateCurrentUserMutation = useMutation({
        mutationFn: (body) => {
            if (modal === 'password') {
                return updateCurrentUserPassword(body);
            } else {
                return updateCurrentUser(body);
            }
        },
        onSuccess: (data) => {
            setUserToLS(data.data.data.user);

            showNotification(
                'success',
                'Thành công!',
                'Bạn đã cập nhật thông tin người dùng thành công!'
            );

            setTimeout(() => {
                queryClient.invalidateQueries(['user']);

                modalClose();
            }, 300);
        },
        onError: (error) => {
            console.log(error);
            const errorCode = error?.response?.data?.error?.code;
            const errorMessage = error?.response?.data?.message;

            if (errorCode === 11000) {
                setError('errorEmail', {
                    type: 'server',
                    message: 'Email đăng ký đã tồn tại!'
                });
            } else if (errorMessage === 'Mật khẩu hiện tại không đúng!') {
                setError('errorPassword', {
                    type: 'server',
                    message: errorMessage
                });
            } else {
                showNotification(
                    'error',
                    'Lỗi Server!',
                    'Cập nhật thất bại. Vui lòng thử lại sau!'
                );
            }
        }
    });

    const onSubmit = handleSubmit((data) => {
        updateCurrentUserMutation.mutate(data);
    });

    return (
        <div className={`account-modal ${modal ? 'account-modal__show' : ''}`}>
            <form className='account-modal-content' onSubmit={onSubmit}>
                <FormGroup
                    type={`${modal !== 'name' ? 'hide' : 'text'}`}
                    name='name'
                    label='Cập nhập Tên người dùng'
                    register={register}
                    errorMessage={errors.name?.message}
                />

                <FormGroup
                    type={`${modal !== 'email' ? 'hide' : 'text'}`}
                    name='email'
                    label='Cập nhập Địa chỉ Email'
                    register={register}
                    errorMessage={
                        errors.email?.message || errors?.errorEmail?.message
                    }
                />

                <FormGroup
                    type={`${modal !== 'password' ? 'hide' : 'password'}`}
                    name='passwordCurrent'
                    label='Mật khẩu hiện tại'
                    placeHolder='Nhập mật khẩu hiện tại của bạn'
                    register={register}
                    errorMessage={
                        errors.passwordCurrent?.message ||
                        errors?.errorPassword?.message
                    }
                />

                <FormGroup
                    type={`${modal !== 'password' ? 'hide' : 'password'}`}
                    name='password'
                    label='Mật khẩu mới'
                    placeHolder='Nhập mật khẩu mới của bạn'
                    register={register}
                    errorMessage={errors.password?.message}
                />

                <FormGroup
                    type={`${modal !== 'password' ? 'hide' : 'password'}`}
                    name='passwordConfirm'
                    label='Xác nhận mật khẩu mới'
                    placeHolder='Nhập lại mật khẩu mới của bạn'
                    register={register}
                    errorMessage={errors.passwordConfirm?.message}
                />

                <div className='account-modal-content__act'>
                    <Button
                        className='account-modal-content__cancel'
                        onClick={() => modalClose()}
                    >
                        Huỷ
                    </Button>
                    <Button
                        className='account-modal-content__update'
                        type='submit'
                    >
                        Cập nhật
                    </Button>
                </div>
            </form>

            <div
                className='account-modal-overlay'
                onClick={() => modalClose()}
            ></div>
        </div>
    );
}

export default AccountModal;
