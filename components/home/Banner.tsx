"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BannerSlide } from "@/types";
import { cn } from "@/lib/utils";

const slides: BannerSlide[] = [

  {
    id: 3,
    image_url: "https://res.cloudinary.com/dtho1iv7d/image/upload/v1750327874/slide3_zgcitq.jpg",
    
    title: "The Beginning of Our Journey"
  },
  {
    id: 4,
    image_url: "https://res.cloudinary.com/dtho1iv7d/image/upload/v1750327875/slide2_gncfby.jpg",
    title: "The Beginning of Our Journey"
  },
  {
    id: 5,
    image_url: "https://res.cloudinary.com/dtho1iv7d/image/upload/v1750327877/slid1_n3cirb.jpg",
    title: "Forever & Always"
  },
  {
    id: 6,
    image_url: "https://res.cloudinary.com/dtho1iv7d/image/upload/v1750328316/slid4_nycpts.jpg",
    title: "Our Special Day"
  }
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);
  
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);
  
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);
  
  return (
    <div className="relative h-[60vh] w-full overflow-hidden md:h-[80vh]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image_url}
            alt={slide.title || "Wedding photo"}
            fill
            priority={index === 0}
            className="object-cover sm:object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="font-cormorant text-4xl font-semibold text-white md:text-6xl lg:text-7xl">
              {slide.title}
            </h1>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentSlide ? "bg-white w-4" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}