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
      {suplimentDta && suplimentDta.length > 0 ? (
        suplimentDta?.map((card, i) => (
          <section
            onClick={() => {
              Navigate(`/supplements/${suplimentDta?.id}`);
            }}
            key={i}
            className="relative w-[90%] max-w-full mx-auto flex flex-col justify-between p-4 mb-8 rounded-2xl border border-gray-200 shadow-sm bg-white"
          >
            <img
              src={card?.supplement_image}
              alt={card.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <div>
              <h1 className="text-lg font-semibold text-gray-800 mb-2">
                {card.supplement_name}
              </h1>
              <p className="text-sm text-gray-600 mb-4">{card.supplement_detail}</p>
              {/* <div onClick={() => {
                Navigate("/protocols/1");
              }}>
                <img
                  src="/seeMore.png"
                  alt="See more"
                  className="w-28 object-contain"
                />
              </div> */}
            </div>

          </section>
        ))
      ) : (
        // Skeleton Loader
        Array.from({ length: 3 }).map((_, i) => (
          <section
            key={i}
            className="relative w-[90%] max-w-full mx-auto flex flex-col justify-between p-4 mb-8 rounded-2xl border border-gray-200 shadow-sm bg-white animate-pulse"
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
      <div className="flex mt-10 items-center justify-end gap-3 px-6">
        <span
          className="contactText inter-bold cursor-pointer"
          onClick={() => {
            Navigate("/supplement");
          }}
        >
          View All
        </span>
        <img
          src="/view_more.svg"
          alt=""
          className="h-[20px] w-[20px] cursor-pointer"
          onClick={() => {
            Navigate("/supplement");
          }}
        />
      </div>
    </div>
  );
}
