import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import Category from './models/Category.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Helper function to create slug from name
const createSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

// Sample data
const sampleCategories = [
  {
    name: 'Makeup',
    slug: 'makeup',
    description: 'All makeup products',
    featured: true,
    level: 1
  },
  {
    name: 'Skincare',
    slug: 'skincare',
    description: 'All skincare products',
    featured: true,
    level: 1
  },
  {
    name: 'Lipsticks',
    slug: 'lipsticks',
    description: 'All lipstick products',
    parent: null, // Will be set after categories are created
    level: 2
  }
];

const sampleProducts = [
  {
    name: 'Velvet Matte Lipstick',
    description: 'Long-lasting matte finish lipstick with a velvety texture',
    price: 24.99,
    brand: 'KIKO Milano',
    countInStock: 50,
    images: ['https://media.istockphoto.com/id/1370814383/photo/lipstick-on-white-background.jpg?s=612x612&w=0&k=20&c=Yt0qp9lo-JDAFSWBPnLEu1wZMAN7LyHBrFJOgGIWYYM=']
  },
  {
    name: 'Illuminating Powder',
    description: 'Gives a natural glow to your skin',
    price: 29.99,
    brand: 'KIKO Milano',
    countInStock: 30,
    images: ['https://media.istockphoto.com/id/504897928/photo/make-up-powder-with-brush-on-white-background.jpg?s=612x612&w=0&k=20&c=xQJz9ROgg9wA5nSdwN8lYefoJuRm04l8Tkzu6oBk6Tc=']
  },
  {
    name: 'Hydrating Face Serum',
    description: 'Deeply hydrates and rejuvenates skin',
    price: 34.99,
    brand: 'KIKO Milano',
    countInStock: 25,
    images: ['https://media.istockphoto.com/id/1314016945/photo/serum-drop-falling-from-cosmetic-pipette-on-blue-background.jpg?s=612x612&w=0&k=20&c=sSxEOqHcbFGFB2HE4MXuO4IEf1Wd-1yUF8PxHJk_cV0=']
  }
];

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Category.deleteMany();
    await Product.deleteMany();
    
    // Create categories
    const createdCategories = await Category.insertMany(sampleCategories);
    
    // Set parent category for Lipsticks
    const makeupCategory = createdCategories[0]._id;
    const skincareCategory = createdCategories[1]._id;
    
    // Update Lipsticks category with parent
    await Category.findByIdAndUpdate(createdCategories[2]._id, {
      parent: makeupCategory
    });
    
    // Create products with proper category references
    const productsWithCategories = sampleProducts.map((product, index) => {
      // Assign first two products to Makeup, third to Skincare
      return {
        ...product,
        category: index < 2 ? makeupCategory : skincareCategory
      };
    });
    
    await Product.insertMany(productsWithCategories);
    
    console.log('Data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data
const destroyData = async () => {
  try {
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    
    console.log('Data destroyed successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

// Run script based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
