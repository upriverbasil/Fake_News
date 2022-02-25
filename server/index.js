import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import fakeNewsRouter from './routes/fakeNewsRouter.js';
import userRoutes from './routes/users.js';



const app = express();

app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(cors());

app.use('/fake-news',fakeNewsRouter)
app.use('/user',userRoutes);

const CONNECTION_URL = "mongodb+srv://upriverbasil:g1234@cluster0.hgfvs.mongodb.net/db0?retryWrites=true&w=majority"
const PORT = process.env.PORT || 8080;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`SERVER RUNNING ON PORT: ${PORT} `)))
    .catch((error)=>console.log(error.message));