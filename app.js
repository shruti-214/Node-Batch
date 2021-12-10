const express = require('express');
const tourRouter = require('./routes/tourRoutes');
const patientRouter = require('./routes/patientRoutes');

const app = express();
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/patients', patientRouter);

module.exports = app;