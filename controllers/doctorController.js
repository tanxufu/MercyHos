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

exports.deleteDoctor = factory.deleteOne(Doctor);

exports.getDoctorStats = catchAsync(async (req, res, next) => {
    const specialty = req.query.specialty || '';
    // console.log('Requested specialty:', specialty);

    const matchCondition = specialty
        ? { specialty: { $regex: specialty, $options: 'i' } }
        : {};

    const stats = await Doctor.aggregate([
        {
            $match: matchCondition
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

    if (!stats || stats.length === 0) {
        return next(new AppError('Không tìm thấy kết quả!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            stats
        }
    });
});
