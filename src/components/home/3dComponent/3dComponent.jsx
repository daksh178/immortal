import React, { useEffect, useRef, useState } from "react";
import Second from "./Second";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Link, useNavigate } from "react-router-dom";

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

  // Card data
  const leftCardData = [
    {
      id: 1,
      title: "Immunity Protocols",
      content:
        "This is a clear description of the protocol to let the customer know about its benefits and usecases. They can click on the button below to know about the protocol in detail.",
    },
    {
      id: 2,
      title: "Epstein Barr Virus Protocols ",
      content:
        "This is a clear description of the protocol to let the customer know about its benefits and usecases. They can click on the button below to know about the protocol in detail.",
    },
    {
      id: 3,
      title: "IBS and gut healing Protocols ",
      content:
        "This is a clear description of the protocol to let the customer know about its benefits and usecases. They can click on the button below to know about the protocol in detail.",
    },
  ];
  const rightCardData = [
    {
      id: 1,
      title: "Female hormone Protocols",
      content:
        "This is a clear description of the protocol to let the customer know about its benefits and usecases. They can click on the button below to know about the protocol in detail.",
    },
    {
      id: 2,
      title: "Male hormone Protocols",
      content:
        "This is a clear description of the protocol to let the customer know about its benefits and usecases. They can click on the button below to know about the protocol in detail.",
    },
    {
      id: 3,
      title: "Thyroid Protocols",
      content:
        "This is a clear description of the protocol to let the customer know about its benefits and usecases. They can click on the button below to know about the protocol in detail.",
    },
  ];

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
      className="h-[320vh] 2xl:h-[320vh] w-full bg-white text-black overflow-hidden relative"
    >
      {/* <div
        ref={sceneRef}
        className="w-full h-[100vh] opacity-0 pointer-events-none transition-opacity duration-500 ease-in-out"
      >
        <Canvas>
          <Second progress={progress} />
        </Canvas>
      </div> */}

      <h1 className="absolute text-[#2C5789] opacity-10 top-[1%] left-[10%] w-full text-[250px] font-sf-ui-semibold">
        About us
      </h1>

      <div className="wrapper font-sf-ui-medium text-gray-900 text-3xl  tracking-wider  absolute w-[580px] h-[400px] top-64 right-72">
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

      <h1
        id="roadmap"
        className="text-[#2C5789] relative top-[90vh] opacity-10 w-full text-[250px] font-sf-ui-semibold text-center"
      >
        Roadmap
      </h1>

      <div className="flex relative top-[100vh] flex-wrap justify-center gap-10 px-6">
        {[...leftCardData].map((card) => (
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
            className="bg-[url('/card.png')] cursor-pointer bg-no-repeat bg-contain h-[510px] w-[378px] backdrop-blur-md border border-white/20 flex flex-col relative will-change-transform duration-150"
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
              src="/donut.png"
              alt=""
              className="h-[174px] w-[174px] mt-[40px] mx-auto pointer-events-none"
            />
            <h6 className="w-full pl-8 text-black text-[31px] font-semibold leading-[100%] pointer-events-none">
              {card.title}
            </h6>
            <p className="mt-[15px] pl-8 mr-6 text-[18px] font-normal leading-[100%] text-[#434343] pointer-events-none">
              {card.content}
            </p>

            <div
              className="cursor-pointer absolute bottom-10 left-6 w-[191px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5"
              style={{ boxShadow: "5.92px 5.92px 11.85px 0px #00000014" }}
            >
              <h6 className="flex-1 font-bold text-[18px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
                View More
              </h6>
              <div
                className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#F9F9F9]"
                style={{
                  boxShadow:
                    "5.92px 5.92px 11.85px 0px #00000014 inset,-5.92px -5.92px 11.85px 0px #FFFFFF inset",
                }}
              >
                <img
                  src="/view_more.svg"
                  alt=""
                  className="h-[20px] w-[20px]"
                />
              </div>
            </div>

            {/* Left bar */}
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

            {/* Right bar */}
            <div
              className="h-[130px] w-[6px] absolute"
              style={{
                background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                clipPath:
                  "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                right: -8,
                bottom: 200,
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className="flex relative top-[100vh] flex-wrap justify-center gap-10 px-6 z-50">
        <button className="footerButton l relative" onClick={() => { Navigate('/protocols/1') }}>
          <span className="contactText inter-bold mr-10 ">
            View All
            <img
              src="/contactIcon.svg"
              className="absolute h-full right-0 top-0"
            ></img>
          </span>
        </button>
      </div >

    </div >
  );
};

export default ThreeJsComponent;
