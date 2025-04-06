import { Link } from "react-router-dom";
import "../../Styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
    return (
        <>
            <div className="announcement">
                <p>
                    Nationwide orders placed till 25th March 2025 and Lahore orders placed
                    till 27th March 2025 will be delivered before Eid.
                </p>
            </div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                <div className="w-100 d-flex justify-content-around align-items-center px-3">


                    <div className="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" className="search-input" placeholder="Search..." />
                    </div>

                    <Link className="navbar-brand mx-auto logo" to="/">
                        Glow and Glamour
                    </Link>


                    <div className="navbar-icons">
                        <Link to="#">
                            <i class="fa-solid fa-location-dot"></i>
                        </Link>
                        <Link to="/signup">
                            <i className="fa-solid fa-circle-user"></i>
                        </Link>

                        <Link to="#">
                            <i class="fa-solid fa-cart-plus"></i>
                        </Link>


                    </div>
                </div>
            </nav>

            <div className="category-navbar">
                <ul className="category-list">
                    <li className="category-item">
                        <Link to="#">Make Up</Link>
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <h2>Face MakeUp</h2>
                                <Link to="#">Face Powders</Link>
                                <Link to="#">Face Highlighters</Link>
                                <Link to="#">Bronzers & Contours</Link>
                                <Link to="#">Foundations</Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Eye Makeup</h2>
                                <Link to="#">Eye brows</Link>
                                <Link to="#">Eye shadows</Link>
                                <Link to="#">Eye liners</Link>
                                <Link to="#">Eye Pencils</Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Lip Makeup</h2>
                                <Link to="#">Lip sticks</Link>
                                <Link to="#">Lip Pencils</Link>
                                <Link to="#">Lip Glosses</Link>
                            </div>

                            <div className="dropdown-column">
                                <h2>Makeup Brush Sets</h2>
                                <Link to="#">Brush Holders</Link>
                                <Link to="#">Face Brushes</Link>
                                <Link to="#">Eye Brushes</Link>
                                <Link to="#">Lip Brushes</Link>
                            </div>
                        </div>
                    </li>
                    <li className="category-item">
                        <Link to="#">Skin Care</Link>
                    </li>
                    <li className="category-item">
                        <Link to="#">Sun Care</Link>
                    </li>
                    <li className="category-item">
                        <Link to="#">Hair</Link>
                    </li>
                    <li className="category-item dropdown">
                        <Link to="#">Accessories</Link>
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <h2>Face Accessories</h2>
                                <Link to="#">Makeup Sponges and Mirrors</Link>
                                <Link to="#">Cleansing Sponges</Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Eye Accessories</h2>
                                <Link to="#">Steel Eyelash Curlers</Link>
                                <Link to="#">False Eyelashes</Link>
                                <Link to="#">Eye Pencil Sharpeners</Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Hand Care Accessories</h2>
                                <Link to="#">Nail Polish Removers</Link>
                                <Link to="#">Manicure</Link>
                                <Link to="#">Nail Files</Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Makeup Bags</h2>
                            </div>
                            <div className="dropdown-column">
                                <h2>Makeup Brush Sets</h2>
                                <Link to="#">Brush Holders</Link>
                                <Link to="#">Face Brushes</Link>
                                <Link to="#">Eye Brushes</Link>
                                <Link to="#">Lip Brushes</Link>
                            </div>
                        </div>
                    </li>
                    <li className="category-item">
                        <Link to="#">New</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
