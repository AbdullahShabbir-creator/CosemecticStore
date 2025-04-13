import Product from '../models/Product.js';
import Category from '../models/Category.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const pageSize = 12;
        const page = Number(req.query.page) || 1;
        
        // Build filter object
        const filter = {};
        
        // Category filter
        if (req.query.category) {
            filter.category = req.query.category;
        }
        
        // Price range filter
        if (req.query.minPrice && req.query.maxPrice) {
            filter.price = { 
                $gte: Number(req.query.minPrice), 
                $lte: Number(req.query.maxPrice) 
            };
        } else if (req.query.minPrice) {
            filter.price = { $gte: Number(req.query.minPrice) };
        } else if (req.query.maxPrice) {
            filter.price = { $lte: Number(req.query.maxPrice) };
        }
        
        // Brand filter
        if (req.query.brand) {
            filter.brand = req.query.brand;
        }
        
        // Rating filter
        if (req.query.rating) {
            filter.rating = { $gte: Number(req.query.rating) };
        }
        
        // Search by name or description
        if (req.query.keyword) {
            filter.$or = [
                { name: { $regex: req.query.keyword, $options: 'i' } },
                { description: { $regex: req.query.keyword, $options: 'i' } }
            ];
        }
        
        // Build sort object
        let sort = {};
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'price-asc':
                    sort = { price: 1 };
                    break;
                case 'price-desc':
                    sort = { price: -1 };
                    break;
                case 'rating':
                    sort = { rating: -1 };
                    break;
                case 'newest':
                    sort = { createdAt: -1 };
                    break;
                default:
                    sort = { createdAt: -1 };
            }
        } else {
            // Default sort by newest
            sort = { createdAt: -1 };
        }
        
        // Count total products matching the filter
        const count = await Product.countDocuments(filter);
        
        // Get products with pagination
        const products = await Product.find(filter)
            .populate('category', 'name slug')
            .sort(sort)
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        
        // Send response
        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('category', 'name slug');
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            brand,
            category,
            price,
            countInStock,
            images,
            specifications,
            tags
        } = req.body;
        
        // Check if category exists
        const categoryExists = await Category.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Invalid category' });
        }
        
        // Create new product
        const product = await Product.create({
            name,
            description,
            brand,
            category,
            price,
            countInStock,
            images,
            specifications: specifications || {},
            tags: tags || []
        });
        
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            brand,
            category,
            price,
            countInStock,
            images,
            specifications,
            tags,
            featured,
            discount
        } = req.body;
        
        // Find product
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Check if category exists if changing
        if (category && category !== product.category.toString()) {
            const categoryExists = await Category.findById(category);
            if (!categoryExists) {
                return res.status(400).json({ error: 'Invalid category' });
            }
        }
        
        // Update product fields
        product.name = name || product.name;
        product.description = description || product.description;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.price = price !== undefined ? price : product.price;
        product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
        product.images = images || product.images;
        product.specifications = specifications || product.specifications;
        product.tags = tags || product.tags;
        product.featured = featured !== undefined ? featured : product.featured;
        product.discount = discount !== undefined ? discount : product.discount;
        
        // Save updated product
        const updatedProduct = await product.save();
        
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        await product.remove();
        
        res.json({ message: 'Product removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
export const createProductReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        
        // Find product
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        
        // Check if user already reviewed
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user.id.toString()
        );
        
        if (alreadyReviewed) {
            return res.status(400).json({ error: 'Product already reviewed' });
        }
        
        // Create review object
        const review = {
            user: req.user.id,
            name: `${req.user.firstName} ${req.user.lastName}`,
            rating: Number(rating),
            comment
        };
        
        // Add review to product
        product.reviews.push(review);
        
        // Update product rating
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        
        // Save product
        await product.save();
        
        res.status(201).json({ message: 'Review added' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ rating: -1 })
            .limit(5);
        
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({ featured: true })
            .populate('category', 'name slug')
            .limit(8);
        
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
