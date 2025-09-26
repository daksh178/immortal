import React from 'react'

export default function HeroMobile() {
  return (
    <div className='relative'>
      <div className="absolute top-6 towardFadeDiv left-6 md:left-8">
        <img src="./logo.svg" className="w-[120px] "></img>
      </div>
      <div className='flex flex-col items-center justify-center pt-40'>
        <div className="pb-5 text-center text-[30px] sm:text-[45px] md:text-[70px] 2xl:text-[110px] font-bold leading-none tracking-normal bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
          Unlock
          Longevity
        </div>
        <div className="text-[30px] sm:text-[45px] md:text-[70px] 2xl:text-[110px] font-semibold leading-none tracking-normal bg-black bg-clip-text text-transparent">
          Through
          Science & Spirit
        </div>
      </div>
    </div>
  )
}

// import React, { useRef, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
// import { useState } from "react";

// gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);

// const semiCircle = `M1088 0C1088 300.443 844.443 544 544 544 243.557 544 0 300.443 0 0ZM336.719 0Z`;
// const circle = `M1088 0C1088 300.443 844.443 544 544 544 243.557 544 0 300.443 0 0 0-300.443 243.557-544 544-544 844.443-544 1088-300.443 1088 0Z`;


// // Responsive mask sizes
// function getMaskSizes(width) {
//   if (width > 400 && width <= 600) {
//     return { min: 70, max: 1200 };
//   } else if (width < 400) {
//     return { min: 70, max: 900 };
//   } else {
//     return { min: 60, max: 900 }; // <-- add a default (for >600)
//   }
// }

// export const HeroMobile = () => {
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);
//   const pathRef = useRef(null);
//   const whiteCircleRef = useRef(null);
//   const parentRef = useRef(null);


//   // Track window width for responsive mask sizes
//   const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   //I want if the window has not been scrolled yet, the video should not play

//   useEffect(() => {
//     const handleScroll = () => {
//       const video = videoRef.current;
//       if (video && window.scrollY > 0) {
//         // Play the video if the window has been scrolled
//         video.play().catch((error) => {
//           console.error("Error playing video:", error);
//         });
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Generate data URI from current <path>
//   const updateMaskImage = () => {
//     const path = pathRef.current;
//     if (!path) return;
//     const svg = `<svg width="997" height="594" viewBox="0 0 997 594" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${path.getAttribute(
//       "d"
//     )}" fill="black"/></svg>`;
//     const encoded = `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
//     const video = videoRef.current;
//     if (video) {
//       video.style.webkitMaskImage = encoded;
//       video.style.maskImage = encoded;
//     }
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     const path = pathRef.current;
//     const video = videoRef.current;
//     const whiteCircle = whiteCircleRef.current;
//     const parent = parentRef.current;
//     if (!container || !path || !video || !whiteCircle || !parent) return;

//     // Get mask sizes for current width
//     const { min: MIN_MASK_SIZE, max: MAX_MASK_SIZE } = getMaskSizes(windowWidth);

//     // Set initial path
//     path.setAttribute("d", semiCircle);
//     updateMaskImage();

//     // GSAP timeline for morphing

//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: container,
//         start: "top top",
//         end: "bottom bottom",
//         endTrigger: parent, // ScrollTrigger will watch the parent element for the end
//         scrub: true,
//         pin: true,
//         onUpdate: updateMaskImage,
//       },
//     });

//     const tl2 = gsap.timeline({
//       scrollTrigger: {
//         trigger: container,
//         start: "top top", // pin starts here
//         end: "+=100vh", // total scroll range of pinned section
//         scrub: true,
//       },
//     });

//     // Fade out .towardFadeDiv after scrolling 200px from top
//     gsap.to(".towardFadeDiv", {
//       scrollTrigger: {
//         trigger: ".towardFadeDiv",
//         start: "200 top", // start fading when scroll reaches 200px
//         end: "400 top", // fully faded by 400px
//         scrub: true,
//         // markers: true, // for debugging
//       },
//       opacity: 0,
//       duration: 1.5,
//       ease: "power1.inOut",
//     });

