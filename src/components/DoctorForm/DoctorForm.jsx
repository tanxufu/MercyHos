import { Form, Input, InputNumber, Select, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createDoctor, updateDoctor } from '../../apis/doctor.api';
import PropTypes from 'prop-types';

const { Option } = Select;
function DoctorForm({ doctor = null }) {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        try {
            if (doctor) {
                await updateDoctor(doctor.id, values);
            } else {
                await createDoctor(values);
            }
            navigate('/admin/doctors');
        } catch (error) {
            console.error('Error saving doctor:', error);
        }
    };
    return (
        <Form form={form} onFinish={onFinish} initialValues={doctor}>
            <Form.Item
                label='Name'
                name='name'
                rules={[
                    {
                        required: true,
                        message: "Please input the doctor's name!"
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Specialty'
                name='specialty'
                rules={[
                    {
                        required: true,
                        message: "Please select the doctor's specialty!"
                    }
                ]}
            >
                <Select>
                    <Option value='Cardiology'>Cardiology</Option>
                    <Option value='Pediatrics'>Pediatrics</Option>
                    <Option value='Oncology'>Oncology</Option>
                </Select>
            </Form.Item>
            <Form.Item
                label='Experience'
                name='experience'
                rules={[
                    {
                        required: true,
                        message: "Please input the doctor's experience!"
                    }
                ]}
            >
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    {doctor ? 'Update' : 'Create'}
                </Button>
            </Form.Item>
        </Form>
    );
}
DoctorForm.propTypes = {
    doctor: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      specialty: PropTypes.string,
      experience: PropTypes.number,
    }),
  };

export default DoctorForm;
