const express = require('express')
const controller = require ('./users.controller')
const middleware = require('./users.middleware')
const bodypaser = require ('body-parser')

const userRouter = express.Router()

userRouter.use(bodypaser.json())

userRouter.post("/", middleware.checkBody, controller.createUser)



module.exports = userRouter