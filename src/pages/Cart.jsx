import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShimmerButton } from '../components/ShimmerButton';
import { AuroraText } from '../components/AuroraText';
import { BorderBeam } from '../components/BorderBeam';
import { AnimatedList } from '../components/AnimatedList';

const Cart = () => {
    const { cart, removeFromCart, cartCount, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="container empty-cart"
            >
                <div className="empty-state-card" style={{ maxWidth: '600px', margin: '4rem auto', padding: '4rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', textAlign: 'center' }}>
                    <ShoppingBag size={80} color="var(--primary)" style={{ marginBottom: '2rem', opacity: 0.2 }} />
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Your Bag is Empty</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ShimmerButton
                            shimmerColor="#ffffff"
                            background="var(--grad-primary)"
                            style={{ padding: '1.25rem 2.5rem', margin: '0 auto' }}
                        >
                            Start Shopping
                        </ShimmerButton>
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container"
            style={{ padding: '6rem 2rem 10rem' }}
        >
            <div className="cart-header" style={{ marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3.5rem', fontWeight: 800 }}>Shopping <AuroraText>Cart</AuroraText></h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{cartCount} items in your selection</p>
            </div>

            <div className="cart-grid" style={{ gridTemplateColumns: '1fr 380px', gap: '3rem' }}>
                <div className="cart-list">
                    <AnimatedList delay={0.1}>
                        {cart.map((item, index) => (
                            <div key={item.id} className="cart-item-row liquid-glass" style={{ position: 'relative', background: 'rgba(255,255,255,0.01)', padding: '2rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: '140px 1fr auto', gap: '2.5rem', alignItems: 'center' }}>
                                <div className="item-img-box" style={{ background: '#fff', borderRadius: '16px', padding: '1.5rem', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <img src={item.image} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>

                                <div className="item-details-box">
                                    <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em' }}>{item.category}</span>
                                    <h3 style={{ fontSize: '1.5rem', margin: '0.75rem 0', color: '#f1f5f9' }}>{item.title}</h3>
                                    <p style={{ fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>${item.price.toFixed(2)}</p>
                                </div>

                                <div className="item-actions-box" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div className="qty-tag" style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 700 }}>
                                        Qty: {item.quantity}
                                    </div>
                                    <button
                                        onClick={() => {
                                            console.log('Discarding item:', item.id);
                                            removeFromCart(item.id);
                                        }}
                                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.5rem', transition: 'color 0.2s', zIndex: 50, position: 'relative' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
                                    >
                                        <Trash2 size={22} />
                                    </button>
                                </div>
                                <BorderBeam size={150} duration={12} delay={index * 2} colorFrom="var(--primary)" colorTo="transparent" />
                            </div>
                        ))}
                    </AnimatedList>
                </div>

                <aside>
                    <div className="cart-summary-box" style={{ background: 'var(--surface)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '2.5rem', position: 'sticky', top: '120px' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Order Summary</h2>
                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                            <span>Subtotal</span>
                            <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                            <span>Shipping</span>
                            <span style={{ color: '#10b981', fontWeight: 800 }}>Free</span>
                        </div>
                        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700 }}>Total</span>
                            <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary)' }}>${cartTotal.toFixed(2)}</span>
                        </div>
                        <ShimmerButton
                            background="var(--grad-primary)"
                            style={{ width: '100%', marginTop: '2.5rem', padding: '1.25rem' }}
                            onClick={() => alert('Checkout initiated!')}
                        >
                            Proceed to Checkout
                            <ArrowRight size={20} style={{ marginLeft: '0.75rem' }} />
                        </ShimmerButton>
                    </div>
                </aside>
            </div>
        </motion.div>
    );
};

export default Cart;
