import React from "react";
import CTALeftDiv from "./CTA/CTALeftDiv";
import CTARightDiv from "./CTA/CTARightDiv";
import CTAHeading from "./CTA/CTAHeading";

const CTA = () => {
  return (
    <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg mt-[50px]">
      {/* Heading */}
      <CTAHeading />

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <CTALeftDiv />
        <CTARightDiv />
      </div>
    </div>
  );
};

export default CTA;
