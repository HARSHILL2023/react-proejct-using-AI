import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShimmerButton } from './ShimmerButton';
import { BorderBeam } from './BorderBeam';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();

    const truncatedTitle = product.title.length > 40
        ? product.title.substring(0, 37) + '...'
        : product.title;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="border-beam-container"
        >
            <div className="product-card liquid-glass">
                <BorderBeam
                    size={250}
                    duration={12}
                    colorFrom="var(--primary)"
                    colorTo="var(--secondary)"
                />

                <div className="liquid-glass-inner">
                    <div className="image-wrapper" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '1.25rem' }}>
                        <img src={product.image} alt={product.title} className="product-img" />
                    </div>

                    <div className="product-info-wrap">
                        <span className="category-tag">{product.category}</span>
                        <h3 className="card-title" title={product.title}>{truncatedTitle}</h3>

                        <div className="card-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                            <p className="card-price" style={{ fontSize: '1.75rem', color: 'var(--text-dark)' }}>${product.price.toFixed(2)}</p>
                            <ShimmerButton
                                className="add-btn-shimmer"
                                onClick={() => addToCart(product)}
                                shimmerColor="rgba(255, 255, 255, 0.4)"
                                background="var(--grad-primary)"
                                borderRadius="16px"
                                style={{ width: '56px', height: '56px', padding: 0, boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)' }}
                            >
                                <Plus size={28} />
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
