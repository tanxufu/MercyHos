import  { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getAllDoctors, deleteDoctor } from '../../apis/doctor.api';

const DoctorTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, [pagination.current, pagination.pageSize]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const { data, total } = await getAllDoctors(pagination.current, pagination.pageSize);
      setDoctors(data);
      setPagination((prev) => ({ ...prev, total }));
    } catch (error) {
      console.error('Error fetching doctors:', error);
      if (error.response && error.response.status === 500) {
        // Hiển thị thông báo lỗi hoặc thử gọi API lại sau 5 giây
        notification.error({
          message: 'Lỗi',
          description: 'Có lỗi xảy ra khi lấy danh sách bác sĩ. Vui lòng thử lại sau.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id) => {
    try {
      await deleteDoctor(id);
      fetchDoctors(); // Refresh the table after deletion
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handlePageChange = (page, pageSize) => {
    setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Specialty', dataIndex: 'specialty', key: 'specialty' },
    { title: 'Experience', dataIndex: 'experience', key: 'experience' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/doctors/${record.id}`)}
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this doctor?"
            onConfirm={() => handleDeleteDoctor(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" style={{ marginLeft: 8 }}>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={doctors}
      rowKey="id"
      loading={loading}
      pagination={{
        ...pagination,
        onChange: handlePageChange,
      }}
    />
  );
};

export default DoctorTable;