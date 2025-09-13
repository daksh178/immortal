import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import HeroMobile from "../../components/home/Hero/HeroMobile.jsx";
import MobileCubeSlider from "../../components/home/CubeSlider/MobileCubeSlider.jsx";
import React from "react";
import OverlayMobile from "../../components/home/Navbar/OverlayMobile.jsx";
import SupplementMobile from "../../components/home/Supplements/SupplementMobile.jsx";
import Supplement from "../../components/home/Supplements/Supplement.jsx";
gsap.registerPlugin(ScrollToPlugin);

import Overlay from "../../components/home/Navbar/Overlay.jsx";
import Hero from "../../components/home/Hero/Hero.jsx";
import ThreeJsComponent from "../../components/home/3dComponent/3dComponent.jsx";
import CubicSlider from "../../components/home/CubeSlider/CubeSlider.jsx";
import Footer from "../../components/home/Footer/Footer.jsx";
import ThreeJsComponentMobile from "../../components/home/3dComponent/3dComponentMobile.jsx";

const Home = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280); // change breakpoint as needed
  const [isMd, setIsMd] = useState(window.innerWidth < 768); // change breakpoint as needed

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
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
      }, 300); // small delay to allow DOM load
    }
  }, [location.search]);

  return (
    <>
      {isMobile ? <OverlayMobile /> : <Overlay />}
      {isMd ? <HeroMobile /> : <Hero />}
      {isMobile ? <ThreeJsComponentMobile /> : <ThreeJsComponent />}
      {isMd ? <MobileCubeSlider /> : <CubicSlider />}
      {isMobile ? <SupplementMobile /> : <Supplement />}
      <Footer />
    </>
  );
};

export default Home;
