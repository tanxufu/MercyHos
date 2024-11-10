import http from '../utils/http';

export const getDoctorStats = async (searchQuery) => {
    return await http.get(`/v1/doctors/doctor-stats?specialty=${searchQuery}`);
};

export const getDoctorsBySpecialty = async (specialty, searchQuery) => {
    return await http.get(
        `/v1/doctors?specialty=${specialty}&search=${searchQuery}`
    );
};

export const getAppointmentOnDoctors = async (doctorId) => {
    return await http.get(`/v1/doctors/${doctorId}/appointments`);
};
