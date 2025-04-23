import AboutMe from "@/components/AboutMe";
import MouseFollower from "@/components/MouseFollower";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Nav from "@/components/Nav";
import ClientWrapper from "@/components/ClientWrapper";
import HeroAndProject from "@/components/HeroAndProject";

export default function Home() {
  return (
    <ClientWrapper>
    <main className=" w-full h-screen ">
      <div className="fixed w-full flex justify-center items-center z-50">
       <Nav />
      </div>
      <MouseFollower />
      <HeroAndProject />
      
    </main>
    </ClientWrapper>
  );
}
