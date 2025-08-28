import React from "react";

function AdminSettings() {
  return (
    <div className="flex items-center justify-center min-h-[300px] md:min-h-[500px]">
      <div className="flex flex-col items-center gap-6 p-10 rounded-2xl bg-gradient-to-br from-white to-[#FFFEF7] border border-[#F9A825]/30 shadow-xl luxury-card">
        <div className="w-40 h-40">
          {/* Animated SVG as a loader image */}
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F9A825" />
                <stop offset="60%" stopColor="#F57F17" />
                <stop offset="100%" stopColor="#FFD54F" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" stroke="url(#g)" strokeWidth="10" fill="none" opacity="0.25" />
            <circle cx="100" cy="100" r="80" stroke="url(#g)" strokeWidth="10" strokeLinecap="round" fill="none">
              <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="stroke-dasharray" values="20 440;140 320;20 440" dur="1.2s" repeatCount="indefinite" />
            </circle>
            <text x="50%" y="52%" textAnchor="middle" fill="#E65100" fontSize="16" fontWeight="700">COMING</text>
            <text x="50%" y="68%" textAnchor="middle" fill="#E65100" fontSize="16" fontWeight="700">SOON</text>
          </svg>
        </div>
        <h2 className="text-2xl font-bold luxury-gold-text luxury-heading">Coming Soon</h2>
        <p className="text-[#E65100]/80 luxury-subheading">Settings page is under construction.</p>
      </div>
    </div>
  );
}

export default AdminSettings;
