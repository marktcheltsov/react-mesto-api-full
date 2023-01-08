const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const path = require('path');

const { login, creatUser } = require('./controllers/user');

const NotFoundError = require('./errors/not-found-err');

const app = express();

app.use(express.static(path.join(__dirname, '../frontend/public')));

const { PORT = 3000 } = process.env;

const userRouter = require('./routes/userRoutes');

const cardRouter = require('./routes/cardRouter');

const { auth } = require('./middlewares/auth');

app.use(bodyParser.json());

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
  }),
}), creatUser);

app.use(auth);

app.use('/users', userRouter);

app.use('/cards', cardRouter);

app.use('*', (req, res, next) => {
  const err = new NotFoundError('указан неправильный путь');
  console.log(path.join(__dirname, 'public'));
  next(err);
});

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ message: err.message, status: err.statusCode });
  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
}, () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
