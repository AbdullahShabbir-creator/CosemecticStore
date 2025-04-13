import Order from '../models/Order.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

// Helper function to check if a string is a valid MongoDB ObjectId
const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// @desc    Test order creation
// @route   POST /api/orders/test
// @access  Private
const testOrderCreate = async (req, res) => {
    try {
        // Create a simple test order
        const order = new Order({
            user: req.user._id,
            orderItems: [],
            shippingAddress: {
                address: 'Test Address',
                city: 'Test City',
                postalCode: '12345',
                country: 'Test Country'
            },
            paymentMethod: 'Test Payment',
            itemsPrice: 0,
            taxPrice: 0,
            shippingPrice: 0,
            totalPrice: 0
        });
        
        res.status(201).json({ message: 'Test order route working', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    try {
        const { 
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice 
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ error: 'No order items' });
        }

        // Validate and process order items
        const processedOrderItems = [];
        
        for (const item of orderItems) {
            // Check if this is a real product with a MongoDB ID
            if (item.product && isValidObjectId(item.product)) {
                try {
                    // Find the product in the database
                    const product = await Product.findById(item.product);
                    
                    if (!product) {
                        return res.status(404).json({ 
                            error: `Product not found: ${item.product}` 
                        });
                    }
                    
                    // Check stock
                    if (product.countInStock < item.quantity) {
                        return res.status(400).json({ 
                            error: `Not enough stock for ${product.name}` 
                        });
                    }
                    
                    // Add to processed items
                    processedOrderItems.push({
                        product: product._id,
                        name: product.name,
                        image: product.images[0] || item.image,
                        price: product.price,
                        quantity: item.quantity
                    });
                    
                    // Update product stock
                    product.countInStock -= item.quantity;
                    await product.save();
                    
                } catch (err) {
                    console.error('Error processing product:', err);
                    return res.status(500).json({ 
                        error: `Error processing product: ${err.message}` 
                    });
                }
            } else {
                // This is a demo product without a MongoDB ID
                processedOrderItems.push({
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    quantity: item.quantity
                });
            }
        }
        
        // Create order
        const order = new Order({
            user: req.user._id,
            orderItems: processedOrderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            status: 'Pending'
        });
        
        const createdOrder = await order.save();
        
        res.status(201).json(createdOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Check if order belongs to user or user is admin
        if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Update order
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };
        
        const updatedOrder = await order.save();
        
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Update order
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.status = 'Delivered';
        
        const updatedOrder = await order.save();
        
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.page) || 1;
        
        const count = await Order.countDocuments();
        
        const orders = await Order.find({})
            .populate('user', 'id name email')
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));
        
        res.json({
            orders,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }
        
        // Validate status value
        const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }
        
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Update order status
        order.status = status;
        
        // If status is delivered, mark as delivered and set delivered date
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }
        
        // If status is shipped, add tracking info if provided
        if (status === 'Shipped' && req.body.trackingNumber) {
            order.trackingNumber = req.body.trackingNumber;
        }
        
        const updatedOrder = await order.save();
        
        res.json(updatedOrder);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Get dashboard statistics
