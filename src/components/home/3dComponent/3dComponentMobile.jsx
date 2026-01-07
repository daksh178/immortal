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
  const scrollContainerRef = useRef(null);
  const autoSlideRef = useRef(null);

  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const [leftCardData, setLeftCardData] = useState([]);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_API}/get-roadmap`,
          {
            headers: { "ngrok-skip-browser-warning": "true" },
          }
        );

        if (response?.data?.data) {
          setLeftCardData(response.data.data.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  /* ================= TEXT ANIMATION ================= */

  useGSAP(() => {
    if (!textRef.current) return;

    splitInstance.current = new SplitText(textRef.current, { type: "words" });

    gsap.from(splitInstance.current.words, {
      opacity: 0.5,
      stagger: 0.05,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: true,
      },
    });
  }, []);

  /* ================= SCROLL TO INDEX ================= */

  const scrollToIndex = (index) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const width = container.offsetWidth;

    container.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  /* ================= AUTO SLIDE (MOBILE) ================= */

  useEffect(() => {
    if (!leftCardData.length) return;

    autoSlideRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % leftCardData.length;
        scrollToIndex(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(autoSlideRef.current);
  }, [leftCardData]);

  /* ================= SYNC SCROLL INDEX ================= */

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const width = container.offsetWidth;
      const index = Math.round(container.scrollLeft / width);
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
      {/* ================= ABOUT ================= */}
      <h1 className="text-[#2C5789] text-center mt-10 opacity-10 text-[48px] font-sf-ui-semibold">
        About us
      </h1>

      {/* <div className="text-center text-[14px] px-4 font-sf-ui-medium">
        <h1 ref={textRef}>
          Biohacking the body to achieve LONGEVITY using science, epigenetics and spiritual frameworks. We are cutting edge biohackers and longevity coaches, who leverage science and revolutionary research to alter/change our genes to bring about a longer, healthier, more active life (along with employing spiritual connections to reveal what's within and to supercharge the transformation).
        </h1>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="text-center text-[14px] px-4 font-sf-ui-medium">
          <h1 ref={textRef}>
            Biohacking the body to achieve LONGEVITY using science, epigenetics and spiritual frameworks. We are cutting edge biohackers and longevity coaches, who leverage science and revolutionary research to alter/change our genes to bring about a longer, healthier, more active life (along with employing spiritual connections to reveal what's within and to supercharge the transformation).
          </h1>
        </div>

        {/* Image */}
        <div className="flex justify-center lg:justify-end px-5">
          <img
            src="./headerbg-1.png"
            alt="Founder speaking"
            className="w-full max-w-[520px] h-[520px] object-cover rounded-3xl shadow-xl "
          />
        </div>

      </div>

      {/* ================= COURSES ================= */}
      <h1
        id="roadmap"
        className="text-[#2C5789] text-center mt-10 opacity-10 text-[48px] font-sf-ui-semibold"
      >
        Courses
      </h1>

      {/* ================= SLIDER ================= */}
      <div
        ref={scrollContainerRef}
        className="
          flex
          max-sm:flex-row
          max-sm:overflow-x-auto
          max-sm:snap-x
          max-sm:snap-mandatory
          max-sm:scroll-smooth
           max-sm:px-8       
          sm:flex-col
          items-center
          gap-10
        "
      >
        {leftCardData.map((card) => (
          <div
            key={card.id}
            className="
              relative
              flex-shrink-0
              w-[80%]
              max-sm:w-full
              max-sm:min-w-full
              h-[320px]
              snap-center
              cursor-pointer
              will-change-transform
            "
          >
            {/* LEFT BAR */}
            <div
              className="absolute h-1/3 w-[6px]"
              style={{
                background:
                  "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                clipPath:
                  "polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
                left: -8,
                bottom: "15%",
              }}
            />

            {/* RIGHT BAR */}
            <div
              className="absolute h-1/3 w-[6px]"
              style={{
                background:
                  "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                right: -8,
                bottom: "40%",
              }}
            />

            {/* BORDER */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(169deg, rgba(0,54,112,0) 5%, #0DB5E4 95%)",
                clipPath:
                  "polygon(3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%, 0 3%)",
              }}
            />

            {/* CARD */}
            <div
              onClick={() => navigate(`/protocols/${card.id}`)}
              className="absolute inset-[1%] bg-white flex flex-col"
              style={{
                clipPath:
                  "polygon(2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%, 0 2%)",
              }}
            >
              <img
                src={card.roadmap_image}
                alt=""
                className="w-[100px] h-[100px] mt-10 mx-auto"
              />

              <div className="px-4 text-center mt-4">
                <h6 className="text-lg font-semibold">{card.title}</h6>

                <p className="text-sm text-[#434343] mt-2">
                  {card.short_description?.substring(0, 100)}...
                  <Link
                    to={`/protocols/${card.id}`}
                    className="text-[#0db5e4] font-bold ml-1"
                  >
                    read more
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DOTS ================= */}
      <div className="flex justify-center gap-2 mt-4">
        {leftCardData.map((_, i) => (
          <span
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer transition ${activeIndex === i ? "bg-[#2C5789]" : "bg-gray-300"
              }`}
          />
        ))}
      </div>

      {/* ================= VIEW ALL ================= */}
      <div className="flex mt-5 items-center justify-center gap-3">
        <span
          className="cursor-pointer font-semibold"
          onClick={() => navigate("/roadmap")}
        >
          View All
        </span>
        <img
          src="/view_more.svg"
          alt=""
          className="h-5 w-5 cursor-pointer"
          onClick={() => navigate("/roadmap")}
        />
      </div>
    </div>
  );
};

export default ThreeJsComponentMobile;
