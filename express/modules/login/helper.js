const crypto = require('crypto')
const jwt = require('jsonwebtoken')

module.exports = {
  checkPassword: (password, salt, hash) => {
    return sha256(password, salt) === hash
  },
  generateToken: data => {
    const date = new Date()
    date.setHours(date.getHours() + 12)

    return jwt.sign(
      {
        data,
        exp: date.getTime() / 1000,
      },
      process.env.TOKEN_PASSWD,
    )
  },
}

const sha256 = function (password, salt) {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex')
}
