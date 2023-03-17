const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const PUBLIC_URL = process.env.PUBLIC_URL;

const getItems = async (req, res) => {
    try {
        const searchData = await storageModel.find({});
        return res.status(200).send({data: searchData});
    } catch (error) {
        handleHttpError(res, "ERROR_GET_ITEM", 500);
    }
};

const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const searchData = await storageModel.findById({ _id: id });
        return res.status(200).send({data: searchData});
    } catch (error) {
        console.log(error.message);
        handleHttpError(res, "ERROR_GET_ITEMS", 404);
    }
};

const createItem = async (req, res) => {
    const { file } = req;
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.status(201)
    res.send({ data });
};

const updateItem = (req, res) => {};

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const searchData = await storageModel.delete({ _id: id });
        return res.status(200).send(searchData);
    } catch (error) {
        handleHttpError(res, "ERROR_DELETE_ITEM", 500);
    }
};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
