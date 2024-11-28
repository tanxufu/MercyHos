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
import InfoModal from '../InfoModal';
import DoctorModal from '../DoctorModal';
import DeleteModal from '../DeleteModal';

function DoctorManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalData, setModalData] = useState(null);
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    const { data, isPending, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: () => getAllDoctors()
    });

    let doctors = data?.data?.data?.data || [];
    doctors = doctors.map((doctor, index) => ({
        ...doctor,
        key: index,
        dob: dayjs(doctor?.dob).format('DD-MM-YYYY'),
        created_at: dayjs(doctor?.create_at).format('DD-MM-YYYY HH:mm'),
        gender: doctor?.gender === 'male' ? 'Nam' : 'Nữ',
        active: doctor?.active === false ? 'OFF' : 'ON'
    }));

    useEffect(() => {
        setFilteredData(doctors);
    }, [data]);

    // handle table change
    const handleTableChange = (pagination, filters, sorter) => {
        if (!doctors) return;
        let filtered = doctors;

        setSortedInfo({ order: sorter.order, columnKey: sorter.field });

        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                filtered = filtered.filter((item) =>
                    filters[key].includes(item[key])
                );
            }
        });

        if (searchQuery) {
            filtered = filtered.filter(
                (doctor) =>
                    doctor.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    doctor.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    // handle search
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        const filtered = doctors?.filter(
            (doctor) =>
                doctor.name.toLowerCase().includes(value.toLowerCase()) ||
                doctor.email.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const handleModal = (modal, id) => {
        setModalData({ modal, id });
    };

    const columns = [
        {
            title: 'Tên Bác Sĩ',
            dataIndex: 'name'
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            sorter: (a, b) =>
                dayjs(a.dob, 'DD-MM-YYYY').unix() -
                dayjs(b.dob, 'DD-MM-YYYY').unix(),
            sortOrder: sortedInfo.columnKey === 'dob' ? sortedInfo.order : null
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            filters: [
                { text: 'Nam', value: 'Nam' },
                { text: 'Nữ', value: 'Nữ' }
            ],
            onFilter: (value, record) => record?.gender.includes(value)
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
            onFilter: (value, record) => record?.specialty.includes(value)
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
            onFilter: (value, record) => record?.active.includes(value)
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            sorter: (a, b) =>
                dayjs(a.created_at, 'DD-MM-YYYY HH:mm').unix() -
                dayjs(b.created_at, 'DD-MM-YYYY HH:mm').unix(),
            sortOrder:
                sortedInfo.columnKey === 'created_at' ? sortedInfo.order : null
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        className='management__actions-btn'
                        onClick={() => handleModal('doctorInfo', record?.id)}
                    >
                        <EyeOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn'
                        onClick={() => handleModal('doctorModal', record?.id)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn management__actions-btn--delete'
                        onClick={() => handleModal('doctorDelete', record?.id)}
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
                <Button
                    className='management__refetch'
                    onClick={() => {
                        refetch();
                        setSearchQuery('');
                    }}
                >
                    <img src={refreshIcon} alt='' />
                </Button>

                <div className='search-group management__search'>
                    <img src={searchIcon} alt='search-icon' />
                    <input
                        type='text'
                        placeholder='Tìm nhanh bác sĩ'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <Button
                    className='management__add'
                    onClick={() => handleModal('doctorModal')}
                >
                    <img src={addUserIcon} alt='' />
                    Thêm Bác Sĩ
                </Button>
            </div>

            <Table
                className='management__table'
                // rowSelection={rowSelection}
                loading={isPending}
                columns={columns}
                dataSource={filteredData}
                onChange={handleTableChange}
                pagination={{
                    total: filteredData?.length,
                    pageSize: 10,
                    hideOnSinglePage: true
                }}
            />

            {modalData?.modal === 'doctorInfo' && (
                <InfoModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'doctorModal' && (
                <DoctorModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'doctorDelete' && (
                <DeleteModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}
        </div>
    );
}

export default DoctorManagement;
