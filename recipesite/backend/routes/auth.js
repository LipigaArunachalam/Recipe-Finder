const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Save user without hashing for demo purposes
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.json({ success: true, message: 'Registered Successfully!' });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user && user.password === password) {
            return res.json({ success: true, username });
        } else {
            return res.json({ success: false, message: 'Invalid Credentials' });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

module.exports = router;
