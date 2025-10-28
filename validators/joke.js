const {body, param} = require("express-validator")

const validator__post = [
    body("question").exists().notEmpty().isString(),
    body("response").exists().notEmpty().isString()
]

const validator_blagues_id__get =  [
    param("id").exists().notEmpty().isNumeric()
]

module.exports = {
    validator__post,
    validator_blagues_id__get
}