import Footer from "../../components/home/Footer/Footer.jsx";
import Overlay from "../../components/home/Navbar/Overlay.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function ProtocolPage() {
  const navigate = useNavigate();

  const { protocolname } = useParams();

  const [getRoadMapdata, setgetRoadMapdata] = useState([]);
  const [getting, setgetting] = useState(false)

  useEffect(() => {
    if (!protocolname) return;

    const fetchRoadmap = async () => {
      setgetting(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_API}/get-roadmap-detail?id=${protocolname}`,
          { headers: { "ngrok-skip-browser-warning": "true" } }
        );

        if (response?.data?.success) {
          setgetRoadMapdata(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      } finally {
        setgetting(false);
      }
    };

    fetchRoadmap();
  }, [protocolname]);

  return (
    <>
      <ScrollToTop />
      <div
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 xl:left-8 cursor-pointer z-50"
      >
        <img src="/logo.svg" className="w-[200px] cursor-pointer" />
      </div>
      <Overlay isProtocolPage={true} />

      <div className="min-h-screen">
        <div className="relative w-full text-black">
          {/* Background layer (140vh) */}
          <div
            style={{
              backgroundImage: "url('/Protocols/heroBg.png')",
            }}
            className="absolute top-0 left-0 w-full h-[1080px] bg-cover bg-center z-0"
          ></div>

          <div className="text-7xl  2xl:text-8xl font-sf-ui-semibold z-10 flex flex-col items-center pt-[156px] h-full">
            {/* <h1
              style={{
                background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
              className="text-transparent"
            >
              Protocol
            </h1> */}
            <h1 className="font-sf-ui-medium z-50">{getRoadMapdata?.title}</h1>

            <p className="protocolDescription max-w-6xl mt-[120px] z-50">
              {getRoadMapdata?.short_description}
            </p>
          </div>

          {/* Cards Section */}


          <div
            className="mx-auto mt-12 w-[80%] flex flex-col items-center py-4 bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: "url('/Protocols/cardBg.png')",
              backgroundSize: "100% 100%",
            }}
          >
            {getting
              ? Array(2).fill(null).map((_, index) => (
                <div key={index} className="mb-12 flex flex-col items-center w-full animate-pulse">
                  <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-[60px] w-[230px] bg-gray-200 rounded-full"></div>
                </div>
              ))
              : getRoadMapdata?.medicine_detail?.map((medicine, index) => (
                <div key={index} className="mt-12 flex flex-col items-center">
                  {/* Description */}
                  <p className="text-2xl font-sf-ui-light mx-auto max-w-4xl text-center">
                    {medicine.description}
                  </p>

                  {/* Button with link */}
                  <div
                    className="cursor-pointer w-[230px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
                    style={{ border: "1px solid #03558C" }}
                    onClick={() => window.open(medicine.link, "_blank")}
                  >
                    <h6 className="flex-1 font-bold text-[20px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
                      Explore more
                    </h6>
                    <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]">
                      <img src="/rightaero.svg" alt="" className="h-[20px] w-[20px]" />
                    </div>
                  </div>

                  {/* Divider Line */}
                  <img
                    className="w-full h-[2px] mx-auto mt-4 mb-12"
                    src="/Protocols/line.png"
                    alt=""
                  />
                </div>
              ))}
          </div>

          {/* Footer */}
          <img
            src="/Protocols/footerImg.png"
            className="w-full h-auto mt-8 mb-8 object-cover"
            alt="footer"
          />

        </div >
      </div >
      <Footer />
    </>
  )
}



// import Footer from "../../components/home/Footer/Footer.jsx";
// import Overlay from "../../components/home/Navbar/Overlay.jsx";
// import OverlayMobile from "../../components/home/Navbar/OverlayMobile.jsx";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ScrollToTop from "../../components/ScrollToTop/ScrollToTop.jsx";

// const infoCards = [
//   {
//     image: "/Protocols/info1.svg",
//     text: "Topical cosmetic crème enhanced with Progesterone",
//     bottomClass: "bottom-24",
//   },
//   {
//     image: "/Protocols/info2.svg",
//     text: "Designed for application to the chest, abdomen, back, shoulder neck throat or face",
//     bottomClass: "bottom-18",
//   },
//   {
//     image: "/Protocols/info3.svg",
//     text: "Free of parabens, mineral oils, animal products, petroleum & never tested on animals",
//     bottomClass: "bottom-18",
//   },
//   {
//     image: "/Protocols/info4.svg",
//     text: "Bezwecken is celebrating over 28 years of providing safe, effective and natural cosmetics and dietary supplements",
//     bottomClass: "bottom-18",
//   },
// ];

// const DesktopProtocol3 = ({ number }) => {
//   return (
//     <>
//       <h1 className="text-4xl p-10">Desktop Protocol {number}</h1>
//       <Footer />
//     </>
//   );
// };

// const MobileProtocol3 = ({ number }) => {
//   return (
//     <>
//       <h1 className="text-2xl p-10">Mobile Protocol {number}</h1>
//       <Footer />
//     </>
//   );
// };

// const Protocol = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);
//   const { protocolname } = useParams();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 1280);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   switch (protocolname) {
//     case "1":
//       return isMobile ? (
//         <MobileProtocol1 />
//       ) : (
//         <DesktopProtocol1 />
//       );
//     case "2":
//       return isMobile ? (
//         <MobileProtocol2 number={2} />
//       ) : (
//         <DesktopProtocol2 number={2} />
//       );
//     case "3":
//       return isMobile ? (
//         <MobileProtocol3 number={3} />
//       ) : (
//         <DesktopProtocol3 number={3} />
//       );
//     default:
//       return (
//         <div className="p-10 text-center">
//           <h1 className="text-4xl">Protocol not found</h1>
//         </div>
//       );
//   }
// };

// export default Protocol;

// const DesktopProtocol1 = () => {
//   return (
//     <>
//       <ScrollToTop />
//       <div className="absolute top-4 towardFadeDiv left-8">
//         <img src="/logo.svg" className="w-[200px]"></img>
//       </div>
//       <Overlay isProtocolPage={true} />
//       <div>
//         <div className="relative w-full text-black">
//           {/* Background layer (140vh) */}
//           <div
//             style={{
//               backgroundImage: "url('/Protocols/heroBg.png')",
//             }}
//             className="absolute top-0 left-0 w-full  h-[140vh] bg-cover bg-center z-0"
//           ></div>

//           {/* Foreground content */}
//           <div className="text-7xl  2xl:text-8xl font-sf-ui-semibold z-10 flex flex-col items-center pt-[156px] h-full">
//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent"
//             >
//               Protocol
//             </h1>
//             <h1 className="font-sf-ui-medium">Female PMS</h1>
//             <h1 className="font-sf-ui-medium">Support</h1>

//             <p className="protocolDescription max-w-6xl mt-16">
//               Progonol - 2oz Crème - Professionally Formulated Pre-Menopause &
//               PMS Symptom Support - Safe, Natural, Paraben Free - 30 Day Supply,
//               Progonol is commonly used to support Pre-Menopause & PMS Symptoms
//             </p>
//             <div className="w-full flex justify-center flex-wrap infoCardDiv px-24 gap-12 mt-20 max-w-[1411px]">
//               {infoCards.map((card, index) => (
//                 <div
//                   key={index}
//                   onMouseMove={(e) => {
//                     const cardEl = e.currentTarget;
//                     const rect = cardEl.getBoundingClientRect();
//                     const x = e.clientX - rect.left;
//                     const y = e.clientY - rect.top;
//                     const centerX = rect.width / 2;
//                     const centerY = rect.height / 2;
//                     const rotateX = ((y - centerY) / centerY) * 10;
//                     const rotateY = ((x - centerX) / centerX) * 10;

//                     cardEl.style.transform = `
//                       perspective(1000px)
//                       rotateX(${-rotateX}deg)
//                       rotateY(${rotateY}deg)
//                       scale3d(1.02, 1.02, 1.02)
//                     `;
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.transform = `
//                       perspective(1000px)
//                       rotateX(0deg)
//                       rotateY(0deg)
//                       scale3d(1,1,1)
//                     `;
//                     e.currentTarget.style.transition = "transform 0.2s ease";
//                     setTimeout(() => {
//                       e.currentTarget.style.transition = "";
//                     }, 200);
//                   }}
//                   className="w-[45%] h-[300px] backdrop-blur-md border border-white/20 bg-[url('/Protocols/infoCard.png')] bg-contain bg-no-repeat relative"
//                 >
//                   <img
//                     src={card.image}
//                     className="w-[80px] top-10 left-8 absolute"
//                     alt={`info-${index}`}
//                   />
//                   <p
//                     className={`font-sf-ui-light infoCardText left-10 absolute ${card.bottomClass}`}
//                   >
//                     {card.text}
//                   </p>

//                   {/* left bar */}
//                   <div
//                     className="h-[70px] w-[6px] absolute !z-30"
//                     style={{
//                       background:
//                         "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                       clipPath:
//                         "polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
//                       left: -8,
//                       top: 20,
//                     }}
//                   ></div>

//                   {/* right bar */}
//                   <div
//                     className="h-[70px] w-[6px] absolute"
//                     style={{
//                       background:
//                         "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                       clipPath:
//                         "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
//                       right: -8,
//                       bottom: 60,
//                     }}
//                   ></div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Info Cards*/}
//         </div>

//         <div className="flex flex-col items-center mt-5 justify-center">
//           <div
//             className="cursor-pointer w-[230px] h-[60px] mb-5 rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[20px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//           <p className="linkBriefText font-sf-ui-medium">
//             Melatonin - 240 Tablets - Professionally Formulated - Potent, Safe,
//             Vegetarian
//           </p>
//           <img
//             className="w-full h-[2px] mx-auto mt-24"
//             src="/Protocols/line.png"
//           ></img>
//         </div>

//         <div className="flex flex-col items-center justify-center mt-24">
//           <h1
//             style={{
//               background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               color: "transparent",
//               WebkitTextFillColor: "transparent",
//             }}
//             className="text-transparent text-6xl font-sf-ui-semibold"
//           >
//             Other Female Issues
//           </h1>

//           <p
//             style={{
//               fontSize: "28px",
//               lineHeight: "38px",
//               letterSpacing: "-2%",
//               textAlign: "center",
//             }}
//             className="mx-auto max-w-4xl mt-8"
//           >
//             AVI Crème - 2oz Crème - Professionally Formulated Vaginal Yeast
//             Infection Support - Safe, Natural, Paraben Free -{" "}
//             <span className="text-[#04082c]">30 Day Supply</span>
//           </p>

//           <div
//             className="cursor-pointer w-[230px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[20px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           className="mx-auto mt-12 w-[80%] flex flex-col  items-center py-4 min-h-[100vh] bg-center bg-contain bg-no-repeat"
//           style={{
//             backgroundImage: "url('/Protocols/cardBg.png')",
//             backgroundSize: "100% 100%",
//           }}
//         >
//           <h1
//             style={{
//               fontSize: "34px",
//               lineHeight: "58px",
//               letterSpacing: "-2%",
//               textAlign: "center",
//             }}
//             className="font-sf-ui-medium mt-12 mb-4"
//           >
//             GinYam - 240 Pellets by Bezwecken
//           </h1>

//           <p className=" text-2xl font-sf-ui-light mx-auto max-w-4xl text-center">
//             Professionally Formulated Menopausal Symptom Support for Reduced
//             Night Sweats, Boosted Energy & Increased Stamina
//           </p>
//           <div
//             className="cursor-pointer w-[230px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[20px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//           <img
//             className="w-full h-[2px] mx-auto mt-4"
//             src="/Protocols/line.png"
//           ></img>
//           <p className=" text-2xl font-sf-ui-light mx-auto max-w-4xl mt-8 text-center">
//             Bezwecken - Melatonin - 240 Tablets - Professionally Formulated -
//             Potent, Safe, Vegetarian
//           </p>
//           <div
//             className="cursor-pointer w-[230px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[20px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//           <img
//             className="w-full h-[2px] mx-auto mt-4"
//             src="/Protocols/line.png"
//           ></img>
//           <p className=" text-2xl font-sf-ui-light mx-auto max-w-4xl mt-8 text-center">
//             HemStad - 2oz Crème - Professionally Formulated Hemorrhoid Relief -
//             Safe, Natural, Paraben Free - 30 Day Supply
//           </p>
//           <div
//             className="cursor-pointer w-[230px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[20px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//           <img
//             className="w-full h-[2px] mx-auto mt-4"
//             src="/Protocols/line.png"
//           ></img>
//           <p className=" text-2xl font-sf-ui-light mx-auto max-w-4xl mt-8 text-center">
//             LinoPanate - 2oz Healing Ointment - Professionally Formulated to
//             Soothe Dry, Cracked & Cut Skin - Enhanced with Lanolin, Vitamin E &
//             D - 30 Day Supply Baby / Child Top OfThe Line Linopanate Sticky
//             Healing Ointment For Dry And Cracked Nipples
//           </p>
//           <div
//             className="cursor-pointer w-[230px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[20px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//         </div>

//         <img
//           src="/Protocols/footerImg.png"
//           className="h-[70vh] w-full my-32 mb-16"
//           alt="footer"
//         />

//         {/* <div className="flex flex-col items-center justify-center mt-24">
//           <p
//             style={{
//               fontSize: "43px",
//               fontWeight: '500',
//               lineHeight: "38px",
//               letterSpacing: "-2%",
//               textAlign: "center",
//             }}
//             className="mx-auto max-w-4xl mt-8"
//           >
//             Email reimagined. Available today.
//           </p>

//           <div
//             className="cursor-pointer mt-5 w-[200px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5"
//             style={{ boxShadow: "5.92px 5.92px 11.85px 0px #00000014" }}
//           >
//             <h6 className="flex-1 font-bold text-[18px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Contact Us
//             </h6>
//             <div
//               className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#F9F9F9]"
//               style={{
//                 boxShadow:
//                   "5.92px 5.92px 11.85px 0px #00000014 inset,-5.92px -5.92px 11.85px 0px #FFFFFF inset",
//               }}
//             >
//               <img
//                 src="/view_more.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//         </div> */}

//       </div>
//       <Footer />
//     </>
//   );
// };

// const MobileProtocol1 = () => {
//   return (
//     <>
//       <ScrollToTop />
//       <div className="absolute top-4 towardFadeDiv left-2 xl:left-8">
//         <img src="/logo.svg" className="lg:w-[200px]"></img>
//       </div>

//       <OverlayMobile isBioPage={true} />

//       <div className="w-full text-black overflow-x-hidden">
//         {/* Hero Section */}
//         <div className="relative w-full">
//           <div
//             className="absolute top-0 left-0 w-full  bg-cover bg-center z-0"
//             style={{ backgroundImage: "url('/Protocols/heroBg.png')" }}
//           ></div>

//           <div className="z-10 flex flex-col items-center justify-start h-full text-center px-4">
//             <h1 className="text-4xl mt-20 sm:mt-0 sm:text-5xl md:text-6xl 2xl:text-8xl font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Protocol
//             </h1>
//             <h1 className="font-sf-ui-medium text-xl sm:text-2xl md:text-3xl mt-2 text-[30px] font-semibold">
//               Female PMS <br className="hidden xl:block"></br> Support
//             </h1>

//             <p className="max-w-4xl sm:max-w-5xl md:max-w-6xl mt-8 text-sm sm:text-base md:text-lg px-2 font-medium">
//               Progonol - 2oz Crème - Professionally Formulated Pre-Menopause &
//               PMS Symptom Support - Safe, Natural, Paraben Free - 30 Day Supply,
//               Progonol is commonly used to support Pre-Menopause & PMS Symptoms
//             </p>

//             <div className="w-full flex flex-wrap justify-center gap-6 sm:gap-10 px-4 sm:px-10 mt-12">
//               {infoCards.map((card, index) => (
//                 <div
//                   key={index}
//                   className="w-full max-w-[311px]  h-[150px] relative bg-[url('/Protocols/infoCard.png')] bg-contain bg-center bg-no-repeat backdrop-blur-md border border-white/20"
//                 >
//                   <img
//                     src={card.image}
//                     className="w-[30px]  top-8 left-8 absolute"
//                     alt={`info-${index}`}
//                   />
//                   <p
//                     className={`absolute left-8 right-8 text-left top-18 text-sm  font-sf-ui-light ${card.bottomClass}`}
//                   >
//                     {card.text}
//                   </p>
//                   <div
//                     className="h-[40px] w-[6px] absolute z-30 left-[10px] top-5"
//                     style={{
//                       background:
//                         "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                       clipPath:
//                         "polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
//                     }}
//                   ></div>
//                   <div
//                     className="h-[40px] w-[6px] absolute right-[10px] bottom-[20px]"
//                     style={{
//                       background:
//                         "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                       clipPath:
//                         "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
//                     }}
//                   ></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Link Section */}
//         <div className="flex flex-col items-center text-center mt-5 px-4">
//           <div
//             className="cursor-pointer mb-5 w-[186px] h-[35px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[14px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[11px] w-[11px]"
//               />
//             </div>
//           </div>
//           <p className="font-sf-ui-medium text-sm sm:text-base max-w-md">
//             Melatonin - 240 Tablets - Professionally Formulated - Potent, Safe,
//             Vegetarian
//           </p>
//           <img src="/Protocols/line.png" className="w-full h-[2px] mt-12" />
//         </div>

//         {/* Other Issues Section */}
//         <div className="flex flex-col items-center text-center mt-12 px-4">
//           <h1 className="text-3xl sm:text-5xl font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             Other Female Issues
//           </h1>
//           <p className="mt-6 max-w-2xl text-base sm:text-lg">
//             AVI Crème - 2oz Crème - Professionally Formulated Vaginal Yeast
//             Infection Support - Safe, Natural, Paraben Free -
//             <span className="text-[#2C5789] font-bold"> 30 Day Supply</span>
//           </p>
//           <div
//             className="cursor-pointer mb-5 w-[186px] h-[35px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5 mt-5"
//             style={{ border: '1px solid #03558C' }}
//           >
//             <h6 className="flex-1 font-bold text-[14px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Explore more
//             </h6>
//             <div
//               className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//             >
//               <img
//                 src="/rightaero.svg"
//                 alt=""
//                 className="h-[11px] w-[11px]"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Product Cards Section */}
//         <div
//           className="mx-auto mt-5 max-w-7xl flex flex-col items-center py-8 bg-no-repeat bg-cover bg-center"
//           style={{ backgroundImage: "url('/Protocols/cardBg.png')" }}
//         >
//           {[
//             {
//               title: "GinYam - 240 Pellets by Bezwecken",
//               desc: "Professionally Formulated Menopausal Symptom Support for Reduced Night Sweats, Boosted Energy & Increased Stamina",
//               url: "https://amzn.to/4n2DKV3",
//             },
//             {
//               title: "",
//               desc: "Bezwecken - Melatonin - 240 Tablets - Professionally Formulated - Potent, Safe, Vegetarian",
//               url: "https://amzn.to/4naZGxe",
//             },
//             {
//               title: "",
//               desc: "HemStad - 2oz Crème - Professionally Formulated Hemorrhoid Relief - Safe, Natural, Paraben Free - 30 Day Supply",
//               url: "https://amzn.to/442c5e6",
//             },
//             {
//               title: "",
//               desc: "LinoPanate - 2oz Healing Ointment - Professionally Formulated to Soothe Dry, Cracked & Cut Skin - Enhanced with Lanolin, Vitamin E & D - 30 Day Supply Baby / Child Top OfThe Line Linopanate Sticky Healing Ointment For Dry And Cracked Nipples",
//               url: "https://amzn.to/4kFRcwk",
//             },
//           ].map((item, idx) => (
//             <div key={idx} className="text-center max-w-4xl mx-auto my-6 px-4">
//               {item.title && (
//                 <h2 className="text-xl sm:text-2xl font-sf-ui-medium mb-2">
//                   {item.title}
//                 </h2>
//               )}
//               <p className="text-base sm:text-lg font-sf-ui-light">
//                 {item.desc}
//               </p>

//               <div
//                 className="cursor-pointer mb-5 w-[186px] h-[35px] rounded-[40px] justify-self-center flex items-center justify-center gap-4 py-[19px] pl-5 mt-5"
//                 style={{ border: '1px solid #03558C' }}
//               >
//                 <h6 className="flex-1 font-bold text-[14px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//                   Explore more
//                 </h6>
//                 <div
//                   className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-gradient-to-b from-[#003670] to-[#0DB5E4]"
//                 >
//                   <img
//                     src="/rightaero.svg"
//                     alt=""
//                     className="h-[11px] w-[11px]"
//                   />
//                 </div>
//               </div>
//               <img src="/Protocols/line.png" className="w-full h-[2px] mt-4" />
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <img
//           src="/Protocols/footerImg.png"
//           className="w-full h-auto mt-8 mb-8 object-cover"
//           alt="footer"
//         />

//         {/* <div className="flex flex-col items-center justify-center">
//           <p
//             style={{
//               fontSize: "18px",
//               fontWeight: '500',
//               lineHeight: "38px",
//               letterSpacing: "-2%",
//               textAlign: "center",
//             }}
//             className="mx-auto max-w-4xl"
//           >
//             Email reimagined. Available today.
//           </p>

//           <div
//             className="cursor-pointer mt-5 w-[180px] h-[40px] rounded-[40px] mb-5 flex items-center justify-start gap-4 py-[19px] pl-5"
//             style={{ boxShadow: "5.92px 5.92px 11.85px 0px #00000014" }}
//           >
//             <h6 className="flex-1 font-bold text-[14px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Contact Us
//             </h6>
//             <div
//               className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#F9F9F9]"
//               style={{
//                 boxShadow:
//                   "5.92px 5.92px 11.85px 0px #00000014 inset,-5.92px -5.92px 11.85px 0px #FFFFFF inset",
//               }}
//             >
//               <img
//                 src="/view_more.svg"
//                 alt=""
//                 className="h-[20px] w-[20px]"
//               />
//             </div>
//           </div>
//         </div> */}

//       </div>

//       <Footer />
//     </>
//   );
// };

// const DesktopProtocol2 = () => {
//   return (
//     <>
//       <ScrollToTop />
//       <div className="absolute top-4 towardFadeDiv left-8">
//         <img src="/logo.svg" className="w-[200px]"></img>
//       </div>
//       <Overlay isProtocolPage={true} />
//       <div>
//         <div className="relative w-full text-black">
//           {/* Background layer (140vh) */}
//           <div
//             style={{
//               backgroundImage: "url('/Protocols/heroBg.png')",
//             }}
//             className="absolute top-0 left-0 w-full  h-[140vh] bg-cover bg-center z-0"
//           ></div>

//           {/* Foreground content */}
//           <div className="text-7xl  2xl:text-8xl font-sf-ui-semibold z-10 flex flex-col items-center pt-[156px] h-full">
//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent font-bold"
//             >
//               Female
//             </h1>
//             <h1 className="font-sf-ui-semibold">Hormone Protocols</h1>

//             <p className="protocolDescription max-w-[1200px] mt-16">
//               The female hormone protocols listed are not to be considered medical advice. If
//               you have any  medical condition, please consult your physician. We are not
//               licensed doctors and are unable to  make medical recommendations. These
//               protocols are what is working for us based off the latest  science and research
//             </p>

//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent font-bold text-[160px] mt-[120px]"
//             >
//               DIM
//             </h1>
//             <img
//               className="w-full h-[2px] mx-auto mt-5"
//               src="/Protocols/line.png"
//             ></img>
//             <p className="protocolDescription max-w-[1200px] mt-16">
//               Most likely, you’ve probably come across the supplement DIM (Diindolylmethane).
//               Whether you’re on hormone replacement therapy (HRT) or simply looking to
//               balance your estrogen levels naturally, supplementing with DIM can make a drastic
//               impact. Your hormone metabolism and overall wellbeing will greatly benefit.
//             </p>
//             <p className="protocolDescription max-w-[1200px] mt-16">
//               DIM is a natural compound found in cruciferous vegetables like broccoli,
//               brusselssprouts and kale. Of course, all food sources are good, but it’s difficult to
//               get enough DIM from food alone to impact estrogen metabolism significantly.
//               That’s where supplementation assists us.
//             </p>

//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent font-bold text-[43px] mt-[120px]"
//             >
//               How DIM Works to Support Estrogen Metabolism
//             </h1>
//             <img
//               className="w-full h-[2px] mx-auto mt-5"
//               src="/Protocols/line.png"
//             ></img>

//             <p className="protocolDescription max-w-[1200px] mt-16">
//               Women need the right balance of Estrogen to Progesterone. Estrogen is very,
//               very good and should  not be demonized. However, too much estrogen—especially the
//               “bad” kind—can lead to weight gain, mood swings, and even increase the risk of
//               certain cancers. Too little, on the other hand, can cause fatigue, brain fog, and
//               other unpleasant symptoms.
//             </p>
//             <p className="protocolDescription max-w-[1200px] mt-16">
//               Enter “DIM”. DIM works by assisting the liver to metabolize estrogen.Specifically,
//               it helps the body convert estrogen into its beneficial forms, reducing the impact of
//               harmful estrogen metabolites. With properly balanced estrogen, many of the
//               benefits you are seeking arise:improved energy, mood stability, and weight
//               management.
//             </p>

//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent font-bold text-[43px] mt-[120px]"
//             >
//               HRT USERS: Good News
//             </h1>
//             <img
//               className="w-full h-[2px] mx-auto mt-5"
//               src="/Protocols/line.png"
//             ></img>

//             <p className="protocolDescription max-w-[1200px] mt-16">
//               HRT can be life-changing, but sometimes imbalance ensues. The metabolism of
//               estrogen is thrown  off and mood swings, tender breasts, weight gain appears.
//               Supplementing with DIM helps the body  metabolize estrogen more efficiently,
//               reducing these symptoms and allowing you to reap the full  benefits of HRT without
//               the drawbacks.
//             </p>
//           </div>

//           <div
//             className="mx-auto mt-12 w-[80%] flex flex-col  items-center py-4 min-h-[100vh] bg-center bg-contain bg-no-repeat"
//             style={{
//               backgroundImage: "url('/Protocols/cardBg.png')",
//               backgroundSize: "100% 100%",
//             }}
//           >
//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent font-bold text-[43px] mt-10"
//             >
//               Here’s why DIM is a must-have for HRT users:
//             </h1>
//             <img
//               className="w-full h-[2px] mx-auto mt-5"
//               src="/Protocols/line.png"
//             ></img>

//             <div className="max-w-[996px] mt-16 flex flex-col gap-[40px] mb-[80px]">
//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Contributes to Healthy Estrogen Metabolism </span> – <span className="text-[28px]"> It helps convert estrogen into
//                     beneficial forms, reducing harmful metabolites that contribute to imbalance</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Diminishes Estrogen Dominance Symptoms </span> – <span className="text-[28px]">  If you’ve been struggling with mood
//                     swings, weight gain, or water retention, DIM can help balance things out.</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Assists with Liver Detoxification </span> – <span className="text-[28px]">   Since the liver plays a significant role in hormone
//                     metabolism, DIM helps enhance its function and eliminate excess estrogen</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Balances Testosterone and Estrogen Levels </span> – <span className="text-[28px]">  DIM doesn’t just support estrogen
//                     metabolism; it also prevents testosterone from converting into excess estrogen, which
//                     is particularly beneficial for both men and women.</span>
//               </p>

//               <span className="text-[28px] font-medium">
//                 Make the best out of your hormone therapy and experience fewer side effects while
//                 maintaining a healthier balance overall by incorporating DIM
//               </span>
//             </div>
//           </div>

//           <div className="z-10 flex flex-col items-center h-full">
//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent font-bold text-[43px] mt-[120px]"
//             >
//               Additional Benefits of DIM
//             </h1>
//             <img
//               className="w-full h-[2px] mx-auto mt-5"
//               src="/Protocols/line.png"
//             ></img>

//             <p className="protocolDescription max-w-[1200px] mt-16">
//               While DIM is primarily known for its impact on estrogen metabolism, its benefits
//               extend beyond hormone balance. Here are some additional ways DIM can support
//               your overall well-being:
//             </p>
//           </div>

//           <div
//             className="mx-auto mt-12 w-[80%] flex flex-col  items-center py-4 min-h-[100vh] bg-center bg-contain bg-no-repeat"
//             style={{
//               backgroundImage: "url('/Protocols/cardBg.png')",
//               backgroundSize: "100% 100%",
//             }}
//           >
//             <div className="max-w-[996px] mt-16 flex flex-col gap-[40px] mb-[80px]">
//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Supports Weight Management:</span> – <span className="text-[28px]"> Estrogen dominance can contribute to weight
//                     gain,  particularly around the hips and abdomen. Because DIM helps regulate estrogen
//                     levels, it  can also support weight loss efforts by promoting a healthier hormone
//                     balance.</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Improves Skin Health </span> – <span className="text-[28px]">  Hormonal acne is a common issue for those experiencing
//                     estrogen  fluctuations. DIM helps reduce breakouts by balancing hormone levels and
//                     lowering  inflammation in the skin.</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Enhances Mood and Mental Clarity</span> – <span className="text-[28px]">   If you’ve ever felt mentally foggy or moody
//                     due to  hormone imbalances, DIM may help. By promoting optimal estrogen
//                     metabolism, it can lead  to more stable moods and improved focus.</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Supports Immune Function </span> – <span className="text-[28px]">   DIM has been shown to support a healthy immune
//                     system,  thanks to its anti-inflammatory and detoxification properties..</span>
//               </p>
//             </div>
//           </div>


//           <div className="z-10 flex flex-col items-center h-full">
//             <h1
//               style={{
//                 background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                 backgroundClip: "text",
//                 WebkitBackgroundClip: "text",
//                 color: "transparent",
//                 WebkitTextFillColor: "transparent",
//               }}
//               className="text-transparent font-bold text-[43px] mt-[120px]"
//             >
//               How to Take DIM for the Best Results
//             </h1>
//             <img
//               className="w-full h-[2px] mx-auto mt-5"
//               src="/Protocols/line.png"
//             ></img>

//             <p className="protocolDescription max-w-[1200px] mt-16">
//               If you’re ready to "DIM" your health and add this supplement to your
//               routine, here are some tips to ensure you get the best results:
//             </p>
//           </div>

//           <div
//             className="mx-auto mt-12 w-[80%] flex flex-col  items-center py-4 h-full max-h-[100vh] bg-center bg-contain bg-no-repeat"
//             style={{
//               backgroundImage: "url('/Protocols/cardBg.png')",
//               backgroundSize: "100% 100%",
//             }}
//           >
//             <div className="max-w-[996px] mt-16 flex flex-col gap-[40px] mb-[80px]">
//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Dosage</span> – <span className="text-[28px]"> A typical dose ranges from 100-300 mg per day, depending on your needs.
//                     It’s  always best to consult with a healthcare provider to determine the right amount for
//                     you.</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Timing </span> – <span className="text-[28px]">  DIM is best taken with food to improve absorption.</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Pair with a Healthy Diet </span> – <span className="text-[28px]"> While supplementing with DIM is effective, consuming
//                     cruciferous vegetables can enhance its benefits.</span>
//               </p>

//               <p>
//                 <span style={{
//                   background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   color: "transparent",
//                   WebkitTextFillColor: "transparent",
//                 }}
//                   className="text-[28px] font-bold"> Monitor Your Symptoms </span> – <span className="text-[28px]">As with any supplement, it’s important to pay attention to
//                     how your body responds and make adjustments as needed.</span>
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// const MobileProtocol2 = ({ number }) => {
//   return (
//     <>
//       <ScrollToTop />

//       <div className="absolute top-4 towardFadeDiv left-2 xl:left-8">
//         <img src="/logo.svg" className="lg:w-[200px]"></img>
//       </div>

//       <OverlayMobile isBioPage={true} />

//       <div className="relative w-full text-black overflow-x-hidden">
//         {/* Hero Section */}
//         <div className="relative   xl:min-h-[200vh] w-full">
//           <div
//             className="absolute top-0 left-0 w-full  bg-cover bg-center z-0"
//             style={{ backgroundImage: "url('/Protocols/heroBg.png')" }}
//           ></div>

//           <div className="relative z-10 flex flex-col items-center justify-start pt-[8%] sm:pt-[10%] lg:pt-[12%] h-full text-center px-4">
//             <h1 className="text-4xl mt-18 sm:mt-0 sm:text-5xl md:text-6xl 2xl:text-8xl font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//               Female
//             </h1>
//             <h1 className="font-sf-ui-medium text-3xl mt-2">
//               Hormone Protocols
//             </h1>

//             <p className="max-w-4xl sm:max-w-5xl md:max-w-6xl mt-8 text-sm sm:text-base font-medium md:text-lg px-2">
//               The female hormone protocols listed are not to be considered
//               medical advice. If you have any medical condition, please consult
//               your physician. We are not licensed doctors and are unable to make
//               medical recommendations. These protocols are what is working for
//               us based off the latest science and research
//             </p>
//           </div>
//         </div>

//         <div className="flex flex-col items-center text-center mt-12 px-4">
//           <h1 className="text-6xl  font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             DIM
//           </h1>
//           <img src="/Protocols/line.png" className="w-full h-[2px] mt-8" />
//         </div>
//         <p className="max-w-4xl text-center sm:max-w-5xl md:max-w-6xl mt-8  text-sm sm:text-base font-medium md:text-lg px-4">
//           Most likely, you’ve probably come across the supplement DIM
//           (Diindolylmethane). Whether you’re on hormone replacement therapy
//           (HRT) or simply looking to balance your estrogen levels naturally,
//           supplementing with DIM can make a drastic impact. Your hormone
//           metabolism and overall wellbeing will greatly benefit.
//         </p>
//         <p className="max-w-4xl text-center sm:max-w-5xl md:max-w-6xl mt-8  text-sm sm:text-base font-medium md:text-lg px-4">
//           DIM is a natural compound found in cruciferous vegetables like
//           broccoli, brusselssprouts and kale. Of course, all food sources are
//           good, but it’s difficult to get enough DIM from food alone to impact
//           estrogen metabolism significantly. That’s where supplementation
//           assists us.
//         </p>

//         <div className="flex flex-col items-center text-center mt-12 px-4">
//           <h1 className="text-2xl  font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             How DIM Works to Support Estrogen Metabolism
//           </h1>
//           <img src="/Protocols/line.png" className="w-full h-[2px] mt-8" />
//         </div>

//         <p className="max-w-4xl text-center sm:max-w-5xl md:max-w-6xl mt-8  text-sm sm:text-base font-medium md:text-lg px-4">
//           Women need the right balance of Estrogen to Progesterone. Estrogen is
//           very, very good and should  not be demonized. However, too much
//           estrogen—especially the “bad” kind—can lead to weight gain, mood
//           swings, and even increase the risk of certain cancers. Too little, on
//           the other hand, can cause fatigue, brain fog, and other unpleasant
//           symptoms.
//         </p>
//         <p className="max-w-4xl text-center sm:max-w-5xl md:max-w-6xl mt-8  text-sm sm:text-base font-medium md:text-lg px-4">
//           Enter “DIM”. DIM works by assisting the liver to metabolize
//           estrogen.Specifically, it helps the body convert estrogen into its
//           beneficial forms, reducing the impact of harmful estrogen metabolites.
//           With properly balanced estrogen, many of the benefits you are seeking
//           arise:improved energy, mood stability, and weight management.
//         </p>
//         <div className="flex flex-col items-center text-center mt-12 px-4">
//           <h1 className="text-3xl  font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             HRT USERS: Good News
//           </h1>
//           <img src="/Protocols/line.png" className="w-full h-[2px] mt-8" />
//         </div>

//         <p className="max-w-4xl text-center sm:max-w-5xl md:max-w-6xl mt-8  text-sm sm:text-base font-medium md:text-lg px-4">
//           HRT can be life-changing, but sometimes imbalance ensues. The
//           metabolism of estrogen is thrown off and mood swings, tender breasts,
//           weight gain appears. Supplementing with DIM helps the body metabolize
//           estrogen more efficiently, reducing these symptoms and allowing you to
//           reap the full benefits of HRT without the drawbacks.
//         </p>

//         {/* Product Cards Section */}
//         <div
//           className="mx-auto mt-12 w-[90%] max-w-7xl flex flex-col items-center pt-8 bg-no-repeat bg-cover bg-center"
//           style={{ backgroundImage: "url('/Protocols/cardBg.png')" }}
//         >
//           <h1 className="text-xl px-5 text-center  font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             Here’s why DIM is a must-have for HRT users:
//           </h1>

//           <img src="/Protocols/line.png" className="w-full h-[2px] mt-4" />
//           {/* {[
//             {
//               title: "GinYam - 240 Pellets by Bezwecken",
//               desc: "Professionally Formulated Menopausal Symptom Support for Reduced Night Sweats, Boosted Energy & Increased Stamina",
//               url: "https://amzn.to/4n2DKV3",
//             },
//             {
//               title: "",
//               desc: "Bezwecken - Melatonin - 240 Tablets - Professionally Formulated - Potent, Safe, Vegetarian",
//               url: "https://amzn.to/4naZGxe",
//             },
//             {
//               title: "",
//               desc: "HemStad - 2oz Crème - Professionally Formulated Hemorrhoid Relief - Safe, Natural, Paraben Free - 30 Day Supply",
//               url: "https://amzn.to/442c5e6",
//             },
//             {
//               title: "",
//               desc: "LinoPanate - 2oz Healing Ointment - Professionally Formulated to Soothe Dry, Cracked & Cut Skin - Enhanced with Lanolin, Vitamin E & D - 30 Day Supply Baby / Child Top OfThe Line Linopanate Sticky Healing Ointment For Dry And Cracked Nipples",
//               url: "https://amzn.to/4kFRcwk",
//             },
//           ].map((item, idx) => (
//             <div key={idx} className="text-center max-w-4xl mx-auto my-6 px-4">
//               {item.title && (
//                 <h2 className="text-xl sm:text-2xl font-sf-ui-medium mb-2">
//                   {item.title}
//                 </h2>
//               )}
//               <p className="text-base sm:text-lg font-sf-ui-light">
//                 {item.desc}
//               </p>
//               <a
//                 href={item.url}
//                 className="block mt-4 text-lg sm:text-xl font-sf-ui-medium bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent xl:border-b-2 border-[#0DB5E4]"
//               >
//                 {item.url}
//               </a>
//               <img src="/Protocols/line.png" className="w-full h-[2px] mt-4" />
//             </div>
//           ))} */}
//           <div className="px-4 py-6 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Contributes to Healthy Estrogen Metabolism –{" "}
//             </span>{" "}
//             <span className="mt-1">
//               It helps convert estrogen into beneficial forms, reducing harmful
//               metabolites that contribute to imbalance
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Diminishes Estrogen Dominance Symptoms –
//             </span>{" "}
//             <span className="mt-1">
//               If you’ve been struggling with mood swings, weight gain, or water
//               retention, DIM can help balance things out.
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Assists with Liver Detoxification –
//             </span>{" "}
//             <span className="mt-1">
//               Since the liver plays a significant role in hormone metabolism,
//               DIM helps enhance its function and eliminate excess estrogen
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Balances Testosterone and Estrogen Levels –
//             </span>{" "}
//             <span className="mt-1">
//               DIM doesn’t just support estrogen metabolism; it also prevents
//               testosterone from converting into excess estrogen, which is
//               particularly beneficial for both men and women.
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm w-full text-left">
//             <span className="mt-1 font-medium">
//               Make the best out of your hormone therapy and experience fewer
//               side effects while maintaining a healthier balance overall by
//               incorporating DIM
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col items-center text-center mt-12 px-4">
//           <h1 className="text-2xl  font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             Additional Benefits of DIM
//           </h1>
//           <img src="/Protocols/line.png" className="w-full h-[2px] mt-4" />
//         </div>

//         <p className="max-w-4xl text-center sm:max-w-5xl md:max-w-6xl mt-5  text-sm sm:text-base font-medium md:text-lg px-4">
//           While DIM is primarily known for its impact on estrogen metabolism,
//           its benefits extend beyond hormone balance. Here are some additional
//           ways DIM can support your overall well-being:
//         </p>

//         {/* Product Cards Section */}
//         <div
//           className="mx-auto mt-12 w-[90%] max-w-7xl flex flex-col items-center pt-0 bg-no-repeat bg-cover bg-center"
//           style={{ backgroundImage: "url('/Protocols/cardBg.png')" }}
//         >
//           <div className="px-4 py-6 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Supports Weight Management: –
//             </span>{" "}
//             <span className="mt-1">
//               Estrogen dominance can contribute to weight gain, particularly
//               around the hips and abdomen. Because DIM helps regulate estrogen
//               levels, it can also support weight loss efforts by promoting a
//               healthier hormone balance.
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Improves Skin Health –
//             </span>{" "}
//             <span className="mt-1">
//               Hormonal acne is a common issue for those experiencing estrogen
//               fluctuations. DIM helps reduce breakouts by balancing hormone
//               levels and lowering inflammation in the skin
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Enhances Mood and Mental Clarity: –
//             </span>{" "}
//             <span className="mt-1">
//               If you’ve ever felt mentally foggy or moody due to hormone
//               imbalances, DIM may help. By promoting optimal estrogen
//               metabolism, it can lead to more stable moods and improved focus.
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Supports Immune Function: –
//             </span>{" "}
//             <span className="mt-1">
//               DIM has been shown to support a healthy immune system, thanks to
//               its anti-inflammatory and detoxification properties.
//             </span>
//           </div>
//         </div>
//         <div className="flex flex-col items-center text-center mt-12 px-4">
//           <h1 className="text-2xl  font-sf-ui-semibold bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
//             How to Take DIM for the Best Results
//           </h1>
//           <img src="/Protocols/line.png" className="w-full h-[2px] mt-4" />
//         </div>

//         <p className="max-w-4xl text-center sm:max-w-5xl md:max-w-6xl mt-5  text-sm sm:text-base font-medium md:text-lg px-4">
//           If you’re ready to "DIM" your health and add this supplement to your
//           routine, here are some tips to ensure you get the best results:
//         </p>

//         {/* Product Cards Section */}
//         <div
//           className="mx-auto mt-12 w-[90%] max-w-7xl flex flex-col items-center pt-0 bg-no-repeat bg-cover bg-center"
//           style={{ backgroundImage: "url('/Protocols/cardBg.png')" }}
//         >
//           <div className="px-4 py-6 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Dosage -
//             </span>{" "}
//             <span className="mt-1">
//               A typical dose ranges from 100-300 mg per day, depending on your
//               needs. It’s always best to consult with a healthcare provider to
//               determine the right amount for you.
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6 text-left w-full">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Timing –
//             </span>{" "}
//             <span className="mt-1">
//               DIM is best taken with food to improve absorption.
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6 text-left w-full">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Pair with a Healthy Diet –
//             </span>{" "}
//             <span className="mt-1">
//               While supplementing with DIM is effective, consuming cruciferous
//               vegetables can enhance its benefits.
//             </span>
//           </div>
//           <div className="px-4 py-6 pt-0 text-sm leading-6">
//             <span
//               className="font-medium"
//               style={{ color: "rgba(0, 54, 112, 1)" }}
//             >
//               Monitor Your Symptoms: –
//             </span>{" "}
//             <span className="mt-1">
//               As with any supplement, it’s important to pay attention to how
//               your body responds and make adjustments as needed.{" "}
//             </span>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// };


