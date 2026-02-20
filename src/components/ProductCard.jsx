import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShimmerButton } from './ShimmerButton';
import { ShineBorder } from './ShineBorder';
import confetti from 'canvas-confetti';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();

    const truncatedTitle = product.title.length > 40
        ? product.title.substring(0, 37) + '...'
        : product.title;

    const handleAddToCart = (e) => {
        addToCart(product);

        // Confetti explosion from the button location
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 60,
            spread: 60,
            origin: { x, y },
            colors: ['#6366f1', '#a855f7', '#f43f5e', '#ffffff'],
            gravity: 1.5,
            scalar: 0.7,
        });

        // Small delay followed by secondary burst
        setTimeout(() => {
            confetti({
                particleCount: 30,
                angle: 90,
                spread: 360,
                origin: { x, y: y - 0.05 },
                colors: ['#ffffff', '#6366f1', '#fbbf24'],
                startVelocity: 12,
                ticks: 100,
            });
        }, 120);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <ShineBorder
                className="product-card-shine"
                borderRadius="24px"
                shineColor="rgba(255, 255, 255, 0.4)"
                duration="12s"
            >
                <div className="product-card">
                    <div className="image-wrapper" style={{ background: 'transparent', height: '280px' }}>
                        <img src={product.image} alt={product.title} className="product-img" style={{ filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))' }} />
                    </div>

                    <div className="product-info-wrap">
                        <span className="category-tag" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-dark)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            {product.category}
                        </span>
                        <h3 className="card-title" title={product.title} style={{ fontSize: '1.35rem', margin: '1rem 0' }}>{truncatedTitle}</h3>

                        <div className="card-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                            <p className="card-price" style={{ fontSize: '1.9rem', fontWeight: 900 }}>${product.price.toFixed(2)}</p>
                            <ShimmerButton
                                className="add-btn-shimmer"
                                onClick={handleAddToCart}
                                shimmerColor="rgba(255, 255, 255, 0.4)"
                                background="var(--grad-primary)"
                                borderRadius="20px"
                                style={{ width: '60px', height: '60px', padding: 0, boxShadow: '0 12px 24px rgba(99, 102, 241, 0.4)' }}
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
