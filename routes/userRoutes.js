const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const patientRouter = require('./patientRoutes');

const router = express.Router();

router.use('/:userId/patients', patientRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.post('/logout', authController.logout);
// protected below
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.patch('/deleteMe', userController.deleteMe);

// admin needs
router.use(authController.restrictTo('admin'));
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
