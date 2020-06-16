const express = require('express');
const app = express();
const config = require('./configs/config.js');
const mongoose = require('mongoose');
const router = express.Router();
const way = require('./routes/index');
const bodyParser = require('body-parser');
const errorMiddleware = require('./middlewares/indexExceptions');
const cors = require('cors');
require('express-async-errors');

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

way(router);
app.use(cors({ origin: '*' }));
app.use('/api', router); //only requests to /api/v1/* will be sent to our "router"
app.use(errorMiddleware);

mongoose
    .connect(
        'mongodb + srv://admin:<Arbol1948.>@cluster0-rqi6g.mongodb.net/<userPostApp>?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useFindAndModify: false
        }
    )
    .then(
        () => {
            console.log('Database connection [OK]');
        },
        (err) => {
            console.log('Error during connecting with database');
        }
    );

app.listen(config.PORT_APP, function () {
    console.log('listening by the port ' + config.PORT_APP);
});
