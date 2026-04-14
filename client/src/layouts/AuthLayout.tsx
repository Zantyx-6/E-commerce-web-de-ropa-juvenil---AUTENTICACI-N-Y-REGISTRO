import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
  sideTitle: React.ReactNode;
  sideSubtitle?: React.ReactNode;
  sideBottom?: React.ReactNode;
  gradient?: string;
  badge?: {
    text: string;
    color?: string;
  };
}

export default function AuthLayout({
  children,
  backgroundImage,
  sideTitle,
  sideSubtitle,
  sideBottom,
  gradient,
  badge,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full font-sans text-slate-800 bg-[#f8f9fc]">
      {/* Left side banner — Desktop only */}
      <div className="hidden lg:flex flex-col relative w-1/2 bg-black overflow-hidden p-12 justify-between">
        <img
          src={backgroundImage}
          className="absolute inset-0 w-full h-full object-cover opacity-90 z-[1]"
          alt="Background"
        />
        {/* Dark gradient overlay for readability at the bottom */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              gradient ||
              "linear-gradient(to top, rgba(0,20,80,0.8) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        {/* Top left content */}
        <div className="relative z-[3] flex items-center justify-between font-display">
          <div className="text-white font-black italic tracking-widest text-2xl">
            VIBRA SHOP
          </div>
        </div>

        {/* Bottom left content */}
        <div className="relative z-[3] flex flex-col mt-auto text-white">
          {/* Badge */}
          {badge && (
            <div
              className={`self-start inline-flex items-center ${
                badge.color || "bg-white/20 backdrop-blur-xl text-white"
              } py-1.5 px-3 rounded-full mb-4 font-bold tracking-wider text-[0.7rem] uppercase`}
            >
              {badge.text}
            </div>
          )}

          {/* Title */}
          <h1 className="font-display text-[4.5rem] font-extrabold leading-[1.05] m-0 mb-4 drop-shadow-lg">
            {sideTitle}
          </h1>

          {/* Subtitle */}
          {sideSubtitle && (
            <p className="text-[1.05rem] leading-relaxed text-white/90 max-w-[400px] drop-shadow-md m-0 mb-4">
              {sideSubtitle}
            </p>
          )}

          {/* Bottom text */}
          {sideBottom && (
            <div className="text-[0.65rem] text-white/50 font-medium tracking-widest uppercase mt-4">
              {sideBottom}
            </div>
          )}
        </div>
      </div>

      {/* Right side — form area */}
      <div className="flex-1 flex flex-col relative items-center justify-center p-4 lg:p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
