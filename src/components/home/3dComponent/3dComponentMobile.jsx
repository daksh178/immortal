import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(SplitText, ScrollTrigger);

const ThreeJsComponentMobile = () => {
  const mainRef = useRef(null);
  const leftCardsRef = useRef([]);
  const rightCardsRef = useRef([]);
  const textRef = useRef(null);
  const splitInstance = useRef(null);
  const Navigate = useNavigate();

  const leftCardData = [
    {
      id: 1,
      title: "Immunity Protocols",
      content: "This is a clear description...",
    },
    {
      id: 2,
      title: "Epstein Barr Virus Protocols",
      content: "This is a clear description...",
    },
    {
      id: 3,
      title: "IBS and gut healing Protocols",
      content: "This is a clear description...",
    },
  ];

  const rightCardData = [
    {
      id: 1,
      title: "Female hormone Protocols",
      content: "This is a clear description...",
    },
    {
      id: 2,
      title: "Male hormone Protocols",
      content: "This is a clear description...",
    },
    {
      id: 3,
      title: "Thyroid Protocols",
      content: "This is a clear description...",
    },
  ];

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

  return (
    <div
      ref={mainRef}
      id="about"
      className="min-h-[320vh] w-full bg-white text-black overflow-hidden relative"
    >
      {/* About Section */}
      <h1 className="absolute text-[#2C5789] opacity-10 top-[1%] left-[3%] w-full text-[36px] md:text-[48px] font-sf-ui-semibold">
        About us
      </h1>

      <div className="absolute text-gray-900 text-base md:text-lg lg:text-xl font-sf-ui-medium tracking-wide w-[90%] h-auto top-32 left-4 md:left-8 md:top-44 ">
        <h1 ref={textRef} className="max-w-3xl">
          Biohacking the body to achieve LONGEVITY using science, epigenetics
          and spiritual frameworks. We are cutting edge biohackers and longevity
          coaches, who leverage science and revolutionary research to
          alter/change our genes for a longer, healthier, more active life
          (along with employing spiritual connections to reveal what's within
          and supercharge the transformation).
        </h1>
      </div>

      {/* Roadmap Heading */}
      <h1
        id="roadmap"
        className="absolute text-[#2C5789] opacity-10 top-[40vh] left-[5%] w-full text-[36px] md:text-[48px] font-sf-ui-semibold"
      >
        Roadmap
      </h1>

      {/* Cards Section */}
      <div className="flex flex-wrap justify-center relative gap-6 px-6 py-12 mt-[50vh]">
        {[...leftCardData].map((card, index) => (
          <div
            key={card.id}
            onClick={() => {
              Navigate("/protocols/1");
            }}
            onMouseMove={(e) => {
              const cardEl = e.currentTarget;
              const rect = cardEl.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * 10; // tilt up/down
              const rotateY = ((x - centerX) / centerX) * 10; // tilt left/right

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
            className="relative cursor-pointer w-[280px] h-[340px] bg-[url('/card.png')] bg-no-repeat bg-contain border border-white/20 backdrop-blur-md flex flex-col p-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="/donut.png"
              alt=""
              className="h-[80px] w-[80px] mx-auto mt-4"
            />
            <h6 className="text-black text-lg font-semibold leading-tight mt-4">
              {card.title}
            </h6>
            <p className="mt-2 text-sm text-[#434343]">{card.content}</p>

            <div className="absolute bottom-4 left-4 w-[140px] h-[40px] rounded-full flex items-center justify-between px-3 bg-white shadow-md">
              <h6 className="text-sm font-bold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
                View More
              </h6>
              <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center bg-[#F9F9F9] shadow-inner">
                <img src="/view_more.svg" alt="" className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
        <Link
          to={"/protocols/1"}
          className="w-full cursor-pointer flex justify-center pr-4 absolute -bottom-20"
        >
          <button className="footerButton l relative">
            <span className="contactText inter-bold mr-10 ">
              View All
              <img
                src="/contactIcon.svg"
                className="absolute h-full right-0 top-0"
              ></img>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThreeJsComponentMobile;
