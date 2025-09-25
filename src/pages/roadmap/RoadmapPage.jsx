import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "../../components/home/Navbar/Overlay";
import Footer from "../../components/home/Footer/Footer";
import OverlayMobile from "../../components/home/Navbar/OverlayMobile";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNavigate } from "react-router-dom";

export default function RoadmapPage() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [leftCardData, setLeftCardData] = useState([]);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_MAIN_API}/get-roadmap`,
                    {
                        headers: {
                            "ngrok-skip-browser-warning": "true",
                        },
                    }
                );
                if (response?.data) {
                    setLeftCardData(response?.data?.data);
                }
            } catch (error) {
                console.error("Error fetching roadmap:", error);
            }
        };

        fetchRoadmap();
    }, []);

    return (
        <>
            <ScrollToTop />
            <div className="relative pb-12 w-full text-black">
                {/* ✅ Fixed background (now stays behind content) */}
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center -z-10"
                    style={{ backgroundImage: "url('/Protocols/heroBg.png')" }}
                ></div>

                {/* Logo */}
                <div
                    onClick={() => navigate("/")}
                    className="absolute top-4 left-4 xl:left-8 cursor-pointer z-50"
                >
                    <img src="/logo.svg" className="w-[200px] cursor-pointer" />
                </div>
                {/* Navbar Overlay */}
                {isMobile ? (
                    <OverlayMobile isBioPage={true} />
                ) : (
                    <Overlay isProtocolPage={true} />
                )}

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
                    <section id="roadmap" className="mt-[5vh]">
                        <div>
                            <h1
                                className="text-5xl mt-24 sm:text-6xl xl:text-8xl font-sf-ui-semibold text-transparent"
                                style={{
                                    background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Roadmap
                            </h1>

                            {/* Roadmap Cards */}
                            <div className="flex flex-wrap justify-center gap-10 px-6 mt-5">
                                {leftCardData.length === 0 ? (
                                    Array(3)
                                        .fill(null)
                                        .map((_, index) => (
                                            <div
                                                key={index}
                                                className="h-[470px] w-[378px] bg-gray-200 rounded-[20px] animate-pulse"
                                            >
                                                {/* Skeleton */}
                                                <div className="h-[174px] w-[174px] bg-gray-300 rounded-full mt-[40px] mx-auto" />
                                                <div className="px-8 mt-6 space-y-4">
                                                    <div className="h-6 bg-gray-300 rounded w-2/3" />
                                                    <div className="h-4 bg-gray-300 rounded w-full" />
                                                    <div className="h-4 bg-gray-300 rounded w-4/5" />
                                                </div>
                                            </div>
                                        ))
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                                        {leftCardData.map((card) => (
                                            <div
                                                onClick={() => navigate(`/protocols/${card?.id}`)}
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
                                                className="relative h-[470px] w-[378px] cursor-pointer duration-150 will-change-transform"
                                                style={{ transformStyle: "preserve-3d" }}
                                            >


                                                {/* Decorative left bar */}
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

                                                {/* Decorative right bar */}
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

                                                {/* Border layer */}
                                                <div
                                                    className="absolute inset-0"
                                                    style={{
                                                        background:
                                                            "linear-gradient(169.06deg, rgba(0, 54, 112, 0) 4.42%, #0DB5E4 91.9%)",
                                                        clipPath:
                                                            "polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)",
                                                    }}
                                                />

                                                {/* Inner background (acts like fill inside border) */}
                                                <div
                                                    className="absolute inset-[3px] flex flex-col bg-white"
                                                    style={{

                                                        clipPath:
                                                            "polygon(9px 0, calc(100% - 9px) 0, 100% 9px, 100% calc(100% - 9px), calc(100% - 9px) 100%, 9px 100%, 0 calc(100% - 9px), 0 9px)",
                                                    }}
                                                >
                                                    {/* Image */}
                                                    <img
                                                        src="/donut.png"
                                                        alt=""
                                                        className="h-[174px] w-[174px] mt-[40px] mx-auto pointer-events-none"
                                                    />

                                                    {/* Content */}
                                                    <div className="flex flex-col flex-1 px-8 mt-4">
                                                        <h6 className="text-black text-[24px] font-semibold leading-[100%] min-h-[70px] pointer-events-none">
                                                            {card?.title}
                                                        </h6>
                                                        <p className="text-[14px] font-normal leading-[140%] text-[#434343] min-h-[90px] pointer-events-none">
                                                            {card?.short_description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer Section */}
                {/* <div className="flex flex-col items-center justify-center mt-24">
                    <p
                        style={{
                            fontSize: "43px",
                            fontWeight: "500",
                            lineHeight: "38px",
                            letterSpacing: "-2%",
                            textAlign: "center",
                        }}
                        className="mx-auto max-w-4xl mt-8"
                    >
                        <span className="block text-xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
                            Email reimagined. Available today.
                        </span>
                    </p>

                    <div
                        className="cursor-pointer mt-5 w-[200px] h-[60px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5"
                        style={{ boxShadow: "5.92px 5.92px 11.85px 0px #00000014" }}
                    >
                        <h6 className="flex-1 font-bold text-[18px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
                            Contact Us
                        </h6>
                        <div
                            className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#F9F9F9]"
                            style={{
                                boxShadow:
                                    "5.92px 5.92px 11.85px 0px #00000014 inset,-5.92px -5.92px 11.85px 0px #FFFFFF inset",
                            }}
                        >
                            <img src="/view_more.svg" alt="" className="h-[20px] w-[20px]" />
                        </div>
                    </div>
                </div> */}
            </div>
            <Footer />
        </>
    );
}
