import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export const InteractiveHoverButton = ({
    children,
    className,
    ...props
}) => {
    return (
        <button
            className={cn(
                "interactive-hover-button group",
                className
            )}
            {...props}
        >
            <div className="button-content-wrapper">
                <div className="dot-effect"></div>
                <span className="button-text">
                    {children}
                </span>
            </div>
            <div className="hover-content">
                <span style={{ fontWeight: 800 }}>{children}</span>
                <ArrowRight size={20} strokeWidth={3} />
            </div>
        </button>
    );
}
