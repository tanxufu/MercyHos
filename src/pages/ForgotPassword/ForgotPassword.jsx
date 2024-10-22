import schema from '../../utils/rules';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import FormGroup from '../../components/FormGroup';
import RegisterLayoutLogo from '../../components/RegisterLayoutLogo';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../apis/auth.api';
import { showNotification } from '../../utils/notification';
import { notification } from 'antd';
import Button from '../../components/Button';

const forgotPasswordSchema = schema.pick(['email']);

function ForgotPassword() {
    const [api, contextHolder] = notification.useNotification();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: (body) => forgotPassword(body)
    });

    const onSubmit = handleSubmit((data) => {
        forgotPasswordMutation.mutate(data, {
            onSuccess: () => {
                showNotification(
                    api,
                    'success',
                    'Thành công!',
                    'Gửi liên kết thành công! Vui lòng kiểm tra Email để thực hiện thay đổi mật khẩu'
                );
            },
            onError: (error) => {
                const errorMessage =
                    error.response?.data?.message ||
                    'Gửi liên kết thất bại! Vui lòng thử lại sau!';

                if (error.response?.status === 404) {
                    setError('errorEmail', {
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
        <div className='forgotpass'>
            {contextHolder}
            <RegisterLayoutLogo />

            <form className='forgotpass-form' noValidate onSubmit={onSubmit}>
                <div className='forgotpass-form__top'>
                    <h1 className='forgotpass-form__title'>Quên Mật Khẩu?</h1>
                    <p className='forgotpass-form__label'>
                        Vui lòng nhập địa chỉ email của bạn để nhận liên kết tạo
                        lại mật khẩu.
                    </p>
                </div>

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

                <Button
                    className='forgotpass-form__btn'
                    isLoading={forgotPasswordMutation.isPending}
                    disabled={forgotPasswordMutation.isPending}
                >
                    {forgotPasswordMutation.isPending
                        ? 'Đang xử lý'
                        : 'Gửi liên kết'}
                </Button>
            </form>
        </div>
    );
}

export default ForgotPassword;
