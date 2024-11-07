import http from '../utils/http';

// Lấy tất cả bệnh nhân 
export const getAllPatients = async () => {
  try {
    const response = await http.get('/v1/patients');
    return response.data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Lấy thông tin 1 bệnh nhân
export const getPatient = async (id) => {
  try {
    const response = await http.get(`/v1/patients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    throw error;
  }
};

// Tạo mới bệnh nhân
export const createPatient = async (patientData) => {
  try {
    const response = await http.post('/v1/patients', patientData);
    return response;  // Trả về toàn bộ response để kiểm tra status
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

// Cập nhật thông tin bệnh nhân
export const updatePatient = async (id, patientData) => {
  try {
    const response = await http.patch(`/v1/patients/${id}`, patientData); 
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with ID ${id}:`, error);
    throw error;
  }
};

// Xóa bệnh nhân
export const deletePatient = async (id) => {
  try {
    await http.delete(`/v1/patients/${id}`);
  } catch (error) {
    console.error(`Error deleting patient with ID ${id}:`, error);
    throw error;
  }
};

// Lấy bệnh nhân theo user
export const getPatientsByUser = async (userId) => {
  try {
    const response = await http.get(`/v1/patients/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patients for user ${userId}:`, error); 
    throw error;
  }
};