const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
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
    nameRU,
    nameEN,
    owner: req.user._id,
    movieId,
  }).then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((next));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найдена');
      } else if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав для удаления данной фильма');
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((delMovie) => res.send(delMovie))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequest('Переданы некорректные данные при удалении фильма'));
          }

          return next(err);
        });
    })
    .catch(next);
};
