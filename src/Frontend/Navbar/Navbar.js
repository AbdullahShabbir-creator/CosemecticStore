import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../Context/CartContext';
import { useAuth } from '../Context/AuthContext';
import "../../Styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const { cartItems } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);

    // Handle clicks outside the user menu to close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleUserIconClick = () => {
        if (isAuthenticated) {
            // Toggle the user menu
            setShowUserMenu(!showUserMenu);
        } else {
            // Not logged in, go to login page
            navigate('/login');
        }
    };

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    const handleAdminDashboard = () => {
        setShowUserMenu(false);
        navigate('/admin/dashboard');
    };

    const handleProfile = () => {
        setShowUserMenu(false);
        navigate('/profile');
    };

    const handleOrders = () => {
        setShowUserMenu(false);
        navigate('/orders');
    };

    return (
        <>
            <div className="announcement">
                <p>
                    Nationwide orders placed till 25th March 2025 and Lahore orders placed
                    till 27th March 2025 will be delivered before Eid.
                </p>
            </div>

            <nav className="navbar navbar-expand-lg navbar-dark bg-black " style={{height:"138px"}}>
                <div className="w-100 d-flex justify-content-around align-items-center px-3">
                    <div className="search-box">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" className="search-input" placeholder="Search..." />
                    </div>

                    <Link className="navbar-brand mx-auto logo" to="/">
                        Glow and Glamour
                    </Link>

                    <div className="navbar-icons">
                        <Link to="#">
                            <i className="fa-solid fa-location-dot"></i>
                        </Link>
                        <div className="user-icon-container" ref={userMenuRef}>
                            <div className="user-icon" onClick={handleUserIconClick}>
                                <i className="fa-solid fa-circle-user"></i>
                                {isAuthenticated && <span className="user-status-dot"></span>}
                            </div>
                            
                            {/* User dropdown menu */}
                            {showUserMenu && isAuthenticated && (
                                <div className="user-dropdown-menu p-0">
                                    <div className="user-info">
                                        <span className="user-name">{user?.name || 'User'}</span>
                                        <span className="user-email">{user?.email}</span>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    
                                    {user?.role === 'admin' && (
                                        <div className="dropdown-item p-0" onClick={handleAdminDashboard}>
                                            <i className="fa-solid fa-gauge-high"></i> Dashboard
                                        </div>
                                    )}
                                    
                                    <div className="dropdown-item p-0" onClick={handleProfile}>
                                        <i className="fa-solid fa-user"></i> Profile
                                    </div>
                                    
                                    <div className="dropdown-item" onClick={handleOrders}>
                                        <i className="fa-solid fa-box"></i> My Orders
                                    </div>
                                    
                                    <div className="dropdown-divider"></div>
                                    
                                    <div className="dropdown-item logout" onClick={handleLogout}>
                                        <i className="fa-solid fa-sign-out-alt"></i> Logout
                                    </div>
                                </div>
                            )}
                        </div>
                        {isAuthenticated && user && user.role === 'admin' && (
                            <Link to="/admin/dashboard" className="admin-link">
                                <i className="fa-solid fa-lock"></i>
                            </Link>
                        )}
                        <Link to="/cart">
                            <div className="cart-icon">
                                <i className="fa-solid fa-cart-plus"></i>
                                {cartItems.length > 0 && (
                                    <span className="cart-count">{cartItems.length}</span>
                                )}
                            </div>
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
                                <Link to="/makeup/face-powders" className="face-powders-link">
                                    <i className="fa-solid fa-powder-makeup"></i> Face Powders
                                </Link>
                                <Link to="/makeup/face-highlighters">
                                    <i className="fa-solid fa-sparkles"></i> Face Highlighters
                                </Link>
                                <Link to="/makeup/bronzers-contours">
                                    <i className="fa-solid fa-brush"></i> Bronzers & Contours
                                </Link>
                                <Link to="/makeup/foundations">
                                    <i className="fa-solid fa-paint-roller"></i> Foundations
                                </Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Eye Makeup</h2>
                                <Link to="/makeup/eye-brows">
                                    <i className="fa-solid fa-pen"></i> Eye brows
                                </Link>
                                <Link to="/makeup/eye-shadows">
                                    <i className="fa-solid fa-palette"></i> Eye shadows
                                </Link>
                                <Link to="/makeup/eye-liners">
                                    <i className="fa-solid fa-pen-nib"></i> Eye liners
                                </Link>
                                <Link to="/makeup/eye-pencils">
                                    <i className="fa-solid fa-pen-to-square"></i> Eye Pencils
                                </Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Lip Makeup</h2>
                                <Link to="/makeup/lip-sticks">
                                    <i className="fa-solid fa-lipstick"></i> Lip sticks
                                </Link>
                                <Link to="/makeup/lip-pencils">
                                    <i className="fa-solid fa-pen-clip"></i> Lip Pencils
                                </Link>
                                <Link to="/makeup/lip-glosses">
                                    <i className="fa-solid fa-gem"></i> Lip Glosses
                                </Link>
                            </div>

                            <div className="dropdown-column">
                                <h2>Makeup Brush Sets</h2>
                                <Link to="/brushes/brush-holders">
                                    <i className="fa-solid fa-box"></i> Brush Holders
                                </Link>
                                <Link to="/brushes/face-brushes">
                                    <i className="fa-solid fa-brush"></i> Face Brushes
                                </Link>
                                <Link to="/brushes/eye-brushes">
                                    <i className="fa-solid fa-pen"></i> Eye Brushes
                                </Link>
                                <Link to="/brushes/lip-brushes">
                                    <i className="fa-solid fa-pen-to-square"></i> Lip Brushes
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className="category-item">
                        <Link to="#">Skin Care</Link>
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <h2>Skin Care</h2>
                                <Link to="/skincare/cleansers">
                                    <i className="fa-solid fa-soap"></i> Cleansers
                                </Link>
                                <Link to="/skincare/toners">
                                    <i className="fa-solid fa-water"></i> Toners
                                </Link>
                                <Link to="/skincare/moisturizers">
                                    <i className="fa-solid fa-droplet"></i> Moisturizers
                                </Link>
                                <Link to="/skincare/serums">
                                    <i className="fa-solid fa-flask"></i> Serums
                                </Link>
                                <Link to="/skincare/eye-creams">
                                    <i className="fa-solid fa-eye"></i> Eye Creams
                                </Link>
                                <Link to="/skincare/face-masks">
                                    <i className="fa-solid fa-mask"></i> Face Masks
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className="category-item">
                        <Link to="#">Sun Care</Link>
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <h2>Sun Care</h2>
                                <Link to="/suncare/sunscreens">
                                    <i className="fa-solid fa-sun"></i> Sunscreens
                                </Link>
                                <Link to="/suncare/sun-lotions">
                                    <i className="fa-solid fa-tint"></i> Sun Lotions
                                </Link>
                                <Link to="/suncare/after-sun">
                                    <i className="fa-solid fa-heart-pulse"></i> After Sun
                                </Link>
                                <Link to="/suncare/self-tanners">
                                    <i className="fa-solid fa-sun"></i> Self Tanners
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className="category-item">
                        <Link to="#">Hair</Link>
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <h2>Hair Care</h2>
                                <Link to="/haircare/shampoos">
                                    <i className="fa-solid fa-shower"></i> Shampoos
                                </Link>
                                <Link to="/haircare/conditioners">
                                    <i className="fa-solid fa-droplet"></i> Conditioners
                                </Link>
                                <Link to="/haircare/masks">
                                    <i className="fa-solid fa-mask"></i> Masks
                                </Link>
                                <Link to="/haircare/oils">
                                    <i className="fa-solid fa-droplet"></i> Oils
                                </Link>
                                <Link to="/haircare/serums">
                                    <i className="fa-solid fa-flask"></i> Serums
                                </Link>
                                <Link to="/haircare/tools">
                                    <i className="fa-solid fa-computer-mouse"></i> Tools
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li className="category-item dropdown">
                        <Link to="#">Accessories</Link>
                        <div className="dropdown-menu">
                            <div className="dropdown-column">
                                <h2>Face Accessories</h2>
                                <Link to="/accessories/makeup-sponges">
                                    <i className="fa-solid fa-sponge"></i> Makeup Sponges
                                </Link>
                                <Link to="/accessories/cleansing-sponges">
                                    <i className="fa-solid fa-sponge"></i> Cleansing Sponges
                                </Link>
                            </div>
                            <div className="dropdown-column">
                                <h2>Eye Accessories</h2>
                                <Link to="/accessories/eyelash-curlers">
                                    <i className="fa-solid fa-curling-iron"></i> Eyelash Curlers
                                </Link>
                                <Link to="/accessories/false-eyelashes">
                                    <i className="fa-solid fa-eyeglasses"></i> False Eyelashes
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
}
