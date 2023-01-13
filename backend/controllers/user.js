const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const NotFoundError = require('../errors/not-found-err');
const ValidationErr = require('../errors/validation-err');
const IncomprehensibleErr = require('../errors/incomprehensible-err');
const WrongData = require('../errors/wrong-data-err');
const DataAuthErr = require('../errors/data-auth-err');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (e) {
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const creatUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
      id: user._id,
    }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        console.log(e);
        const err = new ValidationErr('Переданы некорректные данные при создани');
        next(err);
      }
      if (e.code === 11000) {
        const err = new DataAuthErr('пользователь с такой почтой уже есть');
        next(err);
      }
      console.error(e);
      const err = new IncomprehensibleErr('произошла ошибка');
      next(err);
    });
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      const err = new NotFoundError('Запрашиваемый пользователь не найден');
      return next(err);
    }
    return res.status(200).json(user);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new ValidationErr('Переданы некорректные данные');
      return next(err);
    }
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const updateUserAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new NotFoundError('Запрашиваемый пользователь не найден');
      return next(err);
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new ValidationErr('Переданы некорректные данные при создани');
      return next(err);
    }
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new NotFoundError('Запрашиваемый пользователь не найден');
      return next(err);
    }
    return res.status(200).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new ValidationErr('Переданы некорректные данные при создани');
      return next(err);
    }
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      const err = new WrongData('Неправильные почта или пароль');
      return next(err);
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      const err = new WrongData('Неправильные почта или пароль');
      return next(err);
    }
    const token = jwt.sign(
      { _id: user._id },
      'some-secret-key',
      { expiresIn: '7d' },
    );
    return res.status(200).json([token, user._id]);
  } catch (e) {
    console.log(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

module.exports = {
  getUsers,
  creatUser,
  getUser,
  updateUser,
  updateUserAvatar,
  login,
};
