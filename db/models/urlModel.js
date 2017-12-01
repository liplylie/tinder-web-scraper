'use-strict'

const db = require('../dbconfig.js')
const Sequelize = require('sequelize')

const urls = db.define('urls', {
    url: Sequelize.TEXT
});

urls.sync().then(() => {console.log("table successfully added")})
.catch(()=> {console.log("table failed to be added")})

module.exports = urls;