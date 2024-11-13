import http from '../utils/http';

export const getDoctorStats = async (searchQuery) => {
    return await http.get(`/v1/doctors/doctor-stats?specialty=${searchQuery}`);
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
