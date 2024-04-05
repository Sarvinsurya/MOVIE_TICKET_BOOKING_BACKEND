const express = require('express');
const router = express.Router();
const { validateBooking } = require('../validators/bookingValidator');
const { createBooking, getBooking } = require('../services/bookingService');

router.post('/', validateBooking, createBooking);
router.get('/:bookingId', getBooking);

module.exports = router;
