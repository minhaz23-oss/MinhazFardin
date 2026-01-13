"use client";

import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { BsArrowUpRight } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { skills } from "@/constraints/script";

interface ProjectDetails {
  name: string;
  techStack: string[];
  link: string;
  bgColor: string;
  bgImage: string | StaticImageData;
  cardImage: string;
  detailedDesc: string;
  githubLink: string;
}

interface Props {
  project: ProjectDetails;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const ProjectCard = ({ project, index, progress, range, targetScale }: Props) => {

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{
          backgroundColor: project.bgColor,
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
        }}
        className="flex flex-col-reverse sm:flex-row relative -top-[25%] min-h-[400px] h-auto w-[90vw] sm:w-[1000px] rounded-[25px] p-[20px] sm:p-[40px] origin-top shadow-2xl"
      >
        <div className="flex flex-col-reverse sm:flex-row h-full gap-[20px] sm:gap-[40px]">
          <div className="w-full sm:w-[40%] flex flex-col justify-between gap-5 sm:gap-0">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">{project.name}</h2>
              <p className="text-white/80 text-base leading-relaxed">
                {project.detailedDesc}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => {
                  const skill = skills.find((s) => s.name === tech);
                  return (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs text-white border border-white/10 flex items-center gap-2"
                    >
                      {skill && (
                        <div className="relative w-4 h-4">
                          <Image
                            src={skill.icon}
                            alt={tech}
                             height={30}
                            className="object-contain"
                            width={16}
                          />
                        </div>
                      )}
                      {tech}
                    </span>
                  );
                })}
              </div>
            <div className="flex gap-3">

              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white hover:underline group"
              >
                Visit Project
                <BsArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-white hover:underline group"><FaGithub className="text-[30px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
            </div>
            </div>
          </div>

          <div className="relative w-full sm:w-[60%] h-[200px] sm:h-full rounded-[25px] overflow-hidden border border-white/10">
            <div
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={project.bgImage}
                alt={project.name}
                className="w-full h-full object-cover"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
