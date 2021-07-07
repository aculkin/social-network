require('dotenv').config()
const Sequelize = require('sequelize')

const PROD = 'PROD'
const QA = 'QA'

// change WORKING_WITH_REMOTE_HEROKU_DB to be PROD or QA
// depending on the database you would like to work with
// leave as null for commits and PRs
const WORKING_WITH_REMOTE_HEROKU_DB = null

let databaseUrl =
  process.env.DATABASE_URL ||
  `postgres://postgres@localhost:5432/social-network`

switch (WORKING_WITH_REMOTE_HEROKU_DB) {
  case PROD:
    databaseUrl = process.env.DATABASE_PROD_URL
    console.log('Using Database: PROD')
    break
  case QA:
    databaseUrl = process.env.DATABASE_QA_URL
    console.log('Using Database: QA')
    break
  default:
    break
}

// Dialect Options
const productionDialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
}

let dialectOptions =
  !!process.env.DATABASE_URL || !!WORKING_WITH_REMOTE_HEROKU_DB
    ? productionDialectOptions
    : null

const db = new Sequelize(databaseUrl, {
  logging: false,
  dialect: 'postgres',
  dialectOptions,
})

module.exports = db
