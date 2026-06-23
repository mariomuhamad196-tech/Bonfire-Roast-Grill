import React, { useState } from "react";
import { Maximize2, X, Sparkles, Star } from "lucide-react";

import imgSteak from "../assets/images/bonfire_steak3d_1782203586973.jpg";
import imgInterior from "../assets/images/bonfire_interior_1782203603134.jpg";
import imgBurger from "../assets/images/bonfire_burger_1782203617911.jpg";
import imgDory from "../assets/images/bonfire_dory_1782203631701.jpg";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  description: string;
  heightClass: string; // Dynamic heights to create brick masonry
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    src: imgSteak,
    alt: "Australian Grain-Fed Steak",
    title: "Australian Steak T-Bone",
    category: "Menu Utama",
    description: "450 gram potongan T-Bone Black Angus premium yang dipanggang sempurna dengan gosokan herba rahasia.",
    heightClass: "h-[250px] sm:h-[320px]"
  },
  {
    id: "gal-2",
    src: imgInterior,
    alt: "Luxury Dining Area",
    title: "Cozy Dining & Wood Cabin Interior",
    category: "Suasana",
    description: "Hangatnya nuansa kayu alami dan interior modern bercahaya bara kuning keemasan, menghadirkan suasana makan malam bersahaja.",
    heightClass: "h-[300px] sm:h-[420px]"
  },
  {
    id: "gal-3",
    src: imgBurger,
    alt: "On Fire Burger Stack",
    title: "The Signature On Fire Burger",
    category: "Terlaris",
    description: "Tumpukan patty wagyu tebal, lumeran keju cheddar oranye, bacon sapi garing, dan saus pedas aromatik.",
    heightClass: "h-[220px] sm:h-[280px]"
  },
  {
    id: "gal-4",
    src: imgDory,
    alt: "Crispy Herbs Grilled Dory",
    title: "Herb Butter Grilled Dory",
    category: "Seafood Grill",
    description: "Filet dory panggang wangi bumbu herba, lemon segar, dan asparagus renyah untuk santapan kaya protein rendah kalori.",
    heightClass: "h-[260px] sm:h-[350px]"
  },
  {
    id: "gal-5",
    // Premium Chocolate desserts representing our premium molten lava cake
    src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    alt: "Molten Lava Chocolate Cake",
    title: "Cokelat Lava Belgia Lumer",
    category: "Makanan Penutup",
    description: "Pusat lumer hangat cokelat premium Belgia dengan kontras es krim vanila dingin yang elegan.",
    heightClass: "h-[240px] sm:h-[310px]"
  },
  {
    id: "gal-6",
    // Premium mocktail bar representing Flamin' Sunset mocktail
    src: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80",
    alt: "Flamin' Sunset Mocktail",
    title: "Signature Sunset Mocktail",
    category: "Minuman Eksotis",
    description: "Kombinasi dingin perasan jeruk segar, sirup delima merah delima, markisa manis, dan soda aromatik dingin.",
    heightClass: "h-[280px] sm:h-[390px]"
  }
];

// Sub-component for individual item 3D Hover tilt effect
function GalleryItemCard({
  image,
  onClick,
}: {
  image: GalleryImage;
  onClick: () => void;
}) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside the card
    const y = e.clientY - rect.top; // y position inside the card
    
    // Normalized ranges from -10 deg to 10 deg tilt
    const rotateY = ((x / rect.width) - 0.5) * 16;
    const rotateX = -((y / rect.height) - 0.5) * 16;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${image.heightClass} rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-stone-800/80 shadow-lg group select-none transition-all duration-300`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1.0})`,
        boxShadow: isHovered 
          ? "0 15px 35px rgba(239, 126, 42, 0.15), 0 0 15px rgba(251, 191, 36, 0.05)" 
          : "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      {/* Background shadow overlay */}
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        referrerPolicy="no-referrer"
      />

      {/* Dim overlay that lightens up on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-stone-950/10 opacity-70 group-hover:opacity-60 transition-opacity duration-300" />

      {/* Top Banner Category Indicator */}
      <div className="absolute top-4 left-4 z-10">
        <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-stone-950/80 text-orange-400 font-bold rounded-md border border-stone-800 uppercase">
          {image.category}
        </span>
      </div>

      {/* Full scale absolute layout for texts */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 z-10">
        <h4 className="text-white font-sans text-base sm:text-lg font-medium tracking-wide uppercase group-hover:text-amber-300 transition-colors">
          {image.title}
        </h4>
        <p className="text-zinc-300 text-xs mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
          {image.description}
        </p>

        {/* Dynamic click maximize action indicator */}
        <div className="mt-3 flex items-center justify-between text-[11px] text-amber-500 font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-1">
            <Maximize2 className="w-3 h-3 text-orange-500 animate-pulse" />
            Buka Lightbox
          </span>
          <span className="text-zinc-500">4.8 Ulasan</span>
        </div>
      </div>

      {/* Glossy lighting reflection sweeping overlay on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  );
}

export default function GalleryMasonry() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (img: GalleryImage) => {
    setSelectedImage(img);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full">
      {/* 2-column on mobile, 3-column on medium & desktop masonry wrap */}
      <div className="columns-2 md:columns-3 gap-4 space-y-4">
        {GALLERY_IMAGES.map((img) => (
          <div key={img.id} className="break-inside-avoid">
            <GalleryItemCard image={img} onClick={() => openLightbox(img)} />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 bg-stone-950/95 backdrop-blur-lg z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in cursor-zoom-out"
        >
          {/* Close trigger button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 bg-zinc-900 border border-stone-800 text-stone-200 hover:text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer z-50 shadow-lg"
            aria-label="Tutup Galeri"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Lightbox interior wrap */}
          <div 
            onClick={(e) => e.stopPropagation()} // Stop bubbling up
            className="w-full max-w-5xl bg-zinc-900 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row cursor-default"
          >
            {/* Visual Panel */}
            <div className="w-full md:w-3/5 bg-black flex items-center justify-center max-h-[50vh] md:max-h-[70vh] overflow-hidden">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-contain md:max-h-[70vh]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Content info panel */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-stone-900 border-t md:border-t-0 md:border-l border-stone-800">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-orange-500/10 text-orange-400 font-bold rounded-full border border-orange-500/20 uppercase">
                    {selectedImage.category}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-mono font-bold ml-1">4.8 / 5</span>
                  </div>
                </div>

                <h3 className="text-white font-sans text-xl md:text-2xl font-bold uppercase tracking-wide">
                  {selectedImage.title}
                </h3>

                <p className="text-stone-300 font-sans text-sm leading-relaxed">
                  {selectedImage.description}
                </p>
                
                <div className="border-t border-stone-800/80 pt-4 space-y-2 text-xs text-stone-400 font-mono uppercase tracking-wider">
                  <div>• Lokasi: <span className="text-zinc-200">Jl. LLRE Martadinata 137, Bandung</span></div>
                  <div>• Kategori: <span className="text-zinc-200">Steakhouse Premium & Bar</span></div>
                </div>
              </div>

              {/* Action and feedback */}
              <div className="pt-6 border-t border-stone-800/80 mt-6 flex items-center justify-between">
                <button
                  onClick={closeLightbox}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white rounded-lg text-xs font-semibold cursor-pointer uppercase tracking-wider transition-colors"
                >
                  Kembali
                </button>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                  <Sparkles className="w-4 h-4 text-orange-500 animate-spin" />
                  <span>Cinematic Capture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
