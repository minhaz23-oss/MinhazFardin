"use client";
import { useState } from "react";
import { testimonials } from "@/constraints/script";
import { useInteractiveText } from "@/hooks/useInterectiveText";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const textRef = useInteractiveText();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Attach original index to track hover state correctly across columns
  const testimonialsWithIndex = testimonials.map((t, i) => ({ ...t, originalIndex: i }));
  const leftColumn = testimonialsWithIndex.filter((t) => t.originalIndex % 2 === 0);
  const rightColumn = testimonialsWithIndex.filter((t) => t.originalIndex % 2 !== 0);

  const renderCard = (testimonial: typeof testimonialsWithIndex[0]) => (
    <div
      key={testimonial.originalIndex}
      className={`relative bg-black border border-neutral-800 rounded-2xl p-6 transition-all duration-500 cursor-default group ${hoveredIndex !== null && hoveredIndex !== testimonial.originalIndex
        ? "blur-[2px] opacity-50 scale-95"
        : "hover:scale-[1.02] hover:shadow-2xl hover:border-neutral-700"
        }`}
      onMouseEnter={() => setHoveredIndex(testimonial.originalIndex)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Quote className="absolute top-5 right-5 text-neutral-800 w-8 h-8 group-hover:text-neutral-700 transition-colors duration-300" />

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-neutral-700"
              }`}
          />
        ))}
      </div>

      <p className="text-neutral-300 text-base leading-relaxed mb-6 font-light relative z-10">
        "{testimonial.comment}"
      </p>

      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-800 group-hover:border-neutral-600 transition-colors">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="text-white font-bold text-sm tracking-wide">{testimonial.name}</h4>
          <p className="text-neutral-500 text-xs font-medium">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="Testimonials"
      className="w-full min-h-screen rounded-t-[20px] sm:rounded-t-[50px] py-[50px] px-[30px] sm:px-[100px] bg-white text-black hover-target"
    >
      {/* Header */}
      <div className="w-full h-fit flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-6">
        <div>
          <h1
            ref={textRef}
            className="cursor-default text-[40px] sm:text-[80px] font-extrabold leading-none hover-target mb-2"
          >
            Client Stories
          </h1>
          <div className="h-1 w-20 bg-black rounded-full"></div>
        </div>

        <p className="font-medium text-neutral-600 font-semibold text-[20px] max-w-md text-left sm:text-right leading-relaxed">
          Feedback from those who have experienced my work firsthand.
        </p>
      </div>

      {/* Layout */}
      <div className="w-full flex flex-col sm:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 flex flex-col gap-6">
          {leftColumn.map(renderCard)}
        </div>

        {/* Right Column - Offset for masonry look */}
        <div className="flex-1 flex flex-col gap-6 sm:pt-12">
          {rightColumn.map(renderCard)}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
