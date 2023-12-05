const authMiddleware = (req, res, next) => {
  console.log('autchMiddleware: ', req.session.user)

  if (req.session.user) {
    next();
  } else {
    res.status(401).send({ message: 'You are not unauthorized'});
  }
};

module.exports = authMiddleware;