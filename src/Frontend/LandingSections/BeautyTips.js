import React from 'react';
import './BeautyTips.css';

const BeautyTips = () => {
    const tips = [
        {
            id: 1,
            title: "Perfect Foundation Application",
            description: "Learn how to apply foundation for a flawless finish",
            image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2"
        },
        {
            id: 2,
            title: "Hair Care Routine",
            description: "Step-by-step guide to healthy hair",
            image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2"
        },
        {
            id: 3,
            title: "Skin Care Basics",
            description: "Essential skincare tips for glowing skin",
            image: "https://images.unsplash.com/photo-1573497019587-67d19d5ec8f2"
        }
    ];

    return (
        <section className="beauty-tips">
            <div className="section-header">
                <h2>Beauty Tips</h2>
                <p>Expert advice for your beauty routine</p>
            </div>
            
            <div className="tips-container">
                {tips.map((tip) => (
                    <div key={tip.id} className="tip-card">
                        <div className="tip-image">
                            <img src={tip.image} alt={tip.title} />
                        </div>
                        <div className="tip-content">
                            <h3>{tip.title}</h3>
                            <p>{tip.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BeautyTips;
