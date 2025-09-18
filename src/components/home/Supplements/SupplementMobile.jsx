import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SupplementMobile() {
  const Navigate = useNavigate();

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
    <div className="w-full py-4">
      <div id="supplement" className="w-full text-center pl-4 text-gray-300">
        <p className="mb-4 text-4xl sm:text-[48px] md:text-[64px] font-semibold text-[#2C5789] opacity-10">
          Supplement
        </p>
      </div>

      {/* CARD LIST */}
      {suplimentDta?.map((card, i) => (
        <section
          key={i}
          className="relative w-[90%] max-w-full mx-auto flex flex-col justify-between p-4 mb-8 rounded-2xl border border-gray-200 shadow-sm bg-white"
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
            <p className="text-sm text-gray-600 mb-4">{card.supplement_detail}</p>
            <div onClick={() => {
              Navigate("/protocols/1");
            }}>
              <img
                src="/seeMore.png"
                alt="See more"
                className="w-28 object-contain"
              />
            </div>
          </div>

          <h1 className="text-[60px] font-bold text-black opacity-5 absolute left-4 top-[40%] -translate-y-1/2 pointer-events-none">
            {card?.id.toString().padStart(2, "0")}
          </h1>
        </section>
      ))}
      <div className="flex mt-10 items-center justify-end gap-3 px-6">
        <span
          className="contactText inter-bold cursor-pointer"
          onClick={() => {
            Navigate("/protocols/1");
          }}
        >
          View All
        </span>
        <img
          src="/view_more.svg"
          alt=""
          className="h-[20px] w-[20px] cursor-pointer"
          onClick={() => {
            Navigate("/protocols/1");
          }}
        />
      </div>
    </div>
  );
}
