import { Link } from 'react-router-dom';
import schema from '../../utils/rules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { notification } from 'antd';
import { showNotification } from '../../utils/notification';

import RegisterLayoutLogo from '../../components/RegisterLayoutLogo/RegisterLayoutLogo';
import FormGroup from '../../components/FormGroup';
import { registerAccount } from '../../apis/auth.api';
import Button from '../../components/Button';

const registerSchema = schema.pick([
    'name',
    'email',
    'password',
    'passwordConfirm'
]);

function Register() {
    const [api, contextHolder] = notification.useNotification();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({ resolver: yupResolver(registerSchema) });

    const registerAccountMutation = useMutation({
        mutationFn: (body) => registerAccount(body)
    });

    const onSubmit = handleSubmit((data) => {
        registerAccountMutation.mutate(data, {
            onSuccess: () => {
                showNotification(
                    api,
                    'success',
                    'Thành công!',
                    'Tạo tài khoản thành công!'
                );
            },
            onError: (error) => {
                console.log(error);
                const errorMessage =
                    error.response?.data?.message ||
                    'Đăng ký thất bại! Vui lòng thử lại sau!';

                if (errorMessage.includes('Đã tồn tại!')) {
                    setError('errorEmail', {
                        type: 'server',
                        message: 'Email đăng ký đã tồn tại!'
                    });
                } else {
                    return showNotification(
                        api,
                        'error',
                        'Lỗi Server!',
                        errorMessage
                    );
                }
            }
        });
    });

    return (
        <div className='register'>
            {contextHolder}
            <RegisterLayoutLogo />

            <form className='register-form' onSubmit={onSubmit} noValidate>
                <h1 className='register-form__title'>Tạo Tài Khoản</h1>
                <p className='register-form__label'>
                    Chúng tôi ở đây để giúp bạn!
                </p>
                <FormGroup
                    name='name'
                    type='text'
                    label='Tên người dùng'
                    placeHolder='Nhập tên người dùng'
                    register={register}
                    errorMessage={errors.name?.message}
                />

                <FormGroup
                    name='email'
                    type='text'
                    label='Địa chỉ Email'
                    placeHolder='Nhập địa chỉ Email'
                    register={register}
                    errorMessage={
                        errors.email?.message || errors.errorEmail?.message
                    }
                />

                <FormGroup
                    name='password'
                    type='password'
                    label='Mật khẩu'
                    placeHolder='Nhập mật khẩu'
                    register={register}
                    errorMessage={errors.password?.message}
                />

                <FormGroup
                    name='passwordConfirm'
                    type='password'
                    label='Xác nhận mật khẩu'
                    placeHolder='Nhập lại mật khẩu'
                    register={register}
                    errorMessage={errors.passwordConfirm?.message}
                />

                <Button
                    className='register-form__btn'
                    isLoading={registerAccountMutation.isPending}
                    disabled={registerAccountMutation.isPending}
                >
                    {registerAccountMutation.isPending
                        ? 'Đang xử lý'
                        : 'Tạo tài khoản'}
                </Button>
            </form>

            <p className='register__has-account'>
                Bạn đã có tài khoản? Vui lòng đăng nhập{' '}
                <Link to='/login' className='register__has-account--login'>
                    tại đây
                </Link>
            </p>
        </div>
    );
}

export default Register;
