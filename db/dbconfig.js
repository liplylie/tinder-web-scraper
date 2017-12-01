const Sequelize = require('sequelize')

let dburl = "postgres://olvzbanf:b6QDpwCX5o840h5HQANO0tLCfQ24hdap@baasu.db.elephantsql.com:5432/olvzbanf"

const db = new Sequelize(dburl, {dialect: 'postgres'});

db
  .authenticate()
  .then(() => {console.log('Connection for the database has been established successfully.')})
  .catch(err => {console.log('Unable to connect to the database:', err)});

module.exports = db