import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Frontend/Navbar/Navbar';
import Hero from './Frontend/hero/Hero';
import ProductPage from './Frontend/Productpage/Productpage';
import { ProductProvider } from './Context/ProductContext';
import Login from './Frontend/Auth/Login';
import Signup from './Frontend/Auth/Signup';

function App() {
  return (
        <ProductProvider>
    <Router>
      <Navbar />
     
      <Routes>
           
      <Route path="/" element={
       <div>
       <Hero />
       <ProductPage />
     </div>
    } />
   
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
        </ProductProvider>
  );
}

export default App;
