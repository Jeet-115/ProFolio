import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeInLeft = {
  hidden: { opacity: 0, x: -90 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1, ease: 'easeOut', delay: 0.5 } // Added 1.5s delay
  },
};

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: delay + 0.5 }, // Added 1.5s initial delay
  },
});

const InfoImage = ({ selection, imageMap }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = imageMap[selection];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Mobile Carousel */}
      <div className="mt-8 block sm:hidden px-4">
        <motion.div
          key={selection}
          className="relative"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          variants={fadeInLeft}
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((imgSrc, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={imgSrc}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-64 object-contain bg-white rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              →
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-[#346779]' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Desktop/Tablet Grid */}
      <motion.div
        key={selection}
        className="mt-8 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        variants={fadeInLeft}
        viewport={{ once: false, amount: 0.1 }}
      >
        {images.map((imgSrc, index) => (
          <motion.div
            key={index}
            className={`relative group ${index >= 2 ? 'hidden lg:block' : ''}`}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            variants={fadeInUp(index * 0.2)}
            viewport={{ once: false, amount: 0.1 }}
          >
            <motion.img
              src={imgSrc}
              alt={`Preview ${index + 1}`}
              className="w-full h-100 object-contain rounded-lg shadow-md transition-transform transform group-hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default InfoImage;
