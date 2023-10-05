const express = require ('express');
const app = express()
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3500;
const usersRouter = require('./users/users.router');
const itemsrouter = require('./routes/items');


app.use("/users", usersRouter)
app.use("/items", itemsrouter)

 










app.listen(PORT, () => console.log(`server running on port ${PORT}`));


