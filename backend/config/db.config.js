const mongoose = require('mongoose');

function configureDatabase() {
    mongoose.connect(process.env.MONGO_Cluster_URI).then(() => {
        console.log('Mongodb connected');
    }).catch(err => {
        console.log(err);
    });
};

module.exports = configureDatabase;