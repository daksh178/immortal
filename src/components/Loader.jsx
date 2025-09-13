import { forwardRef } from "react";

const Loader = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="fixed loader inset-0 z-50 bg-white flex flex-col md:justify-center justify-end items-center overflow-hidden pb-10 md:pb-0"
    >
      {/* Loading text */}
      <div className="text-center">
        <h1 className="pb-5 text-[24px] font-extrabold leading-none tracking-wide bg-gradient-to-r from-[#003670] to-[#0DB5E4] bg-clip-text text-transparent z-10">
          ImmortaL LIFE
        </h1>

        <p className="mt-2 text-gray-800 tracking-wide z-10 text-sm md:text-base animate-pulse">
          Loading the future...
        </p>
      </div>
    </div>
  );
});

export default Loader;
