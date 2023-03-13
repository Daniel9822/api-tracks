const express = require("express");
const { createItem, getItem, getItems, deleteItem } = require("../controllers/storage");
const uploadMiddleware = require("../utils/handleUpload");
const { validateQueryItem } = require('../validators/tracks')
const router = express.Router();


router.get('/', getItem)
router.get('/:id', validateQueryItem, getItems)
router.post('/',uploadMiddleware.single('myfile'), validateQueryItem, createItem)
router.delete('/:id', validateQueryItem, deleteItem)

module.exports = router;
