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
        setbioData(response.data?.data);
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div className="w-full py-4">
      <div id="supplement" className="w-full text-center pl-4 text-gray-300">
        <p className="mb-4 text-4xl sm:text-[48px] md:text-[64px] font-semibold text-[#2C5789] opacity-10">
          Bio
        </p>
      </div>

      {/* CARD LIST */}
      {bioData?.map((bio, i) => (
        <section
          key={i}
          className="relative w-[90%] max-w-full mx-auto flex flex-col justify-between p-4 mb-8 rounded-2xl border border-gray-200 shadow-sm bg-white"
        >
          <div>
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              {bio?.user_name}
            </h1>
            <p className="text-gray-700 text-[10px] sm:text-[12px] mt-2 whitespace-pre-line">
              {bio?.user_detail.substring(0, 250)}...
              <Link className="text-[#0db5e4] font-bold" to={"/bio"}>
                read more
              </Link>
            </p>
          </div>

        </section>
      ))}
    </div>
  );
}


export default MobileCubeSlider;
