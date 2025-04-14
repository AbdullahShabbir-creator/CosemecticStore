import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Frontend/Navbar/Navbar';
import Hero from './Frontend/hero/Hero';
import LandingSections from './Frontend/LandingSections/LandingSections';
import Login from './Frontend/Auth/Login';
import Signup from './Frontend/Auth/Signup';
import { CartProvider } from './Frontend/Context/CartContext';
import { AuthProvider } from './Frontend/Context/AuthContext';
import Cart from './Frontend/Components/Cart/Cart';
import Checkout from './Frontend/Components/Checkout/Checkout';
import Dashboard from './Frontend/Admin/Dashboard';
import Profile from './Frontend/User/Profile';
import SetupAdmin from './Frontend/Admin/SetupAdmin';
import OrderHistory from './Frontend/User/OrderHistory';
import PrivateRoute from './Frontend/Components/PrivateRoute';
import Footer from './Frontend/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Makeup Products
import FacePowders from './Frontend/Products/FacePowders';
import FaceHighlighters from './Frontend/Products/FaceHighlighters';
import BronzersContours from './Frontend/Products/BronzersContours';
import Foundations from './Frontend/Products/Foundations';
import EyeBrows from './Frontend/Products/EyeBrows';
import EyeShadows from './Frontend/Products/EyeShadows';
import EyeLiners from './Frontend/Products/EyeLiners';
import EyePencils from './Frontend/Products/EyePencils';
import LipSticks from './Frontend/Products/LipSticks';
import LipPencils from './Frontend/Products/LipPencils';
import LipGlosses from './Frontend/Products/LipGlosses';

// Makeup Brushes
import BrushHolders from './Frontend/Products/BrushHolders';
import FaceBrushes from './Frontend/Products/FaceBrushes';
import EyeBrushes from './Frontend/Products/EyeBrushes';
import LipBrushes from './Frontend/Products/LipBrushes';

// Accessories
import MakeupSponges from './Frontend/Products/MakeupSponges';
import CleansingSponges from './Frontend/Products/CleansingSponges';
import EyelashCurlers from './Frontend/Products/EyelashCurlers';
import FalseEyelashes from './Frontend/Products/FalseEyelashes';

// Skin Care Products
import Cleansers from './Frontend/Products/SkinCare/Cleansers';
import Toners from './Frontend/Products/SkinCare/Toners';
import Moisturizers from './Frontend/Products/SkinCare/Moisturizers';
import Serums from './Frontend/Products/SkinCare/Serums';
import EyeCreams from './Frontend/Products/SkinCare/EyeCreams';
import FaceMasks from './Frontend/Products/SkinCare/FaceMasks';

// Sun Care Products
import Sunscreens from './Frontend/Products/SunCare/Sunscreens';
import SunLotions from './Frontend/Products/SunCare/SunLotions';
import AfterSun from './Frontend/Products/SunCare/AfterSun';
import SelfTanners from './Frontend/Products/SunCare/SelfTanners';

// Hair Products
import Shampoos from './Frontend/Products/Hair/Shampoos';
import Conditioners from './Frontend/Products/Hair/Conditioners';
import HairMasks from './Frontend/Products/Hair/HairMasks';
import HairOils from './Frontend/Products/Hair/HairOils';
import HairSerums from './Frontend/Products/Hair/HairSerums';
import HairTools from './Frontend/Products/Hair/HairTools';

// Offers
import SpringCollection from './Frontend/Products/Offers/SpringCollection';
import BundleOffer from './Frontend/Products/Offers/BundleOffer';
import StudentDiscount from './Frontend/Products/Offers/StudentDiscount';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          
          <Routes>
            <Route path="/" element={
              <div>
                <Hero />
                <LandingSections />
              </div>
            } />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* User Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/setup" element={<SetupAdmin />} />
            
            {/* Cart and Checkout Routes */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Offer Routes */}
            <Route path="/offers/spring-collection" element={<SpringCollection />} />
            <Route path="/offers/bundle-offers" element={<BundleOffer />} />
            <Route path="/offers/student-discounts" element={<StudentDiscount />} />
            
            {/* Makeup Routes */}
            <Route path="/makeup/face-powders" element={<FacePowders />} />
            <Route path="/makeup/face-highlighters" element={<FaceHighlighters />} />
            <Route path="/makeup/bronzers-contours" element={<BronzersContours />} />
            <Route path="/makeup/foundations" element={<Foundations />} />
            
            <Route path="/makeup/eye-brows" element={<EyeBrows />} />
            <Route path="/makeup/eye-shadows" element={<EyeShadows />} />
            <Route path="/makeup/eye-liners" element={<EyeLiners />} />
            <Route path="/makeup/eye-pencils" element={<EyePencils />} />
            
            <Route path="/makeup/lip-sticks" element={<LipSticks />} />
            <Route path="/makeup/lip-pencils" element={<LipPencils />} />
            <Route path="/makeup/lip-glosses" element={<LipGlosses />} />
            
            {/* Makeup Brushes Routes */}
            <Route path="/brushes/brush-holders" element={<BrushHolders />} />
            <Route path="/brushes/face-brushes" element={<FaceBrushes />} />
            <Route path="/brushes/eye-brushes" element={<EyeBrushes />} />
            <Route path="/brushes/lip-brushes" element={<LipBrushes />} />
            
            {/* Accessories Routes */}
            <Route path="/accessories/makeup-sponges" element={<MakeupSponges />} />
            <Route path="/accessories/cleansing-sponges" element={<CleansingSponges />} />
            <Route path="/accessories/eyelash-curlers" element={<EyelashCurlers />} />
            <Route path="/accessories/false-eyelashes" element={<FalseEyelashes />} />
            
            {/* Skin Care Routes */}
            <Route path="/skincare/cleansers" element={<Cleansers />} />
            <Route path="/skincare/toners" element={<Toners />} />
            <Route path="/skincare/moisturizers" element={<Moisturizers />} />
            <Route path="/skincare/serums" element={<Serums />} />
            <Route path="/skincare/eye-creams" element={<EyeCreams />} />
            <Route path="/skincare/face-masks" element={<FaceMasks />} />
            
            {/* Sun Care Routes */}
            <Route path="/suncare/sunscreens" element={<Sunscreens />} />
            <Route path="/suncare/sun-lotions" element={<SunLotions />} />
            <Route path="/suncare/after-sun" element={<AfterSun />} />
            <Route path="/suncare/self-tanners" element={<SelfTanners />} />
            
            {/* Hair Care Routes */}
            <Route path="/haircare/shampoos" element={<Shampoos />} />
            <Route path="/haircare/conditioners" element={<Conditioners />} />
            <Route path="/haircare/masks" element={<HairMasks />} />
            <Route path="/haircare/oils" element={<HairOils />} />
            <Route path="/haircare/serums" element={<HairSerums />} />
            <Route path="/haircare/tools" element={<HairTools />} />
          </Routes>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
