import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShimmerButton } from './ShimmerButton';
import { ShineBorder } from './ShineBorder';
import confetti from 'canvas-confetti';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();

    const truncatedTitle = product.title.length > 50
        ? product.title.substring(0, 47) + '...'
        : product.title;

    const handleAddToCart = (e) => {
        addToCart(product);

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 40,
            spread: 40,
            origin: { x, y },
            colors: ['#6366f1', '#ffffff'],
            gravity: 1,
            scalar: 0.7,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <ShineBorder
                className="product-card-shine"
                borderRadius="32px"
                shineColor="rgba(99, 102, 241, 0.3)"
                duration="15s"
            >
                <div className="product-card" style={{ height: '580px', background: '#fff' }}>
                    <div className="image-wrapper" style={{ height: '400px', background: '#fff', padding: '0', overflow: 'hidden', position: 'relative' }}>
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.8 }}
                            src={product.image}
                            alt={product.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                padding: '3rem',
                                zIndex: 1
                            }}
                        />
                        <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10 }}>
                            <span className="category-tag" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', color: 'var(--text-dark)', border: '1px solid rgba(0,0,0,0.05)', fontSize: '0.7rem' }}>
                                {product.category}
                            </span>
                        </div>
                    </div>

                    <div className="product-content" style={{ padding: '1.5rem 2rem 2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'var(--background)' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 'auto', color: 'var(--text-dark)', lineHeight: '1.4' }}>
                            {truncatedTitle}
                        </h3>

                        <div className="product-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                            <div className="price-box">
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>Price</span>
                                <p style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-dark)' }}>${product.price.toFixed(2)}</p>
                            </div>
                            <ShimmerButton
                                className="add-btn"
                                onClick={handleAddToCart}
                                shimmerColor="rgba(255, 255, 255, 0.5)"
                                background="var(--grad-primary)"
                                borderRadius="20px"
                                style={{ width: '60px', height: '60px', padding: 0 }}
                            >
                                <Plus size={30} />
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </ShineBorder>
        </motion.div>
    );
};

export default ProductCard;
