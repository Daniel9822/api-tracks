const express = require("express");
const {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
    restoreItem,
} = require("../controllers/tracks");
const {
    validateCreateItem,
    validateQueryItem,
} = require("../validators/tracks");

const { checkSession } = require("../middleware/checkSession");

const router = express.Router();

/**
 *
 * @openapi
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Get all tracks"
 *      description: Get all tracks
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        '200':
 *          description: Return the list of tracks.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error validation.
 */
router.get("/", checkSession, getItems);

/**
 *
 * @openapi
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Get all tracks"
 *      description: Get all tracks
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *      responses:
 *        '200':
 *          description: Return the track by id.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error validation.
 */
router.get("/:id",checkSession, validateQueryItem, getItem);

/**
 *
 * @openapi
 * /tracks/restore/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Get all tracks"
 *      description: Get all tracks
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *      responses:
 *        '200':
 *          description: Return the track restored.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error validation.
 *        '401':
 *          description: Unauthorized user
 */
router.patch("/restore/:id", checkSession, restoreItem);

/**
 *
 * @openapi
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Create a track"
 *      description: Create a new track
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/track"
 *      responses:
 *        '200':
 *          description: Return tracks created.
 *        '422':
 *          description: Error validation.
 *        '401':
 *          description: Unauthorized user
 */
router.post("/",checkSession, validateCreateItem, createItem);

/**
 * Get all storages
 * @openapi
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Update track"
 *      description: Update track
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/track"
 *      responses:
 *        '200':
 *          description: Return the track updated.
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/track'
 *        '422':
 *          description: Error validation.
 *        '401':
 *          description: Unauthorized user
 */
router.put("/:id",checkSession, validateQueryItem, validateCreateItem, updateItem);

/**
 * Get all storages
 * @openapi
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Delete a track"
 *      description: Delete one track
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *      responses:
 *        '200':
 *          description: Return the track deleted.
 *        '422':
 *          description: Error validation.
 *        '401':
 *          description: Unauthorized user
 */
router.delete("/:id",checkSession, validateQueryItem, deleteItem);

module.exports = router;
