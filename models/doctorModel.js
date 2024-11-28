/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tên là bắt buộc']
        },
        dob: {
            type: Date,
            required: [true, 'Ngày sinh là bắt buộc']
        },
        email: {
            type: String,
            required: [true, 'Email là bắt buộc'],
            lowercase: true,
            validate: [validator.isEmail, 'Email cung cấp phải hợp lệ']
        },
        phone: {
            type: String,
            required: [true, 'Số điện thoại là bắt buộc']
        },
        gender: {
            type: String,
            required: [true, 'Giới tính là bắt buộc'],
            enum: ['male', 'female', 'other']
        },
        specialty: {
            type: String,
            required: [true, 'Chuyên môn(khoa) là bắt buộc']
        },
        experience: {
            type: Number,
            required: [true, 'Năm kinh nghiệm là bắt buộc'],
            min: [0, 'Năm kinh nghiệm phải lớn hơn 0']
        },
        fee: {
            type: Number,
            required: [true, 'Phí là bắt buộc']
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Users',
            unique: true,
            required: [true, 'Must belong to a user']
        },
        availability: {
            type: [String],
            required: [true, 'Lịch khám là bắt buộc'],
            enum: {
                values: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
                message: 'Lịch khám không có Chủ nhật!'
            }
        },
        create_at: {
            type: Date,
            default: Date.now()
            // select: false
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

doctorSchema.virtual('appointments', {
    ref: 'Appointments',
    foreignField: 'doctor',
    localField: '_id'
});

doctorSchema.pre(/^find/, function (next) {
    if (!this.options.skipOwner) {
        this.populate({
            path: 'owner',
            select: '-__v -passwordChangedAt'
        });
    }

    next();
});

const Doctor = mongoose.model('Doctors', doctorSchema);

module.exports = Doctor;
