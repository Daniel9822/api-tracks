const express = require('express')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks')

const router = express.Router()

router.get('/', getItems)
router.get('/:id', getItem)
router.post('/', createItem)
router.put('/', updateItem)
router.delete('/', deleteItem)


module.exports = router