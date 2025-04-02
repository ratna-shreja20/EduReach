const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    address,
    city,
    state,
    pincode,
    country,
    dob,
    gender,
    class: userClass,
    board,
  } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      state,
      pincode,
      country,
      dob,
      gender,
      class: userClass,
      board,
    });

    await user.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      res.json({
        msg: 'Login successful',
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          class: user.class,
          board: user.board,
          phone: user.phone,
          address: user.address,
          city: user.city,
          state: user.state
        }
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;