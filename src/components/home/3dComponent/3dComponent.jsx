import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const ThreeJsComponent = () => {
  const mainRef = useRef(null);
  const Navigate = useNavigate();
  const textRef = useRef(null);

  const [leftCardData, setLeftCardData] = useState([]);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_API}/get-roadmap`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        if (response?.data) {
          setLeftCardData(response?.data?.data?.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    fetchRoadmap();
  }, []);

  return (
    <div
      ref={mainRef}
      id="about"
      className="w-full bg-white text-black overflow-hidden flex flex-col"
    >
      <section ref={mainRef} id="about" className="relative w-full">
        <div className="relative flex justify-center items-center flex-col">
          <h1 className="text-[#2C5789] opacity-10 text-center w-full text-[250px] font-sf-ui-semibold">
            About us
          </h1>
          <div className="absolute top-60 right-40 wrapper font-sf-ui-medium text-gray-900 text-3xl  tracking-wider  w-[580px] h-[400px]">
            <h1 ref={textRef} className="">
              Biohacking the body to achieve <br></br> LONGEVITY using science,
              epigenetics and spiritual frameworks. We are <br></br> cutting edge
              biohackers and longevity coaches, who leverage science and <br></br>{" "}
              revolutionary research to alter/change our genes to bring about a
              longer, <br></br>healthier, more active life (along with <br></br>
              employing spiritual connections to <br></br>reveal what's within and
              to <br></br>supercharge the transformation).
            </h1>
          </div>
        </div>
      </section>

      <section id="roadmap" className="mt-[40vh]">
        <div>
          <h1
            id="roadmap"
            className="text-[#2C5789] opacity-10 w-full text-[250px] font-sf-ui-semibold text-center"
          >
            Roadmap
          </h1>

          <div className="px-6 flex flex-col">
            <div className="w-full max-w-[1300px] mx-auto">
              {/* Cards Section */}
              <div
                className={`${leftCardData.length < 3
                  ? "flex flex-wrap justify-center gap-15"
                  : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center"
                  } items-center`}
              >
                {leftCardData.length === 0
                  ? Array(3)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="w-full max-w-[380px] aspect-[9/11] bg-gray-200 rounded-[20px] animate-pulse"
                      >
                        {/* Skeleton */}
                        <div className="w-3/5 aspect-square bg-gray-300 rounded-full mt-10 mx-auto" />
                        <div className="px-6 mt-6 space-y-4">
                          <div className="h-6 bg-gray-300 rounded w-2/3" />
                          <div className="h-4 bg-gray-300 rounded w-full" />
                          <div className="h-4 bg-gray-300 rounded w-4/5" />
                        </div>
                      </div>
                    ))
                  : leftCardData.map((card) => (
                    <div
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
                      className="relative w-full h-[500px] max-w-[380px] aspect-[9/11] flex items-center justify-center cursor-pointer duration-150 will-change-transform"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      {/* Decorative left bar */}
                      <div
                        className="absolute h-1/3 w-[6px]"
                        style={{
                          background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                          clipPath:
                            "polygon(6px 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)",
                          left: -8,
                          bottom: '15%',
                        }}
                      ></div>

                      {/* Decorative right bar */}
                      <div
                        className="absolute h-1/3 w-[6px]"
                        style={{
                          background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                          clipPath:
                            "polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)",
                          right: -8,
                          bottom: '40%',
                        }}
                      ></div>

                      {/* Border layer */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(169.06deg, rgba(0, 54, 112, 0) 4.42%, #0DB5E4 91.9%)",
                          clipPath:
                            "polygon(3% 0, 97% 0, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0 97%, 0 3%)",
                        }}
                      />

                      {/* Inner background */}
                      <div
                        onClick={() => Navigate(`/protocols/${card?.id}`)}

                        className="absolute inset-[0.8%] flex flex-col bg-white"
                        style={{
                          clipPath:
                            "polygon(2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%, 0 2%)",
                        }}
                      >
                        {/* Image */}
                        <img
                          src={card?.roadmap_image || './donut.png'}
                          alt=""
                          className="w-3/5 aspect-square mt-10 mx-auto pointer-events-none"
                        />

                        {/* Content */}
                        <div className="flex flex-col flex-1 px-6 mt-4">
                          <h6 className="text-black text-xl md:text-2xl font-semibold leading-tight min-h-[4rem] pointer-events-none">
                            {card?.title}
                          </h6>
                          <p className="text-sm md:text-[14px] mb-10 font-normal leading-relaxed text-[#434343] min-h-[5rem] pointer-events-none">
                            {card?.short_description?.length > 250
                              ? (
                                <>
                                  {card?.short_description?.substring(0, 250)}...
                                  <Link
                                    className="text-[#0db5e4] font-bold cursor-pointer"
                                    to={`/protocols/${card?.id}`}
                                  >
                                    read more
                                  </Link>
                                </>
                              )
                              : card?.short_description}
                          </p>

                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* View All Section */}
              <div className="flex mt-10 items-center justify-end gap-3">
                <span
                  className="contactText inter-bold cursor-pointer"
                  onClick={() => Navigate("/roadmap")}
                >
                  View All
                </span>
                <img
                  src="/view_more.svg"
                  alt=""
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => Navigate("/roadmap")}
                />
              </div>
            </div>
          </div>


        </div>
      </section>
    </div >
  );
};

export default ThreeJsComponent;


{/* Button pinned at bottom */ }
{/* <div
                      className="cursor-pointer mt-2 w-[171px] h-[50px] rounded-[40px] flex items-center justify-start gap-4 py-[19px] pl-5"
                      style={{ boxShadow: "5.92px 5.92px 11.85px 0px #00000014" }}
                      onClick={() => Navigate("/protocols/1")}
                    >
                      <h6 className="flex-1 font-bold text-[16px] leading-[100%] bg-gradient-to-b from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent">
                        View More
                      </h6>
                      <div
                        className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#F9F9F9]"
                        style={{
                          boxShadow:
                            "5.92px 5.92px 11.85px 0px #00000014 inset,-5.92px -5.92px 11.85px 0px #FFFFFF inset",
                        }}
                      >
                        <img src="/view_more.svg" alt="" className="h-[20px] w-[20px]" />
                      </div>
                    </div> */}