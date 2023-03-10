const { tracksModel } = require('../models')



/**
 * obtener un item
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    const { id } = req.params

    const data = await tracksModel.findById({_id: id})
    res.send({data})

};

/**
 * obtener todos los items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    const data = await tracksModel.find()
    res.send({data})
};

/**
 * crear item
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    const { body } = req;

    const data = await tracksModel.create(body)
    res.send({data})

};

/**
 * actualizar item
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) => {};

/**
 * eliminar item
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) => {};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
