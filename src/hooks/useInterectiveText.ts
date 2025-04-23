import { useRef, useEffect } from "react";
import gsap from "gsap";

export const useInteractiveText = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { offsetX, offsetY, currentTarget } = e as MouseEvent & {
        currentTarget: HTMLHeadingElement;
      };
      const width = currentTarget.offsetWidth;
      const height = currentTarget.offsetHeight;

      const moveX = ((offsetX - width / 2) / width) * 20;
      const moveY = ((offsetY - height / 2) / height) * 20;

      gsap.to(textRef.current, {
        x: moveX,
        y: moveY,
        rotationX: -moveY,
        rotationY: moveX,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(textRef.current, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const el = textRef.current;
    if (el) {
      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (el) {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return textRef;
};
