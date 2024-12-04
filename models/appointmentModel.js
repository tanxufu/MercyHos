const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
    {
        medicalBill: {
            type: String
        },
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
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'Users',
            required: true
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
        note: String,
        createdAt: {
            type: Date,
            default: Date.now
        },
        changeRequest: {
            newDoctor: {
                type: mongoose.Schema.ObjectId,
                ref: 'Doctors'
            },
            newDateVisit: Date,
            newTimeVisit: {
                type: String,
                enum: [
                    '8:00 - 9:00',
                    '9:00 - 10:00',
                    '10:00 - 11:00',
                    '13:30 - 14:30',
                    '14:30 - 15:30',
                    '15:30 - 16:30'
                ]
            },
            requestedBy: {
                type: String,
                enum: ['doctor', 'admin']
            },
            status: {
                type: String,
                enum: ['pending', 'approved', 'rejected']
            }
        },
        cancelRequest: {
            requestedBy: {
                type: String,
                enum: ['doctor', 'admin']
            },

            status: {
                type: String,
                enum: ['pending', 'approved', 'rejected']
            }
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: {
            // createdAt: 'created_at',
            updatedAt: 'updatedAt'
        }
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

    this.populate({
        path: 'changeRequest.newDoctor',
        select: 'name gender specialty fee availability'
    });

    if (!this.options.skipPatientPopulate) {
        this.populate({
            path: 'patient',
            select: 'name dob phone gender occupation email province',
            options: { skipOwner: true }
        });
    }

    next();
});

// appointmentSchema.pre('findOneAndUpdate', function (next) {
//     this.updateAt = Date.now();
//     next();
// });

appointmentSchema.pre('save', async function (next) {
    const existingAppointment = await this.constructor.findOne({
        dateVisit: this.dateVisit,
        doctor: this.doctor,
        timeVisit: this.timeVisit
    });

    if (existingAppointment) {
        const error = new Error(
            'Lịch hẹn vào khung giờ đã có người đặt. Vui lòng chọn khung giờ khác!'
        );
        error.statusCode = 400;
        return next(error);
    }

    // create medicalBill by dateVisit
    if (!this.medicalBill) {
        const dateString = this.dateVisit
            .toISOString()
            .split('T')[0]
            .replace(/-/g, '');

        const lastAppointment = await this.constructor
            .findOne({ dateVisit: this.dateVisit })
            .sort({ medicalBill: -1 })
            .select('medicalBill');

        let sequenceNumber = 1;

        if (lastAppointment && lastAppointment.medicalBill) {
            const lastSequence = parseInt(
                lastAppointment.medicalBill.split('-')[1],
                10
            );
            sequenceNumber = lastSequence + 1;
        }

        // YYYYMMDD-****
        this.medicalBill = `${dateString}-${sequenceNumber.toString().padStart(4, '0')}`;
    }

    next();
});

const Appointment = mongoose.model('Appointments', appointmentSchema);

module.exports = Appointment;
