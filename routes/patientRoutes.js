const express = require('express');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const appointmentRouter = require('./appointmentRoutes');

const router = express.Router();

router.use('/:patientId/appointments', appointmentRouter);

router.use(authController.protect);
router
    .route('/')
    .get(authController.restrictTo('admin'), patientController.getAllPatients)
    .post(patientController.createPatient);

router
    .route('/:id')
    .get(patientController.getPatient)
    .patch(patientController.updatePatient);

router.route('/deletePatient/:id').patch(patientController.deletePatient);

module.exports = router;
