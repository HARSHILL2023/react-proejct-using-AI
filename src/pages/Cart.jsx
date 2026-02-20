import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShimmerButton } from '../components/ShimmerButton';
import { AuroraText } from '../components/AuroraText';
import { BorderBeam } from '../components/BorderBeam';
import { AnimatedList } from '../components/AnimatedList';

const Cart = () => {
    const { cart, removeFromCart, cartCount, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="container empty-cart"
            >
                <div className="border-beam-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="liquid-glass" style={{ padding: '6rem', borderRadius: '3rem', textAlign: 'center' }}>
                        <BorderBeam size={400} duration={15} delay={2} />
                        <ShoppingBag size={100} color="var(--primary)" style={{ marginBottom: '2rem', opacity: 0.3 }} />
                        <h2 className="font-heading" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Your Bag is <AuroraText>Waiting</AuroraText></h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
                            Experience the future of commerce. Your selection awaits your final touch.
                        </p>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <ShimmerButton
                                className="px-8 py-4"
                                shimmerColor="#ffffff"
                                background="var(--grad-primary)"
                                style={{ padding: '1.5rem 3rem', fontSize: '1.2rem', margin: '0 auto', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' }}
                            >
                                Start Exploring
                                <ArrowRight size={22} style={{ marginLeft: '1rem' }} />
                            </ShimmerButton>
                        </Link>
                    </div>
                </div>
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
            <div className="cart-header" style={{ marginBottom: '5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '2rem' }}>
                <h1 className="font-heading" style={{ fontSize: '4.5rem' }}>The <AuroraText>Vault</AuroraText></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', letterSpacing: '0.1em' }}>PRECISION CURATION • {cartCount} OBJECTS</p>
            </div>

            <div className="cart-grid" style={{ gap: '4rem' }}>
                <div className="cart-list">
                    <AnimatedList delay={0.15}>
                        {cart.map((item) => (
                            <div key={item.id} className="border-beam-container" style={{ marginBottom: '2.5rem' }}>
                                <div className="cart-item-new liquid-glass" style={{ borderRadius: '2.5rem', padding: '2.5rem' }}>
                                    <BorderBeam size={300} duration={10} colorFrom="#ffffff" colorTo="var(--primary)" />

                                    <div className="liquid-glass-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 150px) 1fr auto', gap: '3rem', alignItems: 'center', width: '100%' }}>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '1.8rem' }}>
                                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '120px', objectFit: 'contain' }} />
                                        </div>

                                        <div className="item-details">
                                            <span className="category-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dark)' }}>{item.category}</span>
                                            <h3 className="card-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                                            <p className="card-price" style={{ fontSize: '1.75rem', color: 'var(--primary)', fontWeight: 800 }}>${item.price.toFixed(2)}</p>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2rem' }}>
                                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1.5rem', borderRadius: '1rem' }}>
                                                <span style={{ fontWeight: 800, fontSize: '1.75rem' }}>{item.quantity}</span>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.1, x: -5 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => removeFromCart(item.id)}
                                                style={{ background: 'rgba(244, 63, 94, 0.1)', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '0.75rem 1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800 }}
                                            >
                                                <Trash2 size={18} />
                                                <span>DISCARD</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </AnimatedList>
                </div>

                <aside>
                    <div className="border-beam-container">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="cart-summary liquid-glass"
                            style={{ position: 'sticky', top: '120px', borderRadius: '3rem', padding: '3.5rem' }}
                        >
                            <BorderBeam size={500} duration={8} colorFrom="var(--primary)" colorTo="#ffffff" />

                            <h2 className="font-heading" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Grand <AuroraText>Statement</AuroraText></h2>

                            <div className="summary-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="summary-row" style={{ fontSize: '1.2rem' }}>
                                    <span style={{ opacity: 0.6 }}>Subtotal Value</span>
                                    <span style={{ fontWeight: 800 }}>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row" style={{ fontSize: '1.2rem' }}>
                                    <span style={{ opacity: 0.6 }}>System Logistics</span>
                                    <span style={{ color: '#10b981', fontWeight: 900, letterSpacing: '0.05em' }}>COMPLIMENTARY</span>
                                </div>
                            </div>

                            <div className="summary-total" style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '1.2rem', opacity: 0.5, fontWeight: 700 }}>TOTAL</span>
                                <span style={{ color: 'var(--text-dark)', fontWeight: 900 }}>${cartTotal.toFixed(2)}</span>
                            </div>

                            <ShimmerButton
                                className="checkout-btn"
                                shimmerColor="#ffffff"
                                background="var(--grad-primary)"
                                style={{ width: '100%', marginTop: '3.5rem', padding: '1.75rem', fontSize: '1.4rem', borderRadius: '1.5rem', boxShadow: '0 15px 40px rgba(99, 102, 241, 0.4)' }}
                                onClick={() => alert('Initiating Secure High-Speed Transaction...')}
                            >
                                Confirm Transaction
                                <ArrowRight size={24} style={{ marginLeft: '1rem' }} />
                            </ShimmerButton>
                        </motion.div>
                    </div>
                </aside>
            </div>
        </motion.div>
    );
};

export default Cart;
