import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const signup = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, role } = req.body;
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }
        
        // Create new user
        const user = await User.create({ 
            firstName, 
            lastName, 
            email, 
            password,
            phoneNumber,
            role: role === 'admin' ? 'admin' : 'customer' // Only allow 'admin' or 'customer'
        });
        
        // Generate token
        const token = createToken(user._id);
        
        // Return user data without password
        res.status(201).json({ 
            token, 
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        // Check if password is correct
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        
        // Generate token
        const token = createToken(user._id);
        
        // Return user data without password
        res.status(200).json({ 
            token, 
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Return user data with explicit role
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role || 'customer', // Ensure role is always defined
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    } catch (err) {
        console.error('Error in getUserProfile:', err);
        res.status(500).json({ error: err.message });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Update user fields
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        
        // Update password if provided
        if (req.body.password) {
            user.password = req.body.password;
        }
        
        // Save updated user
        const updatedUser = await user.save();
        
        // Generate new token
        const token = createToken(updatedUser._id);
        
        // Return updated user data
        res.status(200).json({
            token,
            user: {
                id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                role: updatedUser.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const setUserAsAdmin = async (req, res) => {
    const { email } = req.body;
    
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Set user role to admin
        user.role = 'admin';
        await user.save();
        
        res.status(200).json({ 
            message: 'User role updated to admin successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.error('Error setting user as admin:', err);
        res.status(500).json({ error: err.message });
    }
};
