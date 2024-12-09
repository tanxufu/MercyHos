const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getOne = (Model, populateOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);

        if (populateOptions) query = query.populate(populateOptions);

        const document = await query;

        if (!document) {
            return next(new AppError('No document found with id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: document
            }
        });
    });

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        let filter = {};
        if (req.params.doctorId) filter = { doctor: req.params.doctorId };
        if (req.params.patientId) filter = { patient: req.params.patientId };
        if (req.params.userId) filter = { owner: req.params.userId };
        if (req.params.user) filter = { user: req.params.user };
        // if (req.params.owner) filter = { owner: req.params.owner };

        // console.log(filter);

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields();

        const total = await features.query.clone().countDocuments();

        features.paginate();

        const document = await features.query;

        if (!document) {
            return next(new AppError('No documents found', 404));
        }

        res.status(200).json({
            status: 'success',
            requestAt: req.requestTime,
            result: document.length,
            data: {
                data: document
            },
            total: total
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with id', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!document) {
            return next(new AppError('No document found with id', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: document
            }
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: document
            }
        });
    });
