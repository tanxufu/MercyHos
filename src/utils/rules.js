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
        .oneOf([yup.ref('password')], 'Vui lòng nhập đúng mật khẩu!'),
    dob: yup.date().required('Vui lòng nhập ngày sinh!'),
    phone: yup
        .string()
        .required('Vui lòng nhập số điện thoại!')
        .matches(
            /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            'Vui lòng nhập số điện thoại hợp lệ!'
        ),
    gender: yup
        .string()
        .required('Vui lòng chọn giới tính!')
        .oneOf(['Nam', 'Nữ', 'Khác'], `Vui lòng nhập 'Nam'  'Nữ' hoặc 'Khác'!`),
    occupation: yup.string().required('Vui lòng nhập nghề nghiệp!'),
    idCard: yup.string().default(''),
    ethnicity: yup.string().default(''),
    province: yup.string().required('Vui lòng nhập Tỉnh/Thành phố!'),
    district: yup.string().required('Vui lòng nhập Quận/Huyện!'),
    ward: yup.string().required('Vui lòng nhập Phường/Xã!'),
    address: yup.string().required('Vui lòng nhập địa chỉ!')
});

export default schema;
