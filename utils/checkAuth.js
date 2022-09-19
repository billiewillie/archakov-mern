import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
  if (token) {
    try {
      const decoded = jwt.verify(token, 'secretphrase');
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({message: 'no entry'})
    }
  } else {
    return res.status(403).json({message: 'no entry'})
  }
}