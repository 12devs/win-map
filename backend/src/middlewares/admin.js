import config from 'config'

const secret = config.adminSecret.secret

const admin = (req, res, next) => {
  const { headers: { admin } } = req

  if (secret && admin === secret) {
    return next()
  }
  return res.status(500).json({ err: 'Wrong secret' })
}

export default admin
