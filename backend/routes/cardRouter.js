const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, creatCard, deleteCard, deleteCardLike, addCardLike,
} = require('../controllers/card');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    link: Joi.string().required(),
  }),
}), creatCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', addCardLike);

router.delete('/:cardId/likes', deleteCardLike);

const cardRouter = router;

module.exports = cardRouter;
