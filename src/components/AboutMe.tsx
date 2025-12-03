"use client";
import { useEffect, useRef } from "react";
import { useInteractiveText } from "@/hooks/useInterectiveText";
import gsap from "gsap";
import { skills } from "@/constraints/script";
import ScrollTrigger from "gsap/ScrollTrigger";


import GithubGraph from "./GithubGraph";

const AboutMe = () => {
  const textRef = useInteractiveText();
  const aboutMeTextRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const typerWriterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (skillsRef.current) {
      gsap.fromTo(
        skillsRef.current.children,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
          },
        }
      );
    }

    if (aboutMeTextRef.current) {
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
  }, []);

  return (
    <section id='About' className="bg-black w-full min-h-screen rounded-t-[20px] sm:rounded-t-[50px] pt-[30px] pb-[100px] px-[30px] sm:px-[100px]  text-white ">
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
          I am <span className="font-bold">Minhaz Fardin</span>, a premier Web Developer specializing in creating sophisticated digital solutions. I combine technical expertise with a business-first mindset to deliver websites that are not only visually striking but also highly functional and optimized for performance. I pride myself on writing clean, maintainable code and delivering projects on time and within scope. Let's build something exceptional together.
        </p>
      </div>
      <div className="w-full h-fit mt-10">
        <h1 className="text-[30px] font-bold mb-6">My Skills</h1>
        <div ref={skillsRef} className="flex flex-wrap justify-start sm:justify-center gap-3 sm:gap-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/10 hover:border-white/30 hover:scale-105 transition-all duration-300 cursor-default group"
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain group-hover:rotate-12 transition-transform duration-300"
              />
              <span className="text-base sm:text-lg font-medium text-white/80 group-hover:text-white">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-fit mt-16 mb-10">
        <GithubGraph />
      </div>

      <div className=" w-full h-fit mt-10 flex justify-center items-center">
        <p ref={typerWriterRef} className=" text-[18px] sm:text-[20px] leading-[1.2] italic text-center">"Turning vision into reality through code, one project at a time."</p>
      </div>
    </section>
  );
};

export default AboutMe;
