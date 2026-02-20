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
            particleCount: 50,
            spread: 50,
            origin: { x, y },
            colors: ['#6366f1', '#a855f7', '#ffffff'],
            gravity: 1.2,
            scalar: 0.8,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <ShineBorder
                className="product-card-shine"
                borderRadius="32px"
                shineColor="rgba(99, 102, 241, 0.4)"
                duration="15s"
            >
                <div className="product-card" style={{ height: '620px' }}>
                    <div className="image-wrapper" style={{ height: '420px', background: '#fff', padding: '2rem' }}>
                        <motion.img
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.6 }}
                            src={product.image}
                            alt={product.title}
                            className="product-img"
                            style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.08))' }}
                        />
                        <div className="category-overlay" style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
                            <span className="category-tag" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', color: 'var(--primary)', border: '1px solid var(--border)', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                                {product.category}
                            </span>
                        </div>
                    </div>

                    <div className="product-info-wrap" style={{ padding: '2rem' }}>
                        <h3 className="card-title" title={product.title} style={{ fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: 'auto', lineHeight: '1.3' }}>
                            {truncatedTitle}
                        </h3>

                        <div className="card-bottom" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                            <div className="price-stack">
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Value</span>
                                <p className="card-price" style={{ fontSize: '2rem', fontWeight: 800 }}>${product.price.toFixed(2)}</p>
                            </div>
                            <ShimmerButton
                                className="add-btn-shimmer"
                                onClick={handleAddToCart}
                                shimmerColor="rgba(255, 255, 255, 0.4)"
                                background="var(--grad-primary)"
                                borderRadius="24px"
                                style={{ width: '68px', height: '68px', padding: 0, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)' }}
                            >
                                <Plus size={32} />
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </ShineBorder>
        </motion.div>
    );
};

export default ProductCard;
