import React, { useState, useEffect } from 'react';
import Slide1 from "../../assets/images/slide1.png"
import Slide2 from "../../assets/images/slide2.png"
import Slide3 from "../../assets/images/slide3.png"


const Slider = () => {
  const slideInterval = 5000; // 5 seconds
  const slidesData = [
    { src: Slide1, alt: 'Slide 1' },
    { src: Slide2, alt: 'Slide 2' },
    { src: Slide3, alt: 'Slide 3' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [timer, setTimer] = useState(null);

  const showSlide = (slideIndex) => {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
      slide.classList.toggle('show-slide', index === slideIndex);
    });

    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === slideIndex);
    });
  };

  const nextSlide = () => {
    const nextSlideIndex = (currentSlide + 1) % slidesData.length;
    setCurrentSlide(nextSlideIndex);
    showSlide(nextSlideIndex);
  };

  const resetTimer = () => {
    if (timer) {
      clearInterval(timer);
    }
    setTimer(setInterval(nextSlide, slideInterval));
  };

  useEffect(() => {
    showSlide(currentSlide);
    resetTimer();

    return () => {
      clearInterval(timer); // Clear interval on component unmount
    };
  }, [currentSlide]); // Dependency on currentSlide

  const dots = slidesData.map((slide, index) => (
    <div
      key={index}
      className={`dot ${index === currentSlide ? 'active' : ''}`}
      data-slide-index={index}
      onClick={() => {
        setCurrentSlide(index);
        resetTimer();
      }}
    ></div>
  ));

  return (
    <div className="containers">
      <div className="slider objest-cover">
        {slidesData.map((slide, index) => (
          <img
            key={index}
            className={`slide ${index === 0 ? 'show-slide' : ''}`}
            src={slide.src}
            alt={slide.alt}
          />
        ))}
      </div>
      <div className="dots-container">{dots}</div>
    </div>
  );
};

export default Slider