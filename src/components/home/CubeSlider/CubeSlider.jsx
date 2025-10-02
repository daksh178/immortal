import { useRef, useEffect, useState } from "react";
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
        if (response?.data) {
          setbioData(response.data?.data?.sort((a, b) => a.id - b.id)?.slice(0, 2));
        }
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
      const cubeWidth = cubeRef.current.offsetWidth;
      const depth = cubeWidth / 2; // Half width for translateZ

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top+=200 top",
          end: "+=300%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            let videoFaceRotateY = 0;
            let rightFaceRotateY = 90;
            let backFaceRotateY = 180;

            if (progress < 0.5) {
              const p1 = (progress - 0.0) / (0.5 - 0.0);

              videoFaceRotateY = 0 - 90 * p1;
              rightFaceRotateY = 90 - 90 * p1;
              backFaceRotateY = 180 - 90 * p1;
            } else {
              const p2 = (progress - 0.5) / (1.0 - 0.5);

              videoFaceRotateY = -90 - 90 * p2;
              rightFaceRotateY = 0 - 90 * p2;
              backFaceRotateY = 90 - 90 * p2;
            }

            let backFaceOpacity = progress < 0.5 ? 0 : (progress - 0.5) / 0.5;

            gsap.set(videoFaceRef.current, {
              transform: `rotateY(${videoFaceRotateY}deg) translateZ(${depth}px)`,
              opacity: 1,
            });
            gsap.set(rightFaceRef.current, {
              transform: `rotateY(${rightFaceRotateY}deg) translateZ(${depth}px)`,
            });
            gsap.set(backFaceRef.current, {
              transform: `rotateY(${backFaceRotateY}deg) translateZ(${depth}px)`,
              opacity: backFaceOpacity,
            });
          },
        });

        // Initial orientation
        gsap.set(videoFaceRef.current, {
          transform: `rotateY(0deg) translateZ(${depth}px)`,
          opacity: 1,
        });
        gsap.set(rightFaceRef.current, {
          transform: `rotateY(90deg) translateZ(${depth}px)`,
        });
        gsap.set(backFaceRef.current, {
          transform: `rotateY(180deg) translateZ(${depth}px)`,
        });
      }, sectionRef);

      return () => ctx && ctx.revert();
    }
  }, []);


  return (
    <section
      ref={sectionRef}
      id="bio"
      className="relative h-[120vh] w-full flex flex-col justify-center overflow-visible"
    >
      <div className="text-gray-300 text-left w-[1080px] mx-auto">
        <p className="font-sf-ui-semibold text-[200px] opacity-10 text-[#2C5789]">
          Bio
        </p>
      </div>
      {/* Responsive Cube Container */}
      <div className="h-full">
        <div
          className="
            w-[90vw] 
            sm:w-[80vw] 
            md:w-[700px] 
            lg:w-[700px] 
            xl:w-[700px] 
            2xl:w-[800px] 
            max-w-[90vw] 
            h-[60vh] 
            md:h-[500px] 
            lg:h-[600px] 
            xl:h-[700px] 
            2xl:h-[800px] 
            max-h-[90vh] 
            z-10 mx-auto relative
          "
        >
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
                    <div key={bio.id} className="p-5">
                      <h1 className=" text-[10px] 
                        sm:text-[14px] 
                        md:text-[16px] 
                        lg:text-[26px] 
                        xl:text-[36px] 
                        2xl:text-[40px]
                        font-bold
                         text-black">
                        {bio.user_name}
                      </h1>
                      <p className="
                        text-gray-700 
                        text-[10px] 
                        sm:text-[14px] 
                        md:text-[16px] 
                        lg:text-[20px] 
                        xl:text-[20px] 
                        2xl:text-[28px] 
                        mt-2 
                        whitespace-pre-line
                      ">

                        {bio.user_detail.substring(0, 300)}...
                        <Link className="text-[#0db5e4] font-bold cursor-pointer" to={"/bio"}>
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
      </div>

      {/* <img src="./marquee.png" className="w-full" /> */}
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
  );
};

export default CubicSlider;