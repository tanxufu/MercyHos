import { useQuery } from '@tanstack/react-query';
import {
    DeleteOutlined,
    EditOutlined,
    ExportOutlined,
    EyeOutlined
} from '@ant-design/icons';
import { Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';

import Button from '../Button';
import addAppointment from '../../assets/icons/add-appointment.svg';
import refreshIcon from '../../assets/icons/refresh.svg';
import searchIcon from '../../assets/icons/search.svg';
import { getAllAppointments } from '../../apis/appointment.api';
import { useEffect, useState } from 'react';
import InfoModal from '../InfoModal';
import AppointmentModal from '../AppointmentModal';
import DeleteModal from '../DeleteModal';
import RequestModal from '../RequestModal';

function AppointmentManagement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [modalData, setModalData] = useState(null);
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    const { data, isPending, refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: () => getAllAppointments()
    });
    let appointments = data?.data?.data?.data || [];
    appointments = appointments.map((appointment, index) => ({
        ...appointment,
        createdAt: dayjs(appointment?.createdAt).format('DD-MM-YYYY HH:mm'),
        dateVisit: dayjs(appointment?.dateVisit).format('DD-MM-YYYY'),
        doctor: appointment?.doctor?.name,
        patient: appointment?.patient?.name,
        request: appointment?.changeRequest?.status,
        key: index
    }));

    useEffect(() => {
        setFilteredData(appointments);
    }, [data]);

    // handle table change
    const handleTableChange = (pagination, filters, sorter) => {
        if (!appointments) return;
        let filtered = appointments;

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
                (appointment) =>
                    appointment.medicalBill
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    appointment.dateVisit
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    appointment.doctor
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) ||
                    appointment.patient
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

        const filtered = appointments?.filter(
            (appointment) =>
                appointment.medicalBill
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                appointment.dateVisit
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                appointment.doctor
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                appointment.patient.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredData(filtered);
    };

    const handleModal = (modal, id) => {
        setModalData({ modal, id });
    };

    const columns = [
        {
            title: 'Mã phiếu khám',
            dataIndex: 'medicalBill'
        },
        {
            title: 'Ngày khám',
            dataIndex: 'dateVisit',
            sorter: (a, b) =>
                dayjs(a.dateVisit, 'DD-MM-YYYY').unix() -
                dayjs(b.dateVisit, 'DD-MM-YYYY').unix(),
            sortOrder:
                sortedInfo.columnKey === 'dateVisit' ? sortedInfo.order : null
        },
        {
            title: 'Giờ khám',
            dataIndex: 'timeVisit',
            sorter: (a, b) =>
                dayjs(a.timeVisit, 'HH:mm').unix() -
                dayjs(b.timeVisit, 'HH:mm').unix(),
            sortOrder:
                sortedInfo.columnKey === 'timeVisit' ? sortedInfo.order : null
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
                        onClick={() =>
                            handleModal('appointmentInfo', record?.id)
                        }
                    >
                        <EyeOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn'
                        onClick={() =>
                            handleModal('appointmentModal', record?.id)
                        }
                    >
                        <EditOutlined />
                    </Button>
                    <Button
                        className='management__actions-btn management__actions-btn--delete'
                        onClick={() =>
                            handleModal('appointmentDelete', record?.id)
                        }
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            )
        },
        {
            title: 'Request',
            key: 'request',
            filters: [
                { text: 'Đang đợi', value: 'pending' },
                { text: 'Đã duyệt', value: 'approved' },
                { text: 'Từ chối', value: 'rejected' }
            ],
            onFilter: (value, record) => record?.request?.includes(value),
            render: (_, record) =>
                record?.changeRequest && (
                    <Space>
                        <Button
                            className='management__actions-btn '
                            onClick={() =>
                                handleModal('requestModal', record?.id)
                            }
                        >
                            <ExportOutlined />
                        </Button>
                        {record?.changeRequest?.status === 'pending' ? (
                            <span style={{ color: '#1d39c4' }}>
                                Đang đợi...
                            </span>
                        ) : record?.changeRequest?.status === 'approved' ? (
                            <span>Đã duyệt</span>
                        ) : (
                            <span>Từ chối</span>
                        )}
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

                <div className='search-group management__search'>
                    <img src={searchIcon} alt='search-icon' />
                    <input
                        type='text'
                        placeholder='Tìm nhanh lịch khám'
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <Button
                    className='management__add'
                    onClick={() => handleModal('appointmentModal')}
                >
                    <img src={addAppointment} alt='' />
                    Thêm lịch khám
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

            {modalData?.modal === 'appointmentInfo' && (
                <InfoModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'appointmentModal' && (
                <AppointmentModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'appointmentDelete' && (
                <DeleteModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}

            {modalData?.modal === 'requestModal' && (
                <RequestModal
                    modal={modalData.modal}
                    id={modalData.id}
                    modalClose={() => setModalData(null)}
                />
            )}
        </div>
    );
}

export default AppointmentManagement;
