import { useQuery } from '@tanstack/react-query';
import { Space, Table, Layout, theme } from 'antd';

import { CloseOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { getAppointmentsOnDoctor } from '../../apis/appointment.api';
import Button from '../Button';
import addAppointment from '../../assets/icons/add-appointment.svg';
// import refreshIcon from '../../assets/icons/refresh.svg';
import searchIcon from '../../assets/icons/search.svg';
import { useState } from 'react';

const { Content } = Layout;

/* eslint-disable react/prop-types */
function DoctorAppointmentManagement({
    doctorId,
    hide = false,
    pageSize = 10
}) {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const [sortedInfo, setSortedInfo] = useState({});
    const [visitStatus, setVisitStatus] = useState('Sắp tới');

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo({ order: sorter.order, columnKey: sorter.field });
    };

    // get appointments
    const { data, isPending } = useQuery({
        queryKey: ['appointments', doctorId, visitStatus],
        queryFn: () => getAppointmentsOnDoctor(doctorId, visitStatus),
        enabled: !!doctorId
    });

    let appointments = data?.data?.data?.data;
    appointments = appointments?.map((appointment, index) => ({
        ...appointment,
        createdAt: dayjs(appointment?.createdAt).format('DD/MM/YYYY HH:mm'),
        dateVisit: dayjs(appointment?.dateVisit).format('DD/MM/YYYY'),
        patientName: appointment?.patient?.name,
        age:
            new Date().getFullYear() -
            new Date(appointment?.patient?.dob).getFullYear(),
        key: index
    }));

    // handle filter
    const handleFilter = (item) => {
        setVisitStatus(item);
    };

    // columns table
    const columns = [
        {
            title: 'Ngày khám',
            dataIndex: 'dateVisit',
            sorter: (a, b) =>
                dayjs(a.dateVisit, 'DD/MM/YYYY').unix() -
                dayjs(b.dateVisit, 'DD/MM/YYYY').unix(),
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
            title: 'Tên Bệnh nhân',
            dataIndex: 'patientName'
        },

        {
            title: 'Tuổi',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
            sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
            ellipsis: true
        },
        {
            title: 'Ngày đặt lịch',
            dataIndex: 'createdAt',
            sorter: (a, b) =>
                dayjs(a.createdAt, 'DD/MM/YYYY HH:mm').unix() -
                dayjs(b.createdAt, 'DD/MM/YYYY HH:mm').unix(),
            sortOrder:
                sortedInfo.columnKey === 'createdAt' ? sortedInfo.order : null
        },
        appointments?.some((record) => record?.visitStatus === 'Sắp tới')
            ? {
                  title: 'Actions',
                  key: 'actions',
                  render: (_, record) => (
                      <Space>
                          <Button
                              className='management__actions-btn management__actions-btn--delete'
                              onClick={() => {
                                  console.log(record.id);
                              }}
                          >
                              <CloseOutlined />
                          </Button>
                      </Space>
                  )
              }
            : appointments?.some((record) => record?.visitStatus === 'Đã khám')
              ? {
                    title: 'Ghi chú',
                    key: ''
                    // render: (_, record) => {
                    //     return record?.feeStatus === 'Đã thanh toán' ? (
                    //         <p style={{ color: '#389e0d' }}>
                    //             {record?.feeStatus}
                    //         </p>
                    //     ) : (
                    //         <p style={{ color: '#cf1322' }}>
                    //             {record?.feeStatus}
                    //         </p>
                    //     );
                    // },
                    // filters: [
                    //     { text: 'Đã thanh toán', value: 'Đã thanh toán' },
                    //     { text: 'Chưa thanh toán', value: 'Chưa thanh toán' }
                    // ],
                    // onFilter: (value, record) =>
                    //     record.feeStatus.includes(value)
                }
              : {}
    ];

    return (
        <Content
            className='doctor-layout__content'
            style={{
                margin: '24px 40px',
                padding: 24,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: 20
            }}
        >
            <div className='doctor-appointment-management'>
                <div className={`management__act ${hide && 'd-none'}`}>
                    {/* <Button className='management__refetch' onClick={refetch}>
                    <img src={refreshIcon} alt='' />
                </Button> */}

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
                        <img src={addAppointment} alt='' />
                        Thêm lịch khám
                    </Button>
                </div>

                <nav className='doctor-appointment-management__filter'>
                    <div
                        className={`doctor-appointment-management__filter-item ${visitStatus === 'Sắp tới' && 'doctor-appointment-management__filter-item--active'}`}
                        onClick={() => handleFilter('Sắp tới')}
                    >
                        Lịch khám mới
                    </div>
                    <div
                        className={`doctor-appointment-management__filter-item ${visitStatus === 'Đã khám' && 'doctor-appointment-management__filter-item--active'} ${hide && 'd-none'}`}
                        onClick={() => handleFilter('Đã khám')}
                    >
                        Lịch đã khám
                    </div>
                    <div
                        className={`doctor-appointment-management__filter-item ${visitStatus === 'Đã huỷ' && 'doctor-appointment-management__filter-item--active'} ${hide && 'd-none'}`}
                        onClick={() => handleFilter('Đã huỷ')}
                    >
                        Lịch huỷ
                    </div>
                </nav>

                <Table
                    className='management__table'
                    loading={isPending}
                    columns={columns}
                    dataSource={appointments}
                    onChange={handleChange}
                    pagination={{
                        total: appointments?.length,
                        pageSize: pageSize,
                        hideOnSinglePage: true
                    }}
                />
            </div>
        </Content>
    );
}

export default DoctorAppointmentManagement;
