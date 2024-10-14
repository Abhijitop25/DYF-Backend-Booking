const { createBooking } = require('../repository/booking-repository.js');
const { FLIGHT_SERVICE_URL } = require('../config/server-config.js');
const axios = require('axios');
const ServiceError = require('../utils/errors/service-error.js');

async function createBookingService(data) {
    try{
        const flightId = data.flightId;
        const getFlightUrl = `${FLIGHT_SERVICE_URL}/api/v1/xyz/${flightId}`;
        console.log(getFlightUrl);
        const response = await axios.get(getFlightUrl);
        const flight = response.data.data;
        let priceOfFlight = flight.price;
        if(data.noOfSeats > flight.totalSeats) {
            throw new ServiceError('Somthing went wrong in the booking process', 'Insufficient seats');
        }
        const totalCost = priceOfFlight*data.noOfSeats;
        const bookingPayload = {...data, totalCost};
        const booking = await createBooking(bookingPayload);
        const updateFlightRequestURL = `${FLIGHT_SERVICE_URL}/api/v1/flights/${flightId}`;
        await axios.patch(updateFlightRequestURL, { totalSeats: flight.totalSeats - data.noOfSeats });
        booking.status = 'Booked';
        await booking.save();
        return booking;
    } catch(error){
        if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
            throw error;
        }
        throw new ServiceError();
    }
}

module.exports = {
    createBookingService
}