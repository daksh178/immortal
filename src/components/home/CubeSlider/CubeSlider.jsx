import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

const videoSrc = "/assets/images/3DJelly.mp4";
const images = [
  videoSrc,
  "/assets/images/man-woman.png",
  "/assets/images/3.jpg",
];

const CubicSlider = () => {
  const cubeRef = useRef(null);
  const videoFaceRef = useRef(null);
  const rightFaceRef = useRef(null);
  const backFaceRef = useRef(null);
  const sectionRef = useRef(null);

  const [bioData, setbioData] = useState([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_API}/get-bio`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        setbioData(response.data?.data);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  useEffect(() => {
    let ctx;
    if (
      cubeRef.current &&
      sectionRef.current &&
      videoFaceRef.current &&
      rightFaceRef.current &&
      backFaceRef.current
    ) {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress; // 0..1

            // --- CUBE ROTATION PHASES ---
            const phase1Start = 0.0;
            const phase1End = 0.5;
            const phase2Start = 0.5;
            const phase2End = 1.0;
            const phase1DelayBack = 0;
            const phase2DelayBack = 0;

            function getPhaseProgress(progress, start, end) {
              return Math.min(
                Math.max((progress - start) / (end - start), 0),
                1
              );
            }

            let videoFaceRotateY = 0;
            let rightFaceRotateY = 90;
            let backFaceRotateY = 180;

            if (progress < phase1End) {
              const p1 = getPhaseProgress(progress, phase1Start, phase1End);

              // Face 1 (video): 0 -> -90
              videoFaceRotateY = 0 - 90 * p1;
              // Face 2 (right): 90 -> 0
              rightFaceRotateY = 90 - 90 * p1;
              // Face 3 (back): 180 -> 90
              let p1back = getPhaseProgress(p1, phase1DelayBack, 1);
              backFaceRotateY = 180 - 90 * p1back;
            } else {
              const p2 = getPhaseProgress(progress, phase2Start, phase2End);

              // Face 1 (video): -90 -> -180
              videoFaceRotateY = -90 - 90 * p2;
              // Face 2 (right): 0 -> -90
              rightFaceRotateY = 0 - 90 * p2;
              // Face 3 (back): 90 -> 0
              let p2back = getPhaseProgress(p2, phase2DelayBack, 1);
              backFaceRotateY = 90 - 90 * p2back;
            }

            // Opacity for back face
            let backFaceOpacity = 1;
            if (progress < 0.5) {
              backFaceOpacity = 0;
            } else {
              // Fade in from 0.5 to 1
              backFaceOpacity = (progress - 0.5) / 0.5;
            }

            // Apply transforms
            gsap.set(videoFaceRef.current, {
              transform: `rotateY(${videoFaceRotateY}deg) translateZ(200px)`,
              opacity: 1,
            });
            gsap.set(rightFaceRef.current, {
              transform: `rotateY(${rightFaceRotateY}deg) translateZ(200px)`,
            });
            gsap.set(backFaceRef.current, {
              transform: `rotateY(${backFaceRotateY}deg) translateZ(200px)`,
              opacity: backFaceOpacity, // <--- use the calculated opacity here
            });
          },
        });

        // Initial orientation
        gsap.set(videoFaceRef.current, {
          transform: "rotateY(0deg) translateZ(200px)",
          opacity: 1,
        });
        gsap.set(rightFaceRef.current, {
          transform: "rotateY(90deg) translateZ(200px)",
        });
        gsap.set(backFaceRef.current, {
          transform: "rotateY(180deg) translateZ(200px)",
        });
      }, sectionRef);

      return () => ctx && ctx.revert();
    }
  }, []);

  return (
    // <div style={{ minHeight: "3000px", height: "max(3000px, 300vh)" }}>
    <section
      ref={sectionRef}
      id="bio"
      className="relative w-full min-h-[150vh] flex justify-center items-center overflow-visible"
    >
      <div className="absolute top-10 left-20 z-0 pl-4 text-gray-300">
        <p className="font-sf-ui-semibold md:text-[170px] lg:text-[200px] xl:text-[180px] lg:mt-24 xl:mt-0 opacity-10 text-[#2C5789]">
          Bio
        </p>
      </div>
      {/* Responsive Cube Container */}
      <div className="w-[80vw] max-w-[400px] h-[64vw] max-h-[320px] scale-[0.7] sm:scale-100 md:scale-125 xl:scale-150 -translate-y-[10%] sm:-translate-y-[30%] z-10 mx-auto relative">
        <div
          ref={cubeRef}
          className="cube w-full h-full absolute transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            left: 0,
            top: 0,
          }}
        >
          {/* Face 1: video */}
          <div
            ref={videoFaceRef}
            className="cube-face clip-polygon-8 cube-face--front absolute w-full h-full bg-white overflow-visible flex items-center justify-center rounded-2xl shadow-lg"
          >
            <video
              src={videoSrc}
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              preload="auto"
              draggable={false}
            />
          </div>
          {/* Face 2: right */}
          <div
            ref={rightFaceRef}
            className="cube-face-parent absolute w-full h-full clip-polygon-8"
            style={{
              background:
                "linear-gradient(159.8deg, rgba(0, 54, 112, 0) 3.01%, #0DB5E4 62.71%)",
            }}
          >
            <div
              className="cube-face cube-face--right absolute z-10 flex items-center justify-center clip-polygon-8"
              style={{
                background:
                  "radial-gradient(241.87% 130.86% at 91.2% 0%, rgba(140, 229, 255, 0.7) 5.77%, rgba(255, 255, 255, 0.28) 53.85%, rgba(255, 255, 255, 0) 100%)",
                width: "99%",
                height: "99%",
                left: "0.5%",
                zIndex: 40,
              }}
            >
              <img
                src={images[2]}
                alt="Face 2"
                style={{
                  width: "99%",
                  height: "99%",
                  left: "0.5%",
                  zIndex: 40,
                }}
                className="object-top object-cover"
                draggable={false}
              />
            </div>
          </div>
          {/* Face 3: back */}
          <div
            ref={backFaceRef}
            className="absolute clip-polygon-8 w-full h-full overflow-visible flex items-center justify-center rounded-2xl shadow-lg clip-polygon-8"
            style={{
              background:
                " linear-gradient(159.8deg, rgba(0, 54, 112, 0) 3.01%, #0DB5E4 62.71%)",
            }}
          >
            <div
              className="clip-polygon-8 flex flex-col items-center p-5"
              style={{
                background:
                  "radial-gradient(241.87% 130.86% at 91.2% 0%, rgba(140, 229, 255, 0.7) 5.77%, rgba(255, 255, 255, 0.28) 53.85%, rgba(255, 255, 255, 0) 100%)",
                width: "99%",
                height: "99%",
                left: "0.5%",
                backgroundColor: "white",
              }}
            >
              {bioData?.length > 0 ? (
                bioData.map((bio) => (
                  <div key={bio.id} className="mb-4">
                    <h1 className="text-sm sm:text-lg md:text-2xl font-bold text-black">
                      {bio.user_name}
                    </h1>
                    <p className="text-gray-700 text-[10px] sm:text-[12px] mt-2 whitespace-pre-line">
                      {bio.user_detail.substring(0, 250)}...
                      <Link className="text-[#0db5e4] font-bold" to={"/bio"}>
                        read more
                      </Link>
                    </p>
                  </div>
                ))
              ) : (
                <div className="relative w-full max-w-md h-[400px] p-6">
                  {/* Skeleton content */}
                  <div className="animate-pulse space-y-4">
                    <div className="h-5 w-2/3 bg-gray-200/80 rounded"></div>
                    <div className="h-3 w-full bg-gray-50 rounded"></div>
                    <div className="h-3 w-5/6 bg-gray-50 rounded"></div>
                    <div className="h-3 w-4/6 bg-gray-50 rounded"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .perspective-\\[1200px\\] {
            perspective: 1200px;
          }
          .cube {
            transform-style: preserve-3d;
          }
        `}
      </style>
    </section>
    // </div>
  );
};

export default CubicSlider;