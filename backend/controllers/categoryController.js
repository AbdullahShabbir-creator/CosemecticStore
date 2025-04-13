import Category from '../models/Category.js';
import Product from '../models/Product.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})
            .populate('parent', 'name slug')
            .sort({ order: 1 });
        
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('parent', 'name slug');
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
export const createCategory = async (req, res) => {
    try {
        const { name, slug, description, image, parent, featured, order } = req.body;
        
        // Check if category with same slug exists
        const categoryExists = await Category.findOne({ slug });
        if (categoryExists) {
            return res.status(400).json({ error: 'Category with this slug already exists' });
        }
        
        // Calculate level
        let level = 1;
        if (parent) {
            const parentCategory = await Category.findById(parent);
            if (!parentCategory) {
                return res.status(400).json({ error: 'Parent category not found' });
            }
            level = parentCategory.level + 1;
        }
        
        // Create new category
        const category = await Category.create({
            name,
            slug,
            description,
            image,
            parent,
            level,
            featured: featured || false,
            order: order || 0
        });
        
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
export const updateCategory = async (req, res) => {
    try {
        const { name, slug, description, image, parent, featured, order } = req.body;
        
        // Find category
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        // Check if slug is unique if changing
        if (slug && slug !== category.slug) {
            const categoryWithSlug = await Category.findOne({ slug });
            if (categoryWithSlug) {
                return res.status(400).json({ error: 'Category with this slug already exists' });
            }
        }
        
        // Calculate level if parent is changing
        let level = category.level;
        if (parent && parent !== category.parent) {
            const parentCategory = await Category.findById(parent);
            if (!parentCategory) {
                return res.status(400).json({ error: 'Parent category not found' });
            }
            level = parentCategory.level + 1;
        }
        
        // Update category fields
        category.name = name || category.name;
        category.slug = slug || category.slug;
        category.description = description !== undefined ? description : category.description;
        category.image = image !== undefined ? image : category.image;
        category.parent = parent !== undefined ? parent : category.parent;
        category.level = level;
        category.featured = featured !== undefined ? featured : category.featured;
        category.order = order !== undefined ? order : category.order;
        
        // Save updated category
        const updatedCategory = await category.save();
        
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        // Check if category has subcategories
        const subcategories = await Category.find({ parent: category._id });
        if (subcategories.length > 0) {
            return res.status(400).json({ error: 'Cannot delete category with subcategories' });
        }
        
        // Check if category has products
        const products = await Product.find({ category: category._id });
        if (products.length > 0) {
            return res.status(400).json({ error: 'Cannot delete category with products' });
        }
        
        await category.remove();
        
        res.json({ message: 'Category removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get featured categories
// @route   GET /api/categories/featured
// @access  Public
export const getFeaturedCategories = async (req, res) => {
    try {
        const categories = await Category.find({ featured: true })
            .sort({ order: 1 })
            .limit(6);
        
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
export const getCategoryBySlug = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug })
            .populate('parent', 'name slug');
        
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
