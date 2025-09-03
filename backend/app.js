const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const path = require('path');

const app = express();

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/Portfolio').then(()=>{
    console.log('Mongodb Connected');
}).catch(err=>{
    console.log("Getting error to connect mongodb:",err);
});

// Serve static files from the 'files' directory
app.use('/files', express.static(path.join(__dirname, 'files')));

// API to trigger download
app.get('/download-cv', (req, res) => {
  const filePath = path.join(__dirname, 'files', 'Swarnendu_Gharami_MEAN_Stack.pdf');
  res.download(filePath, 'Swarnendu_Gharami_MEAN_Stack.pdf', err => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).send('File download failed.');
    }
  });
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

