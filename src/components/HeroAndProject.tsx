'use client'
import { useState } from 'react';
import Hero from './Hero';
import Projects from './Projects';
import AboutMe from './AboutMe';
import Contact from './Contact';
import Testimonials from './Testimonials';


const HeroAndProject = () => {
    const [showProjects , setShowProjects ] = useState(false); 
    
    const handleHeroAnimationComplete = () => {
        setShowProjects(true); // Show projects after hero animation completes
    }

  return (
    <>
      <Hero onAnimationComplete={handleHeroAnimationComplete} />
      {showProjects && <Projects />}
      {showProjects && <div className="w-full h-full bg-white">
        <AboutMe />
      </div>}
      {showProjects && <Testimonials />}
      {showProjects && <div className="w-full bg-white">
        <Contact />
      </div>}
    </>
  )
}

export default HeroAndProject;
