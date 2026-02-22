const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,               // max requests per IP
    standardHeaders: 'draft-8', // send rate limit info in headers
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            error: "Too many requests, please slow down.",
        });
    }
});

app.use(limiter);

mongoose.connect(process.env.MONGO_Cluster_URI).then(()=>{
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

