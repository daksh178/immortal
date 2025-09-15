import React from "react";
import Overlay from "../../components/home/Navbar/Overlay";
import Footer from "../../components/home/Footer/Footer";
import OverlayMobile from "../../components/home/Navbar/OverlayMobile";
import { useEffect, useState } from "react";

const Bio = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="absolute top-4 towardFadeDiv left-4 xl:left-8" onClick={() => console.log("object")}>
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

      {/* Kim Section */}
      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-8 py-5 flex flex-col">
        <div className="flex lg:flex-row gap-8 items-center">
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
              Kim
            </h1>
            <h1
              className="text-5xl sm:text-6xl xl:text-8xl font-sf-ui-semibold text-transparent"
              style={{
                background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Wheeler
            </h1>
          </div>

          <div className="relative lg:w-2/5">
            <img
              src="/Bio/women.png"
              alt="Kim Wheeler"
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
          Studied Exercise Physiology and Kinesiology (Cardiac Rehabilitation
          emphasis) for 4 years at Texas Woman’s University, and then continued
          her education in law. Kim spent much of her time while in the business
          sector studying alternative medicine and natural healing therapies.
          The combination of her education and research led to establishing 2
          successful first-to-market companies in the Texas area, utilizing new
          technologies combined with alternative therapies to assist in recovery
          of various physical ailments and conditions. Kim has maintained a
          passion for continual physical transformation, using herself as a
          living lab while partaking in various protocols, endeavoring to better
          the health of women. With much success in recovering from a long
          standing adrenal crisis, various food allergies which lasted 25 years
          as IBS, and hormonal imbalances, she consults with joy to share her
          protocols in order to end other’s suffering. A complete belief that
          Yahweh created all things, that all things serve His purposes. She
          engages her authority in the realm of bio-hacking through Him, by Him
          and for Him (Col 1:16), always for the purpose of using her body as an
          instrument for the greater good, to ease suffering. Currently, Kim is
          enrolled in the Genome and Genetics program at the Stanford School of
          Medicine to gain a more comprehensive perspective on genetic factors
          and current research.
        </p>
      </div>

      {/* Dan Section */}
      <div className="w-full px-4 sm:px-6 lg:px-16 xl:px-8 py-5 flex flex-col">
        <div className="flex lg:flex-row gap-8 items-center">
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
              Dan
            </h1>
            <h1
              className="text-5xl sm:text-6xl xl:text-8xl font-sf-ui-semibold text-transparent"
              style={{
                background: "linear-gradient(180deg, #003670 0%, #0DB5E4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Wheeler
            </h1>
          </div>

          <div className="relative lg:w-2/5">
            <img
              src="/Bio/men.png"
              alt="Dan Wheeler"
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
          Retired 20 year Air Force Veteran, who has over 35 years of
          Bodybuilding experience and personal training. Dan spent years honing
          his Bodybuilding craft, going from a skinny boy who couldn't gain
          weight to 2 professional weight lifting competitions. Bachelor of Arts
          in Sports & Recreation Management and degrees in Criminal Justice and
          Military Instructor Technologies. He involves himself in the
          scientifically proven biohacking world, by testing products and
          tracking their results with blood testing. Dan has developed a keen
          "tried and tested" method with male hormones and healthy metabolic
          function management through proper nutrition, training and
          supplementation. For Dan, longevity and immortality belong to the one
          who is willing to "lay down their life" for others.  This means,
          putting the needs of others before your own.  Dan's life exemplifies
          this through his military service and as a kidney donor.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Bio;
