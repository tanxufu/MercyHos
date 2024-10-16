/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const doctorRouter = require('./routes/doctorRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// helmet
app.use(helmet());

// development logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// rate limiter request
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Quá nhiều yêu cầu!!'
});
app.use(limiter);

app.use(express.json());

// data sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
