const Card = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const ValidationErr = require('../errors/validation-err');
const IncomprehensibleErr = require('../errors/incomprehensible-err');
const AccessErr = require('../errors/access-err');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    return res.status(200).json(cards);
  } catch (e) {
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const creatCard = async (req, res, next) => {
  req.body.owner = req.user._id;
  try {
    const card = await Card.create(req.body);
    return res.status(201).json(card);
  } catch (e) {
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new ValidationErr('Переданы некорректные данные при создании');
      return next(err);
    }
    console.log(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      const err = new NotFoundError('Запрашиваемая карточка не найдена');
      return next(err);
    }
    if (card.owner._id.toString() !== req.user._id) {
      const err = new AccessErr('у вас нет прав на это');
      return next(err);
    }
    card.remove();
    return res.status(200).json(card);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new ValidationErr('Переданы некорректные данные при создании');
      return next(err);
    }
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const deleteCardLike = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      const err = new NotFoundError('Запрашиваемая карточка не найдена');
      return next(err);
    }
    return res.status(200).json(card);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new ValidationErr('Переданы некорректные данные');
      return next(err);
    }
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new ValidationErr('Переданы некорректные данные при создании');
      return next(err);
    }
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

const addCardLike = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      const err = new NotFoundError('Запрашиваемая карточка не найдена');
      return next(err);
    }
    return res.status(200).json(card);
  } catch (e) {
    if ((e.name === 'CastError') || (e.name === 'TypeError')) {
      console.error(e);
      const err = new ValidationErr('Переданы некорректные данные');
      return next(err);
    }
    if (e.name === 'ValidationError') {
      console.log(e);
      const err = new ValidationErr('Переданы некорректные данные при создании');
      return next(err);
    }
    console.error(e);
    const err = new IncomprehensibleErr('произошла ошибка');
    return next(err);
  }
};

module.exports = {
  getCards,
  creatCard,
  deleteCard,
  deleteCardLike,
  addCardLike,
};
