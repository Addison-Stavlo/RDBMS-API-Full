const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cohortsRoute = require('./routes/cohortsRoute.js');
const studentsRoute = require('./routes/studentsRoute.js');
const server = express();

//middleware
server.use(helmet());
server.use(express.json());
server.use(morgan('short'));

//routes
server.use('/api/cohorts', cohortsRoute);
server.use('/api/students', studentsRoute);

server.get('/', (req, res) => {
    res.send(`<h1>API Running...</h1>`)
});

//exports
module.exports = server;