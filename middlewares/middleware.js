const express = require('express');
const fs = require('fs')

const checkApi_key = (req, res, next) =>{
    const usersData = fs.readFileSync("./db/users.json")
    const userDB = JSON.parse(usersData)
    const apikey = req.headers.api_key;
    

    if (!apikey) {
        return res.status(401).json({
            status: "error",
            message: "Api key is required"
        })
    }
    const foundUser = userDB.find((user) => user.api_key === apikey)
    if (!foundUser) {
        return res.status(401).json({
            status: "error",
            message: "Invalid Api key"
        })
    }
    next()
}

const checkAdmin = (req, res, next) =>{
    const usersData = fs.readFileSync("./db/users.json")
    const userDB = JSON.parse(usersData)
    const apikey = req.headers.api_key;
    

    if (!apikey) {
        return res.status(401).json({
            status: "error",
            message: "Api key is required"
        })
    }
    const foundUser = userDB.find((user) => user.api_key === apikey)
    if (!foundUser) {
        return res.status(401).json({
            status: "error",
            message: "Invalid Api key"
        })
    }
    if (foundUser.user_type !== "admin") {
        return res.status(403).json({
            status: "error",
            message: "You are not authorized to perform this operation"
        })
    }
    next()
}

//check items

const checkItem = (req, res, next) =>{
    const itemsData = fs.readFileSync("./db/items.json")
    const itemDB = JSON.parse(itemsData)
    const itemname = req.body.name;
    

    if (!itemname) {
        return res.status(401).json({
            status: "error",
            message: "Item name is required"
        })
    }
    const foundItem = itemDB.find((item) => item.name === itemname)
    if (foundItem) {
        return res.status(409).json({
            status: "error",
            message: "Item already exists"
        })
    }
    next()
}





module.exports = {
    checkApi_key,
    checkAdmin,
    checkItem
}