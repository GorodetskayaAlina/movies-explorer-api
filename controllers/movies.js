const Movie = require('../models/movie');
const {
  STATUS_OK,
} = require('../constants');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

// возвращает все сохранённые текущим  пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({
    owner: req.user._id,
  })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch(next);
};

// создаёт фильм
module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail,
    movieId, nameRU, nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.status(STATUS_OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else { next(err); }
    });
};

// удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм не найден'));
      } else if (movie.owner.valueOf() !== req.user._id) {
        next(new ForbiddenError('Нельзя удалить чужой фильм'));
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((deletedMovie) => { res.status(STATUS_OK).send(deletedMovie); })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
