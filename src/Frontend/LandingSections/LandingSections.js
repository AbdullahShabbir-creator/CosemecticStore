import React from 'react';
import FeaturedCategories from './FeaturedCategories';
import BestSellers from './BestSellers';
import CustomerReviews from './CustomerReviews';
import BeautyTips from './BeautyTips';
import SpecialOffers from './SpecialOffers';
import Chatbot from '../Components/Chatbot';
import ScrollToTopButton from '../Components/ScrollToTopButton';
import './LandingSections.css';
import '../Components/Chatbot.css';

const LandingSections = () => {
    return (
        <div className="landing-sections">
            <FeaturedCategories />
            <BestSellers />
            <CustomerReviews />
            <BeautyTips />
            <SpecialOffers />
            <Chatbot />
            <ScrollToTopButton />
        </div>
    );
};

export default LandingSections;
