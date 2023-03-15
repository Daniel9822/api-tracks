const { tracksModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");

/**
 * obtener un item
 * @param {*} req
 * @param {*} res
 */
const getItem = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await tracksModel.findOneData(id);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM", 404);
    }
};

/**
 * obtener todos los items
 * @param {*} req
 * @param {*} res
 */
const getItems = async (req, res) => {
    try {
        const data = await tracksModel.findAllData();
        res.send({ data });
    } catch (error) {
        console.log(error)
        handleHttpError(res, "ERROR_GET_ITEMS", 500);
    }
};

/**
 * crear item
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req);
        const data = await tracksModel.create(body);
        res.send({ data });
    } catch (error) {
        handleHttpError(res, "ERROR_CREATE_ITEM");
    }
};

/**
 * actualizar item
 * @param {*} req
 * @param {*} res
 */
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req);
        const updateTrack = await tracksModel.findByIdAndUpdate(id, body, {
            new: true,
        });

        return res.send(updateTrack);
    } catch (error) {
        handleHttpError(res, "ERROR_UPDATE_ITEM", 500);
    }
};

/**
 * eliminar item
 * @param {*} req
 * @param {*} res
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const findAndDelete = await tracksModel.delete({ _id: id });
        return res.send(findAndDelete);
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM", 500);
    }
};

const restoreItem = async (req, res) => {
    try {
        const { id } = req.params;
        const restore = await tracksModel.restore({ _id: id });
        res.send(restore);
    } catch (error) {
        handleHttpError(res, "ERROR_RESTORE_ITEM", 404);
    }
};

module.exports = {
    getItem,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    restoreItem,
};
