import React from "react"
import { cn } from "../lib/utils"

export const ShimmerButton = React.forwardRef(
    (
        {
            shimmerColor = "#ffffff",
            shimmerSize = "0.05em",
            shimmerDuration = "3s",
            borderRadius = "100px",
            background = "rgba(0, 0, 0, 1)",
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                style={
                    {
                        "--spread": "90deg",
                        "--shimmer-color": shimmerColor,
                        "--radius": borderRadius,
                        "--speed": shimmerDuration,
                        "--cut": shimmerSize,
                        "--bg": background,
                    }
                }
                className={cn(
                    "shimmer-button group",
                    className
                )}
                ref={ref}
                {...props}
            >
                <div className="shimmer-spark-container">
                    <div className="shimmer-spark">
                        <div className="shimmer-spark-before" />
                    </div>
                </div>
                {children}
                <div className="shimmer-highlight" />
                <div className="shimmer-backdrop" />
            </button>
        )
    }
)

ShimmerButton.displayName = "ShimmerButton"
