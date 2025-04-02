const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error('User not found');
    }

    // Add user to request object
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Please authenticate', error: err.message });
  }
};

module.exports = auth;