const Sequelize = require('sequelize')
const db = require('../database')

const Reaction = db.define(
  'reaction',
  {
    type: {
      type: Sequelize.ENUM(
        'Like',
        'Love',
        'Dislike',
        'Congratulations',
        'Think'
      ),
      allowNull: false,
    },
  },
  { paranoid: true }
)

module.exports = Reaction
