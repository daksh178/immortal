import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MobileCubeSlider = () => {
  const [bioData, setbioData] = useState([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_API}/get-bio`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (response?.data?.data) {
          setbioData(response.data?.data?.sort((a, b) => a.id - b.id)?.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div className="w-full py-4 mt-5">
      <div id="supplement" className="w-full text-center pl-4 text-gray-300">
        <p className="mb-4 text-4xl sm:text-[48px] md:text-[64px] font-semibold text-[#2C5789] opacity-10">
          Bio
        </p>
      </div>

      {/* CARD LIST */}
      {bioData && bioData.length > 0 ? (
        bioData?.map((bio, i) => (
          <section
            key={i}
            className="relative w-[90%] max-w-full mx-auto flex flex-col justify-between p-4 mb-8 rounded-2xl border border-gray-200 shadow-sm bg-white"
          >
            <div>
              <div className="flex justify-between items-end">

                <h1 className="text-lg font-semibold text-gray-800">
                  {bio?.user_name}
                </h1>
                <div className="relative h-[65px]">
                  <img
                    src={bio.user_photo}
                    alt={bio?.user_name}
                    className="h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0) 0%, #FFFFFF 100%)",
                    }}
                  ></div>
                </div>
              </div>
              <p className="text-gray-700 text-[10px] sm:text-[12px] mt-2 whitespace-pre-line">
                {bio?.user_detail.substring(0, 250)}...
                <Link className="text-[#0db5e4] font-bold" to={"/bio"}>
                  read more
                </Link>
              </p>
            </div>

          </section>
        ))
      ) : (
        // Skeleton Loader
        Array.from({ length: 2 }).map((_, i) => (
          <section
            key={i}
            className="relative w-[90%] max-w-full mx-auto flex flex-col justify-between p-4 mb-8 rounded-2xl border border-gray-200 shadow-sm bg-white animate-pulse"
          >
            <div>
              <div className="flex justify-between items-end">
                <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
                <div className="relative h-[65px] w-[65px] bg-gray-300 rounded-full"></div>
              </div>
              <div className="mt-2 space-y-2">
                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
              </div>
            </div>
          </section>
        ))
      )}
    </div>
  );
}


export default MobileCubeSlider;
