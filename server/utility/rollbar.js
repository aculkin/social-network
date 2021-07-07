const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: process.env.ROLL_BAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.ENVIRONMENT,
  },
})

const prod = process.env.ENVIRONMENT === 'PROD'

const sendLog = (message) => {
  prod ? rollbar.log(message) : console.log(`RB LOG - ${message}`)
}
const sendDebug = (message) => {
  prod ? rollbar.debug(message) : console.log(`RB DEBUG - ${message}`)
}
const sendInfo = (message) => {
  prod ? rollbar.info(message) : console.log(`RB INFO - ${message}`)
}
const sendWarning = (message) => {
  prod ? rollbar.warning(message) : console.log(`RB WARN - ${message}`)
}
const sendError = (message) => {
  prod ? rollbar.error(message) : console.log(`RB ERROR - ${message}`)
}
const sendCritical = (message) => {
  prod ? rollbar.critical(message) : console.log(`RB CRIT - ${message}`)
}

//Exporting functions to send differing levels of errors to Rollbar
module.exports = {
  rollbar,
  sendLog,
  sendDebug,
  sendInfo,
  sendError,
  sendWarning,
  sendCritical,
}
