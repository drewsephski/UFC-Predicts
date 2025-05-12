"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface MousePosition {
    x: number;
    y: number;
}

// Type for throttle callback
type ThrottleCallback = (...args: unknown[]) => void;

function MousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
    });

    // Throttle the mouse move event for better performance
    const throttle = useCallback((callback: ThrottleCallback, delay: number) => {
        let lastCall = 0;
        return (...args: unknown[]) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                callback(...args);
            }
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = throttle((event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        }, 16); // ~60fps

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [throttle]);

    return mousePosition;
}

interface ParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number;
    ease?: number;
    size?: number;
    refresh?: boolean;
    color?: string;
    vx?: number;
    vy?: number;
}

// Define Circle type to avoid using any
interface Circle {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
}

function hexToRgb(hexValue: string): number[] {
    const hex = hexValue.replace("#", "");

    let processedHex = hex;
    if (hex.length === 3) {
        processedHex = hex
            .split("")
            .map((char) => char + char)
            .join("");
    }

    const hexInt = Number.parseInt(processedHex, 16);
    const red = (hexInt >> 16) & 255;
    const green = (hexInt >> 8) & 255;
    const blue = hexInt & 255;
    return [red, green, blue];
}

export const Particles: React.FC<ParticlesProps> = ({
    className = "",
    quantity = 100,
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = "#ffffff",
    vx = 0,
    vy = 0,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const circles = useRef<Circle[]>([]);
    const mousePosition = MousePosition();
    const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

    // Optimized mouse move handler with debouncing
    const onMouseMove = useCallback(() => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const { w, h } = canvasSize.current;
            const x = mousePosition.x - rect.left - w / 2;
            const y = mousePosition.y - rect.top - h / 2;
            const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
            if (inside) {
                mouse.current.x = x;
                mouse.current.y = y;
            }
        }
    }, [mousePosition]);

    // Forward declarations for functions that will be used in useCallback
    const clearContext = () => {
        if (context.current) {
            context.current.clearRect(
                0,
                0,
                canvasSize.current.w,
                canvasSize.current.h,
            );
        }
    };

    // Convert hex color to RGB
    const rgb = hexToRgb(color);

    // Function to create circle parameters
    const circleParams = (): Circle => {
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const translateX = 0;
        const translateY = 0;
        const pSize = Math.floor(Math.random() * 2) + size;
        const alpha = 0;
        const targetAlpha = Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.1;
        const dy = (Math.random() - 0.5) * 0.1;
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX,
            translateY,
            size: pSize,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism,
        };
    };

    const drawCircle = (circle: Circle, update = false) => {
        if (context.current) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            context.current.translate(translateX, translateY);
            context.current.beginPath();
            context.current.arc(x, y, size, 0, 2 * Math.PI);
            context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
            context.current.fill();
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (!update) {
                circles.current.push(circle);
            }
        }
    };

    // Define resizeCanvas function
    const resizeCanvas = useCallback(() => {
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            circles.current.length = 0;
            canvasSize.current.w = canvasContainerRef.current.offsetWidth;
            canvasSize.current.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.current.w * dpr;
            canvasRef.current.height = canvasSize.current.h * dpr;
            canvasRef.current.style.width = `${canvasSize.current.w}px`;
            canvasRef.current.style.height = `${canvasSize.current.h}px`;
            context.current.scale(dpr, dpr);
        }
    }, [dpr]);

    // Define drawParticles function with stable dependencies
    const drawParticles = useCallback(() => {
        clearContext();
        const particleCount = quantity;
        for (let i = 0; i < particleCount; i++) {
            const circle = circleParams();
            drawCircle(circle);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantity]);

    // Define canvas initialization function with useCallback
    const initCanvas = useCallback(() => {
        resizeCanvas();
        drawParticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Initialize canvas and start animation
    useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext("2d");
        }
        initCanvas();
        animate();
        window.addEventListener("resize", initCanvas);

        return () => {
            window.removeEventListener("resize", initCanvas);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initCanvas]); // Only include initCanvas as dependency

    // Handle mouse movement
    useEffect(() => {
        // Add event listener for mouse movement
        window.addEventListener("mousemove", onMouseMove);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [onMouseMove]);

    // Handle refresh prop changes
    useEffect(() => {
        if (refresh) {
            initCanvas();
        }
    }, [refresh, initCanvas]);

    // Define remapValue function for use in animate
    const remapValue = (
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number,
    ): number => {
        const remapped =
            ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    };

    // Define animate function with useCallback to avoid dependency issues
    const animate = useCallback(() => {
        if (!context.current) return;

        clearContext();
        circles.current.forEach((circle: Circle, i: number) => {
            // Handle the alpha value
            const edge = [
                circle.x + circle.translateX - circle.size, // distance from left edge
                canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
                circle.y + circle.translateY - circle.size, // distance from top edge
                canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
            ];
            const closestEdge = edge.reduce((a, b) => Math.min(a, b));
            const remapClosestEdge = Number.parseFloat(
                remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
            );
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }
            circle.x += circle.dx + vx;
            circle.y += circle.dy + vy;
            circle.translateX +=
                (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
                ease;
            circle.translateY +=
                (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
                ease;

            drawCircle(circle, true);

            // circle gets out of the canvas
            if (
                circle.x < -circle.size ||
                circle.x > canvasSize.current.w + circle.size ||
                circle.y < -circle.size ||
                circle.y > canvasSize.current.h + circle.size
            ) {
                // remove the circle from the array
                circles.current.splice(i, 1);
                // create a new circle
                const newCircle = circleParams();
                drawCircle(newCircle);
                // update the circle position
            }
        });
        window.requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={className} ref={canvasContainerRef} aria-hidden="true">
            <canvas ref={canvasRef} className="size-full" />
        </div>
    );
};

