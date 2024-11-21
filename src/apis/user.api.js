import http from '../utils/http';

export const getAllUsers = async () => {
    return await http.get('/v1/users');
};

export const getCurrentUser = async () => {
    return await http.get('/v1/users/me');
};

export const updateCurrentUser = async (body) => {
    return await http.patch('/v1/users//updateMe', body);
};

export const updateCurrentUserPassword = async (body) => {
    return await http.patch('/v1/users//updateMyPassword', body);
};