// @route   GET /api/orders/dashboard
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
    try {
        // Get total orders
        const totalOrders = await Order.countDocuments();
        
        // Get total revenue
        const orders = await Order.find();
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        
        // Get recent orders
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('user', 'name email');
        
        // Get orders by status
        const pendingOrders = await Order.countDocuments({ status: 'Pending' });
        const processingOrders = await Order.countDocuments({ status: 'Processing' });
        const shippedOrders = await Order.countDocuments({ status: 'Shipped' });
        const deliveredOrders = await Order.countDocuments({ status: 'Delivered' });
        const cancelledOrders = await Order.countDocuments({ status: 'Cancelled' });
        
        // Get monthly sales data
        const monthlyData = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } // From start of current year
                }
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                    total: { $sum: '$totalPrice' }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);
        
        // Format monthly data
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const salesByMonth = Array(12).fill(0).map((_, index) => {
            const monthData = monthlyData.find(item => item._id === index + 1);
            return {
                month: monthNames[index],
                count: monthData ? monthData.count : 0,
                total: monthData ? monthData.total : 0
            };
        });
        
        res.json({
            totalOrders,
            totalRevenue,
            recentOrders,
            ordersByStatus: {
                pending: pendingOrders,
                processing: processingOrders,
                shipped: shippedOrders,
                delivered: deliveredOrders,
                cancelled: cancelledOrders
            },
            salesByMonth
        });
    } catch (error) {
        console.error('Error getting dashboard stats:', error);
        res.status(500).json({ error: 'Server error', message: error.message });
    }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        
        // Check if order belongs to user or user is admin
        if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }
        
        // Check if order can be cancelled
        if (order.status === 'Delivered' || order.status === 'Shipped') {
            return res.status(400).json({ error: 'Order cannot be cancelled' });
        }
        
        // Update order status
        order.status = 'Cancelled';
        
        // Restore product stock
        for (const item of order.orderItems) {
            if (item.product) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.countInStock += item.quantity;
                    await product.save();
                }
            }
        }
        
        // Save updated order
        const updatedOrder = await order.save();
        
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// @desc    Create sample orders for testing
// @route   POST /api/orders/create-samples
// @access  Private
const createSampleOrders = async (req, res) => {
    try {
        // Sample product data
        const sampleProducts = [
            {
                name: 'KIKO Milano Smart Fusion Lipstick',
                image: 'https://images.kikocosmetics.com/sys-master/images/h15/h2b/8801486577694/KM0020104100144_principal_HD.jpg',
                price: 1200,
                quantity: 1
            },
            {
                name: 'KIKO Milano 3D Hydra Eyeshadow',
                image: 'https://images.kikocosmetics.com/sys-master/images/h8f/h5d/8796962742302/KM0030102400144_principal_HD.jpg',
                price: 900,
                quantity: 2
            },
            {
                name: 'KIKO Milano Skin Trainer CC Cream',
                image: 'https://images.kikocosmetics.com/sys-master/images/h5b/h5b/8796967198750/KM0030300100144_principal_HD.jpg',
                price: 1500,
                quantity: 1
            },
            {
                name: 'KIKO Milano Velvet Passion Matte Lipstick',
                image: 'https://images.kikocosmetics.com/sys-master/images/hd3/h11/8801483628574/KM0020103100144_principal_HD.jpg',
                price: 1100,
                quantity: 1
            }
        ];

        // Create 4 sample orders with different statuses
        const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        const orders = [];

        for (let i = 0; i < 4; i++) {
            // Select 1-3 random products for this order
            const numProducts = Math.floor(Math.random() * 3) + 1;
            const orderItems = [];
            let itemsPrice = 0;

            for (let j = 0; j < numProducts; j++) {
                const randomIndex = Math.floor(Math.random() * sampleProducts.length);
                const product = sampleProducts[randomIndex];
                
                orderItems.push({
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: product.quantity
                });
                
                itemsPrice += product.price * product.quantity;
            }

            // Calculate prices
            const taxPrice = Math.round(itemsPrice * 0.15);
            const shippingPrice = itemsPrice > 2000 ? 0 : 200;
            const totalPrice = itemsPrice + taxPrice + shippingPrice;

            // Create order with a date in the past (between 1-30 days ago)
            const daysAgo = Math.floor(Math.random() * 30) + 1;
            const orderDate = new Date();
            orderDate.setDate(orderDate.getDate() - daysAgo);

            const order = new Order({
                user: req.user._id,
                orderItems,
                shippingAddress: {
                    name: req.user.name,
                    address: '123 Test Street',
                    city: 'Karachi',
                    postalCode: '75300',
                    country: 'Pakistan',
                    phone: '+92 300 1234567'
                },
                paymentMethod: 'Cash on Delivery',
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                status: statuses[i],
                createdAt: orderDate
            });

            // If shipped or delivered, add tracking info
            if (statuses[i] === 'Shipped' || statuses[i] === 'Delivered') {
                order.trackingNumber = 'TRK' + Math.floor(Math.random() * 1000000);
            }

            // If delivered, set delivered date
            if (statuses[i] === 'Delivered') {
                order.deliveredAt = new Date(orderDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days after order
            }

            await order.save();
            orders.push(order);
        }

        res.status(201).json({ 
            message: 'Sample orders created successfully', 
            count: orders.length,
            orders 
        });
    } catch (err) {
        console.error('Error creating sample orders:', err);
        res.status(500).json({ error: err.message });
    }
};

export { 
  createOrder, 
  getOrderById, 
  getMyOrders, 
  getAllOrders, 
  updateOrderToPaid, 
  updateOrderToDelivered,
  updateOrderStatus,
  getDashboardStats,
  cancelOrder,
  testOrderCreate,
  createSampleOrders
};
