import http from '../utils/http';

export const getAllUsers = async () => {
    return await http.get('/v1/users');
};

export const getUser = async (userId) => {
    return await http.get(`/v1/users/${userId}`);
};

export const editUser = async (userId, body) => {
    return await http.patch(`/v1/users/${userId}`, body);
};

export const createUser = async (body) => {
    return await http.post(`/v1/users`, body);
};

export const deleteUser = async (userId) => {
    return await http.delete(`/v1/users/${userId}`);
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
