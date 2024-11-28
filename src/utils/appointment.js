import * as yup from 'yup';

const appointmentSchema = yup.object({
    dateVisit: yup.date().required('Vui lòng chọn ngày khám!'),
    timeVisit: yup.string().required('Vui lòng chọn giờ khám!'),
    patient: yup.string().required('Vui lòng chọn hồ sơ bệnh!'),
    doctor: yup.string().required('Vui lòng chọn bác sĩ khám!'),
    visitStatus: yup.string().required('Vui lòng chọn trạng thái lịch khám!'),
    feeStatus: yup.string().required('Vui lòng chọn trạng thái thanh toán!')
});

export default appointmentSchema;
