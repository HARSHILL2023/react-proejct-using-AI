import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { cn } from "../lib/utils"

export const AnimatedThemeToggler = ({
    className,
    duration = 400,
    ...props
}) => {
    const [isDark, setIsDark] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark")
            setIsDark(true)
        }
    }, [])

    useEffect(() => {
        const updateTheme = () => {
            setIsDark(document.documentElement.classList.contains("dark"))
        }

        const observer = new MutationObserver(updateTheme)
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        })

        return () => observer.disconnect()
    }, [])

    const toggleTheme = useCallback(async () => {
        if (!buttonRef.current) return

        if (!document.startViewTransition) {
            const newTheme = !isDark
            setIsDark(newTheme)
            document.documentElement.classList.toggle("dark")
            localStorage.setItem("theme", newTheme ? "dark" : "light")
            return
        }

        await document.startViewTransition(() => {
            flushSync(() => {
                const newTheme = !isDark
                setIsDark(newTheme)
                document.documentElement.classList.toggle("dark")
                localStorage.setItem("theme", newTheme ? "dark" : "light")
            })
        }).ready

        const rect = buttonRef.current.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        const maxRadius = Math.hypot(
            Math.max(rect.left, window.innerWidth - rect.left),
            Math.max(rect.top, window.innerHeight - rect.top)
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            }
        )
    }, [isDark, duration])

    return (
        <div style={{ position: 'relative' }}>
            <button
                ref={buttonRef}
                onClick={toggleTheme}
                className={cn("theme-toggler dock-item", className)}
                style={{
                    position: 'relative',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    cursor: 'pointer'
                }}
                {...props}
            >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                <span className="sr-only">Toggle theme</span>
                <span className="dock-tooltip">Toggle Theme</span>
            </button>
        </div>
    )
}
