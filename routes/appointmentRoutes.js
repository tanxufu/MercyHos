const express = require('express');
const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
    .route('/')
    .get(
        authController.restrictTo('admin'),
        appointmentController.getAllAppointments
    )
    .post(
        authController.restrictTo('admin', 'doctor'),
        appointmentController.setDoctorPatientIds,
        appointmentController.createAppointment
    );

router
    .route('/:id')
    .get(appointmentController.getAppointment)
    .patch(
        authController.restrictTo('admin', 'doctor'),
        appointmentController.updateAppointment
    )
    .delete(
        authController.restrictTo('admin'),
        appointmentController.deleteAppointment
    );

module.exports = router;
