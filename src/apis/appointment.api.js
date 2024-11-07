import http from '../utils/http';

export const createAppointment = (body) => {
    return http.post(`/v1/appointments`, body);
};
