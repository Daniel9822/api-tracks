const express = require("express");
const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    restoreItem,
} = require("../controllers/tracks");
const { checkSession } = require("../middleware/checkSession");
const { validateCreateItem, validateQueryItem } = require("../validators/tracks");


const router = express.Router();

router.get("/",checkSession, getItems);
router.get("/:id", validateQueryItem, getItem);
router.get('/restore/:id', restoreItem)
router.post("/", validateCreateItem, createItem);
router.put("/:id", validateQueryItem,validateCreateItem, updateItem);
router.delete("/:id", validateQueryItem, deleteItem);

module.exports = router;
