function validateBooking(req, res, next) {
    const { userId, movieId, seats } = req.body;
    if (!userId || !movieId || !seats) {
        return res.status(400).json({ message: 'userId, movieId, and seats are required for booking creation' });
    }
    if (typeof seats !== 'number' || seats <= 0) {
        return res.status(400).json({ message: 'Seats must be a positive number' });
    }
    // Add any additional validation rules if needed
    next();
}

module.exports = { validateBooking };
