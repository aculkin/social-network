const { User } = require('../../database/models')

const signup = async (req, res, next) => {
  const { email, password, firstName, lastName, userName } = req.body
  try {
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      userName,
    })
    if (user) {
      req.login(user, (error) => (error ? next(error) : res.json(user)))
    } else {
      res.status(500).send('internal server error')
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = signup
