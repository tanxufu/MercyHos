const express = require('express');
const authController = require('../controllers/authController');
const patientController = require('../controllers/patientController');
const appointmentRouter = require('./appointmentRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:patientId/appointments', appointmentRouter);

router.use(authController.protect);
router
    .route('/')
    .get(patientController.getAllPatients)
    .post(patientController.setUserId, patientController.createPatient);

router
    .route('/:id')
    .get(patientController.getPatient)
    .patch(patientController.updatePatient)
    .delete(patientController.deletePatientAdmin);

router.route('/deletePatient/:id').patch(patientController.deletePatient);

module.exports = router;
