import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';

import Button from '../Button';
import addUserIcon from '../../assets/icons/create-patient.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import searchIcon from '../../assets/icons/search.svg';
import { getAllPatients } from '../../apis/patient.api';

function PatientManagement() {
    const { data, isPending, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllPatients()
    });
    let patients = data?.data?.data?.data || [];
    patients = patients.map((patient, index) => ({
        ...patient,
        createdAt: dayjs(patient?.createdAt).format('DD/MM/YYYY HH:mm'),
        dob: dayjs(patient?.dob).format('DD/MM/YYYY'),
        active: patient?.active === 'false' ? 'OFF' : 'ON',
        key: index
    }));
    // console.log(patients);

    const columns = [
        {
            title: 'Tên Bệnh nhân',
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
            dataIndex: 'createdAt'
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
        <div className='patient-management'>
            <div className='management__act'>
                <Button className='management__refetch' onClick={refetch}>
                    <img src={refreshIcon} alt='' />
                </Button>

                <div className='search-group management__search'>
                    <img src={searchIcon} alt='search-icon' />
                    <input
                        type='text'
                        placeholder='Tìm nhanh bệnh nhân'
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Button className='management__add'>
                    <img src={addUserIcon} alt='' />
                    Thêm bệnh nhân
                </Button>
            </div>

            <Table
                className='management__table'
                loading={isPending}
                columns={columns}
                dataSource={patients}
                pagination={{
                    total: patients?.length,
                    pageSize: 10,
                    hideOnSinglePage: true
                }}
            />
        </div>
    );
}

export default PatientManagement;
