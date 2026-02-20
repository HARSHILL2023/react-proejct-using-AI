import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, LayoutGrid, Info, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { AuroraText } from './AuroraText';
import { AnimatedThemeToggler } from './AnimatedThemeToggler';
import { Dock } from './Dock';

const Navbar = () => {
    const { cartCount } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const dockItems = [
        {
            title: "Shop",
            icon: <LayoutGrid size={22} />,
            to: "/",
            onClick: () => navigate("/")
        },
        {
            title: "About",
            icon: <Info size={22} />,
            to: "/about",
            onClick: () => navigate("/about")
        },
        {
            title: "Cart",
            icon: (
                <div style={{ position: 'relative' }}>
                    <ShoppingBag size={22} />
                    {cartCount > 0 && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            key={cartCount}
                            className="badge"
                            style={{ top: '-10px', right: '-10px' }}
                        >
                            {cartCount}
                        </motion.span>
                    )}
                </div>
            ),
            to: "/cart",
            onClick: () => navigate("/cart")
        }
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="navbar container"
        >
            <div className="nav-content" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
                <NavLink to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <Zap fill="var(--primary)" size={28} />
                    <AuroraText>SwiftCart</AuroraText>
                </NavLink>

                <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <Dock items={dockItems} activePath={location.pathname} />
                    <div style={{ marginLeft: '0.5rem', paddingLeft: '1rem', borderLeft: '1px solid var(--border)' }}>
                        <AnimatedThemeToggler />
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
