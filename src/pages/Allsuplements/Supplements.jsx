import Footer from "../../components/home/Footer/Footer.jsx";
import Overlay from "../../components/home/Navbar/Overlay.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Supplements() {
    const navigate = useNavigate();

    const { supplementname } = useParams();

    const [getSupplementdata, setgetSupplementdata] = useState([]);
    const [getting, setgetting] = useState(false)

    useEffect(() => {
        if (!supplementname) return;

        const fetchRoadmap = async () => {
            setgetting(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_MAIN_API}/get-supplement-detail?id=${supplementname}`,
                    { headers: { "ngrok-skip-browser-warning": "true" } }
                );

                if (response?.data?.success) {
                    setgetSupplementdata(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching roadmap:", error);
            } finally {
                setgetting(false);
            }
        };

        fetchRoadmap();
    }, [supplementname]);
    return (
        <>
            <ScrollToTop />
            <div
                onClick={() => navigate("/")}
                className="absolute top-4 left-4 xl:left-8 cursor-pointer z-50"
            >
                <img src="/logo.svg" className="w-[120px] sm:w-[200px] cursor-pointer" />
            </div>
            <Overlay isProtocolPage={true} />
            <div className="max-h-screen">
                <div className="relative w-full text-black">
                    {/* Background layer (140vh) */}
                    <div
                        style={{
                            backgroundImage: "url('/Protocols/heroBg.png')",
                        }}
                        className="absolute top-0 left-0 w-full h-[1080px] bg-cover bg-center z-0"
                    ></div>

                    <div className="
                            font-sf-ui-semibold 
                            z-10 flex flex-col items-center justify-center h-full
                            px-4 sm:px-6 lg:px-8
                            pt-20 sm:pt-28 md:pt-36 lg:pt-40 xl:pt-44 2xl:pt-[156px]
                            ">
                        <h1
                            className="
      font-sf-ui-medium z-50 text-center
      text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl
    "
                        >
                            {getSupplementdata?.supplement_name}
                        </h1>

                        <p
                            className="
      z-50 text-center
      mt-6 sm:mt-10 md:mt-16 lg:mt-20 xl:mt-28 2xl:mt-[120px]
      max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl
      text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
    "
                        >
                            {getSupplementdata?.supplement_detail}
                        </p>
                    </div>

                </div>

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
                        : getSupplementdata?.medicine_detail?.map((medicine, index) => (
                            <div key={index} className="z-50 bgmt-12 flex flex-col items-center">
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
            </div>
            <Footer />
        </>
    )
}
