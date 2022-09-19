import {body} from 'express-validator'

export const registerValidation = [
  body('email', 'wrong email').isEmail(),
  body('password', 'min 5 symbols').isLength({min: 5}),
  body('fullname', 'min 3 symbols').isLength({min: 3}),
  body('avatarURL', 'wrong link').optional().isURL()
];

export const loginValidation = [
  body('email', 'wrong email').isEmail(),
  body('password', 'min 5 symbols').isLength({min: 5}),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
  body('text', 'Введите текст статьи').isLength({min: 3}).isString(),
  body('tags', 'Неверный формат тэгов').optional().isString(),
  body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
];

