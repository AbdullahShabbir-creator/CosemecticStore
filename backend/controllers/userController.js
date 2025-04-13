import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        
        const updatedUser = await user.save();
        
        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        await user.remove();
        
        res.json({ message: 'User removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        
        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Find user
        const user = await User.findById(req.user.id);
        
        // Check if product is already in wishlist
        if (user.wishlist.includes(productId)) {
            return res.status(400).json({ error: 'Product already in wishlist' });
        }
        
        // Add to wishlist
        user.wishlist.push(productId);
        await user.save();
        
        res.status(200).json({ message: 'Product added to wishlist' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
    try {
        const productId = req.params.productId;
        
        // Find user
        const user = await User.findById(req.user.id);
        
        // Check if product is in wishlist
        if (!user.wishlist.includes(productId)) {
            return res.status(400).json({ error: 'Product not in wishlist' });
        }
        
        // Remove from wishlist
        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();
        
        res.status(200).json({ message: 'Product removed from wishlist' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist');
        res.json(user.wishlist);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Add address
// @route   POST /api/users/addresses
// @access  Private
export const addAddress = async (req, res) => {
    try {
        const {
            fullName,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country,
            isDefault
        } = req.body;
        
        // Find user
        const user = await User.findById(req.user.id);
        
        // Create new address
        const newAddress = {
            fullName,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country: country || 'Pakistan',
            isDefault: isDefault || false
        };
        
        // If this is the first address or isDefault is true, set as default
        if (user.addresses.length === 0 || isDefault) {
            // Set all existing addresses to non-default
            user.addresses.forEach(addr => {
                addr.isDefault = false;
            });
            
            newAddress.isDefault = true;
        }
        
        // Add to addresses
        user.addresses.push(newAddress);
        await user.save();
        
        res.status(201).json(newAddress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Update address
// @route   PUT /api/users/addresses/:id
// @access  Private
export const updateAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        const {
            fullName,
            phoneNumber,
            address,
            city,
            state,
            zipCode,
            country,
            isDefault
        } = req.body;
        
        // Find user
        const user = await User.findById(req.user.id);
        
        // Find address
        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
        
        if (addressIndex === -1) {
            return res.status(404).json({ error: 'Address not found' });
        }
        
        // Update address fields
        if (fullName) user.addresses[addressIndex].fullName = fullName;
        if (phoneNumber) user.addresses[addressIndex].phoneNumber = phoneNumber;
        if (address) user.addresses[addressIndex].address = address;
        if (city) user.addresses[addressIndex].city = city;
        if (state) user.addresses[addressIndex].state = state;
        if (zipCode) user.addresses[addressIndex].zipCode = zipCode;
        if (country) user.addresses[addressIndex].country = country;
        
        // Handle default address
        if (isDefault) {
            // Set all addresses to non-default
            user.addresses.forEach(addr => {
                addr.isDefault = false;
            });
            
            // Set this address as default
            user.addresses[addressIndex].isDefault = true;
        }
        
        await user.save();
        
        res.json(user.addresses[addressIndex]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Delete address
// @route   DELETE /api/users/addresses/:id
// @access  Private
export const deleteAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        
        // Find user
        const user = await User.findById(req.user.id);
        
        // Find address
        const address = user.addresses.find(addr => addr._id.toString() === addressId);
        
        if (!address) {
            return res.status(404).json({ error: 'Address not found' });
        }
        
        // Remove address
        user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
        
        // If deleted address was default and there are other addresses, set first one as default
        if (address.isDefault && user.addresses.length > 0) {
            user.addresses[0].isDefault = true;
        }
        
        await user.save();
        
        res.json({ message: 'Address removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Set default address
// @route   PUT /api/users/addresses/:id/default
// @access  Private
export const setDefaultAddress = async (req, res) => {
    try {
        const addressId = req.params.id;
        
        // Find user
        const user = await User.findById(req.user.id);
        
        // Find address
        const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
        
        if (addressIndex === -1) {
            return res.status(404).json({ error: 'Address not found' });
        }
        
        // Set all addresses to non-default
        user.addresses.forEach(addr => {
            addr.isDefault = false;
        });
        
        // Set this address as default
        user.addresses[addressIndex].isDefault = true;
        
        await user.save();
        
        res.json(user.addresses[addressIndex]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
