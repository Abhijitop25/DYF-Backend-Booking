const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { PORT } = require('./config/server-config.js');
const db = require('./models/index.js');

const apiRoutes = require('./routes/index.js');

const startServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/api', apiRoutes);
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
        //db.sequelize.sync({ alter: true });
    })
}

startServer();