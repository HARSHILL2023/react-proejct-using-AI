import React, { useEffect, useState } from "react";
import { cn } from "../lib/utils";

export const Meteors = ({
    number = 20,
    minDelay = 0.2,
    maxDelay = 1.2,
    minDuration = 2,
    maxDuration = 10,
    angle = 215,
    className,
}) => {
    const [meteorStyles, setMeteorStyles] = useState([]);

    useEffect(() => {
        const styles = [...new Array(number)].map(() => ({
            "--angle": -angle + "deg",
            top: "-5%",
            left: `${Math.floor(Math.random() * 100)}%`,
            animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
            animationDuration:
                Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
                "s",
        }));
        setMeteorStyles(styles);
    }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
            {meteorStyles.map((style, idx) => (
                <span
                    key={idx}
                    style={{ ...style }}
                    className={cn(
                        "animate-meteor absolute size-0.5 rotate-[var(--angle)] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
                        className
                    )}
                >
                    {/* Meteor Tail */}
                    <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
                </span>
            ))}
        </div>
    );
};
