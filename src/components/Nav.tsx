'use client'

import { useEffect, useState, useRef } from "react";

const Nav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isInHero, setIsInHero] = useState(true);
  const [hoveringTop, setHoveringTop] = useState(false);
  // Using a ref to store the timer ID for the delayed hide
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const heroSectionHeight = heroSection ? heroSection.offsetHeight : 0;
      const scrollPosition = window.scrollY;

      // Update isInHero: if within hero section, always true
      setIsInHero(scrollPosition < heroSectionHeight);

      // BUG FIX 2: If in hero section, show navbar immediately
      if (scrollPosition < heroSectionHeight) {
        setIsVisible(true);
      } else if (!hoveringTop) {
        // If not in hero and not hovering at top, hide navbar
        setIsVisible(false);
      }
    };

    const handleMouseMove = (e:any) => {
      // Clear any previous hide timer whenever the mouse moves
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }

      // If the cursor is near the top, show the navbar
      if (e.clientY < 80) {
        setHoveringTop(true);
        setIsVisible(true);
      } else {
        // Otherwise, mark that the cursor is not near the top
        setHoveringTop(false);
        // BUG FIX 3: Start a timer to hide the navbar after 3 seconds
        hideTimerRef.current = setTimeout(() => {
          // Only hide if not hovering at the top and not in hero section
          if (!hoveringTop && !isInHero) {
            setIsVisible(false);
          }
        }, 3000);
      }
    };

    // (Optional) If the mouse leaves the window entirely, start the hide timer.
    const handleMouseLeaveWindow = () => {
      hideTimerRef.current = setTimeout(() => {
        if (!hoveringTop && !isInHero) {
          setIsVisible(false);
        }
      }, 3000);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeaveWindow);
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [hoveringTop, isInHero]);

  return (
    <nav
      className={`hidden sm:flex justify-center items-center h-[70px] w-[90%] bg-white border-x-2 border-b-2 border-black text-black font-semibold z-[9999] rounded-b-md hover-target 
      transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-10 text-[20px]">
        {["Home", "About", "Projects", "Testimonials", "Contact"].map(
          (item, index) => (
            <a
              key={index}
              href={`#${item}`}
              className="hover:scale-105 hover:bg-black/50 p-1 rounded-md transition duration-300"
            >
              {item}
            </a>
          )
        )}
      </div>
    </nav>
  );
};

export default Nav;
