const express = require("express");
const { validationResult } = require("express-validator");

module.exports = (Joke) => {
    const router = express.Router();

    router.post("/add", async (req, res) => {
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
            res.json(joke);
        } catch (error) {
            return res.status(422).json({
                errors: {
                    message: error,
                },
            });
        }
    });

    router.get("/blagues", async (req, res) => {
        const jokes = await Joke.findAll();
        res.json(jokes);
    });

    return router;
};