import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    countInStock: '',
    images: []
  });

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `http://localhost:5000/api/products?page=${currentPage}`;
        
        if (categoryFilter) {
          url += `&category=${categoryFilter}`;
        }
        
        if (sortBy) {
          url += `&sort=${sortBy}`;
        }
        
        if (searchQuery) {
          url += `&search=${searchQuery}`;
        }
        
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setProducts(response.data.products || []);
        setTotalPages(response.data.pages || 1);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [currentPage, categoryFilter, sortBy, searchQuery]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setCategories(response.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    // In a real application, you would upload the image to a server or cloud storage
    // For this example, we'll just store the file object
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: [...formData.images, ...files]
    });
  };

  // Remove image
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages
    });
  };

  // Open modal for adding new product
  const openAddProductModal = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      countInStock: '',
      images: []
    });
    setCurrentProduct(null);
    setIsNewProduct(true);
    setIsModalOpen(true);
  };

  // Open modal for editing product
  const openEditProductModal = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      category: product.category._id,
      countInStock: product.countInStock,
      images: product.images || []
    });
    setCurrentProduct(product);
    setIsNewProduct(false);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        brand: formData.brand,
        category: formData.category,
        countInStock: parseInt(formData.countInStock)
        // In a real application, you would handle image uploads separately
      };
      
      if (isNewProduct) {
        // Create new product
        await axios.post(
          'http://localhost:5000/api/products',
          productData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        // Update existing product
        await axios.put(
          `http://localhost:5000/api/products/${currentProduct._id}`,
          productData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      
      // Refresh product list
      setCurrentPage(1);
      setIsModalOpen(false);
      
      // Fetch updated products
      const response = await axios.get(
        `http://localhost:5000/api/products?page=1`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setProducts(response.data.products || []);
      setTotalPages(response.data.pages || 1);
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product. Please try again.');
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Remove product from state
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  // Render pagination
  const renderPagination = () => {
    const pages = [];
    
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i} 
          className={currentPage === i ? 'active' : ''}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    
    return (
      <div className="pagination">
        <button 
          onClick={goToPrevPage} 
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages}
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  // Product form modal
  const renderProductModal = () => {
    return (
      <div className={`product-modal ${isModalOpen ? 'open' : ''}`}>
        <div className="product-modal-content">
          <div className="product-modal-header">
            <h3>{isNewProduct ? 'Add New Product' : 'Edit Product'}</h3>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (Rs.)</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="countInStock">Stock Quantity</label>
                <input
                  type="number"
                  id="countInStock"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="images">Product Images</label>
              <input
                type="file"
                id="images"
                multiple
                onChange={handleImageUpload}
                accept="image/*"
              />
              
              <div className="image-preview-container">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview">
                    <img 
                      src={typeof image === 'string' ? image : URL.createObjectURL(image)} 
                      alt={`Preview ${index}`} 
                    />
                    <button 
                      type="button" 
                      className="remove-image" 
                      onClick={() => removeImage(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {isNewProduct ? 'Add Product' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <i className="fas fa-exclamation-circle"></i>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="products-content">
      <div className="content-header">
        <h2>Product Management</h2>
        <button className="add-button" onClick={openAddProductModal}>
          <i className="fas fa-plus"></i> Add New Product
        </button>
      </div>
      
      <div className="filter-row">
        <div className="filter-group">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
        <div className="filter-group">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="products-table">
        {products.length === 0 ? (
          <div className="no-products">
            <i className="fas fa-box-open"></i>
            <p>No products found</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td>
                    <img 
                      src={product.images && product.images.length > 0 
                        ? product.images[0] 
                        : 'https://via.placeholder.com/40'} 
                      alt={product.name} 
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category?.name || 'Uncategorized'}</td>
                  <td>Rs. {product.price.toLocaleString()}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <span className={product.countInStock > 0 ? 'status-active' : 'status-inactive'}>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      className="edit-btn"
                      onClick={() => openEditProductModal(product)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteProduct(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {renderPagination()}
      {renderProductModal()}
    </div>
  );
};

export default ProductsManagement;
