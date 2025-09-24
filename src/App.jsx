import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import gsap from "gsap";
import { ReactLenis } from "lenis/react";

import Home from "./pages/home/HomePage";
import Bio from "./pages/bio/BioPage";
import Protocol from "./pages/protocol/ProtocolPage";
import RoadmapPage from "./pages/roadmap/RoadmapPage";
import Loader from "./components/Loader";
import { useGLTF } from "@react-three/drei";

function App() {
  const lenisRef = useRef();
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  useEffect(() => {
    useGLTF.preload("/T-transformed.glb");

    const disableScroll = () => {
      window.scrollTo(0, 0);
    };

    const preventDefault = (e) => e.preventDefault();

    const preloadAssets = async () => {
      // Disable scroll without hiding overflow
      window.addEventListener("scroll", disableScroll);
      window.addEventListener("wheel", preventDefault, { passive: false });
      window.addEventListener("touchmove", preventDefault, { passive: false });
      window.addEventListener("keydown", preventDefault, { passive: false });

      const videoPromise = new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = "/assets/video/720p60fps.mp4";
        video.preload = "auto";
        video.playsInline = true
        video.onloadeddata = () => resolve();
        video.onerror = () => resolve(); // avoid hang
      });

      await videoPromise;
      setIsPreloaded(true);

      gsap.to(".loader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
          // Enable scroll
          window.removeEventListener("scroll", disableScroll);
          window.removeEventListener("wheel", preventDefault);
          window.removeEventListener("touchmove", preventDefault);
          window.removeEventListener("keydown", preventDefault);
          setShowLoader(false);
        },
      });
    };

    preloadAssets();
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/protocols/:protocolname" element={<Protocol />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
        </Routes>
      </Router>

      {showLoader && <Loader />}
    </>
  );
}

export default App;
