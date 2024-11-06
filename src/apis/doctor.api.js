import http from '../utils/http';

export const getDoctorStats = (searchQuery) => {
    return http.get(`/v1/doctors/doctor-stats?specialty=${searchQuery}`);
};

export const getDoctorsBySpecialty = (specialty, searchQuery) => {
    return http.get(`/v1/doctors?specialty=${specialty}&search=${searchQuery}`);
};
