const router = require('express').Router();

const {
  getCards, creatCard, deleteCard, deleteCardLike, addCardLike,
} = require('../controllers/card');

router.get('/', getCards);

router.post('/', creatCard);

router.delete('/:cardId', deleteCard);

router.put('/:cardId/likes', addCardLike);

router.delete('/:cardId/likes', deleteCardLike);

const cardRouter = router;

module.exports = cardRouter;
