const express = require('express');
const doctorController = require('../controllers/doctorController');

const router = express.Router();

router.route('/doctor-stats').get(doctorController.getDoctorStats);

router
    .route('/')
    .get(doctorController.getAllDoctors)
    .post(doctorController.createDoctor);

router
    .route('/:id')
    .get(doctorController.getDoctor)
    .patch(doctorController.updateDoctor)
    .delete(doctorController.deleteDoctor);

module.exports = router;
