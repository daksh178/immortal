import { useNavigate } from "react-router-dom";

export default function SupplementMobile() {
  const Navigate = useNavigate();

  return (
    <div className="w-full py-4">
      <div id="supplement" className="w-full text-center pl-4 text-gray-300">
        <p className="mb-4 text-4xl sm:text-[48px] md:text-[64px] font-semibold text-[#2C5789] opacity-10">
          Supplement
        </p>
      </div>

      {/* CARD LIST */}
      {[
        {
          title: "Anti-aging and Longevity protocols",
          description:
            "This is a clear description of the protocol to let the customer know about its benefits and usecases. They can click on the button below to know about the protocol in detail.",
          index: "01",
          image: "/team-1.png",
        },
        {
          title: "Male Hormone Protocols",
          description:
            "This is a clear description of the protocol to let the customer know about its benefits and usecases.",
          index: "02",
          image: "/team-2.jpg",
        },
        {
          title: "Peptide Protocols",
          description:
            "This is a clear description of the protocol to let the customer know about its benefits and usecases.",
          index: "03",
          image: "/team-3.jpg",
        },
      ].map((card, i) => (
        <section
          key={i}
          className="relative w-[90%] max-w-full mx-auto flex flex-col justify-between p-4 mb-8 rounded-2xl border border-gray-200 shadow-sm bg-white"
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />

          <div>
            <h1 className="text-lg font-semibold text-gray-800 mb-2">
              {card.title}
            </h1>
            <p className="text-sm text-gray-600 mb-4">{card.description}</p>
            <img
              src="/seeMore.png"
              alt="See more"
              className="w-28 object-contain"
            />
          </div>

          <h1 className="text-[60px] font-bold text-black opacity-5 absolute left-4 top-[40%] -translate-y-1/2 pointer-events-none">
            {card.index}
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
