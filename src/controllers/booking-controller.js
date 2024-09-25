const { createBookingService } = require('../services/booking-service.js');

const  { StatusCodes }  = require('http-status-codes');

const create = async (req, res) => {
    try{
        const response = await createBookingService(req.body);
        return res.status(200).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        }) 
    } catch(error){
        return res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        }) 
    }
}

module.exports = {
    create
}