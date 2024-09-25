const { Booking } = require('../models/index.js');
const { ValidationError } = require('../utils/errors/validation-error.js');
const { AppError } = require('../utils/errors/app-error.js');
const { StatusCodes } = require('http-status-codes');


const createBooking = async (data) => {
    try{
        const booking = await Booking.create(data);
        return booking;
    } catch(error){
        if(error.name == 'SequelizeValidationError') {
            throw new ValidationError(error);
        }
        throw new AppError(
            'Repository Error',
            'Cannot Create Booking',
            'There was some issue creating the booking, please try again later',
            StatusCodes.INTERNAL_SERVER_ERROR
        )
    }
}

module.exports = { createBooking };