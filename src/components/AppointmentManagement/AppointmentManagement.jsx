import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';

import Button from '../Button';
import addAppointment from '../../assets/icons/add-appointment.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import { getAllAppointments } from '../../apis/appointment.api';

function AppointmentManagement() {
    const { data, isPending, refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => getAllAppointments()
    });
    let appointments = data?.data?.data?.data || [];
    appointments = appointments.map((appointment, index) => ({
        ...appointment,
        createdAt: dayjs(appointment?.createdAt).format('DD/MM/YYYY HH:mm'),
        dateVisit: dayjs(appointment?.dateVisit).format('DD/MM/YYYY'),
        doctor: appointment?.doctor?.name,
        patient: appointment?.patient?.name,
        key: index
    }));

    const columns = [
        {
            title: 'Mã phiếu khám',
            dataIndex: 'medicalBill'
        },
        {
            title: 'Ngày khám',
            dataIndex: 'dateVisit'
        },
        {
            title: 'Giờ khám',
            dataIndex: 'timeVisit'
        },
        {
            title: 'Bác sĩ',
            dataIndex: 'doctor'
        },
        {
            title: 'Bệnh nhân',
            dataIndex: 'patient'
        },

        {
            title: 'Trạng thái',
            dataIndex: 'visitStatus',
            render: (visitStatus) => {
                return visitStatus === 'Đã huỷ' ? (
                    <Tag color={'volcano'} key={visitStatus}>
                        {visitStatus}
                    </Tag>
                ) : visitStatus === 'Đã khám' ? (
                    <Tag color={'green'} key={visitStatus}>
                        {visitStatus}
                    </Tag>
                ) : (
                    <Tag color={'geekblue'} key={visitStatus}>
                        {visitStatus}
                    </Tag>
                );
            },
            filters: [
                { text: 'Sắp tới', value: 'Sắp tới' },
                { text: 'Đã khám', value: 'Đã khám' },
                { text: 'Đã huỷ', value: 'Đã huỷ' }
            ],
            onFilter: (value, record) => record.visitStatus.includes(value)
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
        <div className='appointment-management'>
            <div className='management__act'>
                <Button className='management__refetch' onClick={refetch}>
                    <img src={refreshIcon} alt='' />
                </Button>
                <Button className='management__add'>
                    <img src={addAppointment} alt='' />
                    Thêm lịch khám
                </Button>
            </div>

            <Table
                className='management__table'
                loading={isPending}
                columns={columns}
                dataSource={appointments}
                pagination={{
                    total: appointments?.length,
                    pageSize: 10,
                    hideOnSinglePage: true
                }}
            />
        </div>
    );
}

export default AppointmentManagement;
