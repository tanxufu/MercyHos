import http from '../utils/http';

export const getPatientsOnUser = (userId) => {
    return http.get(`/v1/users/${userId}/patients`);
};

export const getPatient = (patientId) => {
    return http.get(`/v1/patients/${patientId}`);
};

export const createPatientOnUser = (userId, body) => {
    return http.post(`/v1/users/${userId}/patients`, body);
};

export const updatePatient = (patientId, body) => {
    return http.patch(`/v1/patients/${patientId}`, body);
};

export const deletePatient = (patientId) => {
    return http.patch(`/v1/patients/deletePatient/${patientId}`);
};
