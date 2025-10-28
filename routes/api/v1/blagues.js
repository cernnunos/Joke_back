const express = require("express");
const { validationResult } = require("express-validator");
const { validator__post, validator_blagues_id__get } = require("../../../validators/joke");
const { Sequelize } = require("sequelize");

module.exports = (Joke) => {
    const router = express.Router();

    /**
     * @swagger
     * /api/v1/blagues/:
     *   post:
     *     summary: Ajoute une nouvelle blague
     *     description: Crée une nouvelle blague avec une question et une réponse.
     *     tags: [Blagues]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - question
     *               - response
     *             properties:
     *               question:
     *                 type: string
     *                 example: Pourquoi les développeurs détestent-ils la nature ?
     *               response:
     *                 type: string
     *                 example: Parce qu’il y a trop de bugs
     *     responses:
     *       201:
     *         description: Blague créée avec succès
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: integer
     *                   example: 5
     *                 question:
     *                   type: string
     *                   example: Pourquoi les développeurs détestent-ils la nature ?
     *                 response:
     *                   type: string
     *                   example: Parce qu’il y a trop de bugs
     *                 createdAt:
     *                   type: string
     *                   example: 2025-10-28T12:00:00.000Z
     *       422:
     *         description: "Une erreur est survenue lors de la récupération."
     */
    router.post("/", validator__post, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { body: { question, response }, } = req;
            const joke = await Joke.create({
                question,
                response
            });
            res.status(201).json(joke);
        } catch (error) {
            return res.status(422).json({
                errors: {
                    message: "Une erreur est survenue lors de la récupération.",
                },
            });
        }
    });

    /**
 * @swagger
 * /api/v1/blagues/:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   question:
 *                     type: string
 *                     example: Pourquoi les développeurs détestent-ils la nature ?
 *                   response:
 *                     type: string
 *                     example: Parce qu’il y a trop de bugs
 */
    router.get("/", async (req, res) => {
        const jokes = await Joke.findAll();
        res.json(jokes);
    });

    /**
* @swagger
* /api/v1/blagues/random:
*   get:
*     summary: Récupère une blague au hasard
*     tags: [Blagues]
*     responses:
*       200:
*         description: Une blague au hasard
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 id:
*                   type: integer
*                   example: 1
*                 question:
*                   type: string
*                   example: Pourquoi les développeurs détestent-ils la nature ?
*                 response:
*                   type: string
*                   example: Parce qu’il y a trop de bugs
*/
    router.get("/random", async (req, res) => {
        try {
            const joke = await Joke.findOne({
                order: Sequelize.literal("RANDOM()")
            });
            res.json(joke)
        } catch (error) {
            return res.status(422).json({
                errors: {
                    message: error,
                },
            });
        }
    })

    /**
 * @swagger
 * /api/v1/blagues/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     description: Retourne une blague spécifique en fonction de son identifiant unique.
 *     tags: [Blagues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID unique de la blague à récupérer
 *     responses:
 *       200:
 *         description: Blague trouvée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 question:
 *                   type: string
 *                   example: Pourquoi les développeurs détestent-ils la nature ?
 *                 response:
 *                   type: string
 *                   example: Parce qu’il y a trop de bugs !
 *                 createdAt:
 *                   type: string
 *                   example: 2025-10-28T12:00:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   example: 2025-10-28T12:00:00.000Z
 *       404:
 *         description: Aucune blague trouvée avec cet ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Blague introuvable.
 *       422:
 *         description: Erreur serveur inattendue
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Une erreur est survenue lors de la récupération.
 */
    router.get("/:id", validator_blagues_id__get, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const joke = await Joke.findByPk(req.params.id);

            if (!joke) {
                return res.status(404).json({ error: "Blague introuvable." });
            }

            res.json(joke);
        } catch (error) {
            return res.status(422).json({
                errors: {
                    message: "Une erreur est survenue lors de la récupération."
                },
            });
        }
    });

    return router;
};