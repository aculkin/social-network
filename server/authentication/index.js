const express = require('express')
const router = express.Router()
const { login, signup, logout, me } = require('./authentication-functions')

module.exports = router

const respond = (req, res) => res.status(200).send()

router.post('/login', login)

router.post('/signup', signup)

router.post('/logout', logout)

router.get('/me', me)

router.put('/forgot-password', respond)

router.get('/reset-password/:token', respond)

router.put('/reset-password/:token', respond)
