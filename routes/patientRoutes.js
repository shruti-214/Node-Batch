const express = require('express');
const patientController = require('../controllers/patientControllers');

const router = express.Router();

// router
//     .route('/')
//     .get(patientController.getAllPatients)
//     .post(patientController.createPatient);

router
    .route('/:id')
    .get(
        patientController.queueGetPatientRequest,
        patientController.batchGetPatientRequest,
        patientController.getPatientResponse
    );
    // .patch(patientController.updatePatient)
    // .delete(patientController.deletePatient);

module.exports = router;