const express = require("express")
const bodyParser = require('body-parser')
const controller = require ('../controllers/controller')
const middleware = require ('../middlewares/middleware')
const itemsrouter = express.Router()

itemsrouter.use(bodyParser.json())

itemsrouter.get('/', middleware.checkApi_key, controller.getItems)
itemsrouter.get('/:id', middleware.checkApi_key, controller.getoneItem)
itemsrouter.post('/', middleware.checkApi_key, middleware.checkAdmin, middleware.checkItem, controller.updateItem)
itemsrouter.put('/:id', middleware.checkApi_key, middleware.checkAdmin, controller.updateItem)
itemsrouter.delete('/:id', middleware.checkApi_key, middleware.checkAdmin, controller.deleteItem)




module.exports=itemsrouter;