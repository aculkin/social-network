const Sequelize = require('sequelize')
const db = require('../database')

const Comment = db.define(
  'comment',
  {
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  { paranoid: true }
)

module.exports = Comment
