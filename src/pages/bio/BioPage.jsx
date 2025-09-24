import React from "react";
import Overlay from "../../components/home/Navbar/Overlay";
import Footer from "../../components/home/Footer/Footer";
import OverlayMobile from "../../components/home/Navbar/OverlayMobile";
import { useEffect, useState } from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Bio = () => {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [bioData, setbioData] = useState([]);
  const [getting, setgetting] = useState(false)

  useEffect(() => {
    const fetchRoadmap = async () => {
      setgetting(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_API}/get-bio`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (response?.data) {
          setbioData(response.data?.data?.sort((a, b) => a.id - b.id));
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      } finally {
        setgetting(false);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <>
      <ScrollToTop />
      <div onClick={() => navigate("/")} className="absolute top-4 towardFadeDiv left-4 xl:left-8 cursor-pointer">
        <img src="/logo.svg" className="w-[200px]"></img>
      </div>
      {isMobile ? (
        <OverlayMobile isBioPage={true} />
      ) : (
        <Overlay isProtocolPage={true} />
      )}

      {/* Hero Section */}
      <div className="relative pb-12 w-full text-black">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/Protocols/heroBg.png')" }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
          <h1
            className="text-5xl mt-24 sm:text-6xl xl:text-8xl font-sf-ui-semibold text-transparent"
            style={{
              background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our
          </h1>
          <h1 className="text-2xl sm:text-3xl font-sf-ui-medium mt-2">
            Personal Bio
          </h1>

          <p className="font-sf-ui-semibold text-base sm:text-lg md:text-xl max-w-2xl mt-12">
            Biohacking the body to achieve LONGEVITY using science, epigenetics
            and spiritual frameworks.
          </p>
          <p className="font-sf-ui-semibold text-base sm:text-lg md:text-xl max-w-3xl mt-10 leading-relaxed px-2">
            We are cutting edge biohackers and longevity coaches, who leverage
            science and revolutionary research to change or alter genetic
            expression to bring about a longer, healthier, more active life
            (along with employing spiritual connections to reveal what's within
            and to supercharge the transformation).
          </p>
        </div>

        <div className="absolute bottom-0 w-full flex justify-center px-4">
          <img
            src="/Protocols/line.png"
            alt="line"
            className="h-[2px] w-full max-w-6xl"
          />
        </div>
      </div>
      {getting ? (
        Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="w-full px-4 sm:px-6 lg:px-16 xl:px-8 py-5 flex flex-col animate-pulse"
          >
            <div className="flex lg:flex-row gap-8 items-end">
              {/* Skeleton Title */}
              <div className="lg:w-3/5 text-center lg:text-left">
                <div className="h-12 sm:h-16 xl:h-20 w-3/4 bg-gray-300 rounded-md mx-auto lg:mx-0 mb-4"></div>
              </div>

              {/* Skeleton Image */}
              <div className="relative lg:w-2/5">
                <div className="w-full max-w-xs sm:max-w-sm mx-auto relative z-10">
                  <div className="w-full h-64 sm:h-72 bg-gray-300 rounded-xl"></div>
                </div>
                <div
                  className="absolute bottom-0 left-0 w-full h-16 z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
                  }}
                ></div>
              </div>
            </div>

            {/* Skeleton Paragraph */}
            <div className="mt-8 space-y-3">
              <div className="h-4 sm:h-5 bg-gray-300 rounded w-full"></div>
              <div className="h-4 sm:h-5 bg-gray-300 rounded w-11/12"></div>
              <div className="h-4 sm:h-5 bg-gray-300 rounded w-10/12"></div>
              <div className="h-4 sm:h-5 bg-gray-300 rounded w-9/12"></div>
            </div>
          </div>
        ))
      ) : (
        bioData.length > 0 &&
        bioData?.map((bio) => (
          <div
            key={bio.id}
            className="w-full px-4 sm:px-6 lg:px-16 xl:px-8 py-5 flex flex-col"
          >
            <div className="flex lg:flex-row gap-8 items-end">
              <div className="lg:w-3/5 text-center lg:text-left">
                <h1
                  className="text-5xl sm:text-6xl xl:text-8xl font-sf-ui-semibold text-transparent mb-2"
                  style={{
                    background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {bio?.user_name}
                </h1>
              </div>

              <div className="relative lg:w-2/5">
                <img
                  src={bio?.user_photo}
                  alt={bio?.user_name}
                  className="w-full max-w-xs sm:max-w-sm mx-auto relative z-10"
                />
                <div
                  className="absolute bottom-0 left-0 w-full h-16 z-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
                  }}
                ></div>
              </div>
            </div>

            <p className="mt-8 text-base sm:text-lg md:text-xl font-sf-ui-semibold leading-relaxed text-justify">
              {bio?.user_detail
                ?.split(".")
                .filter((sentence) => sentence.trim() !== "")
                .map((sentence, index) => (
                  <p key={index} className="mb-1">
                    {sentence.trim()}.
                  </p>
                ))}
            </p>
          </div>
        ))
      )}
      <Footer />
    </>
  );
};

export default Bio;
