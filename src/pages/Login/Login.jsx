import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';

import schema from '../../utils/rules';
import FormGroup from '../../components/FormGroup';
import RegisterLayoutLogo from '../../components/RegisterLayoutLogo';
import { loginAccount } from '../../apis/auth.api';
import { showNotification } from '../../utils/notification';
import Button from '../../components/Button';
import AppContext from '../../contexts/app.context';

const loginSchema = schema.pick(['email', 'password']);

function Login() {
    const { setIsAuthenticated, setUser } = useContext(AppContext);
    const navigate = useNavigate();

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
            onSuccess: (data) => {
                setIsAuthenticated(true);
                setUser(data.data.data.user);

                navigate('/');
                showNotification('success', 'Đăng nhập thành công!', '');
            },
            onError: (error) => {
                console.log(error);
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
