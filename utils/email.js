// eslint-disable-next-line import/no-extraneous-dependencies
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // define email options
    const mailOptions = {
        from: 'MercyHos <admin@mercyhos.com>',
        to: options.email,
        subject: options.subject,
        // text: options.message,
        html: `${options.message}<a href=${options.resetURL}>tại đây</a>`
    };

    // send email
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
