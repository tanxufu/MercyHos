import http from '../utils/http';

export const getAllPatients = async () => {
    return await http.get(`/v1/patients`);
};

export const getPatientsOnUser = async (userId) => {
    return await http.get(`/v1/users/${userId}/patients`);
};

export const getPatient = async (patientId) => {
    return await http.get(`/v1/patients/${patientId}`);
};

export const createPatientOnUser = async (userId, body) => {
    return await http.post(`/v1/users/${userId}/patients`, body);
};

export const updatePatient = async (patientId, body) => {
    return await http.patch(`/v1/patients/${patientId}`, body);
};

export const deletePatient = async (patientId) => {
    return await http.patch(`/v1/patients/deletePatient/${patientId}`);
};
