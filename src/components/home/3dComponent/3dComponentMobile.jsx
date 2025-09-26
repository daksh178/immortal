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
        className="
            flex 
            justify-center
            overflow-x-auto 
            snap-x snap-mandatory 
            gap-6 px-4 py-4 scroll-smooth 
            no-scrollbar
          "
      >
        {leftCardData.length === 0
          ? Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="
              flex-shrink-0 
              w-[80%]
              aspect-[9/11] 
              bg-gray-200 rounded-[20px] animate-pulse snap-center
            "
              >
                {/* Skeleton */}
                <div className="w-3/5 aspect-square bg-gray-300 rounded-full mt-10 mx-auto" />
                <div className="px-6 mt-6 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-2/3" />
                  <div className="h-4 bg-gray-300 rounded w-full" />
                  <div className="h-4 bg-gray-300 rounded w-4/5" />
                </div>
              </div>
            ))
          : leftCardData.map((card) => (
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
              className="
            relative 
            flex-shrink-0 
            w-[80%]
            h-[500px]
            aspect-[9/11] 
            cursor-pointer 
            duration-150 
            will-change-transform 
            snap-center
          "
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Decorative left bar */}
              <div
                className="absolute h-1/3 w-[6px]"
                style={{
                  background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                  clipPath:
                    "polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
                  left: -8,
                  bottom: "15%",
                }}
              ></div>

              {/* Decorative right bar */}
              <div
                className="absolute h-1/3 w-[6px]"
                style={{
                  background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                  clipPath:
                    "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                  right: -8,
                  bottom: "40%",
                }}
              ></div>

              {/* Border layer */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(169.06deg, rgba(0, 54, 112, 0) 4.42%, #0DB5E4 91.9%)",
                  clipPath:
                    "polygon(3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%, 0 3%)",
                }}
              />

              {/* Inner background */}
              <div
                onClick={() => Navigate(`/protocols/${card?.id}`)}
                className="absolute inset-[0.8%] flex flex-col bg-white"
                style={{
                  clipPath:
                    "polygon(2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%, 0 2%)",
                }}
              >
                {/* Image */}
                <img
                  src={card?.roadmap_image}
                  alt=""
                  className="w-3/5 aspect-square mt-10 mx-auto pointer-events-none"
                />

                {/* Content */}
                <div className="flex flex-col flex-1 px-6 mt-4">
                  <h6 className="text-black text-lg sm:text-xl md:text-2xl font-semibold leading-tight min-h-[4rem] pointer-events-none">
                    {card?.title}
                  </h6>
                  <p className="text-sm sm:text-[14px] md:text-[16px] mb-10 font-normal leading-relaxed text-[#434343] min-h-[5rem] pointer-events-none">
                    {card?.short_description?.length > 250
                      ? (
                        <>
                          {card?.short_description?.substring(0, 250)}...
                          <Link
                            className="text-[#0db5e4] font-bold cursor-pointer"
                            to={`/protocols/${card?.id}`}
                          >
                            read more
                          </Link>
                        </>
                      )
                      : card?.short_description}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
