const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const UnAuthError = require('../errors/unauth-error');
const SECRET_CODE = require('../utils/config');

const auth = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnAuthError('Необходима авторизация!');
  }
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_CODE);
  } catch (err) {
    next(new UnAuthError('Необходима авторизация!'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
