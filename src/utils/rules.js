import * as yup from 'yup';

const schema = yup.object({
    // Các trường bắt buộc cho hồ sơ bệnh nhân
    name: yup
        .string()
        .required('Vui lòng nhập tên!')
        .max(64, 'Vui lòng nhập tối đa 64 ký tự!'),
    
    phone: yup
        .string()
        .required('Vui lòng nhập số điện thoại!')
        .matches(
            /^(84|0[3|5|7|8|9])([0-9]{8})$/,
            'Vui lòng nhập số điện thoại hợp lệ!'
        ),

    email: yup
        .string()
        .required('Vui lòng nhập địa chỉ Email!')
        .matches(
            /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            'Vui lòng nhập Email hợp lệ!'
        ),

    dob: yup
        .date()
        .required('Vui lòng nhập ngày sinh!')
        .max(new Date(), 'Ngày sinh không thể lớn hơn ngày hiện tại!')
        .typeError('Vui lòng nhập đúng định dạng ngày!'),

    gender: yup
        .string()
        .required('Vui lòng chọn giới tính!')
        .oneOf(['Nam', 'Nữ', 'Khác'], 'Vui lòng chọn Nam, Nữ hoặc Khác!'),

    occupation: yup
        .string()
        .required('Vui lòng chọn nghề nghiệp!'),

    // Các trường địa chỉ
    province: yup
        .string()
        .required('Vui lòng chọn Tỉnh/Thành phố!'),

    district: yup
        .string()
        .required('Vui lòng chọn Quận/Huyện!'),

    ward: yup
        .string()
        .required('Vui lòng chọn Phường/Xã!'),

    address: yup
        .string()
        .required('Vui lòng nhập địa chỉ!'),

    // Các trường không bắt buộc
    idCard: yup
        .string()
        .nullable()
        .matches(
            /^(?:\d{9}|\d{12})$/,
            'CCCD/CMND phải có 9 hoặc 12 số!'
        )
        .default(''),

    ethnicity: yup
        .string()
        .nullable()
        .default(''),

    // Bỏ các trường không cần thiết cho form tạo hồ sơ
    // password và passwordConfirm không cần thiết ở đây
});

export default schema;