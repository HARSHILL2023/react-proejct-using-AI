import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { ShimmerButton } from './ShimmerButton';
import { ShineBorder } from './ShineBorder';

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
        >
            <ShineBorder
                shineColor="rgba(255, 255, 255, 0.2)"
                duration="12s"
                className="product-card-shine"
            >
                <div className="product-card">
                    <div className="image-wrapper">
                        <img src={product.image} alt={product.title} className="product-img" />
                    </div>

                    <div className="product-info-wrap">
                        <span className="category-tag">{product.category}</span>
                        <h3 className="card-title" title={product.title}>{truncatedTitle}</h3>

                        <div className="card-bottom">
                            <p className="card-price" style={{ fontSize: '1.75rem' }}>${product.price.toFixed(2)}</p>
                            <ShimmerButton
                                className="add-btn-shimmer"
                                onClick={() => addToCart(product)}
                                shimmerColor="rgba(255, 255, 255, 0.4)"
                                background="var(--primary)"
                                borderRadius="16px"
                                style={{ width: '56px', height: '56px', padding: 0 }}
                            >
                                <Plus size={28} />
                            </ShimmerButton>
                        </div>
                    </div>
                </div>
            </ShineBorder>
        </motion.div>
    );
};

export default ProductCard;
