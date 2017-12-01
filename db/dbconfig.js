const Sequelize = require('sequelize')
const secret = require('../secret.json')

let dburl = secret.dburl

const db = new Sequelize(dburl, {dialect: 'postgres'});

db
  .authenticate()
  .then(() => {console.log('Connection for the database has been established successfully.')})
  .catch(err => {console.log('Unable to connect to the database:', err)});

module.exports = db