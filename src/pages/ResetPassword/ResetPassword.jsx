import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import FormGroup from '../../components/FormGroup';
import RegisterLayoutLogo from '../../components/RegisterLayoutLogo';
import schema from '../../utils/rules';
import Button from '../../components/Button';
import { resetPassword } from '../../apis/auth.api';
import { useQueryString } from '../../utils/utils';
import { showNotification } from '../../utils/notification';

const resetPasswordSchema = schema.pick(['password', 'passwordConfirm']);

function ResetPassword() {
    const queryString = useQueryString();
    const resetToken = queryString.token;

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(resetPasswordSchema) });

    const ResetPasswordMutation = useMutation({
        mutationFn: (body) => resetPassword(resetToken, body)
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data);
        ResetPasswordMutation.mutate(data, {
            onSuccess: () => {
                showNotification(
                    'success',
                    'Thành công!',
                    'Mật khẩu đã được đặt lại thành công!'
                );
            },
            onError: (error) => {
                const errorMessage =
                    error.response?.data?.message ||
                    'Có lỗi xảy ra! Vui lòng thử lại sau!';

                return showNotification('error', 'Lỗi Server!', errorMessage);
            }
        });
    });

    return (
        <div className='resetpass'>
            <RegisterLayoutLogo />

            <form className='resetpass-form' noValidate onSubmit={onSubmit}>
                <h1 className='resetpass-form__title'>Đặt Lại Mật Khẩu</h1>
                <p className='resetpass-form__label'>
                    Nhập và xác nhận để tạo mật khẩu mới
                </p>

                <FormGroup
                    name='password'
                    type='password'
                    label='Mật khẩu mới'
                    placeHolder='Nhập mật khẩu mới'
                    register={register}
                    errorMessage={
                        errors.password?.message || errors.errorLogin?.message
                    }
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
                    className='login-form__btn'
                    isLoading={ResetPasswordMutation.isPending}
                    disabled={ResetPasswordMutation.isPending}
                >
                    {ResetPasswordMutation.isPending
                        ? 'Đang xử lý'
                        : 'Đặt lại mật khẩu'}
                </Button>
            </form>
        </div>
    );
}

export default ResetPassword;
