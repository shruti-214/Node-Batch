const mysql = require('../config/sqlDB');

var getPatientRequestQueue = [];
var getPatientResponseObj = {};

const processGetPatientRequestBatch = () => {
    const maxReqId = Date.now();
    let req = getPatientRequestQueue[0];
    console.log('processGetPatientRequestBatch');
    console.log(req.id);
    console.log(req.status);
    while (req.id <= maxReqId) {
        console.log('in while loop');
        getPatientResponseObj[req.id] = {
            message: 'ho gaya' 
        }
        req.status = 'processed';
        getPatientRequestQueue.shift();
        if (getPatientRequestQueue.length > 0) {
            req = getPatientRequestQueue[0];
        } else break;
    }
};

exports.queueGetPatientRequest = (req, res, next) => {
    console.log('queueGetPatientRequest');
    // req.id = req.params.id + '_' + Date.now();
    req.id = Date.now();
    req.status = 'waiting';
    getPatientRequestQueue.push(req);
    next();
};

exports.batchGetPatientRequest = (req, res, next) => {
    console.log('batchGetPatientRequest');
    console.log(req.id);
    console.log(req.status);
    setTimeout(processGetPatientRequestBatch, 1000);
    next();
};

exports.getPatientResponse = (req, res) => {
    console.log('getPatientResponse');
    console.log(req.id);
    console.log(req.status);
    if (req.status == 'processed') {
        const res_data = getPatientResponseObj[req.id];
        getPatientResponseObj[req.id] = null;
        res.status(200).json({
            status: 'success',
            data: {
                res_data
            }
        });
    } else {
        setTimeout(exports.getPatientResponse, 500, req, res);
    }
};