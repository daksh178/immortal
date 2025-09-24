import React, { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ThreeJsComponentMobile = () => {
  const mainRef = useRef(null);
  const textRef = useRef(null);
  const splitInstance = useRef(null);
  const Navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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
          setLeftCardData(response?.data?.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  useGSAP(() => {
    if (!textRef.current) return;
    splitInstance.current = new SplitText(textRef.current, { type: "chars" });
    gsap.from(splitInstance.current.chars, {
      opacity: 0.5,
      ease: "power1.inOut",
      stagger: 0.05,
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: true,
      },
    });
  }, []);

  // Track active card index on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    const onScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveIndex(index);
    };
    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={mainRef}
      id="about"
      className="w-full bg-white text-black overflow-hidden"
    >
      {/* About Section */}
      <h1 className="text-[#2C5789] text-center mt-10 opacity-10 w-full text-[36px] md:text-[48px] font-sf-ui-semibold">
        About us
      </h1>

      <div className="text-gray-900 text-center px-4 md:text-lg lg:text-xl font-sf-ui-medium tracking-wide">
        <h1 ref={textRef}>
          Biohacking the body to achieve LONGEVITY using science,
          epigenetics and spiritual frameworks. We are cutting edge
          biohackers and longevity coaches, who leverage science and
          revolutionary research to alter/change our genes to bring about a
          longer, healthier, more active life (along with
          employing spiritual connections to reveal what's within and
          to supercharge the transformation).
        </h1>
      </div>

      {/* Roadmap Heading */}
      <h1
        id="roadmap"
        className="text-[#2C5789] text-center mt-10 opacity-10 w-full text-[36px] md:text-[48px] font-sf-ui-semibold"
      >
        Roadmap
      </h1>

      {/* Swipeable Cards Section */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 py-6 scroll-smooth no-scrollbar"
      >
        {leftCardData.length === 0 ? (
          // ⏳ Show placeholder skeleton cards while loading
          Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col h-[470px] w-[378px] bg-gray-200 rounded-[20px] animate-pulse"
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
              onClick={() => Navigate(`/protocols/${card?.id}`)}
              key={card.id}
              className="relative cursor-pointer flex-shrink-0 w-full max-w-[350px] h-[510px] bg-[url('/card.png')] bg-no-repeat bg-contain bg-center border border-white/20 backdrop-blur-md flex flex-col p-4 snap-center"
            >
              <img
                src="/donut.png"
                alt=""
                className="h-[120px] w-[120px] mx-auto mt-4"
              />
              <h6 className="text-black text-lg font-semibold leading-tight mt-10">
                {card?.title}
              </h6>
              <p className="mt-2 text-[14px] text-[#434343]">{card?.short_description}</p>

              {/* <div
                className="absolute bottom-10 left-4 w-[140px] h-[40px] rounded-full flex items-center justify-between px-3 bg-white shadow-md mb-4"
                onClick={() => {
                  Navigate("/protocols/1");
                }}
              >
                <h6 className="text-sm font-bold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
                  View More
                </h6>
                <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-[#F9F9F9] shadow-inner">
                  <img src="/view_more.svg" alt="" className="h-4 w-4" />
                </div>
              </div> */}
            </div>
          ))
        )}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {leftCardData.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${activeIndex === i ? "bg-[#2C5789]" : "bg-gray-300"
              }`}
          ></span>
        ))}
      </div>

      <div className="flex mt-5 items-center justify-center gap-3 px-6">
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
  );
};

export default ThreeJsComponentMobile;
