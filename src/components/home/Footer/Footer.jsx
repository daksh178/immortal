const Footer = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-20 ">
      <div className="footerMainDiv h-[357px] md:h-[450px] xl:h-[450px] 2xl:h-[540px]  relative flex flex-col items-center py-12 gap-5 overflow-hidden">
        <img
          src="./footerTopGradient.png"
          className="w-full absolute top-0 h-[2px] "
        ></img>
        <h1 className="footerLineText text-black text-lg">(207) 555-0119</h1>
        <h1 className="footerLineText text-black text-lg">
          tim.jennings@example.com
        </h1>
        <h1 className="footerLineText text-black text-lg">
          3891 Ranchview Dr. Richardson, California 62639
        </h1>
        <div className="flex socialIconsDiv gap-3 relative z-20 md">
          <img src="/socialIcons/google.svg" className="socialIcon" />
          <img src="/socialIcons/yt.svg" className="socialIcon" />
          <img src="/socialIcons/insta.svg" className="socialIcon" />
          <img src="/socialIcons/x.svg" className="socialIcon" />
          <img src="/socialIcons/facebook.svg" className="socialIcon" />
        </div>
        <h1 className="footerBottomTextMobile text-5xl sm:text-8xl lg:text-[179px] xl:text-[230px] ">
          ImmortaLIFE
        </h1>
      </div>
    </div>
  );
};

export default Footer;
