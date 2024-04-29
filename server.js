require('dotenv').config();

const {app} = require('./src/app');
const { LOGGER } = require('./src/common/logger')
const { monogdb_connection } = require('./src/db/mongo')

const PORT = process.env.PORT;

monogdb_connection();


app.listen(PORT, ()=>[
    LOGGER.info(`Server is running on port ${PORT}`),
])