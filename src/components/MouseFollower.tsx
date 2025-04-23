'use client';

import { useEffect, useState } from "react";

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [delayedPosition, setDelayedPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState({ x: 1, y: 1 });
  const [isMoving, setIsMoving] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsMoving(true);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const updatePosition = () => {
      setDelayedPosition((prev) => {
        const nextX = prev.x + (position.x - prev.x) * 0.1;
        const nextY = prev.y + (position.y - prev.y) * 0.1;

        const deltaX = nextX - prev.x;
        const deltaY = nextY - prev.y;

        const scaleX = Math.min(Math.max(1 - Math.abs(deltaX) * 0.01, 0.8), 1.2);
        const scaleY = Math.min(Math.max(1 - Math.abs(deltaY) * 0.01, 0.8), 1.2);

        setScale({ x: deltaX > 0 ? scaleX : 2 - scaleX, y: deltaY > 0 ? scaleY : 2 - scaleY });

        return { x: nextX, y: nextY };
      });

      animationFrame = requestAnimationFrame(updatePosition);
    };

    animationFrame = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrame);
  }, [position]);

  useEffect(() => {
    // Reset scale to original when mouse stops moving
    if (isMoving) {
      const timeout = setTimeout(() => {
        setIsMoving(false);
        setScale({ x: 1, y: 1 });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isMoving]);

  // Change color when hovering over white text or div
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      if (e.target && (e.target as HTMLElement).classList.contains("hover-target")) {
        setIsHovered(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mouseover", handleMouseEnter);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mouseover", handleMouseEnter);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        left: `${delayedPosition.x}px`,
        top: `${delayedPosition.y}px`,
        transform: `translate(-50%, -50%) scale(${scale.x}, ${scale.y})`,
        animation: "bubble 2s infinite ease-in-out",
        transition: isMoving ? "transform 0.1s ease-out" : "transform 0.2s ease-in",
        backgroundColor: isHovered ? 'black' : 'white', // Change color on hover
        pointerEvents: "none",
      }}
      className="hidden sm:fixed w-[20px] h-[20px] rounded-full pointer-events-none z-[999]"
    />
  );
};

export default MouseFollower;
