const express = require('express');
const { chats } = require('./data/data');
const colors = require('colors');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const dotenv = require('dotenv');
dotenv.config(); 

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());


const connectDB = require('./config/db');
connectDB();

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000;

app.listen(5000,()=>{
    console.log(`Server is running on port ${port}`.yellow.bold);
})