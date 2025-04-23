const express = require('express');
const app = express();
const UserRouter = require('./routers/userRouter'); //importing user router
const cors = require('cors');

//creating new express app

const port = 5000;

//middleware
app.use(cors({ origin : "*" }))
app.use(express.json()) //to parse json data
app.use('/user', UserRouter);



app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`);
})