import React from 'react';
import './BeautyTips.css';

const BeautyTips = () => {
    const tips = [
        {
            id: 1,
            title: "Perfect Foundation Application",
            description: "Learn how to apply foundation for a flawless finish",
            image: "https://th.bing.com/th/id/OIP.QGc6-71b1X0KwrxjWnOQVgHaEP?rs=1&pid=ImgDetMain"
        },
        {
            id: 2,
            title: "Hair Care Routine",
            description: "Step-by-step guide to healthy hair",
            image: "https://th.bing.com/th/id/R.3f889e6f6b2ae62583c5a5a50e3c7e68?rik=kg2eUVg%2fbyI%2f%2fg&pid=ImgRaw&r=0"
        },
        {
            id: 3,
            title: "Skin Care Basics",
            description: "Essential skincare tips for glowing skin",
            image: "https://th.bing.com/th/id/OIP.0GKOeu4RKtMMsUuucwZvQQHaFX?rs=1&pid=ImgDetMain"
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
