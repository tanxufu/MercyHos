import { useQuery } from '@tanstack/react-query';
import { Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import Button from '../Button';
import addUserIcon from '../../assets/icons/create-patient.svg';
import searchIcon from '../../assets/icons/search.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import { getAllDoctors } from '../../apis/doctor.api';
import { useEffect, useState } from 'react';

function DoctorManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const { data, isPending, refetch } = useQuery({
        queryKey: ['doctors', debouncedSearchQuery],
        queryFn: () => getAllDoctors(debouncedSearchQuery || '')
    });

    let doctors = data?.data?.data?.data || [];
    doctors = doctors.map((doctor, index) => ({
        ...doctor,
        key: index,
        dob: dayjs(doctor?.dob).format('DD/MM/YYYY'),
        created_at: dayjs(doctor?.created_at).format('DD/MM/YYYY HH:mm'),
        gender: doctor?.gender === 'male' ? 'Nam' : 'Nữ',
        active: doctor?.active === 'false' ? 'OFF' : 'ON'
    }));

    const columns = [
        {
            title: 'Tên Bác Sĩ',
            dataIndex: 'name'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob'
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            filters: [
                { text: 'Nam', value: 'Nam' },
                { text: 'Nữ', value: 'Nữ' }
            ],
            onFilter: (value, record) => record.gender.includes(value)
        },
        {
            title: 'Chuyên khoa',
            dataIndex: 'specialty',
            filters: [
                {
                    text: 'Khoa phụ khoa, khám thai',
                    value: 'Khoa phụ khoa, khám thai'
                },
                { text: 'Khám nhi', value: 'Khám nhi' },
                { text: 'Khám da liệu', value: 'Khám da liệu' },
                {
                    text: 'Khoa nội soi tai mũi họng',
                    value: 'Khoa nội soi tai mũi họng'
                },
                {
                    text: 'Khoa điều trị vết thương',
                    value: 'Khoa điều trị vết thương'
                },
                { text: 'Khám mắt', value: 'Khám mắt' },
                {
                    text: 'Khám chức năng hô hấp',
                    value: 'Khám chức năng hô hấp'
                },
                {
                    text: 'Khoa Hậu Môn-Trực Tràng',
                    value: 'Khoa Hậu Môn-Trực Tràng'
                },
                { text: 'Khoa tiết niệu', value: 'Khoa tiết niệu"' },
                { text: 'Khoa nội tiết', value: 'Khoa nội tiết' }
            ],
            onFilter: (value, record) => record.specialty.includes(value)
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            render: (active) => {
                return active === 'OFF' ? (
                    <Tag color={'volcano'} key={active}>
                        {active}
                    </Tag>
                ) : (
                    <Tag color={'green'} key={active}>
                        {active}
                    </Tag>
                );
            },
            filters: [
                { text: 'ON', value: 'ON' },
                { text: 'OFF', value: 'OFF' }
            ],
            onFilter: (value, record) => record.active.includes(value)
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        className='management__actions-btn'
                        // onClick={() => showViewModal(record)}
                    >
                        <EyeOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn'
                        // onClick={() => showEditModal(record)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn management__actions-btn--delete'
                        // onClick={() => showEditModal(record)}
                        onClick={() => {
                            console.log(record.id);
                        }}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className='doctor-management'>
            <div className='management__act'>
                <Button className='management__refetch' onClick={refetch}>
                    <img src={refreshIcon} alt='' />
                </Button>

                <div className='search-group management__search'>
                    <img src={searchIcon} alt='search-icon' />
                    <input
                        type='text'
                        placeholder='Tìm nhanh bác sĩ'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Button className='management__add'>
                    <img src={addUserIcon} alt='' />
                    Thêm Bác Sĩ
                </Button>
            </div>

            <Table
                className='management__table'
                // rowSelection={rowSelection}
                loading={isPending}
                columns={columns}
                dataSource={doctors}
                pagination={{
                    total: doctors?.length,
                    pageSize: 10,
                    hideOnSinglePage: true
                }}
            />
        </div>
    );
}

export default DoctorManagement;
