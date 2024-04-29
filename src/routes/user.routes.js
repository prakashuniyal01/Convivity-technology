const {Router } = require('express')
const { verifyJWT } = require("../middlewares/auth.middleware")
const {registerUser, loginUser,logoutUser, refreshAccessToken, changeCurrentPassword, updateAccountDetails, getCurrentUser } = require('../controllers/user.controller')



const userRouter = Router();


userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route('/logout').post(verifyJWT, logoutUser)
userRouter.route("/refresh-token").post(refreshAccessToken)
userRouter.route("/change-Password").post(verifyJWT, changeCurrentPassword)
userRouter.route("/current-user").get(verifyJWT, getCurrentUser)
userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails)


module.exports = {userRouter}