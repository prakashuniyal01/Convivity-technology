const express = require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser")
const {rateLimit } = require('express-rate-limit')
const {logErrors, clientErrorHandler, errorHandler} = require('../src/common/error')


const app = express();
const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // limit each IP to 100 requests per 'windows'
    standardHeaders: 'draft-7', // set `rateLimit` amd rateLimit policy header;;
    legacyHeaders: false, // Disable the X-ratelimit-* header
})


// Apply the ate limiting middleware to API calls only

app.use(cors(
    { origin: process.env.CORS_ORIGIN}
 ))
 // json data
 app.use(express.json({limit: "16kb"}))
 // encode your url data 
 app.use(express.urlencoded({extended: true, limit: "16kb" }))
 // public imgs 
 app.use(express.static("public "))
 // server se cookies ko read krna or access krna crud operation kr sakte h 
 app.use(cookieParser())
 

//  userRouters 
const {userRouter} = require('./routes/user.routes')
const {appRouter} = require('./routes')
 


app.use("/api/v1/user", userRouter)
app.use('/api', appRouter )  // http://localhost:8080/api/v1/task


/**
 * always at the end!
 */

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

module.exports = {app};