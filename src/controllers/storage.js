const { storageModel } = require("../models");

const PUBLIC_URL = process.env.PUBLIC_URL;

const getItem = (req, res) => {};
const getItems = (req, res) => {};


const createItem = async (req, res) => {
    const { file } = req;
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
    };
    const data = await storageModel.create(fileData);
    res.send({ data });
};


const updateItem = (req, res) => {};
const deleteItem = (req, res) => {};

module.exports = { getItem, getItems, createItem, updateItem, deleteItem };
