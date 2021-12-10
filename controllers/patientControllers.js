const mysql = require('../config/sqlDB');

var getPatientRequestQueue = [];
var getPatientResponseObj = {};

const processGetPatientRequestBatch = () => {
    const maxReqId = Date.now();
    console.log('processGetPatientRequestBatch');
    if (getPatientRequestQueue.length > 0) {
        let req = getPatientRequestQueue[0];
        while (req.id <= maxReqId) {
            console.log(`Request id: ${req.id} is being processed...`);
            getPatientResponseObj[req.id] = {
                message: 'ho gaya' 
            }
            req.status = 'processed';
            [getPatientRequestQueue[0], getPatientRequestQueue[getPatientRequestQueue.length - 1]] = [getPatientRequestQueue[getPatientRequestQueue.length - 1], getPatientRequestQueue[0]];
            getPatientRequestQueue.pop();
            if (getPatientRequestQueue.length > 0) {
                req = getPatientRequestQueue[0];
            } else break;
        }
    }
};

exports.queueGetPatientRequest = (req, res, next) => {
    // console.log('queueGetPatientRequest');
    // req.id = req.params.id + '_' + Date.now();
    req.id = Date.now();
    req.status = 'waiting';
    getPatientRequestQueue.push(req);
    console.log(`Request id: ${req.id} is pushed in queue...`);
    next();
};

exports.batchGetPatientRequest = (req, res, next) => {
    // console.log('batchGetPatientRequest');
    // console.log(`Request id: ${req.id} registered processGetPatientRequestBatch...`);
    setTimeout(processGetPatientRequestBatch, 10);
    next();
};

exports.getPatientResponse = (req, res) => {
    // console.log('getPatientResponse');
    if (req.status == 'processed') {
        // console.log(`Request id: ${req.id} found in processed state...`);
        const res_data = getPatientResponseObj[req.id];
        getPatientResponseObj[req.id] = null;
        res.status(200).json({
            status: 'success',
            data: {
                res_data
            }
        });
    } else {
        // console.log(`Request id: ${req.id} not found in processed state...`);
        setTimeout(exports.getPatientResponse, 10, req, res);
    }
};