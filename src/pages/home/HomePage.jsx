import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Overlay from "../../components/home/Navbar/Overlay.jsx";
import OverlayMobile from "../../components/home/Navbar/OverlayMobile.jsx";

import Hero from "../../components/home/Hero/Hero.jsx";
import HeroMobile from "../../components/home/Hero/HeroMobile.jsx";

import ThreeJsComponent from "../../components/home/3dComponent/3dComponent.jsx";
import ThreeJsComponentMobile from "../../components/home/3dComponent/3dComponentMobile.jsx";

import CubicSlider from "../../components/home/CubeSlider/CubeSlider.jsx";
import MobileCubeSlider from "../../components/home/CubeSlider/MobileCubeSlider.jsx";

import Supplement from "../../components/home/Supplements/Supplement.jsx";
import SupplementMobile from "../../components/home/Supplements/SupplementMobile.jsx";

import Footer from "../../components/home/Footer/Footer.jsx";

gsap.registerPlugin(ScrollToPlugin);

const Home = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
  const [isMd, setIsMd] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
      setIsMd(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const scrollToId = searchParams.get("scrollTo");

    if (scrollToId) {
      setTimeout(() => {
        const section = document.getElementById(scrollToId);
        if (section) {
          gsap.to(window, {
            duration: 0,
            scrollTo: { y: section, offsetY: 0 },
            ease: "linear",
          });
        }
      }, 300);
    }
  }, [location.search]);

  return (
    <main className="flex flex-col w-full">
      {/* Navbar */}
      <header className="w-full">
        <Overlay />
      </header>

      {/* Hero Section */}
      <section id="hero" className="w-full">
        {isMd ? <HeroMobile /> : <Hero />}
      </section>

      {/* 3D Component */}
      <section id="three" className="w-full">
        {isMobile ? <ThreeJsComponentMobile /> : <ThreeJsComponent />}
      </section>

      <section id="img" className="w-full">
        <img src="./marquee.png"></img>
      </section>

      {/* Cube Slider */}
      <section id="slider">
        {isMobile ? <MobileCubeSlider /> : <CubicSlider />}
      </section>

      {/* Supplement Section */}
      <section id="supplements" className="w-full">
        {isMobile ? <SupplementMobile /> : <Supplement />}
      </section>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </main>
  );
};

export default Home;
