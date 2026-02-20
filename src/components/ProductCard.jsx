import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { InteractiveHoverButton } from './InteractiveHoverButton';
import { CoolMode } from './CoolMode';

const ProductCard = ({ product, index }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = React.useState(false);

    const truncatedTitle = product.title.length > 50
        ? product.title.substring(0, 47) + '...'
        : product.title;

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="product-card liquid-glass" style={{ height: '620px', padding: 0, border: 'none', background: 'transparent' }}>
                <div className="image-wrapper" style={{ height: '400px', background: 'rgba(255,255,255,0.02)', padding: '0', overflow: 'hidden', position: 'relative' }}>
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 1.2, ease: "circOut" }}
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
                        <span className="category-tag" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'var(--text-dark)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>
                            {product.category}
                        </span>
                    </div>
                </div>

                <div className="product-content" style={{ padding: '1.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1, position: 'relative', zIndex: 2 }}>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 'auto', color: 'var(--text-dark)', lineHeight: '1.4' }}>
                        {truncatedTitle}
                    </h3>

                    <div className="product-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
                        <div className="price-box">
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Investment</span>
                            <p style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-dark)' }}>${product.price.toFixed(2)}</p>
                        </div>

                        <CoolMode>
                            <InteractiveHoverButton
                                onClick={handleAddToCart}
                                className="add-to-cart-interactive"
                                style={{ borderRadius: '1.5rem' }}
                            >
                                {isAdded ? 'Added! ✓' : 'Add to Cart'}
                            </InteractiveHoverButton>
                        </CoolMode>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
