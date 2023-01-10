const jwt = require('jsonwebtoken');

const WrongData = require('../errors/wrong-data-err');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new WrongData('Необходима авторизация');
    next(err);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    const err = new WrongData('Необходима авторизация');
    next(err);
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
