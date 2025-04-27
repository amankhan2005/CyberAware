const express = require('express');
const app = express();
const UserRouter = require('./routers/userRouter'); //importing user router
const articleRouter = require('./routers/articleRouter'); //importing article router
const expertRouter = require('./routers/expertRouter');   //importing expert router
const newsRouter = require('./routers/newsRouter'); //importing news router
const QueryRouter = require('./routers/QueryRouter'); //importing Query router
const cors = require('cors');

//creating new express app

const port = 5000;

//middleware
app.use(cors({ origin : "*" }))
app.use(express.json()) //to parse json data
app.use('/user', UserRouter);
app.use('/expert', expertRouter);
app.use('/articles', articleRouter);
app.use('/news', newsRouter);
app.use('/query', QueryRouter);



app.listen(port, () => {
    console.log(`Server is running on Port - ${port}`);
})