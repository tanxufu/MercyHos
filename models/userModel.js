/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên là bắt buộc']
    },
    email: {
        type: String,
        required: [true, 'Email là bắt buộc'],
        unique: true,
        validate: [validator.isEmail, 'Email cung cấp phải hợp lệ']
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'doctor'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu là bắt buộc'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Xác nhận mật khẩu là bắt buộc'],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: 'Xác nhận mật khẩu không khớp!'
        }
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
