import { Link } from 'react-router-dom';
import schema from '../../utils/rules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormGroup from '../../components/FormGroup';
import RegisterLayoutLogo from '../../components/RegisterLayoutLogo';
import { useMutation } from '@tanstack/react-query';
import { loginAccount } from '../../apis/auth.api';
import { notification } from 'antd';
import { showNotification } from '../../utils/notification';
import Button from '../../components/Button';

const loginSchema = schema.pick(['email', 'password']);

function Login() {
    const [api, contextHolder] = notification.useNotification();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({ resolver: yupResolver(loginSchema) });

    const loginAccountMutation = useMutation({
        mutationFn: (body) => loginAccount(body)
    });

    const onSubmit = handleSubmit((data) => {
        loginAccountMutation.mutate(data, {
            onSuccess: () => {
                showNotification(
                    api,
                    'success',
                    'Thành công!',
                    'Đăng nhập thành công!'
                );
            },
            onError: (error) => {
                const errorMessage =
                    error.response?.data?.message ||
                    'Đăng nhập thất bại! Vui lòng thử lại sau!';

                if (errorMessage.includes('không đúng')) {
                    setError('errorLogin', {
                        type: 'server',
                        message: errorMessage
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
        <div className='login'>
            {contextHolder}
            <RegisterLayoutLogo />

            <form className='login-form' noValidate onSubmit={onSubmit}>
                <h1 className='login-form__title'>Đăng Nhập</h1>
                <p className='login-form__label'>Chúc bạn luôn khỏe mạnh!</p>

                <FormGroup
                    name='email'
                    type='text'
                    label='Địa chỉ Email'
                    placeHolder='Nhập địa chỉ Email'
                    register={register}
                    errorMessage={errors.email?.message}
                />

                <FormGroup
                    name='password'
                    type='password'
                    label='Mật khẩu'
                    placeHolder='Nhập mật khẩu'
                    register={register}
                    errorMessage={
                        errors.password?.message || errors.errorLogin?.message
                    }
                />

                <Link to='/forgotPassword' className='login__forgot-pass'>
                    Quên mật khẩu?
                </Link>

                <Button
                    className='login-form__btn'
                    isLoading={loginAccountMutation.isPending}
                    disabled={loginAccountMutation.isPending}
                >
                    {loginAccountMutation.isPending
                        ? 'Đang xử lý'
                        : 'Đăng nhập'}
                </Button>
            </form>

            <p className='login__no-account'>
                Bạn chưa có tài khoản? Vui lòng tạo{' '}
                <Link to='/register' className='login__no-account--register'>
                    tại đây
                </Link>
            </p>
        </div>
    );
}

export default Login;
