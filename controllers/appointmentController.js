const Appointment = require('../models/appointmentModel');
const factory = require('./handleFactory');

exports.setDoctorPatientIds = (req, res, next) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    next();
};

exports.getAppointment = factory.getOne(Appointment);
exports.getAllAppointments = factory.getAll(Appointment);
exports.createAppointment = factory.createOne(Appointment);
exports.updateAppointment = factory.updateOne(Appointment);
exports.deleteAppointment = factory.deleteOne(Appointment);
