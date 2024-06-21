const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/User.js');
const router = express.Router();
require('dotenv').config();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = new User({ username, password });
        await user.save();
        jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password, rememberMe } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        if(rememberMe){
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }else{
            const { password: pass, ...rest } = user._doc;
            res
                .status(200)
                .json(rest);
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
