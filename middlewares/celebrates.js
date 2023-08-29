const { celebrate, Joi } = require('celebrate');
const { regexLink, regexEmail } = require('../utils/constants');

module.exports.createMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(3),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexLink),
    trailerLink: Joi.string().required().regex(regexLink),
    thumbnail: Joi.string().required().regex(regexLink),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports.updateUserInfo = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(regexEmail),
    name: Joi.string().required().min(2).max(30),
  }),
});
