import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Products from './pages/Products';
import Cart from './pages/Cart';
import About from './pages/About';
import { SmoothCursor } from './components/SmoothCursor';
import { Particles } from './components/Particles';
import { Meteors } from './components/Meteors';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [theme, setTheme] = React.useState('dark');

  // Sync theme for particles
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Set default theme to dark for the tournament look, but respect existing choice
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.add('dark');
    }

    return () => observer.disconnect();
  }, []);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="app" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
          <Meteors number={30} />
          <SmoothCursor />
          <Particles
            className="particles-container"
            quantity={100}
            color="#ffffff"
            staticity={30}
          />
          <Navbar />
          <main style={{ marginTop: '1rem', position: 'relative', zIndex: 1 }}>
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
