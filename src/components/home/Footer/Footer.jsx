const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-10 md:mt-20">
      <div className="footerMainDiv px-2 h-[280px] md:h-[420px] xl:h-[420px] 2xl:h-[540px]  relative flex flex-col items-center py-12 gap-5 overflow-hidden">
        <img
          src="./footerTopGradient.png"
          className="w-full absolute top-0 h-[2px] "
        ></img>
        {/* <h1 className="footerLineText text-black text-lg">
          <a
            href="tel:+14693875026"
            className="footerLineText text-black text-lg block"
          >
            +1 (469) 387-5026
          </a>

        </h1> */}
        <h1 className="footerLineText text-black text-lg">
          kingdomemissary@protonmail.com
        </h1>
        {/* <h1 className="footerLineText text-black text-lg">
          3891 Ranchview Dr. Richardson, California 62639
        </h1> */}
        <div className="flex socialIconsDiv gap-3 relative z-20 md">
          <img src="/socialIcons/google.svg" className="socialIcon" />
          <img src="/socialIcons/yt.svg" className="socialIcon" />
          <img src="/socialIcons/insta.svg" className="socialIcon" />
          <img src="/socialIcons/x.svg" className="socialIcon" />
          <img src="/socialIcons/facebook.svg" className="socialIcon" />
        </div>
        <h1 className="footerBottomTextMobile text-5xl sm:text-8xl lg:text-[179px] xl:text-[215px] ">
          ImmortaLIFE
        </h1>
      </div>
    </div>
  );
};

export default Footer;
