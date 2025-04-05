// src/Slider.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

const Hero = () => {
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner" data-bs-interval="3000"> {/* Set the interval to 3000ms (3 seconds) */}
                <div className="carousel-item active">
                    <img src="https://kikocosmetics.pk/cdn/shop/files/Web_banner_1_a817f3ed-8a00-4e37-9a8f-3886ec7dee89.png?v=1740468574&width=1920" className="d-block w-100" alt="First slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Golden Oasis</h5>
                        <p>Discover your inner beauty.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src="https://kikocosmetics.pk/cdn/shop/files/Web_banner_a4287f9f-a521-4e36-8412-6b935470d845.png?v=1735055226&width=1920" className="d-block w-100" alt="Second slide" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Another Title</h5>
                        <p>Another subtitle goes here.</p>
                    </div>
                </div>
                {/* Add more slides as needed */}
            </div>
            <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default Hero;
