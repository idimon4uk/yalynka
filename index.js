const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const telegramRouter = require('./routers/telegramRouter.js');
const serverRouter = require('./routers/serverRouter.js')
// const config = require('./config.json');
var SECRET_URL = process.env.TOKEN || "1234:test"//config.TOKEN
SECRET_URL = SECRET_URL.split(":")[1]

var app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json({limit: '50mb'}))
  .use('/telegram/'+SECRET_URL,telegramRouter)
  .use('/server', serverRouter)
  .use(cors())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/api', function (req, res) {
    res.send('bot root ' + process.env.NODE_ENV);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  module.exports = app;
  