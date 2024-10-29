const mongoose = require('mongoose');
const validator = require('validator');

const patientSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Vui lòng nhập tên bệnh nhân']
        },
        dob: {
            type: Date,
            required: [true, 'Vui lòng nhập ngày sinh']
        },
        phone: {
            type: String,
            required: [true, 'Vui lòng nhập số điện thoại'],
            validate: [validator.isMobilePhone, 'Số điện thoại phải hợp lệ']
        },
        gender: {
            type: String,
            required: [true, 'Vui lòng chọn giới tính'],
            enum: ['Nam', 'Nữ', 'Khác']
        },
        occupation: {
            type: String,
            required: [true, 'Vui lòng nhập nghề nghiệp']
        },
        idCard: {
            type: String,
            min: [8, 'CCCD/Hộ chiếu tối thiểu 8 ký tự'],
            max: [12, 'CCCD/Hộ chiếu tối đa 12 ký tự'],
            default: ''
        },
        email: {
            type: String,
            required: [true, 'Vui lòng nhập địa chỉ Email'],
            validate: [validator.isEmail, 'Email cung cấp phải hợp lệ'],
            lowercase: true
        },
        ethnicity: {
            type: String,
            default: ''
        },
        province: {
            type: String,
            required: [true, 'Vui lòng chọn tỉnh/thành phố']
        },
        district: {
            type: String,
            required: [true, 'Vui lòng chọn quận/huyện']
        },
        ward: {
            type: String,
            required: [true, 'Vui lòng chọn phường/xã']
        },
        address: {
            type: String,
            required: [true, 'Vui lòng nhập địa chỉ']
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'Users',
            required: [true, 'Must belong to a user']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            select: false
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

patientSchema.virtual('appointments', {
    ref: 'Appointments',
    foreignField: 'patient',
    localField: '_id'
});

patientSchema.pre(/^find/, function (next) {
    if (!this.options.skipOwner) {
        this.populate({
            path: 'owner',
            select: '-__v -passwordChangedAt'
        });
    }

    next();
});

const Patient = mongoose.model('Patients', patientSchema);

module.exports = Patient;
