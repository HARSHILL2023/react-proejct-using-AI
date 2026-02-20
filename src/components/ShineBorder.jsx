import React from 'react';

export const ShineBorder = ({
    children,
    borderRadius = "var(--radius-lg)",
    shineColor = "#6366f1",
    duration = "8s",
    className = ""
}) => {
    return (
        <div
            className={`shine-border-container ${className}`}
            style={{
                "--shine-color": shineColor,
                "--duration": duration,
                borderRadius: borderRadius
            }}
        >
            <div className="shine-border-element" style={{ borderRadius: borderRadius }}></div>
            <div className="shine-border-child">
                {children}
            </div>
        </div>
    );
};
