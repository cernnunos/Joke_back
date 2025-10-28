const {body} = require("express-validator")

const validator_add__post = [
    body("question && response").exists().notEmpty().isString()
]

module.exports = {
    validator_add__post
}