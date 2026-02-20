import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShimmerButton } from '../components/ShimmerButton';
import { AuroraText } from '../components/AuroraText';
import { ShineBorder } from '../components/ShineBorder';

const Cart = () => {
    const { cart, removeFromCart, cartCount, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container empty-cart"
            >
                <ShineBorder shineColor="rgba(99, 102, 241, 0.3)" borderRadius="3rem">
                    <div className="glass-panel" style={{ padding: '6rem', borderRadius: '3rem', textAlign: 'center' }}>
                        <ShoppingBag size={100} color="var(--primary)" style={{ marginBottom: '2rem', opacity: 0.2 }} />
                        <h2 className="font-heading" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Your Bag is <AuroraText>Waiting</AuroraText></h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
                            The finest selection of goods is just a click away. Fill your bag with greatness.
                        </p>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <ShimmerButton
                                className="px-8 py-4"
                                shimmerColor="#ffffff"
                                background="var(--primary)"
                                style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', margin: '0 auto' }}
                            >
                                Start Exploring
                                <ArrowRight size={22} style={{ marginLeft: '1rem' }} />
                            </ShimmerButton>
                        </Link>
                    </div>
                </ShineBorder>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ paddingBottom: '8rem' }}
        >
            <div className="cart-header" style={{ marginBottom: '4rem' }}>
                <h1 className="font-heading" style={{ fontSize: '4rem' }}>Your <AuroraText>Bag</AuroraText></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Experience the ultimate curation ({cartCount} Items)</p>
            </div>

            <div className="cart-grid" style={{ gap: '3rem' }}>
                <div className="cart-list">
                    <AnimatePresence mode='popLayout'>
                        {cart.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                key={item.id}
                                style={{ marginBottom: '2rem' }}
                            >
                                <ShineBorder shineColor="rgba(255, 255, 255, 0.1)" borderRadius="2rem">
                                    <div className="cart-item-new glass-panel" style={{ borderRadius: '2rem', padding: '2rem' }}>
                                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '1.5rem' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '120px', objectFit: 'contain' }} />
                                        </div>

                                        <div className="item-details">
                                            <span className="category-tag">{item.category}</span>
                                            <h3 className="card-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                            <p className="card-price" style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>${item.price.toFixed(2)}</p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.5rem' }}>
                                            <div className="item-qty-control" style={{ padding: '0.75rem 1.5rem' }}>
                                                <span style={{ fontWeight: 800, fontSize: '1.5rem' }}>x {item.quantity}</span>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1, color: '#f43f5e' }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => removeFromCart(item.id)}
                                                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1rem' }}
                                            >
                                                <Trash2 size={20} />
                                                <span>Drop Item</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </ShineBorder>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <aside>
                    <ShineBorder shineColor="var(--primary)" borderRadius="2.5rem">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="cart-summary glass-panel"
                            style={{ position: 'sticky', top: '120px', borderRadius: '2.5rem', padding: '3rem' }}
                        >
                            <h2 className="font-heading" style={{ fontSize: '2.5rem', marginBottom: '2.5rem' }}>Master <AuroraText>Summary</AuroraText></h2>
                            <div className="summary-row" style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>
                                <span>Subtotal</span>
                                <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row" style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>
                                <span>Express Shipping</span>
                                <span style={{ color: '#10b981', fontWeight: 800 }}>COMPLIMENTARY</span>
                            </div>

                            <div className="summary-total" style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '2px solid var(--border)', fontSize: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                                <span>Grand Total</span>
                                <span style={{ color: 'var(--primary)', fontWeight: 800 }}>${cartTotal.toFixed(2)}</span>
                            </div>

                            <ShimmerButton
                                className="checkout-btn"
                                shimmerColor="#ffffff"
                                background="var(--primary)"
                                style={{ width: '100%', marginTop: '3rem', padding: '1.5rem', fontSize: '1.25rem' }}
                                onClick={() => alert('Launching Secure Payment Gateway...')}
                            >
                                Secure Checkout
                                <ArrowRight size={24} style={{ marginLeft: '1rem' }} />
                            </ShimmerButton>
                        </motion.div>
                    </ShineBorder>
                </aside>
            </div>
        </motion.div>
    );
};

export default Cart;
