const mongoose = require('mongoose');
const {LOGGER} = require('../common/logger');

const monogdb_connection = async () => {
    const URI = process.env.MONGO_URL;
    mongoose.connect(URI).then(() => {
        LOGGER.info("DB connected successfully.")
    }).catch(err => {
        LOGGER.error(err);
        process.exit(1);
    })
}

module.exports = { monogdb_connection }
