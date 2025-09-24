import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "../../components/home/Navbar/Overlay";
import Footer from "../../components/home/Footer/Footer";
import OverlayMobile from "../../components/home/Navbar/OverlayMobile";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import { useNavigate } from "react-router-dom";

export default function SupplementPage() {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1280);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [suplimentDta, setsuplimentDta] = useState([]);

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_MAIN_API}/get-supplement`, {
                    headers: { "ngrok-skip-browser-warning": "true" },
                });
                if (response?.data) {
                    setsuplimentDta(response.data.data.sort((a, b) => a.id - b.id).slice(0, 3));
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
                <div className="absolute top-4 towardFadeDiv left-4 xl:left-8 z-20">
                    <img src="/logo.svg" className="w-[200px]" />
                </div>

                {/* Navbar Overlay */}
                {isMobile ? (
                    <OverlayMobile isBioPage={true} />
                ) : (
                    <Overlay isProtocolPage={true} />
                )}

                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
                    <div id="supplement" className="w-full text-center pl-4 text-gray-300">
                        <h1
                            className="text-5xl mt-24 sm:text-6xl xl:text-8xl font-sf-ui-semibold text-transparent"
                            style={{
                                background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Supplement
                        </h1>
                    </div>

                    {/* CARD LIST */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-[90%] mx-auto">
                        {suplimentDta && suplimentDta.length > 0 ? (
                            suplimentDta?.map((card, i) => (
                                <section
                                    key={i}
                                    className="relative flex flex-col justify-between p-4 rounded-2xl border border-gray-200 shadow-sm bg-white"
                                >
                                    <img
                                        src={`/team-${i + 1}.jpg`}
                                        alt={card.title}
                                        className="w-full h-48 object-cover rounded-xl mb-4"
                                    />

                                    <div>
                                        <h1 className="text-lg font-semibold text-gray-800 mb-2">
                                            {card.supplement_name}
                                        </h1>
                                        <p className="text-sm text-gray-600 mb-4">
                                            {card.supplement_detail}
                                        </p>
                                        <div
                                            onClick={() => {
                                                navigate("/protocols/1");
                                            }}
                                        >
                                            <img
                                                src="/seeMore.png"
                                                alt="See more"
                                                className="w-28 object-contain cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <h1 className="text-[60px] font-bold text-black opacity-5 absolute left-4 top-[40%] -translate-y-1/2 pointer-events-none">
                                        {card?.id.toString().padStart(2, "0")}
                                    </h1>
                                </section>
                            ))
                        ) : (
                            // Skeleton Loader
                            Array.from({ length: 3 }).map((_, i) => (
                                <section
                                    key={i}
                                    className="relative flex flex-col justify-between p-4 rounded-2xl border border-gray-200 shadow-sm bg-white animate-pulse"
                                >
                                    <div className="w-full h-48 bg-gray-300 rounded-xl mb-4"></div>

                                    <div>
                                        <div className="h-6 w-3/4 bg-gray-300 rounded-md mb-2"></div>
                                        <div className="h-3 w-full bg-gray-300 rounded mb-1"></div>
                                        <div className="h-3 w-5/6 bg-gray-300 rounded mb-4"></div>
                                        <div className="w-28 h-8 bg-gray-300 rounded"></div>
                                    </div>

                                    <div className="h-[60px] w-16 bg-gray-300 opacity-20 absolute left-4 top-[40%] -translate-y-1/2 pointer-events-none rounded-md"></div>
                                </section>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
