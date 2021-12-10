const mysql = require('../config/sqlDB');

// exports.isValidId = (req, res, next, id) => {
//     console.log('isValidId');
//     // code
//     next();
// };

// var getTourRequestQueue = [];

// exports.pushGetTourRequest = (req, res) => {

// };

exports.getAllTours = async (req, res) => {
    console.log('getAllTours');
    let query = 'SELECT * FROM tours';
    const sqlConnection = await mysql.getConnection();
    const [result, fields] = await sqlConnection.execute(query);
    console.log(result);
    res.status(200).json({
        status: 'success',
        data: {
            tours: result
        }
    });
    
};

exports.createTour = async (req, res) => {
    console.log('createTour');
    let query = 'INSERT INTO tours (name, price) VALUES ?';
    let values = [[req.body.name, req.body.price]];
    const sqlConnection = await mysql.getConnection();
    const [result] = await sqlConnection.execute(query, [values]);
    console.log(result);
    res.status(201).json({
        status: 'success',
        data: {
            tourId: result.insertId
        }
    });
};

exports.getTour = async (req, res) => {
    console.log('getTour');
    let query = 'SELECT * FROM tours WHERE id = ?';
    const sqlConnection = await mysql.getConnection();
    const [result] = await sqlConnection.execute(query, [req.params.id]);
    console.log(result);
    res.status(200).json({
        status: 'success',
        data: {
            tour: result
        }
    });
};

exports.updateTour = (req, res) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success'
    });
};