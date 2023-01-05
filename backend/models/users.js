const mongoose = require('mongoose');

const { default: isEmail } = require('validator/lib/isEmail');
const { default: isURL } = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: 2,
    maxlength: 30,
  },

  about: {
    type: String,
    default: 'Исследователь',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => isURL(url),
      message: (url) => `${url} не прошел валидацию`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: (email) => `${email} не прошел валидацию`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
