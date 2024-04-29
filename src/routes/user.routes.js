const {Router } = require('express')
const {upload} = require("../middlewares/multer.middleware")
const { verifyJWT } = require("../middlewares/auth.middleware")
const {registerUser} = require('../controllers/user.controller')



const router = Router();


router.route("/register").post(registerUser)

module.exports = {router}