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
      <main className=" w-full min-h-screen  ">
        {/* <div className="fixed top-0 w-full mb-[70px]  z-50">
          <Nav />
        </div> */}
        <MouseFollower />
        <HeroAndProject />

      </main>
    </ClientWrapper>
  );
}
