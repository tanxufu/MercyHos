const express = require('express');
const doctorController = require('../controllers/doctorController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/doctor-stats').get(doctorController.getDoctorStats);

router
    .route('/')
    .get(authController.protect, doctorController.getAllDoctors)
    .post(doctorController.createDoctor);

router
    .route('/:id')
    .get(doctorController.getDoctor)
    .patch(doctorController.updateDoctor)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        doctorController.deleteDoctor
    );

module.exports = router;
