import { Button, DatePicker, Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { occupations } from '../../utils/occupations';
import { ethnicities } from '../../utils/ethnicities';
import axios from 'axios';

function Information() {
    const [activeTab, setActiveTab] = useState('oldPatient');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedOccupation, setSelectedOccupation] = useState(''); //  nghề nghiệp
    const [selectedEthnicity, setSelectedEthnicity] = useState(''); //  dân tộc
    // hàm xử lý  nghề nghiệp
    const handleOccupationChange = (value) => {
        setSelectedOccupation(value); // Cập nhật trạng thái nghề nghiệp
    };
    const handleEthnicityChange = (value) => {
        setSelectedEthnicity(value); // Cập nhật trạng thái nghề nghiệp
    };
    // Lấy danh sách tỉnh/thành phố khi component được mount
    useEffect(() => {
        axios
            .get('https://provinces.open-api.vn/api/p/')
            .then((response) => setProvinces(response.data))
            .catch((error) => console.error(error));
    }, []);

    // Lấy danh sách quận/huyện khi chọn tỉnh
    const handleProvinceChange = (provinceId) => {
        setSelectedProvince(provinceId);
        setSelectedDistrict(null);
        setWards([]); // Reset danh sách phường

        axios
            .get(`https://provinces.open-api.vn/api/p/${provinceId}?depth=2`)
            .then((response) => setDistricts(response.data.districts))
            .catch((error) => console.error(error));
    };
    // Lấy danh sách phường/xã khi chọn quận/huyện
    const handleDistrictChange = (districtId) => {
        setSelectedDistrict(districtId);

        axios
            .get(`https://provinces.open-api.vn/api/d/${districtId}?depth=2`)
            .then((response) => setWards(response.data.wards))
            .catch((error) => console.error(error));
    };
    // Hàm để thay đổi tab
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className='container'>
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
                            labelCol={{
                                span: 10
                            }}
                            wrapperCol={{
                                span: 14
                            }}
                            layout='horizontal'
                            style={{}}
                        >
                            <h3>Nhập thông tin bệnh nhân*</h3>
                            <div className='form__inner row'>
                                <div className='form__left'>
                                    <Form.Item label='Họ và tên'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label='Số điện thoại'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label='Nghề nghiệp'>
                                        <Select
                                            value={selectedOccupation}
                                            onChange={handleOccupationChange}
                                        >
                                            {occupations.map((occupation) => (
                                                <Select.Option
                                                    key={occupation.id}
                                                    value={occupation.id}
                                                >
                                                    {occupation.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label='Địa chỉ Email'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label='Tỉnh/Thành'>
                                        <Select onChange={handleProvinceChange}>
                                            {provinces.map((province) => (
                                                <Select.Option
                                                    key={province.code}
                                                    value={province.code}
                                                >
                                                    {province.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label='Phường/Xã'>
                                        <Select disabled={!selectedDistrict}>
                                            {wards.map((ward) => (
                                                <Select.Option
                                                    key={ward.code}
                                                    value={ward.code}
                                                >
                                                    {ward.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div className='form__right '>
                                    <Form.Item label='Ngày sinh'>
                                        <DatePicker />
                                    </Form.Item>
                                    <Form.Item label='Giới tính'>
                                        <Radio.Group>
                                            <Radio value='Nam'> Nam </Radio>
                                            <Radio value='Nu'> Nữ </Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item label='Số CCCD/Passport'>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label='Dân tộc'>
                                        <Select
                                            value={selectedEthnicity}
                                            onChange={handleEthnicityChange}
                                        >
                                            {ethnicities.map((ethnicities) => (
                                                <Select.Option
                                                    key={ethnicities.id}
                                                    value={ethnicities.id}
                                                >
                                                    {ethnicities.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label='Quận/Huyện'>
                                        <Select
                                            value={selectedDistrict}
                                            onChange={handleDistrictChange}
                                            disabled={!selectedProvince}
                                        >
                                            {districts.map((district) => (
                                                <Select.Option
                                                    key={district.code}
                                                    value={district.code}
                                                >
                                                    {district.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label='Địa chỉ hiện tại'>
                                        <Input />
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
                                >
                                    Nhập lại
                                </Button>
                                <Button
                                    style={{ fontSize: '18px' }}
                                    type='primary'
                                >
                                    Tạo mới
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
