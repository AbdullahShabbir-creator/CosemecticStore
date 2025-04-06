import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.status(201).json({ token, email });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = createToken(user._id);
        res.json({ token, email });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