//     // Morph the path
//     tl.to(
//       path,
//       {
//         duration: 0.8,
//         ease: "power1.inOut",
//         morphSVG: {
//           shape: circle,
//         },
//         onUpdate: updateMaskImage,
//       },
//       0
//     );

//     // Adjust mask and white circle size on scroll
//     tl.to(
//       {},
//       {
//         onUpdate: () => {
//           const progress = tl.scrollTrigger?.progress || 0;
//           // Mask grows
//           const maskSize =
//             MIN_MASK_SIZE + (MAX_MASK_SIZE - MIN_MASK_SIZE) * progress;
//           video.style.maskSize = `${maskSize}% auto`;
//           video.style.webkitMaskSize = `${maskSize}% auto`;

//           // White circle shrinks (opposite direction)
//           const initialCircle = MIN_MASK_SIZE * 0.4;
//           const finalCircle = 0; // 50% of initial, adjust as needed

//           // whiteCircle.style.width = `${circleSize}vw`;
//           // whiteCircle.style.height = `${circleSize}vw`;

//           // Position the circle's center to match mask's top-right
//           // Mask is at "right top", so the circle center should be at right:0, top:0
//           // whiteCircle.style.top = `0px`; // center at top
//           // whiteCircle.style.right = `0px`; // center at right
//         },
//       },
//       0
//     );

//     return () => {
//       tl.scrollTrigger?.kill();
//       tl.kill();
//     };
//   }, []);

//   // Get mask sizes for initial render
//   const { min: MIN_MASK_SIZE } = getMaskSizes(windowWidth);

//   return (
//     <>
//       <svg className="hidden">
//         <path ref={pathRef} d="" />
//       </svg>

//       {/* Half-circle white overlay */}
//       <div
//         ref={whiteCircleRef}
//         className="pointer-events-none bg-white top-0 right-0 -translate-y-[60%] -translate-x-[35%] rounded-full absolute"
//         style={{
//           // Initial size, will be overridden by GSAP
//           width: `${MIN_MASK_SIZE * 0.5}vw`,
//           height: `${MIN_MASK_SIZE * 0.5}vw`,
//           zIndex: 10,
//         }}
//       />

//       <div
//         ref={parentRef}
//         id="hero"
//         className="parent h-[300vh] w-full relative"
//       >
//         <div ref={containerRef} className="w-screen h-[100vh] overflow-hidden">
//           <video
//             ref={videoRef}
//             src="/assets/video/720p60fps.mp4"
//             muted
//             playsInline
//             // autoPlay
//             loop
//             className="object-cover w-full h-full"
//             style={{
//               WebkitMaskRepeat: "no-repeat",
//               maskRepeat: "no-repeat",
//               WebkitMaskSize: `${MIN_MASK_SIZE}% auto`,
//               maskSize: `${MIN_MASK_SIZE}% auto`,
//               WebkitMaskPosition: "right top",
//               maskPosition: "right top",
//             }}
//           />
//         </div>
//         <div className="absolute top-4 towardFadeDiv left-6 md:left-8">
//           <img src="./logo.svg" className="w-[120px] "></img>
//         </div>
//         <div className="towardFadeDiv  flex flex-col fixed top-[35%] 2xl:left-[2%]  justify-start items-start pl-[30px] sm:pl-[60px] md:pl-[120px] pb-[78px]">
//           <div className="pb-5 text-[30px] sm:text-[45px] md:text-[70px] 2xl:text-[110px] font-bold leading-none tracking-normal bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             Unlock
//             <br />
//             Longevity
//           </div>
//           <div className="text-[30px] sm:text-[45px] md:text-[70px] 2xl:text-[110px] font-semibold leading-none tracking-normal bg-black bg-clip-text text-transparent">
//             Through
//             <br />
//             Science & Spirit
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeroMobile;

