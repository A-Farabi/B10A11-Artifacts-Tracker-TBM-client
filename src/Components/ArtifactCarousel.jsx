
// export default ArtifactCarousel;


import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ArtifactCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "Discover Ancient Wonders",
      subtitle: "Explore thousands of historical artifacts",
      description: "Join our community of history enthusiasts and uncover the secrets of the past",
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Browse Collection",
      link: "/all-artifacts",
      bgColor: "bg-amber-800"
    },
    {
      id: 2,
      title: "Contribute to History",
      subtitle: "Share your discoveries with the world",
      description: "Add your own artifacts and help expand our collective knowledge",
      image: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      cta: "Add Artifact",
      link: "/add-artifacts",
      bgColor: "bg-indigo-800"
    },
    {
      id: 3,
      title: "Track Your Favorites",
      subtitle: "Create your personal collection",
      description: "Save and organize artifacts that fascinate you",
      image: "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "View Profile",
      link: "/liked-artifacts",
      bgColor: "bg-emerald-800"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-2xl">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className={`relative h-full w-full ${slides[currentIndex].bgColor}`}>
            <img 
              src={slides[currentIndex].image} 
              alt={slides[currentIndex].title}
              className="w-full h-full object-cover mix-blend-overlay opacity-70"
            />
            
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-6 md:px-8 text-white">
                <div className="max-w-2xl">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-5xl font-bold mb-2"
                  >
                    {slides[currentIndex].title}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl mb-2"
                  >
                    {slides[currentIndex].subtitle}
                  </motion.p>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg mb-6"
                  >
                    {slides[currentIndex].description}
                  </motion.p>
                  <motion.a
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    href={slides[currentIndex].link}
                    className="inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {slides[currentIndex].cta}
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors z-10"
        aria-label="Previous slide"
      >
        <FaChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors z-10"
        aria-label="Next slide"
      >
        <FaChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ArtifactCarousel;