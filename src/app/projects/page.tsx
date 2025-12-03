"use client";

import { projectDetails, otherProjects, skills } from "@/constraints/script";
import Image from "next/image";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white text-black p-6 sm:p-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-neutral-600 hover:text-black transition-colors mb-8 group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h1 className="text-4xl sm:text-6xl font-extrabold mb-4">All Projects</h1>
        <p className="text-xl text-neutral-600 max-w-2xl">
          A comprehensive list of my work, including featured applications, side projects, and experiments.
        </p>
      </div>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto mb-20">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-black rounded-full"></span>
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 gap-12">
          {projectDetails.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="group relative bg-neutral-50 rounded-3xl overflow-hidden border border-black  transition-colors"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Content */}
                <div className="flex-1 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-3xl font-bold">{project.name}</h3>
                      <div className="flex gap-2">
                        {project.techStack.map((tech) => {
                          const skill = skills.find(s => s.name === tech);
                          return (
                            <div key={tech} className="relative w-8 h-8 bg-white rounded-full p-1.5 border border-neutral-200" title={tech}>
                              {skill ? (
                                <Image src={skill.icon} alt={tech} width={20} height={20} className="w-full h-full object-contain" />
                              ) : (
                                <span className="text-[10px] font-bold flex items-center justify-center h-full">{tech[0]}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <p className="text-neutral-600 text-lg leading-relaxed mb-8">
                      {project.detailedDesc}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-colors"
                    >
                      Visit Site <BsArrowUpRight />
                    </a>
                  </div>
                </div>

                {/* Image */}
                <div className="lg:w-[55%] bg-neutral-100 relative min-h-[300px] lg:min-h-full overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-500">
                      <Image
                        src={project.bgImage}
                        alt={project.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Other Projects */}
      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-2 bg-neutral-400 rounded-full"></span>
          Other Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              key={index}
              className="bg-white border border-black rounded-2xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{project.name}</h3>
                <div className="flex gap-3 text-neutral-500">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                      <BsGithub size={20} />
                    </a>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                      <BsArrowUpRight size={20} />
                    </a>
                  )}
                </div>
              </div>

              <p className="text-neutral-600 mb-6 text-sm leading-relaxed min-h-[60px]">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
