/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const doctorSchema = new mongoose.Schema({
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
        unique: true,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    availability: {
        type: [String],
        required: [true, 'Lịch khám là bắt buộc'],
        enum: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
    },
    create_at: {
        type: Date,
        default: Date.now()
    },
    appointments: {
        type: [Object]
    }
});

const Doctor = mongoose.model('Doctors', doctorSchema);

module.exports = Doctor;
