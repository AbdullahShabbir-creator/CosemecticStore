import express from 'express';
import { 
  createOrder, 
  getOrderById, 
  getMyOrders, 
  getAllOrders, 
  updateOrderToPaid, 
  updateOrderToDelivered,
  updateOrderStatus,
  getDashboardStats,
  testOrderCreate,
  createSampleOrders
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public test route
router.post('/test', testOrderCreate);

// Sample orders route for testing
router.post('/create-samples', protect, createSampleOrders);

// Dashboard route - must come before /:id routes
router.get('/dashboard', protect, admin, getDashboardStats);

// My orders route - must come before /:id routes
router.get('/myorders', protect, getMyOrders);

// Root route for creating and getting all orders
router.route('/')
  .post(protect, createOrder)
  .get(protect, admin, getAllOrders);

// Parameter routes - these should come AFTER all specific routes
router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

export default router;
