const { User } = require('../../database/models')

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    })
    if (!user) {
      res.status(401).send('No user with that email')
    } else if (user.correctPassword(password)) {
      req.login(user, (error) => {
        error ? next(error) : res.status(200).json(user)
      })
    } else {
      res.status(401).send('Wrong password')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = login
