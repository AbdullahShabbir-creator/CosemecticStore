import React, { createContext, useContext, useState, useEffect } from 'react';
import { productAPI, categoryAPI } from '../../services/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    brand: '',
    rating: '',
    keyword: '',
    sort: 'newest'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    count: 0
  });

  // Load featured products
  const loadFeaturedProducts = async () => {
    try {
      const { data } = await productAPI.getFeaturedProducts();
      setFeaturedProducts(data);
    } catch (err) {
      console.error('Failed to load featured products:', err);
    }
  };

  // Load top products
  const loadTopProducts = async () => {
    try {
      const { data } = await productAPI.getTopProducts();
      setTopProducts(data);
    } catch (err) {
      console.error('Failed to load top products:', err);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const { data } = await categoryAPI.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  // Load products with filters
  const loadProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        ...filters,
        page
      };
      
      const { data } = await productAPI.getProducts(params);
      setProducts(data.products);
      setPagination({
        page: data.page,
        pages: data.pages,
        count: data.count
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await productAPI.getProductById(id);
      return data;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load product');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Create product review
  const createProductReview = async (productId, review) => {
    setLoading(true);
    setError(null);
    try {
      await productAPI.createProductReview(productId, review);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create review');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update filters
  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      brand: '',
      rating: '',
      keyword: '',
      sort: 'newest'
    });
  };

  // Load initial data
  useEffect(() => {
    loadFeaturedProducts();
    loadTopProducts();
    loadCategories();
  }, []);

  // Load products when filters change
  useEffect(() => {
    loadProducts(1);
  }, [filters]);

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        topProducts,
        categories,
        loading,
        error,
        filters,
        pagination,
        loadProducts,
        getProductById,
        createProductReview,
        updateFilters,
        clearFilters
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

export default ProductContext;
