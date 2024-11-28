import http from '../utils/http';

export const getAllAppointments = async () => {
    return await http.get(`/v1/appointments`);
};

export const getAppointmentsOnDoctor = async (doctorId, visitStatus) => {
    const params = new URLSearchParams();

    if (visitStatus) params.append('visitStatus', visitStatus);
    const queryString = params.toString();

    return await http.get(
        `/v1/doctors/${doctorId}/appointments?sort=dateVisit&${queryString}`
    );
};

export const createAppointment = async (body) => {
    return await http.post(`/v1/appointments`, body);
};

export const getAppointmentsOnUser = async (userId, visitStatus) => {
    const params = new URLSearchParams();

    if (visitStatus) params.append('visitStatus', visitStatus);
    const queryString = params.toString();

    return await http.get(
        `/v1/users/${userId}/appointments?sort=visitStatus&${queryString}`
    );
};

export const getAppointment = async (appointmentId) => {
    return await http.get(`/v1/appointments/${appointmentId}`);
};

export const deleteAppointment = async (appointmentId) => {
    return await http.delete(`/v1/appointments/${appointmentId}`);
};

export const updateAppointment = async (appointmentId, body) => {
    return await http.patch(`/v1/appointments/${appointmentId}`, body);
};
