import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

export interface Review {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  tag: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    id: "r-1",
    name: "Siska Wardhani",
    role: "Pecinta Kuliner (Bandung)",
    rating: 5,
    text: "Porsi steak di Bonfire benar-benar sangat memuaskan, sangat besar! Rasa daging Aussie Sirloin-nya juicy parah dengan grill mark yang cantik. Ditambah suasana kayu hangat yang mewah, ini steakhouse terbaik di Bandung saat ini.",
    tag: "Steak Premium",
    date: "2 Juni 2026"
  },
  {
    id: "r-2",
    name: "Dr. Adrian Pratama",
    role: "Keluarga & Profesional",
    rating: 5,
    text: "Tempat favorit keluarga kami sewaktu mencari makanan panggangan di Jl. Riau. Area parkirnya sangat luas, meja besar nyaman, dan pelayanannya super ramah. Anak-anak sangat suka burger khasnya dan wafel pisang Nutella.",
    tag: "Ramah Keluarga",
    date: "14 Juni 2026"
  },
  {
    id: "r-3",
    name: "Farhan Mahendra",
    role: "Pengunjung Luar Kota (Jakarta)",
    rating: 5,
    text: "Selalu menyempatkan mampir ke Bonfire setiap liburan akhir pekan ke Bandung. Daging sandung lamur 12 jamnya luar biasa empuk, aromanya benar-benar smokey alami. Harganya pun sangat bersahabat dibanding steakhouse Jakarta.",
    tag: "Paling Populer",
    date: "20 Juni 2026"
  },
  {
    id: "r-4",
    name: "Amanda Lestari",
    role: "Klub Penikmat Musik",
    rating: 4,
    text: "Sangat menikmati suasana makan malam di area outdoor dengan iringan live musik. Steak ayamnya tebal dan gurih bumbu herba, dipadu mocktail Flamin' Sunset yang segar sekali. Sangat direkomendasikan bagi pasangan muda.",
    tag: "Musik Live",
    date: "21 Juni 2026"
  },
  {
    id: "r-5",
    name: "Rian Hidayat",
    role: "Pecinta Masakan Barat",
    rating: 5,
    text: "Pelayanan di Bonfire sangat hangat dan cepat tanggap meski sedang ramai pengunjung. Pasta carbonara truffle-nya wangi sekali melimpah keju parmesan kelas atas. On Fire Burger-nya juga jempolan rasanya bikin nagih.",
    tag: "Pelayanan Terbaik",
    date: "22 Juni 2026"
  }
];

export default function ReviewCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Absolute background blur rings */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Outer Testimonial Showcase Slider */}
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div 
          id="testimonial-active-bubble"
          className="relative bg-zinc-950/40 backdrop-blur-md rounded-3xl border border-stone-800/80 p-8 md:p-11 shadow-2xl overflow-hidden transition-all duration-500 hover:border-orange-500/10"
        >
          {/* Subtle wood premium accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-amber-900" />

          {/* Large decorative quotation mark background */}
          <Quote className="absolute right-8 top-12 w-28 h-28 text-orange-600/[0.04] pointer-events-none rotate-180" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono px-3 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full font-bold uppercase tracking-wider">
              ★ {REVIEWS[activeIndex].tag}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < REVIEWS[activeIndex].rating
                      ? "text-amber-500 fill-amber-500"
                      : "text-stone-700"
                  }`}
                />
              ))}
              <span className="text-amber-200 font-mono text-sm ml-1.5 font-bold">
                {REVIEWS[activeIndex].rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Testimonial Quote */}
          <p className="text-stone-200 text-lg md:text-xl font-sans leading-relaxed italic mb-8 relative z-10">
            "{REVIEWS[activeIndex].text}"
          </p>

          {/* User profile & Meta */}
          <div className="flex items-center justify-between border-t border-stone-800/60 pt-6 mt-4">
            <div>
              <h4 className="text-stone-100 font-medium font-sans text-base tracking-wide uppercase">
                {REVIEWS[activeIndex].name}
              </h4>
              <p className="text-stone-400 text-xs font-mono uppercase mt-0.5 tracking-wider">
                {REVIEWS[activeIndex].role}
              </p>
            </div>
            <div className="text-right">
              <span className="text-stone-500 text-xs font-mono">{REVIEWS[activeIndex].date}</span>
            </div>
          </div>
        </div>

        {/* Carousel controls with elegant rounded arrow buttons */}
        <div className="flex items-center justify-between mt-8 max-w-sm mx-auto">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-orange-600 text-stone-300 hover:text-white flex items-center justify-center border border-stone-800 hover:border-orange-500/30 transition-all duration-300 cursor-pointer shadow-md"
            aria-label="Ulasan Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5 pointer-events-none" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2.5">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  idx === activeIndex
                    ? "w-8 bg-orange-500 shadow-[0_0_10px_rgba(239,126,42,0.5)]"
                    : "w-2 bg-stone-700 hover:bg-stone-500"
                }`}
                aria-label={`Lihat ulasan ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full bg-zinc-900 hover:bg-orange-600 text-stone-300 hover:text-white flex items-center justify-center border border-stone-800 hover:border-orange-500/30 transition-all duration-300 cursor-pointer shadow-md"
            aria-label="Ulasan Selanjutnya"
          >
            <ChevronRight className="w-5 h-5 pointer-events-none" />
          </button>
        </div>

        {/* Bottom review rate pill */}
        <div className="text-center mt-10">
          <p className="text-stone-400 font-sans text-xs uppercase tracking-wider">
            Dipercaya oleh lebih dari{" "}
            <span className="text-orange-500 font-bold font-mono">2.500+ pelanggan</span> di wilayah Bandung Raya
          </p>
        </div>
      </div>
    </div>
  );
}
