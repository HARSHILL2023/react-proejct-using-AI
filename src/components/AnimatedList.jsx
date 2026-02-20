import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedList = ({ children, className = "", delay = 0.1 }) => {
    return (
        <div className={`animated-list-container ${className}`}>
            <AnimatePresence>
                {React.Children.map(children, (child, index) => (
                    <motion.div
                        key={child.key || index}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: index * delay
                        }}
                    >
                        {child}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};
