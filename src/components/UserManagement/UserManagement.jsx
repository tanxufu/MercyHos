import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';

import Button from '../Button';
import addUserIcon from '../../assets/icons/create-patient.svg';
import searchIcon from '../../assets/icons/search.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import { getAllUsers } from '../../apis/user.api';

function UserManagement() {
    const { data, isPending, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers()
    });
    let users = data?.data?.data?.data || [];
    users = users.map((user, index) => ({
        ...user,
        key: index,
        active: user?.active === 'false' ? 'OFF' : 'ON'
    }));

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
            filters: [
                { text: 'user', value: 'user' },
                { text: 'doctor', value: 'doctor' },
                { text: 'admin', value: 'admin' }
            ],
            onFilter: (value, record) => record.role.includes(value)
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
        <div className='user-management'>
            <div className='management__act'>
                <Button className='management__refetch' onClick={refetch}>
                    <img src={refreshIcon} alt='' />
                </Button>

                <div className='search-group management__search'>
                    <img src={searchIcon} alt='search-icon' />
                    <input
                        type='text'
                        placeholder='Tìm nhanh người dùng'
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Button className='management__add'>
                    <img src={addUserIcon} alt='' />
                    Thêm người dùng
                </Button>
            </div>

            <Table
                className='management__table'
                loading={isPending}
                columns={columns}
                dataSource={users}
                pagination={{
                    total: users?.length,
                    pageSize: 10,
                    hideOnSinglePage: true
                }}
            />
        </div>
    );
}

export default UserManagement;
