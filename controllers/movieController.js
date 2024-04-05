const express = require('express');
const router = express.Router();
const { validateMovie } = require('../validators/movieValidator');
const { createMovie, getMovie, getAllMovies } = require('../services/movieService');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, validateMovie, createMovie);
router.get('/:movieId', getMovie);
router.get('/', getAllMovies);

module.exports = router;
