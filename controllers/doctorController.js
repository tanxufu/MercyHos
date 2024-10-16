const Doctor = require('../models/doctorModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllDoctors = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Doctor.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const doctors = await features.query;

    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        total: doctors.length,
        data: {
            doctors
        }
    });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id).populate('owner');

    if (!doctor) {
        return next(new AppError('Không tìm thấy doctor với id này', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            doctor
        }
    });
});

exports.createDoctor = catchAsync(async (req, res, next) => {
    const newDoctor = await Doctor.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            doctor: newDoctor
        }
    });
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!doctor) {
        return next(new AppError('Không tìm thấy doctor với id này', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            doctor
        }
    });
});

exports.deleteDoctor = catchAsync(async (req, res, next) => {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
        return next(new AppError('Không tìm thấy doctor với id này', 404));
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
