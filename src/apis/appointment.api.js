import http from '../utils/http';

export const createAppointment = async (body) => {
    return await http.post(`/v1/appointments`, body);
};
