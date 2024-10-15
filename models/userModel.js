/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên']
    },
    email: {
        type: String,
        required: [true, 'Vui lòng nhập địa chỉ Email'],
        unique: true,
        validate: [validator.isEmail, 'Email cung cấp phải hợp lệ'],
        lowercase: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'doctor'],
        default: 'user'
    },
    password: {
        // pass doctor: abc123456
        type: String,
        required: [true, 'Vui lòng nhập mật khẩu'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Vui lòng nhập xác nhận mật khẩu'],
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
