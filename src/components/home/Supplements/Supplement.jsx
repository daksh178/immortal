import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import "./supplement.css";
import { Link } from "react-router-dom";

export default function Supplement() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const initTextSplit = () => {
      const textElements = document.querySelectorAll(".col-3 h1, .col-3 p");

      textElements.forEach((element) => {
        const split = new SplitText(element, {
          type: "lines",
          linesClass: "line",
        });
        split.lines.forEach(
          (line) => (line.innerHTML = `<span>${line.textContent}</span>`)
        );
      });
    };

    initTextSplit();

    gsap.set(".col-3 .col-content-wrapper .line span", { y: "0%" });
    gsap.set(".col-3 .col-content-wrapper-2 .line span", { y: "-125%" });

    ScrollTrigger.create({
      trigger: ".sticky-cols",
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
    });

    let currentPhase = 0;

    ScrollTrigger.create({
      trigger: ".sticky-cols",
      start: "top top",
      end: `+=${window.innerHeight * 6}px`,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress >= 0.3 && currentPhase === 0) {
          currentPhase = 1;

          gsap.to(".col-1", { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to(".col-2", { x: "0%", duration: 0.75 });
          gsap.to(".col-3", { y: "0%", duration: 0.75 });

          gsap.to(".col-img-1 img", { scale: 1.25, duration: 0.75 });
          gsap.to(".col-img-2", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.75,
          });
          gsap.to(".col-img-2 img", { scale: 1, duration: 0.75 });
        }

        if (progress >= 0.6 && currentPhase === 1) {
          currentPhase = 2;

          gsap.to(".col-2", { opacity: 0, scale: 0.75, duration: 0.75 });
          gsap.to(".col-3", { x: "0%", duration: 0.75 });
          gsap.to(".col-4", { y: "0%", duration: 0.75 });

          gsap.to(".col-3 .col-content-wrapper .line span", {
            y: "-125%",
            duration: 0.75,
          });
          gsap.to(".col-3 .col-content-wrapper-2 .line span", {
            y: "0%",
            duration: 0.75,
            delay: 0.5,
          });
        }

        if (progress < 0.3 && currentPhase >= 1) {
          currentPhase = 0;

          gsap.to(".col-1", { opacity: 1, scale: 1, duration: 0.75 });
          gsap.to(".col-2", { x: "100%", duration: 0.75 });
          gsap.to(".col-3", { y: "100%", duration: 0.75 });

          gsap.to(".col-img-1 img", { scale: 1, duration: 0.75 });
          gsap.to(".col-img-2", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.75,
          });
          gsap.to(".col-img-2 img", { scale: 1.25, duration: 0.75 });
        }

        if (progress < 0.6 && currentPhase === 2) {
          currentPhase = 1;

          gsap.to(".col-2", { opacity: 1, scale: 1, duration: 0.75 });
          gsap.to(".col-3", { x: "100%", duration: 0.75 });
          gsap.to(".col-4", { y: "100%", duration: 0.75 });

          gsap.to(".col-3 .col-content-wrapper .line span", {
            y: "0%",
            duration: 0.75,
            delay: 0.5,
          });
          gsap.to(".col-3 .col-content-wrapper-2 .line span", {
            y: "-125%",
            duration: 0.75,
          });
        }
      },
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div className="supplement2">
        {/* <section className="intro">
          <h1>We create modern interiors that feel effortlessly personal.</h1>
        </section> */}

        <div
          id="supplement"
          className=" w-full text-center  pl-4 text-gray-300"
        >
          <p className="mb-4 supplementTitle font-sf-ui-semibold opacity-10 text-[#2C5789]">
            Supplement
          </p>
        </div>

        <section className="sticky-cols">
          <div className="sticky-cols-wrapper">
            <div
              className="col col-1"
              style={{
                backgroundImage: "url('/card2.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%", // Stretch horizontally and vertically
                backgroundPosition: "center",
              }}
            >
              <div className="col-content">
                <div className="col-content-wrapper relative">
                  <h1 className="text-4xl 2xl:text-5xl">
                    Anti-aging and Longevity protocols
                  </h1>
                  <h1 className="text-[170px] 2xl:text-[250px] font-sf-ui-semibold text-black opacity-[4%] absolute left-4 -translate-y-1/2 top-[45%] ">
                    01
                  </h1>
                  <p className=" absolute text-lg 2xl:text-xl bottom-30">
                    This is a clear description of the protocol to let the
                    customer know about its benefits and usecases. They can
                    click on the button below to know about the protocol in
                    detail.
                  </p>
                  <div className=" w-[170px] absolute bottom-4">
                    <img src="/seeMore.png" className="object-cover" alt="" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col col-2">
              <div className="col-img col-img-1">
                <div className="col-img-wrapper">
                  <img
                    src="/team-1.png"
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="col-img col-img-2">
                <div className="col-img-wrapper">
                  <img
                    src="/team-2.jpg"
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundImage: "url('/card2.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%", // Stretch horizontally and vertically
                backgroundPosition: "center",
              }}
              className="col col-3 bg-white clip-polygon2-8"
            >
              <div className="col-content-wrapper relative">
                <h1 className="text-4xl 2xl:text-5xl">
                  Male Hormone Protocols
                </h1>
                <h1 className="text-[170px] 2xl:text-[250px] font-sf-ui-semibold text-black opacity-[4%] absolute left-4 -translate-y-1/2 top-[45%] ">
                  02
                </h1>
                <p className=" absolute text-lg 2xl:text-xl bottom-30">
                  This is a clear description of the protocol to let the
                  customer know about its benefits and usecases.
                </p>
                <div className=" w-[170px] absolute bottom-4">
                  <img src="/seeMore.png" className="object-cover" alt="" />
                </div>
              </div>
              <div className="col-content-wrapper-2 relative">
                <h1 className="text-4xl 2xl:text-5xl">Peptide Protocols</h1>
                <h1 className="text-[170px] 2xl:text-[250px] font-sf-ui-semibold text-black opacity-[4%] absolute left-4 -translate-y-1/2 top-[45%] ">
                  03
                </h1>
                <p className="absolute text-lg 2xl:text-xl bottom-30">
                  This is a clear description of the protocol to let the
                  customer know about its benefits and usecases.
                </p>
                {/* <div className=" w-[170px] absolute bottom-4">
                  <img src="/seeMore.png" className="object-cover" alt="" />
                </div> */}
              </div>
            </div>

            <div className="col col-4">
              <div className="col-img">
                <div className="col-img-wrapper">
                  <img
                    src="/team-3.jpg"
                    alt=""
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="outro">
          <h1>Timeless design begins with a conversation.</h1>
        </section> */}
      </div>
      <Link
        to={"/protocols/1"} className="w-full flex justify-end pr-4 ">
        <button className="footerButton l relative ">
          <span className="contactText inter-bold mr-10 ">
            View All{" "}
            <img
              src="/contactIcon.svg"
              className="absolute h-full right-0 top-0"
            ></img>
          </span>{" "}
        </button>
      </Link>
    </>
  );
}
