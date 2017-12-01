const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')

const app = express();
let port = 3000;
const ip = 'localhost';

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api', router)

app.listen(port, ip, function(){
	console.log("server is listening on port " + port)
})

module.exports = app;