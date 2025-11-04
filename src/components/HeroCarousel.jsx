import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../index.css";

const HeroCarousel = () => {
  const imagensImportadas = import.meta.glob("../assets/fotos/*.jpg", { eager: true });

  const imagens = Object.entries(imagensImportadas)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, modulo]) => modulo.default);

  return (
    <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden rounded-2xl shadow-xl bg-gradient-to-b from-[#f3ece2] to-[#d6ccc2]">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        speed={800}
        className="h-full w-full"
      >
        {imagens.map((img, i) => (
          <SwiperSlide key={i} className="flex items-center justify-center">
            <div className="flex items-center justify-center w-full h-full bg-[#eae4dc]">
              <img
                src={img}
                alt={`Foto ${i + 1}`}
                className="w-auto h-full md:h-full object-contain transition-transform duration-700 ease-in-out hover:scale-105"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradiente decorativo suave por cima */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f6f1eb]/60 pointer-events-none"></div>
    </div>
  );
};

export default HeroCarousel;
