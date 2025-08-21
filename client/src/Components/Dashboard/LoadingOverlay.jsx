import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = ({ isLoading, message = "Loading..." }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#1F2D3C] z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="text-white text-center"
          >
            {/* Custom Loader Animation */}
            <div className="relative mb-8">
              <div className="loader-container">
                <div className="loader-1"></div>
                <div className="loader-2"></div>
                <div className="loader-3"></div>
              </div>
            </div>

            {/* Loading Text */}
            <motion.h3
              className="text-xl font-semibold mb-2 outfit"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {message}
            </motion.h3>
          </motion.div>

          <style jsx>{`
            .loader-container {
              position: relative;
              width: 160px;
              height: 100px;
              margin: 0 auto;
            }

            .loader-1, .loader-2, .loader-3 {
              position: absolute;
              top: 50%;
              left: 50%;
              border-radius: 5px;
              background: #1e3f57;
              animation: dot1_ 3s cubic-bezier(0.55,0.3,0.24,0.99) infinite;
            }

            .loader-1 {
              z-index: 10;
              width: 160px;
              height: 100px;
              margin-left: -80px;
              margin-top: -50px;
            }

            .loader-2 {
              z-index: 11;
              width: 150px;
              height: 90px;
              margin-top: -45px;
              margin-left: -75px;
              border-radius: 3px;
              background: #3c517d;
              animation-name: dot2_;
            }

            .loader-3 {
              z-index: 12;
              width: 40px;
              height: 20px;
              margin-top: 50px;
              margin-left: -20px;
              border-radius: 0 0 5px 5px;
              background: #6bb2cd;
              animation-name: dot3_;
            }

            @keyframes dot1_ {
              3%,97% {
                width: 160px;
                height: 100px;
                margin-top: -50px;
                margin-left: -80px;
              }

              30%,36% {
                width: 80px;
                height: 120px;
                margin-top: -60px;
                margin-left: -40px;
              }

              63%,69% {
                width: 40px;
                height: 80px;
                margin-top: -40px;
                margin-left: -20px;
              }
            }

            @keyframes dot2_ {
              3%,97% {
                height: 90px;
                width: 150px;
                margin-left: -75px;
                margin-top: -45px;
              }

              30%,36% {
                width: 70px;
                height: 96px;
                margin-left: -35px;
                margin-top: -48px;
              }

              63%,69% {
                width: 32px;
                height: 60px;
                margin-left: -16px;
                margin-top: -30px;
              }
            }

            @keyframes dot3_ {
              3%,97% {
                height: 20px;
                width: 40px;
                margin-left: -20px;
                margin-top: 50px;
              }

              30%,36% {
                width: 8px;
                height: 8px;
                margin-left: -5px;
                margin-top: 49px;
                border-radius: 8px;
              }

              63%,69% {
                width: 16px;
                height: 4px;
                margin-left: -8px;
                margin-top: -37px;
                border-radius: 10px;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
