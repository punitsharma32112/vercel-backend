const express = require('express');
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  console.log('Received data:', req.body);

  try {
    let user;

    // Check all collections automatically (Admin → Doctor → User)
    user = await Admin.findOne({ email }) || await Doctor.findOne({ email }) || await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: 'Invalid email' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '24h' });

    res.send({ token, role: user.role });
  } catch (error) {
    console.error('❌ Login Error:', error);
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
