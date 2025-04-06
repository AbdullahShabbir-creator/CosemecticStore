import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get the token from headers (assumed to be in the Authorization header)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using your JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the user info to the request object
    req.user = decoded;
    next();  // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(400).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
