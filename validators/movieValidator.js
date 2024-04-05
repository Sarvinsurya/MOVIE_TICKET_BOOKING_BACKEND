function validateMovie(req, res, next) {
    const { title, genre, duration, releaseDate } = req.body;
    if (!title || !genre || !duration || !releaseDate) {
        return res.status(400).json({ message: 'Title, genre, duration, and releaseDate are required for movie creation' });
    }
    if (typeof duration !== 'number' || duration <= 0) {
        return res.status(400).json({ message: 'Duration must be a positive number' });
    }
    // Add any additional validation rules if needed
    next();
}

module.exports = { validateMovie };
