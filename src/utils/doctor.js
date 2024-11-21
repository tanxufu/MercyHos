import * as yup from 'yup';

const doctorSchema = yup.object({
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
    specialty: yup.string().required('Vui lòng nhập Chuyên môn(khoa)!'),
    experience: yup
        .number()
        .required('Vui lòng chọn năm kinh nghiệm!')
        .min(0, 'Năm kinh nghiệm phải lớn hơn 0'),
    fee: yup.number().required('Vui lòng nhập phí khám bệnh!'),
    availability: yup.array().required('Vui lòng chọn ngày làm việc!'),
    owner: yup.string().required('Vui lòng chọn tài khoản sử dụng!')
});

export default doctorSchema;
