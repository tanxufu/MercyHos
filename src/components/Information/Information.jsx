import { useEffect, useState, useCallback } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    notification,
    Radio,
    Select
} from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { occupations } from '../../utils/occupations';
import { ethnicities } from '../../utils/ethnicities';
import { FormOutlined, HomeOutlined } from '@ant-design/icons';
import Bread from '../Breadcrumb/Breadcrumb';
import schema from '../../utils/rules';
import {
    fetchProvinces,
    fetchDistricts,
    fetchWards
} from '../../services/locationApi';
import { useNavigate } from 'react-router-dom';
import { createPatient } from '../../apis/createUser.api';

function Information() {
    const navigate = useNavigate(); // Để chuyển trang sau khi tạo mới
    const [activeTab, setActiveTab] = useState('oldPatient');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        defaultValues: {
            idCard: '',
            ethnicity: ''
            // Có thể thêm các giá trị mặc định khác
        }
    });
    const watchProvince = watch('province');
    const watchDistrict = watch('district');
    // Lấy danh sách tỉnh/thành phố
    useEffect(() => {
        const getProvinces = async () => {
            try {
                const data = await fetchProvinces();
                setProvinces(data);
            } catch (error) {
                notification.error({
                    message: 'Lỗi',
                    description: error.message
                });
            }
        };
        getProvinces();
    }, []);

    // Lấy danh sách quận/huyện khi chọn tỉnh/thành
    useEffect(() => {
        const getDistricts = async () => {
            try {
                const districtsData = await fetchDistricts(watchProvince);
                setDistricts(districtsData);
                setValue('district', '');
                setValue('ward', '');
                setWards([]);
            } catch (error) {
                notification.error({
                    message: 'Lỗi',
                    description: error.message
                });
            }
        };
        if (watchProvince) {
            getDistricts();
        }
    }, [watchProvince, setValue]);
    // Lấy danh sách phường/xã khi chọn quận/huyện
    useEffect(() => {
        const getWards = async () => {
            try {
                const wardsData = await fetchWards(watchDistrict);
                setWards(wardsData);
                setValue('ward', '');
            } catch (error) {
                notification.error({
                    message: 'Lỗi',
                    description: error.message
                });
            }
        };
        if (watchDistrict) {
            getWards();
        }
    }, [watchDistrict, setValue]);

    const handleCreateProfile = useCallback(
        async (formData) => {
            try {
                setIsSubmitting(true);

                // Format dữ liệu theo cấu trúc API
                const formattedData = {
                    name: formData.name,
                    // Xử lý ngày tháng đúng cách
                    dob: formData.dob
                        ? formData.dob.toISOString().split('T')[0]
                        : null, // Format: YYYY-MM-DD
                    phone: formData.phone,
                    gender: formData.gender,
                    occupation: formData.occupation,
                    email: formData.email,
                    province:
                        provinces.find((p) => p.code === formData.province)
                            ?.name || '',
                    district:
                        districts.find((d) => d.code === formData.district)
                            ?.name || '',
                    ward:
                        wards.find((w) => w.code === formData.ward)?.name || '',
                    address: formData.address || '',
                    idCard: formData.idCard || '',
                    ethnicity: formData.ethnicity || '',
                    status: 'active'
                };

                console.log('Sending data:', formattedData); // Log để debug

                const response = await createPatient(formattedData);

                if (response.status === 200 || response.status === 201) {
                    notification.success({
                        message: 'Thành công',
                        description: 'Tạo hồ sơ bệnh nhân thành công'
                    });
                    reset();
                    navigate('/profile');
                }
            } catch (error) {
                console.error('Error:', error);
                notification.error({
                    message: 'Lỗi',
                    description:
                        error.response?.data?.message ||
                        'Có lỗi xảy ra khi tạo hồ sơ bệnh nhân'
                });
            } finally {
                setIsSubmitting(false);
            }
        },
        [provinces, districts, wards, reset, navigate]
    );
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        reset();
    };

    const breadcrumbItems = [
        {
            href: '/',
            title: (
                <>
                    <HomeOutlined />
                    <span>Trang chủ</span>
                </>
            )
        },
        {
            title: (
                <>
                    <FormOutlined />
                    <span className='active'>Tạo hồ sơ</span>
                </>
            )
        }
    ];

    return (
        <div className='container'>
            <Bread items={breadcrumbItems} />
            <div className='infor'>
                <h1>Tạo mới hồ sơ</h1>
                <div className='tab'>
                    <button
                        className={activeTab === 'oldPatient' ? 'active' : ''}
                        onClick={() => handleTabChange('oldPatient')}
                    >
                        Đã từng khám
                    </button>
                    <button
                        className={activeTab === 'newPatient' ? 'active' : ''}
                        onClick={() => handleTabChange('newPatient')}
                    >
                        Chưa từng khám
                    </button>
                </div>

                {activeTab === 'oldPatient' && (
                    <div className='examined'>
                        <Form
                            labelCol={{
                                span: 14
                            }}
                            wrapperCol={{
                                span: 12
                            }}
                        >
                            <h3>NHẬP MÃ SỐ BỆNH NHÂN / MÃ SỐ BHYT</h3>
                            <Form.Item label='Mã thuộc cơ sở y tế*'>
                                <Select>
                                    <Select.Option value='demo'>
                                        Demo
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item label='Nhập mã bệnh nhân của cơ sở y tế trên*'>
                                <Input />
                            </Form.Item>
                            <Form.Item label='Tên bệnh nhân'>
                                <Input />
                            </Form.Item>
                        </Form>
                        <Button className='btn'>Tìm kiếm</Button>
                    </div>
                )}

                {activeTab === 'newPatient' && (
                    <div className='form'>
                        <Form
                            onFinish={handleSubmit((data) => {
                                console.log('Form submitted with data:', data);
                                handleCreateProfile(data);
                            })}
                            onFinishFailed={(errorInfo) => {
                                console.log(
                                    'Form validation failed:',
                                    errorInfo
                                );
                                notification.error({
                                    message: 'Lỗi',
                                    description:
                                        'Vui lòng kiểm tra lại thông tin'
                                });
                            }}
                        >
                            <h3>Nhập thông tin bệnh nhân*</h3>
                            <div className='form__inner row'>
                                <div className='form__left'>
                                    <Form.Item
                                        label='Họ và tên'
                                        validateStatus={
                                            errors.name ? 'error' : ''
                                        }
                                        help={errors.name?.message}
                                    >
                                        <Controller
                                            name='name'
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Số điện thoại'
                                        validateStatus={
                                            errors.phone ? 'error' : ''
                                        }
                                        help={errors.phone?.message}
                                    >
                                        <Controller
                                            name='phone'
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    addonBefore='+84'
                                                    placeholder='Nhập số điện thoại'
                                                    onChange={(e) => {
                                                        // Chỉ cho phép nhập số
                                                        let phoneValue =
                                                            e.target.value.replace(
                                                                /\D/g,
                                                                ''
                                                            );

                                                        // Xử lý số 0 ở đầu
                                                        if (
                                                            phoneValue.startsWith(
                                                                '0'
                                                            )
                                                        ) {
                                                            phoneValue =
                                                                phoneValue.slice(
                                                                    1
                                                                ); // Bỏ số 0
                                                            if (
                                                                phoneValue.length >
                                                                0
                                                            ) {
                                                                phoneValue =
                                                                    '84' +
                                                                    phoneValue;
                                                            }
                                                        }
                                                        // Nếu không có 84 ở đầu và không rỗng, thêm 84
                                                        else if (
                                                            !phoneValue.startsWith(
                                                                '84'
                                                            ) &&
                                                            phoneValue.length >
                                                                0
                                                        ) {
                                                            phoneValue =
                                                                '84' +
                                                                phoneValue;
                                                        }

                                                        // Giới hạn độ dài
                                                        const maxLength =
                                                            phoneValue.startsWith(
                                                                '84'
                                                            )
                                                                ? 11
                                                                : 10;
                                                        phoneValue =
                                                            phoneValue.slice(
                                                                0,
                                                                maxLength
                                                            );

                                                        field.onChange(
                                                            phoneValue
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Nghề nghiệp'
                                        validateStatus={
                                            errors.occupation ? 'error' : ''
                                        }
                                        help={errors.occupation?.message}
                                    >
                                        <Controller
                                            name='occupation'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    placeholder='Chọn nghề nghiệp'
                                                >
                                                    {occupations.map(
                                                        (occupation) => (
                                                            <Select.Option
                                                                key={
                                                                    occupation.id
                                                                }
                                                                value={
                                                                    occupation.id
                                                                }
                                                            >
                                                                {
                                                                    occupation.name
                                                                }
                                                            </Select.Option>
                                                        )
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Địa chỉ Email'
                                        validateStatus={
                                            errors.email ? 'error' : ''
                                        }
                                        help={errors.email?.message}
                                    >
                                        <Controller
                                            name='email'
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Tỉnh/Thành'
                                        validateStatus={
                                            errors.province ? 'error' : ''
                                        }
                                        help={errors.province?.message}
                                    >
                                        <Controller
                                            name='province'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    placeholder='Chọn Tỉnh/Thành phố'
                                                >
                                                    {provinces.map(
                                                        (province) => (
                                                            <Select.Option
                                                                key={
                                                                    province.code
                                                                }
                                                                value={
                                                                    province.code
                                                                }
                                                            >
                                                                {province.name}
                                                            </Select.Option>
                                                        )
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Phường/Xã'
                                        validateStatus={
                                            errors.ward ? 'error' : ''
                                        }
                                        help={errors.ward?.message}
                                    >
                                        <Controller
                                            name='ward'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    disabled={
                                                        !watch('district')
                                                    }
                                                    placeholder='Chọn Phường/Xã'
                                                >
                                                    {wards.map((ward) => (
                                                        <Select.Option
                                                            key={ward.code}
                                                            value={ward.code}
                                                        >
                                                            {ward.name}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>
                                </div>
                                <div className='form__right'>
                                    <Form.Item
                                        label='Ngày sinh'
                                        validateStatus={
                                            errors.dob ? 'error' : ''
                                        }
                                        help={errors.dob?.message}
                                    >
                                        <Controller
                                            name='dob'
                                            control={control}
                                            render={({ field }) => (
                                                <DatePicker
                                                    {...field}
                                                    style={{ width: '100%' }}
                                                    format='DD/MM/YYYY'
                                                />
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Giới tính'
                                        validateStatus={
                                            errors.gender ? 'error' : ''
                                        }
                                        help={errors.gender?.message}
                                    >
                                        <Controller
                                            name='gender'
                                            control={control}
                                            render={({ field }) => (
                                                <Radio.Group
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <Radio value='Nam'>
                                                        {' '}
                                                        Nam{' '}
                                                    </Radio>
                                                    <Radio value='Nữ'>
                                                        {' '}
                                                        Nữ{' '}
                                                    </Radio>
                                                    <Radio value='Khác'>
                                                        {' '}
                                                        Khác{' '}
                                                    </Radio>
                                                </Radio.Group>
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Số CCCD/Passport'
                                        validateStatus={
                                            errors.idCard ? 'error' : ''
                                        }
                                        help={errors.idCard?.message}
                                    >
                                        <Controller
                                            name='idCard'
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Dân tộc'
                                        validateStatus={
                                            errors.ethnicity ? 'error' : ''
                                        }
                                        help={errors.ethnicity?.message}
                                    >
                                        <Controller
                                            name='ethnicity'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    placeholder='Chọn Dân tộc'
                                                >
                                                    {ethnicities.map(
                                                        (ethnicity) => (
                                                            <Select.Option
                                                                key={
                                                                    ethnicity.id
                                                                }
                                                                value={
                                                                    ethnicity.id
                                                                }
                                                            >
                                                                {ethnicity.name}
                                                            </Select.Option>
                                                        )
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Quận/Huyện'
                                        validateStatus={
                                            errors.district ? 'error' : ''
                                        }
                                        help={errors.district?.message}
                                    >
                                        <Controller
                                            name='district'
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    {...field}
                                                    onChange={(value) =>
                                                        field.onChange(value)
                                                    }
                                                    disabled={
                                                        !watch('province')
                                                    }
                                                    placeholder='Chọn Quận/Huyện'
                                                >
                                                    {districts.map(
                                                        (district) => (
                                                            <Select.Option
                                                                key={
                                                                    district.code
                                                                }
                                                                value={
                                                                    district.code
                                                                }
                                                            >
                                                                {district.name}
                                                            </Select.Option>
                                                        )
                                                    )}
                                                </Select>
                                            )}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label='Địa chỉ hiện tại'
                                        validateStatus={
                                            errors.address ? 'error' : ''
                                        }
                                        help={errors.address?.message}
                                    >
                                        <Controller
                                            name='address'
                                            control={control}
                                            render={({ field }) => (
                                                <Input {...field} />
                                            )}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className='form__button'>
                                <Button
                                    style={{
                                        backgroundColor: '#faad14',
                                        color: 'white',
                                        fontSize: '18px'
                                    }}
                                    onClick={() => reset()}
                                    disabled={isSubmitting}
                                >
                                    Nhập lại
                                </Button>
                                <Button
                                    style={{ fontSize: '18px' }}
                                    type='primary'
                                    htmlType='submit'
                                    loading={isSubmitting}
                                >
                                    {isSubmitting ? 'Đang xử lý...' : 'Tạo mới'}
                                </Button>
                            </div>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Information;
