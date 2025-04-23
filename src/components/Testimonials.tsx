"use client";
import { useState } from "react";
import { testimonials } from "@/constraints/script";
import { useInteractiveText } from "@/hooks/useInterectiveText";
import toast,{Toaster} from 'react-hot-toast';


const Testimonials = () => {
  const textRef = useInteractiveText();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null); // Track the hovered card

  const notify = () => toast('You are not supposed to click everything!😑',{
    style: {
      background: '#ef4444',
      color: '#fff',
      textAlign: 'center'
      
    }
  });

  return (
    <section id="Testimonials" className="w-full min-h-screen rounded-t-[20px] sm:rounded-t-[50px] py-[30px] px-[30px] sm:px-[100px] text-black bg-white hover-target">
      <Toaster />
      {/* Header */}
      <div className="w-full h-fit flex justify-between items-center hover-target">
        <h1
          ref={textRef}
          className="cursor-default text-[35px] sm:text-[80px] font-extrabold leading-none hover-target"
        >
          Testimonials
        </h1>
        <p className="font-bold hidden sm:block text-[18px]">
          Does what people think about me really matter?
        </p>
      </div>

      {/* Layout */}
      <div className="w-full min-h-[400px] border-2 border-black rounded-md mt-4 hover-target p-5 flex sm:flex-row flex-col gap-4 relative">
        {/* Left Column */}
        <div className="h-full w-full sm:w-1/2 flex flex-col justify-between gap-6">
          {testimonials
            .filter((_, index) => index % 2 === 0) // Left side: even indices
            .map((testimonial, index) => (
              <div
                key={index}
                className={`bg-black rounded-lg shadow-md p-6 w-full text-white transition-all duration-300 cursor-pointer ${
                  hoveredCard === index
                    ? "scale-105" // Scale the hovered card
                    : hoveredCard !== null
                    ? "blur-sm" // Blur non-hovered cards
                    : ""
                }`}
                onMouseEnter={() => setHoveredCard(index)} // Set hovered card
                onMouseLeave={() => setHoveredCard(null)} // Reset on leave
                onClick={notify}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p>{testimonial.comment}</p>
              </div>
            ))}
        </div>

        {/* Right Column */}
        <div className="h-full w-full sm:w-1/2 flex flex-col justify-between gap-6 items-end">
          {testimonials
            .filter((_, index) => index % 2 !== 0) // Right side: odd indices
            .map((testimonial, index) => (
              <div
                key={index}
                className={`bg-black rounded-lg shadow-md p-6 w-full text-white transition-all duration-300 cursor-pointer ${
                  hoveredCard === index + testimonials.length / 2
                    ? "scale-105"
                    : hoveredCard !== null
                    ? "blur-sm"
                    : ""
                }`}
                onMouseEnter={() =>
                  setHoveredCard(index + testimonials.length / 2)
                }
                onMouseLeave={() => setHoveredCard(null)}
                onClick={notify}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-sm">{testimonial.title}</p>
                  </div>
                </div>
                <p>{testimonial.comment}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
