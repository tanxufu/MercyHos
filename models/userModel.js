/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
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
        },
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpiresAt: Date,
        active: {
            type: Boolean,
            default: true
            // select: false
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// userSchema.pre(/^find/, function (next) {
//     this.find({ active: { $ne: false } });
//     next();
// });

userSchema.virtual('patients', {
    ref: 'Patients',
    foreignField: 'owner',
    localField: '_id'
});

// hash password
userSchema.pre('save', async function (next) {
    // hash when pass not hash yet
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hashSync(this.password, 12);
    this.passwordConfirm = undefined;

    next();
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    this.passwordChangeAt = Date.now() - 1000;
    next();
});

// compare pass
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// check pass changed
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangeAt) {
        const changedTimestamp = parseInt(
            this.passwordChangeAt.getTime() / 1000,
            10
        );
        // console.log(JWTTimestamp, changedTimestamp);

        return JWTTimestamp < changedTimestamp;
    }

    // not changed password
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // console.log({ resetToken }, this.passwordResetToken);

    this.passwordResetExpiresAt = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('Users', userSchema);

module.exports = User;
