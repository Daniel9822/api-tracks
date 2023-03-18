const express = require("express");
const {
    createItem,
    getItem,
    getItems,
    deleteItem,
} = require("../controllers/storage");
const { checkSession } = require("../middleware/checkSession");
const uploadMiddleware = require("../utils/handleUpload");
const { validateQueryItem } = require("../validators/tracks");
const router = express.Router();


/**
 * Get all storages
 * @openapi
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "list files"
 *      description: Get all file list
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        '200':
 *          description: Return the list of files.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/storage'
 *        '422':
 *          description: Error validation.
 */
router.get("/",checkSession, getItems);


/**
 * http://localhost:3001/api
 * 
 * Route register new user
 * @openapi
 * /storage/{id}:
 *      post:
 *          tags:
 *              - storage
 *          summary: "get all items storage"
 *          description: "storage"
 *          security:
 *              - BearerAuth: []
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/storage"
 *          parameters:
 *          - name: id
 *            in: path
 *            description: get a specific file by id
 *            required: true
 *          responses:
 *                  '200':
 *                      description: receive all files
 *                  '403':
 *                      description: validation error
 */
router.get("/:id", checkSession, validateQueryItem, getItem);


/**
 * Upload file
 * @openapi
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Upload file"
 *      description: Upload a new file
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return the object insert in the collection.
 *        '422':
 *          description: Error validation.
 *      requestBody:
 *        content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               myfile:
 *                 type: string
 *                 format: binary
 *    responses:
 *      '201':
 *        description: Return the object insert in the collection with status '201'
 *      '403':
 *        description: user without permission '403'
 */
router.post(
    "/",
    checkSession,
    uploadMiddleware.single("myfile"),
    validateQueryItem,
    createItem
);



/**
 * Delete storage
 * @openapi
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "Delete a file"
 *      description: Delete the detail a file
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        description: ID the music
 *        required: true
 *        schema:
 *          type: string
 *      responses:
 *        '200':
 *          description: Return a object the storage.
 *        '422':
 *          description: Error validation.
 */
router.delete("/:id",checkSession, validateQueryItem, deleteItem);

module.exports = router;
