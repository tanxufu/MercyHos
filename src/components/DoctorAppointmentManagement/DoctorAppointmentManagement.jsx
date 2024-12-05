import { useQuery } from '@tanstack/react-query';
import { Space, Table, Layout, theme } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseOutlined, EditOutlined, FormOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { getAppointmentsOnDoctor } from '../../apis/appointment.api';
import Button from '../Button';
import addAppointment from '../../assets/icons/ticket.svg';
// import refreshIcon from '../../assets/icons/refresh.svg';
import searchIcon from '../../assets/icons/search.svg';
import { useState } from 'react';
import InfoModal from '../InfoModal';
import AppointmentModal from '../AppointmentModal';
import NoteModal from '../NoteModal/NoteModal';

const { Content } = Layout;

/* eslint-disable react/prop-types */
function DoctorAppointmentManagement({ doctorId, hide = false, pageSize = 8 }) {
    const {
        token: { colorBgContainer }
    } = theme.useToken();

    const [sortedInfo, setSortedInfo] = useState({});
    const [visitStatus, setVisitStatus] = useState('Sắp tới');
    const [modalData, setModalData] = useState(null);

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
        createdAt: dayjs(appointment?.createdAt).format('DD-MM-YYYY HH:mm'),
        dateVisit: dayjs(appointment?.dateVisit).format('DD-MM-YYYY'),
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

    // handle modal
    const handleModal = (modal, id) => {
        setModalData({ modal, id });
    };

    // columns table
    const columns = [
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
            title: 'Tên Bệnh nhân',
            dataIndex: 'patientName',
            render: (item, record) => {
                return (
                    <span
                        style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                        onClick={() => {
                            handleModal('patientInfo', record?.patient?.id);
                        }}
                    >
                        {item}
                    </span>
                );
            }
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
                dayjs(a.createdAt, 'DD-MM-YYYY HH:mm').unix() -
                dayjs(b.createdAt, 'DD-MM-YYYY HH:mm').unix(),
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
                                  handleModal('appointmentCancel', record?.id)
                              }
                          >
                              <CloseOutlined />
                          </Button>
                      </Space>
                  )
              }
            : appointments?.some((record) => record?.visitStatus === 'Đã khám')
              ? {
                    title: 'Ghi chú',
                    key: 'note',
                    render: (_, record) => (
                        <Space
                            style={{
                                width: '100%',
                                justifyContent: 'space-between'
                            }}
                        >
                            <p
                                style={{
                                    display: '-webkit-box',
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2
                                }}
                            >
                                {record?.note}
                            </p>
                            <Button
                                className='management__actions-btn'
                                style={{ marginLeft: 'auto' }}
                                onClick={() =>
                                    handleModal('noteModal', record?.id)
                                }
                            >
                                <FormOutlined />
                            </Button>
                        </Space>
                    )
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

                <AnimatePresence mode='wait'>
                    <motion.div
                        key={appointments}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeOut'
                        }}
                    >
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
                    </motion.div>
                </AnimatePresence>

                {modalData?.modal === 'patientInfo' && (
                    <InfoModal
                        modal={modalData.modal}
                        id={modalData.id}
                        modalClose={() => setModalData(null)}
                    />
                )}

                {modalData?.modal === 'appointmentModal' && (
                    <AppointmentModal
                        doctorSite={true}
                        modal={modalData.modal}
                        id={modalData.id}
                        modalClose={() => setModalData(null)}
                    />
                )}

                {modalData?.modal === 'noteModal' && (
                    <NoteModal
                        modal={modalData.modal}
                        id={modalData.id}
                        modalClose={() => setModalData(null)}
                    />
                )}
            </div>
        </Content>
    );
}

export default DoctorAppointmentManagement;
