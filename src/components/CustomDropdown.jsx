import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const CustomDropdown = ({ options, selected, onSelect, label = "Filter" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatLabel = (val) => val === 'All' ? 'Every Collection' : val.toUpperCase();

    return (
        <div className="custom-dropdown-container" ref={dropdownRef} style={{ position: 'relative', width: '280px', zIndex: 100 }}>
            <motion.div
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="dropdown-trigger liquid-glass"
                style={{
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}
            >
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f1f5f9' }}>
                    {formatLabel(selected)}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <ChevronDown size={20} color="var(--primary)" />
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="dropdown-menu liquid-glass"
                        style={{
                            position: 'absolute',
                            top: 'calc(100% + 10px)',
                            left: 0,
                            right: 0,
                            background: 'rgba(10, 15, 30, 0.9)',
                            backdropFilter: 'blur(30px) saturate(150%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            padding: '0.75rem',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                            overflow: 'hidden'
                        }}
                    >
                        {options.map((option) => (
                            <motion.div
                                key={option}
                                whileHover={{ x: 5, background: 'rgba(99, 102, 241, 0.1)' }}
                                onClick={() => {
                                    onSelect(option);
                                    setIsOpen(false);
                                }}
                                style={{
                                    padding: '0.85rem 1rem',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    transition: 'color 0.2s ease',
                                    color: selected === option ? 'var(--primary)' : '#94a3b8'
                                }}
                            >
                                <span style={{ fontWeight: selected === option ? 800 : 500, fontSize: '0.9rem' }}>
                                    {formatLabel(option)}
                                </span>
                                {selected === option && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        <Check size={16} />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
