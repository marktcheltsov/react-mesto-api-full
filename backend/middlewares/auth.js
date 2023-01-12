const jwt = require('jsonwebtoken');

const WrongData = require('../errors/wrong-data-err');

const auth = (req, res, next) => {
  const { Authorization } = req.headers;
  if (!Authorization || !Authorization.startsWith('Bearer ')) {
    const err = new WrongData(Authorization);
    next(err);
  }
  const token = Authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    const err = new WrongData([Authorization, token, payload]);
    next(err);
  }
  req.user = payload;

  next();
};

module.exports = {
  auth,
};
