const movieRouter = require('express').Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const celebrates = require('../middlewares/celebrates');

movieRouter.post('/', celebrates.createMovie, createMovie);
movieRouter.delete('/:movieId', celebrates.deleteMovie, deleteMovie);
movieRouter.get('/', getMovies);

module.exports = movieRouter;
