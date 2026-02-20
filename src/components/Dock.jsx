import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const DockItem = ({ children, title, mouseX, onClick, active }) => {
    const ref = useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [45, 80, 45]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.div
            ref={ref}
            style={{ width, height: width }}
            onClick={onClick}
            className={`dock-item ${active ? 'active' : ''}`}
        >
            {children}
            <span className="dock-tooltip">{title}</span>
        </motion.div>
    );
};

export const Dock = ({ items, activePath }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <div
            className="dock-container"
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
        >
            {items.map((item, idx) => (
                <DockItem
                    key={idx}
                    mouseX={mouseX}
                    title={item.title}
                    active={activePath === item.to}
                    onClick={item.onClick}
                >
                    {item.icon}
                </DockItem>
            ))}
        </div>
    );
};
