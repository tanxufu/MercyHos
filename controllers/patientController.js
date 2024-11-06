const Patient = require('../models/patientModel');
const factory = require('./handleFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setUserId = (req, res, next) => {
    console.log(req.params);
    if (!req.body.owner) req.body.owner = req.params.userId;
    next();
};

exports.getPatient = factory.getOne(Patient, {
    path: 'appointments',
    options: { skipPatientPopulate: true }
});
exports.getAllPatients = factory.getAll(Patient);
exports.createPatient = factory.createOne(Patient);
exports.updatePatient = factory.updateOne(Patient);

exports.deletePatient = catchAsync(async (req, res, next) => {
    const doctor = await Patient.findByIdAndUpdate(req.params.id, {
        active: false
    });

    if (!doctor) {
        return next(new AppError('Không tìm thấy bệnh nhân với id này', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});
