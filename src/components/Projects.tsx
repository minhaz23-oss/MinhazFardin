"use client";

import { useRef } from "react";
import { projectDetails } from "@/constraints/script";
import ProjectCard from "./ProjectCard";
import { useScroll, motion } from "framer-motion";

const Projects = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={container} id="Projects" className="mt-[5vh]  bg-white rounded-t-[50px] pt-[20px] hover-target">
      <div className="w-full flex flex-col items-center justify-center mb-10 px-5 text-center">

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-[24px] sm:text-[35px] font-bold text-black"
        >
          A collection of <span className="project-hover italic font-black px-1">projects</span> that define my journey
        </motion.p>
      </div>

      {projectDetails.map((project, i) => {
        const targetScale = 1 - (projectDetails.length - i) * 0.05;
        return (
          <ProjectCard
            key={i}
            index={i}
            project={project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}

      <div className="w-full flex justify-center mt-10 pb-10">
        <a
          href="/projects"
          className="group relative px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-all hover:scale-105"
        >
          <span className="relative z-10 font-bold text-lg group-hover:text-black transition-colors duration-300">
            See All Projects
          </span>
          <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </a>
      </div>
    </section>
  );
};

export default Projects;
