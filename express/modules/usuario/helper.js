const crypto = require('crypto')

module.exports = {
  hashPassword: password => {
    const salt = genRandomString(16)
    const hash = sha256(password, salt)
    return {
      salt,
      hash,
    }
  },

  checkPassword: (password, hash, salt) => {
    return sha256(password, salt) === hash
  },
}

const genRandomString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

const sha256 = function (password, salt) {
  return crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex')
}
