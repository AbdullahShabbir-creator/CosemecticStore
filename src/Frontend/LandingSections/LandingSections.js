import React from 'react';
import FeaturedCategories from './FeaturedCategories';
import BestSellers from './BestSellers';
import CustomerReviews from './CustomerReviews';
import BeautyTips from './BeautyTips';
import SpecialOffers from './SpecialOffers';
import './LandingSections.css';

const LandingSections = () => {
    return (
        <div className="landing-sections">
            <FeaturedCategories />
            <BestSellers />
            <CustomerReviews />
            <BeautyTips />
            <SpecialOffers />
        </div>
    );
};

export default LandingSections;
