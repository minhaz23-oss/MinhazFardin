"use client";
import { useEffect, useRef } from "react";
import { useInteractiveText } from "@/hooks/useInterectiveText";
import gsap from "gsap";
import { skills } from "@/constraints/script";
import ScrollTrigger from "gsap/ScrollTrigger";


const AboutMe = () => {
  const textRef = useInteractiveText();
  const aboutMeTextRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef  = useRef<HTMLDivElement | null>(null);
  const typerWriterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (marqueeRef.current) {
      const container = marqueeRef.current;
      const width = container.scrollWidth;

      gsap.to(container, {
        x: -width / 2,
        repeat: -1,
        duration: 15,
        ease: "linear",
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % (width / 2)),
        },
      });
    }
    if(aboutMeTextRef.current){
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: aboutMeTextRef.current,
          start: "top 80%", // Starts when the section is 80% in the viewport
          end: "bottom 20%",
          toggleActions: "play none none none", // Play once
        },
      });
      timeline.fromTo(
        aboutMeTextRef.current,
        { opacity: 0, y: 50 }, // Initial state
        { opacity: 1, y: 0, delay: 0.5, duration: 1, stagger: 0.2, ease: "power3.out" } // Animated state
      );
      timeline.fromTo(
        typerWriterRef.current,
        { opacity: 0, y: 50 }, // Initial state
        { opacity: 1, y: 0, delay: 0.1, duration: 1, stagger: 0.2, ease: "power3.out" } // Animated state
      );
    }
    

    
    
  },[])

  return (
    <section id = 'About' className="bg-black w-full h-screen rounded-t-[20px] sm:rounded-t-[50px] py-[30px] px-[30px] sm:px-[100px]  text-white ">
      <div className="w-full h-fit flex justify-between items-center ">
        <h1
          ref={textRef}
          className="cursor-default text-[35px] sm:text-[80px] font-extrabold leading-none hover-target"
        >
          About me
        </h1>
        <p className=" hidden sm:block text-[18px] font-bold">
          Is it really possible to describe a human with just few words ?
        </p>
      </div>
      <div className=" w-full h-fit mt-10 ">
        <p ref={aboutMeTextRef} className="text-[20px]">
         
          I am <span className="font-bold">Minhaz Fardin</span>, a passionate
          web developer driven by creativity and innovation. While some might
          call me a typical web developer, I believe passion is what sets me
          apart. No matter how simple or complex a project is, I strive to
          create something unique and rare. And here’s a little secret:
          <i>
            " I’ve always liked errors—they’re the best teachers. "
          </i>
        </p>
      </div>
      <div className="w-full h-fit mt-10">
        <h1 className=" text-[30px] font-bold ">My Skills</h1>
        <div  className="wf-full h-fit mt-5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-md p-7 overflow-hidden">
        <div ref={marqueeRef} className="flex gap-10 "  style={{ whiteSpace: "nowrap" }}>

        { skills.map((skill, index) => (
             <img
             key={index}
             src={skill.icon}
             alt={skill.name}
             title={skill.name}
             className=" h-10 sm:h-20 w-auto"
           />
          ))}
        { skills.map((skill, index) => (
             <img
             key={index}
             src={skill.icon}
             alt={skill.name}
             title={skill.name}
             className="h-10 sm:h-20 w-auto"
           />
          ))}
        </div>
         
        </div>
      </div>
      <div className=" w-full h-fit mt-10 flex justify-center items-center">
         <p ref={typerWriterRef} className=" text-[18px] sm:text-[20px] leading-[1.2] italic text-center">"Human will never be able to understand others feelings , no matter how hard they try. We always think that our pains , sufferings are greater than others but at the end of the day we all are the same. Diversity is just an illusion  "</p>
      </div>
    </section>
  );
};

export default AboutMe;
