import React, { useEffect, useRef, useState } from "react";
import Second from "./Second";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ThreeJsComponent = () => {
  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const Navigate = useNavigate();
  // Refs for card animations
  const leftCardsRef = useRef([]);
  const rightCardsRef = useRef([]);
  const textRef = useRef(null);
  const splitInstance = useRef(null);

  const [leftCardData, setLeftCardData] = useState([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_API}/get-roadmap`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (response?.data) {
          setLeftCardData(response?.data?.data?.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  useGSAP(() => {
    const cardCount = leftCardsRef.current.length;

    // Responsive scale values
    const isSmall = window.innerWidth < 1400;
    const scaleFrom = isSmall ? 0.5 : 0.6;
    const scaleTo = isSmall ? 0.6 : 0.8;

    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      toggleClass: {
        targets: sceneRef.current,
        className: "show",
      },
      pin: sceneRef.current,
      pinSpacing: false,
      // markers: true,
    });

    // Toggle left card visibility
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      toggleClass: { targets: ".leftCardDiv", className: "show-card" },
    });

    // Toggle right card visibility
    ScrollTrigger.create({
      trigger: mainRef.current,
      start: "top top",
      end: "bottom bottom",
      toggleClass: { targets: ".rightCardDiv", className: "show-card" },
    });

    // === Timeline for 3D and cards ===
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        // markers: true,
        onUpdate: (self) => setProgress(self.progress),
      },
    });

    tl.fromTo(sceneRef.current, { x: "-50vw" }, { x: "0vw", ease: "none" });

    for (let i = 0; i < cardCount; i++) {
      const cardStart = "+=0";
      const cardDuration = 0.5;

      tl.fromTo(
        [leftCardsRef.current[i], rightCardsRef.current[i]],
        {
          y: 100,
          opacity: 0,
          scale: scaleFrom,
        },
        {
          y: 0,
          opacity: 1,
          scale: scaleTo,
          ease: "power1.inOut",
          duration: cardDuration,
        },
        cardStart
      ).to(
        [leftCardsRef.current[i], rightCardsRef.current[i]],
        {
          y: 300,
          opacity: 0,
          scale: scaleFrom,
          ease: "power1.inOut",
          duration: cardDuration,
        },
        `>${cardDuration}`
      );
    }

    tl.to(sceneRef.current, { x: "-25vw", ease: "none" });

    if (!textRef.current) return;

    // Split the text into characters
    splitInstance.current = new SplitText(textRef.current, {
      type: "chars",
    });

    // Animation timeline
    gsap.from(splitInstance.current.chars, {
      opacity: 0.5,
      ease: "linear",
      stagger: 0.05,
      scrollTrigger: {
        trigger: textRef.current,
        start: "-10% 60%",
        end: "30% 0%",
        scrub: true,
        // markers: true,
      },
    });

    return () => {
      tl.kill();
      splitInstance.current.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={mainRef}
      id="about"
      className="w-full bg-white text-black overflow-hidden flex flex-col"
    >
      <section ref={mainRef} id="about" className="relative w-full">
        <div className="relative flex justify-center items-center flex-col">
          <h1 className="text-[#2C5789] opacity-10 text-center w-full text-[250px] font-sf-ui-semibold">
            About us
          </h1>
          <div className="absolute top-60 right-40 wrapper font-sf-ui-medium text-gray-900 text-3xl  tracking-wider  w-[580px] h-[400px]">
            <h1 ref={textRef} className="">
              Biohacking the body to achieve <br></br> LONGEVITY using science,
              epigenetics and spiritual frameworks. We are <br></br> cutting edge
              biohackers and longevity coaches, who leverage science and <br></br>{" "}
              revolutionary research to alter/change our genes to bring about a
              longer, <br></br>healthier, more active life (along with <br></br>
              employing spiritual connections to <br></br>reveal what's within and
              to <br></br>supercharge the transformation).
            </h1>
          </div>
        </div>
      </section>

      <section id="roadmap" className="mt-[40vh]">
        <div>
          <h1
            id="roadmap"
            className="text-[#2C5789] opacity-10 w-full text-[250px] font-sf-ui-semibold text-center"
          >
            Roadmap
          </h1>

          <div className="flex flex-wrap justify-center gap-10 px-6"
            onClick={() => Navigate("/protocols/1")}>
            {leftCardData.length === 0 ? (
              Array(3)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[470px] w-[378px] bg-gray-200 rounded-[20px] animate-pulse"
                  >
                    {/* Example skeleton structure */}
                    <div className="h-[174px] w-[174px] bg-gray-300 rounded-full mt-[40px] mx-auto" />
                    <div className="px-8 mt-6 space-y-4">
                      <div className="h-6 bg-gray-300 rounded w-2/3" />
                      <div className="h-4 bg-gray-300 rounded w-full" />
                      <div className="h-4 bg-gray-300 rounded w-4/5" />
                    </div>
                  </div>
                ))
            ) : (
              leftCardData.map((card) => (
                <div
                  key={card.id}
                  onMouseMove={(e) => {
                    const cardEl = e.currentTarget;
                    const rect = cardEl.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * 10;
                    const rotateY = ((x - centerX) / centerX) * 10;

                    cardEl.style.transform = `
                    perspective(1000px)
                    rotateX(${-rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                  `;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `
                    perspective(1000px)
                    rotateX(0deg)
                    rotateY(0deg)
                    scale3d(1,1,1)
                  `;
                    e.currentTarget.style.transition = "transform 0.2s ease";
                    setTimeout(() => {
                      e.currentTarget.style.transition = "";
                    }, 200);
                  }}
                  className="bg-[url('/card.png')] bg-no-repeat bg-contain backdrop-blur-md border border-white/20 flex flex-col relative will-change-transform duration-150 h-[470px] w-[378px] cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Image */}
                  <img
                    src="/donut.png"
                    alt=""
                    className="h-[174px] w-[174px] mt-[40px] mx-auto pointer-events-none"
                  />

                  {/* Content wrapper for equal spacing */}
                  <div className="flex flex-col flex-1 px-8 mt-4">
                    <h6 className="text-black text-[24px] font-semibold leading-[100%] min-h-[70px] pointer-events-none">
                      {card?.title}
                    </h6>
                    <p className="text-[14px] font-normal leading-[140%] text-[#434343] min-h-[90px] pointer-events-none">
                      {card?.description}
                    </p>

                    {/* Button pinned at bottom */}
                    {/* <div
                      className="cursor-pointer mt-2 w-[171px] h-[50px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5"
                      style={{ boxShadow: "5.92px 5.92px 11.85px 0px #00000014" }}
                      onClick={() => Navigate("/protocols/1")}
                    >
                      <h6 className="flex-1 font-bold text-[16px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
                        View More
                      </h6>
                      <div
                        className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#F9F9F9]"
                        style={{
                          boxShadow:
                            "5.92px 5.92px 11.85px 0px #00000014 inset,-5.92px -5.92px 11.85px 0px #FFFFFF inset",
                        }}
                      >
                        <img src="/view_more.svg" alt="" className="h-[20px] w-[20px]" />
                      </div>
                    </div> */}
                  </div>

                  {/* Decorative left bar */}
                  <div
                    className="h-[130px] w-[6px] absolute"
                    style={{
                      background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                      clipPath:
                        "polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
                      left: -8,
                      bottom: 54,
                    }}
                  ></div>

                  {/* Decorative right bar */}
                  <div
                    className="h-[130px] w-[6px] absolute"
                    style={{
                      background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                      clipPath:
                        "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                      right: 21,
                      bottom: 200,
                    }}
                  ></div>
                </div>
              ))
            )}
          </div>

          <div className="flex mt-10 items-center justify-end mr-20 gap-3 px-6">
            <span
              className="contactText inter-bold cursor-pointer"
              onClick={() => Navigate("/roadmap")}
            >
              View All
            </span>
            <img
              src="/view_more.svg"
              alt=""
              className="h-[20px] w-[20px] cursor-pointer"
              onClick={() => Navigate("/roadmap")}
            />
          </div>
        </div>
      </section>
    </div >
  );
};

export default ThreeJsComponent;
