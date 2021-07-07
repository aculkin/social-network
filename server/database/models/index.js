const User = require('./user')
const Friend = require('./friend')
const Post = require('./post')
const Reaction = require('./reaction')
const Comment = require('./comment')

User.hasMany(Post)
Post.belongsTo(User)

User.belongsToMany(User, {
  foreignKey: 'userId',
  as: 'user',
  through: Friend,
})
// User.belongsToMany(User, {
//   foreignKey: 'friendId',
//   as: 'friend',
//   through: Friend,
// })
User.hasMany(Friend, { foreignKey: 'userId' })
User.hasMany(Friend, { foreignKey: 'friendId' })
Friend.belongsTo(User, { foreignKey: 'userId' })
Friend.belongsTo(User, { foreignKey: 'friendId' })

User.hasMany(Reaction)
Reaction.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Post.hasMany(Comment)
Comment.belongsTo(Post)

Post.hasMany(Reaction)
Reaction.belongsTo(Post)

Comment.hasMany(Reaction)
Reaction.belongsTo(Comment)

module.exports = {
  User,
  Post,
  Reaction,
  Comment,
}
