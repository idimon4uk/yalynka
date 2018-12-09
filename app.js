const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');   
const telegramRouter = require('./routers/telegramRouter.js');
const serverRouter = require('./routers/serverRouter.js')
const config = require('./config.json')
// const logger = require('./helpers/logger');

var SECRET_URL = process.env.TOKEN || config.TOKEN
SECRET_URL = SECRET_URL.split(":")[1]

const app = express();

const port = (process.env.PORT || '5000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.use(bodyParser.json({limit: '50mb'}));

app.use(cors());

app.use('/telegram/'+SECRET_URL,telegramRouter);
app.use('/server', serverRouter);

app.get('/api', function (req, res) {
	res.send('bot root ' + process.env.NODE_ENV);
});

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    // logger.info('****************** SERVER STARTED ************************');
    // logger.info('Listening on ' + bind);  
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }}

module.exports = app;