const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  let token = req.header('Authorization');

  // If Authorization exists with Bearer
  if (token && token.startsWith("Bearer ")) {
    token = token.substring(7); // remove "Bearer "
  } else {
    token = req.header("x-auth-token"); // fallback
  }

  if (!token) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is invalid' });
  }
};
