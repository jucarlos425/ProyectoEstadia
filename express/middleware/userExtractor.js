const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    const authorization = req.get('authorization')
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_PASSWD)

    if (!token || !decodedToken.data.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    next()
  } catch {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
}
