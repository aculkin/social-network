const Sequelize = require('sequelize')
const db = require('../database')

const Post = db.define(
  'post',
  {
    text: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  { paranoid: true }
)

module.exports = Post
