import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Lipstick',
            price: '$15.99',
            image: 'https://hamzacosmetics.com/cdn/shop/files/20210801_175919_cf9914a0-59c8-4248-b8be-31fa3fb3fa84.jpg?v=1708647519',
        },
        {
            id: 2,
            name: 'Mascara',
            price: '$12.99',
            image: 'https://kikocosmetics.pk/cdn/shop/files/Web_banner_a4287f9f-a521-4e36-8412-6b935470d845.png?v=1735055226&width=1920',
        },
        // Add more products as needed
    ]);

    return (
        <ProductContext.Provider value={{ products }}>
            {children}
        </ProductContext.Provider>
    );
};
