import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';

import Button from '../Button';
import addUserIcon from '../../assets/icons/create-patient.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import searchIcon from '../../assets/icons/search.svg';
import { getAllPatients } from '../../apis/patient.api';
import InfoModal from '../InfoModal';
import PatientModal from '../PatientModal';
import DeleteModal from '../DeleteModal';

function PatientManagement() {
    const [modalData, setModalData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortedInfo, setSortedInfo] = useState({});

    const { data, isPending, refetch } = useQuery({
        queryKey: ['patients'],
        queryFn: () => getAllPatients()
    });
    let patients = data?.data?.data?.data || [];
    patients = patients.map((patient, index) => ({
        ...patient,
        createdAt: dayjs(patient?.createdAt).format('DD-MM-YYYY HH:mm'),
        dob: dayjs(patient?.dob).format('DD-MM-YYYY'),
        active: patient?.active === false ? 'OFF' : 'ON',
        key: index
    }));

    useEffect(() => {
        setFilteredData(patients);
    }, [data]);
    // handle filter
    const [filteredData, setFilteredData] = useState(patients);

    const handleTableChange = (pagination, filters, sorter) => {
        if (!patients.length) return;
        let filtered = patients;

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
                (patient) =>
                    patient.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    patient.email
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    patient.phone
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    // search handle
    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchQuery(value);

        const filtered = patients?.filter(
            (patient) =>
                patient.name.toLowerCase().includes(value.toLowerCase()) ||
                patient.email.toLowerCase().includes(value.toLowerCase()) ||
                patient.phone.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    // handle modal
    const handleModal = (modal, id) => {
        setModalData({ modal, id });
    };

    const columns = [
        {
            title: 'Tên Bệnh nhân',
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
            onFilter: (value, record) => record.gender.includes(value)
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone'
        },
        {
            title: 'Tỉnh/TP',
            dataIndex: 'province'
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
            dataIndex: 'createdAt',
            sorter: (a, b) =>
                dayjs(a.createdAt, 'DD-MM-YYYY HH:mm').unix() -
                dayjs(b.createdAt, 'DD-MM-YYYY HH:mm').unix(),
            sortOrder:
                sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        className='management__actions-btn'
                        onClick={() => handleModal('patientInfo', record?.id)}
                    >
                        <EyeOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn'
                        onClick={() => handleModal('patientModal', record?.id)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn management__actions-btn--delete'
                        onClick={() => handleModal('patientDelete', record?.id)}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className='patient-management'>
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
                        placeholder='Tìm nhanh bệnh nhân'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <Button
                    className='management__add'
                    onClick={() => handleModal('patientModal')}
                >
                    <img src={addUserIcon} alt='' />
                    Thêm bệnh nhân
                </Button>
            </div>

            <Table
                className='management__table'
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

            {modalData?.modal === 'patientInfo' && (
                <InfoModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'patientModal' && (
                <PatientModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'patientDelete' && (
                <DeleteModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}
        </div>
    );
}

export default PatientManagement;
