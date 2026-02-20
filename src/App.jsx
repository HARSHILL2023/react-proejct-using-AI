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
  const [theme, setTheme] = React.useState('light');

  // Sync theme for particles
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <SmoothCursor />
          <Particles
            className="particles-container"
            quantity={150}
            color={theme === 'dark' ? '#ffffff' : '#6366f1'}
          />
          <Navbar />
          <main style={{ marginTop: '1rem' }}>
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
