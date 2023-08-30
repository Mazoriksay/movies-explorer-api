const rateLimit = require('express-rate-limit');

module.exports.rateLimiter = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Было сделано слишком много запросов с вашего IP, попробуйте позже',
});
