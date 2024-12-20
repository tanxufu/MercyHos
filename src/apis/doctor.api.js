import http from '../utils/http';

export const getDoctorStats = async (searchQuery) => {
    return await http.get(`/v1/doctors/doctor-stats?specialty=${searchQuery}`);
};

export const getAllDoctors = async () => {
    return await http.get(`/v1/doctors`);
};

export const getDoctor = async (doctorId) => {
    return await http.get(`/v1/doctors/${doctorId}`);
};

export const createDoctor = async (body) => {
    return await http.post('/v1/doctors', body);
};

export const editDoctor = async (doctorId, body) => {
    return await http.patch(`/v1/doctors/${doctorId}`, body);
};

export const deleteDoctor = async (doctorId) => {
    return await http.delete(`/v1/doctors/${doctorId}`);
};

export const getDoctorsBySpecialty = async (
    specialty,
    availability,
    experience,
    gender,
    searchQuery
) => {
    const params = new URLSearchParams();

    if (specialty) params.append('specialty', specialty);
    if (availability) params.append('availability', availability);
    if (experience) params.append('experience[gte]', experience);
    if (gender) params.append('gender', gender);
    if (searchQuery) params.append('search', searchQuery);

    const queryString = params.toString();

    return await http.get(`/v1/doctors?${queryString}`);
};

export const getAppointmentOnDoctors = async (doctorId) => {
    return await http.get(`/v1/doctors/${doctorId}/appointments`);
};

export const getDoctorOnUser = async (userId) => {
    return await http.get(`/v1/users/${userId}/doctors`);
};
