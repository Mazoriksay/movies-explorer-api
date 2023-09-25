const allowedCors = [
  'http://movies-explorer.skif.nomoredomainsicu.ru',
  'https://movies-explorer.skif.nomoredomainsicu.ru',
  'http://api.movies-explorer.skif.nomoredomainsicu.ru',
  'https://api.movies-explorer.skif.nomoredomainsicu.ru',
  'http://localhost:3000',
  'https://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PATCH,POST,DELETE,PUT';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
