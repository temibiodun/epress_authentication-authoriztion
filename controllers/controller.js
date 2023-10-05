const fs = require('fs')

//post item

const postItem = (req, res) => {
    const itemsDB = fs.readFileSync("../db/items.json")
    const items = JSON.parse(itemsDB)
    const ItemTopost = req.body

    const lastId = items[items.lenght-1].id
    const newId = lastId +1;

   const postWithId = {...ItemTopost, id:newId} 
   items.push(postWithId)

    fs.writeFileSync("./db/items.json", JSON.stringify(items), (err)=>{
        if (err){
            return res.status(500)
        
        }
        res.status(200).JSON(postWithId)
    })
}   

//get all items
const getItems = (req, res) => {
    const items = fs.readFileSync("./db/items.json")
    res.status(200).send(items)
}

//get one item
const getoneItem = (req, res) => {
    const items = fs.readFileSync("./db/items.json")
    const itemId = req.params.id
    const foundItem = items.find((item) => item.id === itemId)
    if (!foundItem) {
        return res.status(404).json({
            status: "error",
            message: "Item not found"
        })
    }
    res.status(200).json(foundItem)
}

//update item
const updateItem = (req, res) => {
    const items = fs.readFileSync("./db/items.json")
    const itemId = req.params.id
    const foundItem = items.find((item) => item.id === itemId)
    if (!foundItem) {
        return res.status(404).json({
            status: "error",
            message: "Item not found"
        })
    }
    const updatedItem = {...foundItem, ...req.body}
    const itemIndex = items.indexOf(foundItem)
    items[itemIndex] = updatedItem
    fs.writeFileSync("./db/items.json", JSON.stringify(items), (err)=>{
        if (err){
            return res.status(500)
        
        }
        res.status(200).JSON(updatedItem)
    })
}

//delete item
const deleteItem = (req, res) => {
    const items = fs.readFileSync("./db/items.json")
    const itemId = req.params.id
    const foundItem = items.find((item) => item.id === itemId)
    if (!foundItem) {
        return res.status(404).json({
            status: "error",
            message: "Item not found"
        })
    }
    const itemIndex = items.indexOf(foundItem)
    items.splice(itemIndex, 1)
    fs.writeFileSync("./db/items.json", JSON.stringify(items), (err)=>{
        if (err){
            return res.status(500)
        
        }
        res.status(200).JSON(foundItem)
    })
}
module.exports = {getItems, getoneItem,  updateItem, deleteItem};

