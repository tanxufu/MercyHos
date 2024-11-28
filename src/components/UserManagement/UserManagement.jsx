import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';

import Button from '../Button';
import addUserIcon from '../../assets/icons/create-patient.svg';
import searchIcon from '../../assets/icons/search.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import { getAllUsers } from '../../apis/user.api';
import InfoModal from '../InfoModal';
import DeleteModal from '../DeleteModal';
import UserModal from '../UserModal';

function UserManagement() {
    const [modalData, setModalData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // get users
    const { data, isPending, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers()
    });

    let users = data?.data?.data?.data || [];
    users = users.map((user, index) => ({
        ...user,
        key: index,
        active: user?.active === false ? 'OFF' : 'ON'
    }));

    useEffect(() => {
        setFilteredData(users);
    }, [data]);

    // filter table change
    const [filteredData, setFilteredData] = useState(users);

    const handleTableChange = (pagination, filters) => {
        if (!users.length) return;

        let filtered = users;

        Object.keys(filters).forEach((key) => {
            if (filters[key]) {
                filtered = filtered.filter((item) =>
                    filters[key].includes(item[key])
                );
            }
        });

        if (searchQuery) {
            filtered = filtered.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    // search handle
    const handleSearch = (e) => {
        const value = e.target.value;

        setSearchQuery(value);

        const filtered = users?.filter(
            (user) =>
                user.name.toLowerCase().includes(value.toLowerCase()) ||
                user.email.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    // handel modal
    const handleModal = (modal, id) => {
        setModalData({ modal, id });
    };

    const columns = [
        {
            title: 'Tên Người dùng',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            render: (role) => {
                return <p style={{ textTransform: 'capitalize' }}>{role}</p>;
            },
            filters: [
                { text: 'User', value: 'user' },
                { text: 'Doctor', value: 'doctor' },
                { text: 'Admin', value: 'admin' }
            ],
            onFilter: (value, record) => record?.role.includes(value)
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
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        className='management__actions-btn'
                        onClick={() => handleModal('userInfo', record?.id)}
                    >
                        <EyeOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn'
                        onClick={() => handleModal('userModal', record?.id)}
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn management__actions-btn--delete'
                        onClick={() => handleModal('userDelete', record?.id)}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div className='user-management'>
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
                        placeholder='Tìm nhanh người dùng'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <Button
                    className='management__add'
                    onClick={() => handleModal('userModal')}
                >
                    <img src={addUserIcon} alt='' />
                    Thêm người dùng
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

            {modalData?.modal === 'userInfo' && (
                <InfoModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'userModal' && (
                <UserModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'userDelete' && (
                <DeleteModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}
        </div>
    );
}

export default UserManagement;
