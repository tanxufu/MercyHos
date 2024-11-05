import http from '../utils/http';

export const registerAccount = (body) => {
    return http.post('/v1/users/signup', body);
};

export const loginAccount = (body) => {
    return http.post('/v1/users/login', body);
};

export const logoutAccount = () => {
    return http.post('/v1/users/logout');
};

export const forgotPassword = (body) => {
    return http.post('/v1/users/forgotPassword', body);
};

export const resetPassword = (token, body) => {
    return http.patch(`/v1/users/resetPassword/${token}`, body);
};
