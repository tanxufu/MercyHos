const Doctor = require('../models/doctorModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.getAllDoctors = factory.getAll(Doctor);
exports.getDoctor = factory.getOne(Doctor, {
    path: 'appointments',
    options: { skipDoctorPopulate: true }
});
exports.createDoctor = factory.createOne(Doctor);
exports.updateDoctor = factory.updateOne(Doctor);

exports.deleteDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, {
        active: false
    });

    if (!doctor) {
        return next(new AppError('Không tìm thấy bác sĩ với id này', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.getDoctorStats = catchAsync(async (req, res, next) => {
    const stats = await Doctor.aggregate([
        {
            $match: { experience: { $gte: 2 } }
        },
        {
            $group: {
                _id: '$specialty',
                // _id: null,
                totalDoctors: { $sum: 1 },
                avgExperience: { $avg: '$experience' },
                avgFee: { $avg: '$fee' }
            }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});
