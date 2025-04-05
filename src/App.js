import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Frontend/Navbar/Navbar';
import Hero from './Frontend/hero/Hero';
import ProductCard from './Frontend/Productcard/Productcard';
import ProductPage from './Frontend/Productpage/Productpage';
import { ProductProvider } from './Context/ProductContext';

function App() {
  return (
        <ProductProvider>
    <Router>
      <Navbar />
      <Hero/>
      <ProductPage />

      <Routes>
      </Routes>
    </Router>
        </ProductProvider>
  );
}

export default App;
