const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const client = require("prom-client");

const cluster = require('cluster');
const os = require('os');

const numCpus = os.cpus().length;
let defaultMetricsStarted = false;

function createApp() {
    const app = express();

    app.use(cors());

    if (!defaultMetricsStarted) {
        client.collectDefaultMetrics();
        defaultMetricsStarted = true;
    }

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

    // Serve static files from the 'files' directory
    app.use('/files', express.static(path.join(__dirname, 'files')));

    // API to trigger download
    app.get('/download-cv', (req, res) => {
        const filePath = path.join(__dirname, 'files', 'Swarnendu_Gharami_MEAN_Stack.pdf');
        res.download(filePath, 'Swarnendu_Gharami_MEAN_Stack.pdf', err => {
            if (err) {
                console.error('Download error:', err);
                if (!res.headersSent) {
                    res.status(500).send('File download failed.');
                }
            }
        });
    });

    app.get("/metrics", async (req, res) => {
        res.set("Content-Type", client.register.contentType);
        res.end(await client.register.metrics());
    });

    app.get('/', (req, res) => {
        res.send('app running......');
    });

    const profileRoute = require('./routes/profile-routes');

    app.use('/api', limiter, profileRoute);

    return app;
}

function connectDatabase() {
    const mongoUri = process.env.MONGO_Cluster_URI || process.env.MONGO_URI;

    return mongoose.connect(mongoUri).then(() => {
        console.log('Mongodb Connected');
    }).catch(err => {
        console.log("Getting error to connect mongodb:", err);
    });
}

function startServer() {
    const app = createApp();
    const port = process.env.PORT || 3000;

    connectDatabase();

    return app.listen(port, () => {
        console.log(`App running on port:${port}`);
    });
}

function startCluster() {
    console.log(`Master ${process.pid} is running`);

    for (let i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died. Restarting....`);
        cluster.fork();
    });
}

if (require.main === module) {
    if (cluster.isMaster) {
        startCluster();
    } else {
        startServer();
    }
}

module.exports = { createApp, connectDatabase, startServer };
