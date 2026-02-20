import React from 'react';
import { motion } from 'framer-motion';

export const BorderBeam = ({
    size = 200,
    duration = 15,
    anchor = 90,
    borderWidth = 1.5,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
    delay = 0,
    className = ""
}) => {
    return (
        <div
            className={`border-beam-path ${className}`}
            style={{
                "--size": `${size}px`,
                "--duration": `${duration}s`,
                "--anchor": anchor,
                "--border-width": `${borderWidth}px`,
                "--color-from": colorFrom,
                "--color-to": colorTo,
                "--delay": `-${delay}s`,
            }}
        >
            <svg
                fill="none"
                width="100%"
                height="100%"
                className="border-beam-svg"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                }}
            >
                <rect
                    width="100%"
                    height="100%"
                    rx="inherit"
                    stroke="url(#beam-gradient)"
                    strokeWidth={borderWidth}
                    strokeDasharray="100 100"
                    className="border-beam-rect-svg"
                    style={{
                        animation: "border-beam var(--duration) linear infinite",
                        animationDelay: "var(--delay)",
                    }}
                />
                <defs>
                    <linearGradient id="beam-gradient" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor={colorFrom} stopOpacity="0" />
                        <stop offset="50%" stopColor={colorFrom} />
                        <stop offset="100%" stopColor={colorTo} />
                    </linearGradient>
                </defs>
            </svg>

            <style jsx>{`
                @keyframes border-beam {
                    0% {
                        stroke-dashoffset: 200;
                    }
                    100% {
                        stroke-dashoffset: 0;
                    }
                }
                .border-beam-rect-svg {
                    stroke-dasharray: var(--size);
                }
            `}</style>
        </div>
    );
};
