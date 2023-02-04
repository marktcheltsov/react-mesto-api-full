const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const path = require('path');

const cors = require('cors');

const { login, creatUser } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-err');

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')));

const allowedCors = ['http://cheltsovsmesto.nomoredomains.club', 'http://localhost:3000', 'https://cheltsovsmesto.nomoredomains.club'];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

const { PORT = 3000 } = process.env;

const userRouter = require('./routes/userRoutes');

const cardRouter = require('./routes/cardRouter');

const { auth } = require('./middlewares/auth');

app.use(bodyParser.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string(),
  }),
}), creatUser);

app.use(auth);

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  const err = new NotFoundError('указан неправильный путь');
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessage = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(err.statusCode).json({ message: errMessage, status: statusCode });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
