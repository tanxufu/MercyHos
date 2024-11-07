const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        dateVisit: {
            type: Date,
            required: true
        },
        timeVisit: {
            type: String,
            required: true,
            enum: [
                '8:00 - 9:00',
                '9:00 - 10:00',
                '10:00 - 11:00',
                '13:30 - 14:30',
                '14:30 - 15:30',
                '15:30 - 16:30'
            ]
        },
        patient: {
            type: mongoose.Schema.ObjectId,
            ref: 'Patients',
            required: true
        },
        doctor: {
            type: mongoose.Schema.ObjectId,
            ref: 'Doctors',
            required: true
        },
        visitStatus: {
            type: String,
            required: true,
            enum: ['Đã khám', 'Đã huỷ', 'Sắp tới']
        },
        feeStatus: {
            type: String,
            required: true,
            enum: ['Đã thanh toán', 'Chưa thanh toán']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

appointmentSchema.pre(/^find/, function (next) {
    if (!this.options.skipDoctorPopulate) {
        this.populate({
            path: 'doctor',
            select: 'name gender specialty fee availability',
            options: { skipOwner: true }
        });
    }

    if (!this.options.skipPatientPopulate) {
        this.populate({
            path: 'patient',
            select: 'name dob phone gender occupation email',
            options: { skipOwner: true }
        });
    }

    next();
});

const Appointment = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointment;
