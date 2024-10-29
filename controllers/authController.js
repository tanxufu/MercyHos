/* eslint-disable arrow-body-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// send token with cookie
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    user.password = undefined;

    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

// signup
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
        // passwordChangeAt: req.body.passwordChangeAt
    });

    createSendToken(newUser, 201, res);
});

// login
exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Vui lòng nhập mật khẩu và email!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    console.log(user);

    if (user.active === false) {
        return next(new AppError('Tài khoản đã xoá!', 401));
    }

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Mật khẩu hoặc Email không đúng!', 401));
    }

    createSendToken(user, 200, res);
});

// protect
exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Bạn chưa đăng nhập!', 401));
    }

    // verify token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decode.id);
    if (!currentUser) {
        return next(new AppError('Token không còn tồn tại!', 401));
    }

    // changed pass after send
    if (currentUser.changedPasswordAfter(decode.iat)) {
        return next(
            new AppError('Mật khẩu đã đổi! Vui lòng đăng nhập lại!', 401)
        );
    }

    req.user = currentUser;
    next();
});

// eslint-disable-next-line arrow-body-style
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Bạn không có quyền truy cập!', 403));
        }
        next();
    };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError('Email không tồn tại!', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.FRONTEND_URL}/resetPassword?token=${resetToken}`;

    const message = `Chào ${user.name}!
     Vui lòng thực hiện thay đổi mật khẩu: `;

    try {
        await sendEmail({
            email: user.email,
            subject: `Thay đổi Mật khẩu!! (Hiệu lực 10 phút!)`,
            message,
            resetURL
        });

        res.status(200).json({
            status: 'success',
            message: 'Token đã được gửi tới email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpiresAt = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new AppError('Lỗi khi gửi email!', 500));
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError('Token không hợp lệ!', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpiresAt = undefined;

    await user.save();

    createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    if (
        !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
        return next(new AppError('Mật khẩu hiện tại không đúng!', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    createSendToken(user, 200, res);
});
