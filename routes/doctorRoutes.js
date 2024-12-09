const express = require('express');
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController');
const appointmentRouter = require('./appointmentRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:doctorId/appointments', appointmentRouter);

router.route('/doctor-stats').get(doctorController.getDoctorStats);

// protected below
router.use(authController.protect);
router
    .route('/')
    .get(doctorController.getAllDoctors)
    .post(authController.restrictTo('admin'), doctorController.createDoctor);

router
    .route('/:id')
    .get(doctorController.getDoctor)
    .patch(
        authController.restrictTo('admin', 'doctor'),
        doctorController.updateDoctor
    )
    .delete(doctorController.deleteDoctor);

module.exports = router;