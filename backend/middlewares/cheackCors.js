const allowedCors = ['http://cheltsovsmesto.nomoredomains.club', 'http://localhost:3000'];

const cheakCors = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const reqHeaders = req.headers['Access-Control-Request-Headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', reqHeaders);
    return res.end();
}
  next();
};

module.exports = cheakCors;
