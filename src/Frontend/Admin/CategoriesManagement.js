import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    parentCategory: '',
    isFeatured: false,
    image: null
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        setCategories(response.data || []);
        
        // Filter parent categories (top-level categories)
        const parents = response.data.filter(cat => !cat.parentCategory);
        setParentCategories(parents);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please try again.');
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    // In a real application, you would upload the image to a server or cloud storage
    // For this example, we'll just store the file object
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });
  };

  // Open modal for adding new category
  const openAddCategoryModal = () => {
    setFormData({
      name: '',
      description: '',
      parentCategory: '',
      isFeatured: false,
      image: null
    });
    setCurrentCategory(null);
    setIsNewCategory(true);
    setIsModalOpen(true);
  };

  // Open modal for editing category
  const openEditCategoryModal = (category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      parentCategory: category.parentCategory?._id || '',
      isFeatured: category.isFeatured || false,
      image: category.image || null
    });
    setCurrentCategory(category);
    setIsNewCategory(false);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const categoryData = {
        name: formData.name,
        description: formData.description,
        parentCategory: formData.parentCategory || null,
        isFeatured: formData.isFeatured
        // In a real application, you would handle image uploads separately
      };
      
      if (isNewCategory) {
        // Create new category
        await axios.post(
          'http://localhost:5000/api/categories',
          categoryData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      } else {
        // Update existing category
        await axios.put(
          `http://localhost:5000/api/categories/${currentCategory._id}`,
          categoryData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      }
      
      // Refresh category list
      const response = await axios.get(
        'http://localhost:5000/api/categories',
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      setCategories(response.data || []);
      
      // Update parent categories list
      const parents = response.data.filter(cat => !cat.parentCategory);
      setParentCategories(parents);
      
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving category:', err);
      alert('Failed to save category. Please try again.');
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    // Check if category has children
    const hasChildren = categories.some(cat => 
      cat.parentCategory && cat.parentCategory._id === categoryId
    );
    
    if (hasChildren) {
      alert('Cannot delete a category that has subcategories. Please delete or reassign the subcategories first.');
      return;
    }
    
    // Check if category has products
    try {
      const productResponse = await axios.get(
        `http://localhost:5000/api/products/count?category=${categoryId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      if (productResponse.data.count > 0) {
        if (!window.confirm(`This category has ${productResponse.data.count} products. Deleting it will remove the category from these products. Are you sure you want to continue?`)) {
          return;
        }
      } else {
        if (!window.confirm('Are you sure you want to delete this category?')) {
          return;
        }
      }
      
      await axios.delete(
        `http://localhost:5000/api/categories/${categoryId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      
      // Remove category from state
      setCategories(categories.filter(cat => cat._id !== categoryId));
      
      // Update parent categories list
      const updatedParents = categories
        .filter(cat => cat._id !== categoryId && !cat.parentCategory)
        .filter(cat => cat._id !== categoryId);
      
      setParentCategories(updatedParents);
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Failed to delete category');
    }
  };

  // Get parent category name
  const getParentCategoryName = (parentId) => {
    const parent = categories.find(cat => cat._id === parentId);
    return parent ? parent.name : '-';
  };

  // Category form modal
  const renderCategoryModal = () => {
    return (
      <div className={`category-modal ${isModalOpen ? 'open' : ''}`}>
        <div className="category-modal-content">
          <div className="category-modal-header">
            <h3>{isNewCategory ? 'Add New Category' : 'Edit Category'}</h3>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label htmlFor="name">Category Name</label>
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
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="parentCategory">Parent Category</label>
              <select
                id="parentCategory"
                name="parentCategory"
                value={formData.parentCategory}
                onChange={handleInputChange}
              >
                <option value="">None (Top Level)</option>
                {parentCategories.map(category => (
                  // Don't show current category as a parent option to prevent circular references
                  currentCategory && category._id === currentCategory._id ? null : (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  )
                ))}
              </select>
            </div>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                />
                Featured Category (Show on Homepage)
              </label>
            </div>
            
            <div className="form-group">
              <label htmlFor="image">Category Image</label>
              <input
                type="file"
                id="image"
                onChange={handleImageUpload}
                accept="image/*"
              />
              
              {formData.image && (
                <div className="image-preview">
                  <img 
                    src={typeof formData.image === 'string' ? formData.image : URL.createObjectURL(formData.image)} 
                    alt="Category Preview" 
                  />
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {isNewCategory ? 'Add Category' : 'Save Changes'}
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
        <p>Loading categories...</p>
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
    <div className="categories-content">
      <div className="content-header">
        <h2>Category Management</h2>
        <button className="add-button" onClick={openAddCategoryModal}>
          <i className="fas fa-plus"></i> Add New Category
        </button>
      </div>
      
      <div className="categories-table">
        {categories.length === 0 ? (
          <div className="no-categories">
            <i className="fas fa-tags"></i>
            <p>No categories found</p>
            <button className="add-first-category" onClick={openAddCategoryModal}>
              Add Your First Category
            </button>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Parent Category</th>
                <th>Products</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category._id}>
                  <td>#{category._id.substring(0, 8)}</td>
                  <td>{category.name}</td>
                  <td>
                    {category.parentCategory ? category.parentCategory.name : '-'}
                  </td>
                  <td>{category.productCount || 0}</td>
                  <td>
                    <span className={category.isFeatured ? 'status-active' : 'status-inactive'}>
                      {category.isFeatured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      className="edit-btn"
                      onClick={() => openEditCategoryModal(category)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteCategory(category._id)}
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
      
      {renderCategoryModal()}
    </div>
  );
};

export default CategoriesManagement;
