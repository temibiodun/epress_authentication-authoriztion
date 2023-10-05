const fs = require('fs')


const createUser = (req, res) =>{
    const usersData = fs.readFileSync("./db/users.json")
    const usersDB = JSON.parse(usersData)
    const newUser = req.body
    newUser.api_key = `${newUser.username}_${newUser.password}`

    if(newUser.username === "Temitope"){
        newUser.user_type = "admin"
    }
    else{newUser.user_type = "user"}

    usersDB.push(newUser)

    
    fs.writeFileSync("./db/users.json", JSON.stringify(usersDB))
    res.status(200).json(newUser)


}
module.exports={createUser}