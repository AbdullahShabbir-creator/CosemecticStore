import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCategories.css';

const FeaturedCategories = () => {
    const categories = [
        {
            id: 1,
            title: "Face & Makeup",
            image: "https://play-lh.googleusercontent.com/PDWTIlthihaSIj9n2DOyV0dkY0_CuDAiGZFMW5PYS1Dhc1_RLO1nnegIY7_qbCrqzlo",
            description: "Professional makeup products for flawless skin",
            route: "/makeup/face-powders"
        },
        {
            id: 2,
            title: "Hair Care",
            image: "https://healthwire.pk/wp-content/uploads/2022/04/hair-care-routine-to-get-healthy-hair.jpg",
            description: "Premium hair care products for healthy locks",
            route: "/haircare/shampoos"
        },
        {
            id: 3,
            title: "Skin Care",
            image: "https://www.shutterstock.com/image-photo/beautiful-young-woman-clean-perfect-260nw-1941572659.jpg",
            description: "Nourishing skincare essentials for glowing skin",
            route: "/skincare/cleansers"
        },
        {
            id: 4,
            title: "Sun Care",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQimfrX31qUSiQgcqCoRI_n0sN_AA3tqj79Kw&s",
            description: "Protection and care for your skin",
            route: "/suncare/sunscreens"
        }
    ];

    return (
        <section className="featured-categories">
            <div className="section-header">
                <h2>Featured Categories</h2>
                <p>Discover our premium cosmetic collections</p>
            </div>
            
            <div className="categories-grid">
                {categories.map((category) => (
                    <div key={category.id} className="category-card">
                        <div className="category-image">
                            <img src={category.image} alt={category.title} />
                        </div>
                        <div className="category-content">
                            <h3>{category.title}</h3>
                            <p>{category.description}</p>
                            <Link 
                                to={category.route} 
                                className="explore-btn"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                Explore Now
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedCategories;
