import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { AuroraText } from '../components/AuroraText';
import { CustomDropdown } from '../components/CustomDropdown';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);

                const uniqueCategories = ['All', ...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedCategory === 'All') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(p => p.category === selectedCategory));
        }
    }, [selectedCategory, products]);

    if (loading) {
        return (
            <div className="container" style={{ marginTop: '4rem' }}>
                <div className="products-grid">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="product-card skeleton" style={{ height: '450px', borderRadius: '24px' }}></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <section className="hero">
                <div className="container">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="hero-title"
                        style={{ fontSize: '5rem' }}
                    >
                        <AuroraText>Unleash The</AuroraText> <br />
                        Next Generation
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="hero-p"
                    >
                        The world's most premium marketplace for elite products. Designed for the winners.
                    </motion.p>
                </div>
            </section>

            <div className="container" style={{ marginBottom: '5rem' }}>
                <div className="products-header">
                    <div className="header-text">
                        <h2 style={{ fontSize: '2.5rem' }}>Explore <AuroraText>Collections</AuroraText></h2>
                        <p style={{ color: 'var(--text-muted)' }}>{filteredProducts.length} Premium Items Available</p>
                    </div>

                    <div className="filter-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span className="filter-label" style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em', marginLeft: '0.5rem' }}>Collection Filter</span>
                        <CustomDropdown
                            options={categories}
                            selected={selectedCategory}
                            onSelect={setSelectedCategory}
                        />
                    </div>
                </div>

                <motion.div
                    layout
                    className="products-grid"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Products;
