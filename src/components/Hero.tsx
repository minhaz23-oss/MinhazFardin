"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import BtnPrimary from "./BtnPrimary";
import BtnOutline from "./BtnOutline";
import { GiPolarStar } from "react-icons/gi";
import { useInteractiveText } from "@/hooks/useInterectiveText";

const Hero = ({onAnimationComplete} : any) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useInteractiveText();
  const iconRef = useRef<HTMLDivElement | null>(null);

  // Border refs
  const verticalBorderRef = useRef<HTMLDivElement | null>(null);
  const horizontalBorderRef = useRef<HTMLDivElement | null>(null);
  const bottomDivRef = useRef<HTMLDivElement | null>(null);
  const bottomTextRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onAnimationComplete) {
            onAnimationComplete(); // Notify parent when animation ends
          }
        },
      });

      const h1 = containerRef.current.querySelector(".animate-up");
      const fadeElements =
        containerRef.current.querySelectorAll(".animate-fade");

      // Border animation refs
      const verticalBorder = verticalBorderRef.current;
      const horizontalBorder = horizontalBorderRef.current;
      const bottomDiv = bottomDivRef.current;
      

      // Initial setup for border animations
      if (verticalBorder) {
        gsap.set(verticalBorder, { scaleY: 0, transformOrigin: "bottom" });
      }

      if (horizontalBorder) {
        gsap.set(horizontalBorder, { scaleX: 0, transformOrigin: "center" });
      }

      // Set initial state for bottom div
     

      // Main timeline animation
      tl
        .to(verticalBorder, {
          scaleY: 1,
          duration: 1,
          width: "2px",
          ease: "power2.inOut",
        })
        .to(
          horizontalBorder,
          {
            scaleX: 1,
            duration: 1,
            height: "2px",
            ease: "power2.inOut",
          },
          "-=0.5"
        )
        .to(h1, {
          y: "0%",
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        })
        .to(
          fadeElements,
          {
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
          },
          "-=1"
        )
        .to(
          iconRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
          },
          "-=1.5"
        )
        
        tl.to(bottomDiv, {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
          
        },   "-=2");
    }
  }, []);



  return (
    <section id="Home" className="w-full h-fit sm:h-screen">
      <div className="w-full h-fit sm:h-[55%] flex relative">
        <div
          ref={horizontalBorderRef}
          className="absolute left-0 right-0 bottom-0 bg-white"
        ></div>
        <div ref={containerRef} className="w-fit px-[30px] sm:px-[80px] py-[30px] sm:py-[80px] relative">
          <div
            ref={verticalBorderRef}
            className="absolute  right-0 top-0 bottom-0 bg-white"
          ></div>

          <div className="ml-[-10px] block w-[20px] h-[20px] border-l-4 border-t-4 border-white"></div>

          <div className="relative overflow-hidden">
            <h1
              
              ref={textRef}
              className="leading-none text-[55px] sm:text-[100px] font-extrabold whitespace-normal sm:whitespace-nowrap animate-up cursor-default hover-target opacity-0 text-white tracking-wide sm:tracking-normal"
            >
              Minhaz Fardin
            </h1>
          </div>

          <div className="relative overflow-hidden mt-2">
            <p className="text-[18px] sm:text-[20px] leading-none animate-fade opacity-0 text-white">
              I am a full-stack web developer. [ promising clean and efficient
              code ]
            </p>
          </div>

          <div className="flex gap-[10px] mt-5 relative overflow-hidden animate-fade opacity-0">
          <a href="#Projects">
          <BtnPrimary text={"Project"} />
        </a>
        <a href="#Contact">

            <BtnOutline text={"Contact"} />
        </a>
          </div>
        </div>
        <div
          ref={iconRef}
          className="hidden opacity-0 scale-0 flex-1 h-full sm:flex justify-center items-center"
        >
          <GiPolarStar className="text-[250px] animate-spinSlow text-white" />
        </div>
      </div>
      <div className="w-full h-fit py-[20px] sm:py-[50px] px-1 sm:px-0">
      <div
  ref={bottomDivRef}
  className="w-full h-fit sm:h-[200px] bg-white/10 backdrop-blur-lg hover-target flex justify-center items-center py-2 sm:py-0 px-[20px] sm:px-[100px] overflow-hidden opacity-0 border-2 border-white/30 rounded-lg shadow-lg hover:bg-white/20 transition-all duration-300"
>
  <h1 ref={bottomTextRef} className="text-white font-bold text-[20px] sm:text-[40px] leading-none text-center">
    Human can create anything and the easiest way to do this is coding !!
  </h1>
</div>
      </div>
    </section>
  );
};

export default Hero;