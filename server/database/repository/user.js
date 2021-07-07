const { createHash, randomBytes } = require('crypto')
const { User } = require('../models')

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.prototype.correctPassword = function (candidatePWD) {
  return this.password() && this.salt()
    ? User.encryptPassword(candidatePWD, this.salt()) === this.password()
    : false
}

User.prototype.setPasswordResetToken = async function (token) {
  return this.update({
    resetPasswordToken: token,
    resetPasswordExpires: Date.now() + 3600000,
  })
}

User.generateSalt = function () {
  return randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return createHash('RSA-SHA256').update(plainText).update(salt).digest('hex')
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
