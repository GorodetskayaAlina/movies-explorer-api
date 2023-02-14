const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationCreateMovie, validationMovieID } = require('../middlewares/validation');

// роуты фильмов
router.get('/movies', getMovies);
router.post('/movies', validationCreateMovie, createMovie);
router.delete('/movies/:_id', validationMovieID, deleteMovie);

module.exports = router;