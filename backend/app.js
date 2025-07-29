const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/Portfolio').then(()=>{
    console.log('Mongodb Connected');
}).catch(err=>{
    console.log("Getting error to connect mongodb:",err);
});


app.get('/',(req,res)=>{
    res.send('app running......');
});

const profileRoute = require('./routes/profile-routes');
app.use(cors());
app.use('/api',profileRoute);

const port = process.env.PORT;

app.listen(port,() => {
    console.log(`App running on port:${port}`);
});

