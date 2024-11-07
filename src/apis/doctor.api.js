import http from '../utils/http';

export const getAllDoctors = async () => {
    try {
      const response = await http.get('/v1/doctors');
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  };
  
  export const getDoctor = async (id) => {
    try {
      const response = await http.get(`/v1/doctors/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const createDoctor = async (doctorData) => {
    try {
      const response = await http.post('/v1/doctors', doctorData);
      return response.data;
    } catch (error) {
      console.error('Error creating doctor:', error);
      throw error;
    }
  };
  
  export const updateDoctor = async (id, doctorData) => {
    try {
      const response = await http.patch(`/v1/doctors/${id}`, doctorData);
      return response.data;
    } catch (error) {
      console.error(`Error updating doctor with ID ${id}:`, error);
      throw error;
    }
  };
  
  export const deleteDoctor = async (id) => {
    try {
      await http.delete(`/v1/doctors/${id}`);
    } catch (error) {
      console.error(`Error deleting doctor with ID ${id}:`, error);
      throw error;
    }
  };