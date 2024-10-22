import * as yup from 'yup';

const schema = yup.object({
    name: yup
        .string()
        .required('Vui lòng nhập tên!')
        .max(64, 'Vui lòng nhập tối đa 64 ký tự!'),
    email: yup
        .string()
        .required('Vui lòng nhập địa chỉ Email!')
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            'Vui lòng nhập Email hợp lệ!'
        ),
    password: yup
        .string()
        .required('Vui lòng nhập mật khẩu!')
        .min(8, 'Vui lòng nhập tối thiểu 8 ký tự!'),
    passwordConfirm: yup
        .string()
        .required('Vui lòng nhập xác nhận mật khẩu!')
        .oneOf([yup.ref('password')], 'Vui lòng nhập đúng mật khẩu!')
});

export default schema;
