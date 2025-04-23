"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useInteractiveText } from "@/hooks/useInterectiveText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ImCross } from "react-icons/im";
import { projectDetails } from "@/constraints/script";
import BtnPrimary from "./BtnPrimary";

interface ProjectDetails {
  name: string;
  techStack: string[];
  link: string;
  bgColor: string;
  bgImage: string;
  cardImage: string;
  detailedDesc: string;
}

const Projects = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const detailsDivRef = useRef<HTMLDivElement | null>(null);
  const textRef = useInteractiveText();
  const [cardDetails, setCardDetails] = useState<ProjectDetails | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isSmallDevice = window.innerWidth <= 640; // Tailwind 'sm' breakpoint

    if (!isSmallDevice && sectionRef.current && textRef.current) {
      // Heading Animation for larger screens
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom 20%",
          toggleActions: "play none none",
        },
      }).fromTo(
        textRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, ease: "power3.out" }
      );
    } else {
      // Ensure the text is visible on small screens
      if (textRef.current) {
        textRef.current.style.opacity = "1";
        textRef.current.style.transform = "translateY(0)";
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const isSmallDevice = window.innerWidth <= 500;

      if (!isSmallDevice && cardsRef.current.length > 0 && sectionRef.current) {
        const cards = cardsRef.current;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none none none",
          },
        });

        cards.forEach((card, index) => {
          if (card) {
            tl.to(
              card,
              {
                opacity: 1,
                x: index * 250 - 250,
                y: 0,
                duration: 1,
                ease: "power3.out",
              },
              index * 0.2
            );
          }
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [cardDetails]);

  const handleCardClick = (project: ProjectDetails) => {
    const cards = cardsRef.current;
    if (cards) {
      const tl = gsap.timeline({
        onComplete: () => setCardDetails(project),
      });

      cards.forEach((card, i) => {
        if (card) {
          tl.to(
            card,
            {
              x: 200,
              opacity: 0,
              duration: 0.6,
              ease: "power3.inOut",
            },
            i * 0.1
          );
        }
      });

      tl.add(() => setCardDetails(project), "+=0.1");

      tl.add(() => {
        if (detailsDivRef.current) {
          gsap.fromTo(
            detailsDivRef.current,
            { x: "-100%", opacity: 0 },
            { x: "0%", opacity: 1, duration: 0.8, ease: "power3.inOut" }
          );
        }
      }, "+=0.1");
    }
  };

  return (
    <section
      id="Projects"
      className="w-full min-h-screen rounded-t-[20px] sm:rounded-t-[50px] bg-white py-10 sm:py-[30px] px-[30px] sm:px-[100px] hover-target text-black"
    >
      <div className="w-full h-fit flex justify-between items-center hover-target overflow-hidden">
        <h1
          ref={textRef}
          className="cursor-default text-[35px] sm:text-[80px] font-extrabold leading-none"
        >
          Projects
        </h1>
        <p className="hidden sm:block text-[18px] font-bold">
          Is project the only way to showcase your skill?
        </p>
      </div>
      <div
        ref={sectionRef}
        className={`relative w-full min-h-[400px] ${
          cardDetails ? "bg-transparent" : "bg-black"
        } mt-4 flex sm:flex-row flex-col gap-5 sm:gap-0 justify-center items-center overflow-hidden ${
          cardDetails ? "px-0" : "px-5 py-5"
        }`}
      >
        {cardDetails ? (
          <div
            ref={detailsDivRef}
            className="opacity-0 w-full h-full px-5 sm:px-24 py-16 flex sm:flex-row flex-col gap-3 justify-between relative rounded-md"
            style={{
              backgroundColor: cardDetails ? cardDetails.bgColor : `transparent`,
            }}
          >
            <div className="order-2">
              <h1 className="text-white text-4xl font-bold">{cardDetails.name}</h1>
              <p className="mt-3 mb-4 text-[18px] text-white">
                {cardDetails.detailedDesc}
              </p>
              <a href={cardDetails.link} target="_blank">
                <BtnPrimary text={"visit"} color={"white"} />
              </a>
              <h1 className="mt-5 text-white text-2xl font-bold">Tech Stack</h1>
              <div className="mt-2 flex w-fit gap-10 border-2 border-white p-3 rounded-lg">
                {cardDetails.techStack.map((tech, index) => (
                  <div key={index} className="h-[50px]">
                    <img className="w-[50px] h-full" src={`${tech}.png`} />
                  </div>
                ))}
              </div>
            </div>

            <img
              className="w-full order-1 sm:max-w-[55%] h-fit rounded-lg"
              src={`${cardDetails.bgImage}`}
              alt="bg"
            />
            <ImCross
              className="text-white text-[20px] cursor-pointer absolute top-[20px] sm:top-[50px] right-10"
              onClick={() => setCardDetails(null)}
            />
          </div>
        ) : (
          projectDetails.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className={`sm:absolute w-full sm:w-[200px] h-[300px] text-black rounded-lg flex flex-col items-center justify-center shadow-lg hover-target cursor-pointer overflow-hidden`}
              style={{
                boxShadow:
                  "0 10px 20px rgba(0, 0, 0, 0.25), 0 6px 6px rgba(0, 0, 0, 0.22)",
                backgroundColor: project.bgColor,
              }}
              onClick={() => handleCardClick(project)}
            >
              <img
                className="w-full h-full bg-cover"
                src={`${project.cardImage}`}
                alt="cardimg"
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Projects;
