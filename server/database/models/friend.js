const Sequelize = require('sequelize')
const db = require('../database')

const Friend = db.define(
  'friend',
  {
    approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { paranoid: true }
)

module.exports = Friend
