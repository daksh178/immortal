import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);
import { useNavigate } from "react-router-dom";

import { IconX } from "@tabler/icons-react";

const navItems = [
  { label: "About Us", targetId: "about" },
  { label: "Roadmap", targetId: "roadmap" },
  { label: "Bio", targetId: "bio" },
  { label: "Supplement", targetId: "supplement" },
];

const OverlayMobile = ({ isProtocolPage, isBioPage }) => {
  const overlayRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.set(overlayRef.current, { y: "-100%" }); // Initial offscreen position
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    const yValue = isOpen ? 0 : "-100%";
    const overlayOpacity = isOpen ? 1 : 0;
    const closeButtonOpacity = isOpen ? 1 : 0;
    const opacityChangeDelay = isOpen ? 0 : 1;

    tl.to(overlayRef.current, {
      y: yValue,
      duration: 0.8,
    })
      .to(
        overlayRef.current,
        {
          opacity: overlayOpacity,
          delay: opacityChangeDelay,
          duration: 0.5,
        },
        "<"
      )
      .to(
        ".closeButton",
        {
          opacity: closeButtonOpacity,
          duration: 0.5,
        },
        "-=0.3"
      );

    document.body.style.overflowY = isOpen ? "hidden" : "auto";

    return () => tl.kill();
  }, [isOpen]);

  const handleItemClick = (targetId) => {
    setIsOpen(false);

    setTimeout(() => {
      if (isProtocolPage || isBioPage) {
        // Navigate to / with scrollTo param
        navigate(`/?scrollTo=${targetId}`);
      } else {
        const section = document.getElementById(targetId);
        if (section) {
          gsap.to(window, {
            duration: 0,
            scrollTo: { y: section, offsetY: 0 },
            ease: "linear",
          });
        }
      }
    }, 600);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed inter-bold top-0 left-0 w-full h-[80px] bg-transparent text-white flex justify-end items-center px-6 z-30">
        {!isOpen &&
          (isProtocolPage ? (
            <button
              onClick={() => setIsOpen(true)}
              className="text-sm flex gap-2 text-black items-center justify-between cursor-pointer"
            >
              <div className="h-[40px] w-[140px] rounded-full bg-white flex items-center justify-center">
                <img src="/Protocols/menu.png" className="w-full" />
              </div>
            </button>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="text-sm flex gap-2 items-center justify-between cursor-pointer"
            >
              <div className="h-[40px] w-[40px] rounded-full bg-white flex items-center justify-center">
                <img src="/menu.svg" className="w-2/5" />
              </div>
            </button>
          ))}
      </div>

      {/* Fullscreen Overlay */}
      <div
        ref={overlayRef}
        className="fixed opacity-0 top-0 left-0 w-full h-full bg-[url('/menuBg.png')] bg-cover bg-white   flex flex-col items-center justify-center gap-6 z-40"
      >
        <img
          src="/tree.svg"
          className="absolute left-0 top-0 w-[160px] "
          alt="Menu Background"
        />
        <img
          src="/skeleton.png"
          className="absolute right-8 h-[476px]   translate-x-1/2"
          alt="Menu Background"
        />

        <button
          onClick={() => setIsOpen(false)}
          className="z-50 absolute hover:scale-105 transition-all cursor-pointer closeButton opacity-0 top-4 right-0 text-sm  py-2 text-[#2C5789]"
        >
          {/* <IconX
            size={108}
            className="hover:scale-125 hover:text-blue-500 transition-all duration-300 "
          /> */}
          <img src="/closeMenu.png" className="w-4/5 "></img>
        </button>

        <div className="absolute left-8 translate-y-[15%] mx-auto flex flex-col gap-8 font-sf-ui-semibold  justify-center items-center">
          {navItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleItemClick(item.targetId)}
              className=" cursor-pointer w-full text-left"
            >
              <span
                className="nav-item inline-block text-4xl xs:text-5xl text-[#2C5789] will-change-transform"
                onMouseEnter={(e) => {
                  gsap.killTweensOf(e.currentTarget); // stop any ongoing animation
                  gsap.to(e.currentTarget, {
                    x: 32, // 4rem equivalent
                    duration: 0.2,
                    ease: "power2.out",
                    color: "#000000",
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.killTweensOf(e.currentTarget); // stop any ongoing animation
                  gsap.to(e.currentTarget, {
                    x: 0,
                    duration: 1.0,
                    ease: "power3.out",
                    color: "#2C5789",
                  });
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OverlayMobile;
