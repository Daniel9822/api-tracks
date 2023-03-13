const { check } = require('express-validator')
const validateResult = require('../utils/handlerValidate')


const validateCreateItem = [
    check('name', 'Name is required').exists().notEmpty(),
    check('album', 'album is required').exists().notEmpty(),
    check('cover', 'cover is required').exists().isURL().notEmpty(),
    check('artist.name').exists().notEmpty(),
    check('artist.nickname').exists().notEmpty(),
    check('artist.nationality').exists().notEmpty(),
    check('duration.start').exists().notEmpty(),
    check('duration.end').exists().notEmpty(),
    check('mediaId').exists().isMongoId().notEmpty(),
    (req, res, next) => validateResult(req, res, next)
    
]

const validateQueryItem = [
    check('id', 'the param id is required').exists().notEmpty().isMongoId()
]

module.exports = { validateCreateItem, validateQueryItem }