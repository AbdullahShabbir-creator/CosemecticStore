import React, { useContext } from 'react';
import { ProductContext } from '../../Context/ProductContext'
import ProductCard from '../Productcard/Productcard';

const ProductPage = () => {
  const { products } = useContext(ProductContext);

  // Make sure products exist before rendering the list
  if (!products || products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="product-page">
      <h1>Our Products</h1>
      <div className="product-list d-flex ">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
