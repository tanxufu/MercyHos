const Doctor = require('../models/doctorModel');
const APIFeatures = require('../utils/APIFeatures');

exports.getAllDoctors = async (req, res) => {
    try {
        const features = new APIFeatures(
            Doctor.find().populate('owner'),
            req.query
        )
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
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id).populate('owner');

        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.createDoctor = async (req, res) => {
    try {
        const newDoctor = await Doctor.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doctor: newDoctor
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                doctor
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
};

exports.deleteDoctor = async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};

exports.getDoctorStats = async (req, res) => {
    try {
        const stats = await Doctor.aggregate([
            {
                $match: { experience: { $gte: 2 } }
            },
            {
                $group: {
                    // _id: '$specialty',
                    _id: null,
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
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
