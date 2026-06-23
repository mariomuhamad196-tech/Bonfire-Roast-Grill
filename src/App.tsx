import React, { useState, useEffect, useRef } from "react";
import {
  Flame,
  UtensilsCrossed,
  MapPin,
  Clock,
  Star,
  Search,
  Check,
  ChevronDown,
  Volume2,
  VolumeX,
  Sparkles,
  Ticket,
  Instagram,
  Music,
  Maximize2,
  Phone,
  BookmarkCheck,
  Filter,
  X,
  Coffee,
  Grid
} from "lucide-react";

import { MENU_ITEMS, CATEGORIES, MenuItem } from "./data/menuData";
import InteractiveSteak3D from "./components/InteractiveSteak3D";
import ReviewCarousel from "./components/ReviewCarousel";
import GalleryMasonry from "./components/GalleryMasonry";
import LocationMap from "./components/LocationMap";
import BookingModal, { Booking } from "./components/BookingModal";

// Import locally compiled image assets for bulletproof production builds
import imgInterior from "./assets/images/bonfire_interior_1782203603134.jpg";
import imgSteak from "./assets/images/bonfire_steak3d_1782203586973.jpg";
import imgBurger from "./assets/images/bonfire_burger_1782203617911.jpg";
import imgDory from "./assets/images/bonfire_dory_1782203631701.jpg";

// Procedural Audio Synthesizer for Cooking Sound Vibe
class AudioSizzleSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private noiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  public start() {
    if (this.isPlaying) return;
    try {
      // Lazy initialization on user click
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        console.warn("Web Audio API not supported in this frame environment.");
        return;
      }
      this.ctx = new AudioCtx();
      
      const bufferSize = 2 * this.ctx.sampleRate;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      // Populate buffer with white noise + crackling pops
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Occasional snap/pop
        const pop = Math.random() > 0.9995 ? (Math.random() > 0.5 ? 1 : -1) * 0.8 : 0;
        output[i] = white * 0.12 + pop;
      }
      
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;
      
      // Filter out low rumbling frequencies to make it sound like sizzle crisp
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = "highpass";
      this.filterNode.frequency.value = 1600; // High sizzle focus
      
      const gainNode = this.ctx.createGain();
      gainNode.gain.value = 0.08; // quiet background sizzle
      
      noiseSource.connect(this.filterNode);
      this.filterNode.connect(gainNode);
      gainNode.connect(this.ctx.destination);
      
      noiseSource.start();
      this.isPlaying = true;
      (this as any).source = noiseSource;
      (this as any).gain = gainNode;
    } catch (e) {
      console.warn("Web Audio API not supported in this frame environment.", e);
    }
  }

  public stop() {
    if (!this.isPlaying) return;
    try {
      if ((this as any).source) {
        (this as any).source.stop();
      }
      if (this.ctx) {
        this.ctx.close();
      }
      this.isPlaying = false;
    } catch (err) {}
  }
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menuLimit, setMenuLimit] = useState(9); // initially show 9 to avoid vertical clutter
  const audioSynthRef = useRef<AudioSizzleSynthesizer | null>(null);

  // Animated counters for About Section
  const [rating, setRating] = useState(0.0);
  const [reviews, setReviews] = useState(0);
  const [halal, setHalal] = useState(0);
  const countersInitialized = useRef(false);

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bonfire_bookings");
      if (stored) {
        setActiveBookings(JSON.parse(stored));
      }
    } catch (e) {}
  }, []);

  // Intersection Observer for About counters
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !countersInitialized.current) {
          countersInitialized.current = true;
          // Animate Rating (0 to 4.8)
          let currentRating = 0;
          const ratingInterval = setInterval(() => {
            currentRating += 0.2;
            if (currentRating >= 4.8) {
              setRating(4.8);
              clearInterval(ratingInterval);
            } else {
              setRating(parseFloat(currentRating.toFixed(1)));
            }
          }, 45);

          // Animate Reviews (0 to 2581)
          let currentReviews = 0;
          const reviewsInterval = setInterval(() => {
            currentReviews += 75;
            if (currentReviews >= 2581) {
              setReviews(2581);
              clearInterval(reviewsInterval);
            } else {
              setReviews(currentReviews);
            }
          }, 30);

          // Animate Halal Percentage (0 to 100)
          let currentHalal = 0;
          const halalInterval = setInterval(() => {
            currentHalal += 4;
            if (currentHalal >= 100) {
              setHalal(100);
              clearInterval(halalInterval);
            } else {
              setHalal(currentHalal);
            }
          }, 30);
        }
      },
      { threshold: 0.15 }
    );

    const target = document.getElementById("about-stats-section");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  // Toggle Sizzle Synthesizer Audio
  const handleSoundToggle = () => {
    if (!audioSynthRef.current) {
      audioSynthRef.current = new AudioSizzleSynthesizer();
    }
    if (soundEnabled) {
      audioSynthRef.current.stop();
      setSoundEnabled(false);
    } else {
      audioSynthRef.current.start();
      setSoundEnabled(true);
    }
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setActiveBookings((prev) => [...prev, newBooking]);
    setIsBookingOpen(false);
  };

  const handleCancelBooking = (code: string) => {
    const filtered = activeBookings.filter((b) => b.code !== code);
    setActiveBookings(filtered);
    try {
      localStorage.setItem("bonfire_bookings", JSON.stringify(filtered));
    } catch (e) {}
  };

  // Filter menu items by search and category
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Unique 3D hover states for the Grilled Dory section
  const [doryTilt, setDoryTilt] = useState({ x: 0, y: 0 });
  const [doryHover, setDoryHover] = useState(false);

  const handleDoryMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 15; // rotate y side to side
    const rotateX = -((y / rect.height) - 0.5) * 15; // rotate x up and down
    setDoryTilt({ x: rotateX, y: rotateY });
  };

  const handleDoryMouseLeave = () => {
    setDoryTilt({ x: 0, y: 0 });
    setDoryHover(false);
  };

  return (
    <div className="min-h-screen bg-[#0c0908] text-stone-200 selection:bg-orange-600 selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. TOP NAVBAR / HEADER (Sticky translucent) */}
      <header className="sticky top-0 z-40 w-full bg-stone-900/80 backdrop-blur-md border-b border-stone-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Slogan */}
          <a href="#hero" className="flex items-center gap-2 group cursor-pointer focus:outline-none">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Flame className="w-5.5 h-5.5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-white font-display text-lg tracking-wider font-extrabold uppercase block group-hover:text-orange-400 transition-colors">
                BONFIRE
              </span>
              <span className="text-stone-500 text-[9px] font-mono tracking-widest uppercase block -mt-1">
                Roast & Grill
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-widest font-semibold text-stone-400">
            <a href="#story" className="hover:text-orange-400 transition-colors cursor-pointer">Kisah</a>
            <a href="#unggulan" className="hover:text-orange-400 transition-colors cursor-pointer">Unggulan</a>
            <a href="#menu" className="hover:text-orange-400 transition-colors cursor-pointer">Menu</a>
            <a href="#galeri" className="hover:text-orange-400 transition-colors cursor-pointer">Galeri</a>
            <a href="#keunggulan" className="hover:text-orange-400 transition-colors cursor-pointer">Keunggulan</a>
            <a href="#alamat" className="hover:text-orange-400 transition-colors cursor-pointer">Kontak</a>
          </nav>

          {/* Nav Actions (Sound Toggle & Reservation CTA) */}
          <div className="flex items-center gap-3">
            {/* Audio Sizzler Synthesizer Button */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? "Matikan Suara Membakar" : "Nyalakan Suara Membakar"}
              className={`p-2.5 rounded-full border transition-all text-stone-400 hover:text-white cursor-pointer hidden sm:flex items-center justify-center ${
                soundEnabled
                  ? "bg-orange-500/10 border-orange-500 text-orange-400 animate-pulse"
                  : "bg-zinc-950 border-stone-800 hover:border-stone-700"
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Main Reservation CTA */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-display text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg shadow-orange-500/10 hover:-translate-y-0.5"
            >
              Pesan Meja
            </button>
          </div>
        </div>
      </header>

      {/* FIXED FLOATING WATERMARK AND AUDIO TOGGLE FOR MOBILE */}
      <div className="fixed bottom-4 left-4 z-30 sm:hidden">
        <button
          onClick={handleSoundToggle}
          className={`p-3 rounded-full border transition-all text-stone-200 hover:text-white shadow-2xl flex items-center justify-center ${
            soundEnabled
              ? "bg-orange-600 border-orange-500 animate-pulse"
              : "bg-stone-900 border-stone-800"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* 2. BAGIAN UTAMA (Hero Section) */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center py-16 overflow-hidden">
        {/* Cinematic atmospheric background layer */}
        <div className="absolute inset-0 bg-stone-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.12),transparent_70%)] pointer-events-none" />
          {/* Subtle wood floor overlay */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-600/10 text-orange-400 rounded-md border border-orange-500/20 font-mono text-xs uppercase tracking-widest font-bold">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>THE ULTIMATE WOOD RESTORAN & GRILL</span>
            </div>

            <h1 className="text-white font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-none">
              PENGALAMAN <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-amber-600">BARBEKYU FAVORIT</span> BANDUNG
            </h1>

            <p className="text-stone-300 text-sm sm:text-base md:text-lg font-sans max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Manjakan selera Anda dengan sajian Steak Premium pilihan, Burger buatan segar, dan ayam bakar panggang kayu buah sejati. Diciptakan dengan bumbu herba warisan untuk kebersamaan makan malam keluarga Anda di Kota Kembang.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-xl shadow-orange-500/20 flex items-center gap-2 group"
              >
                <span>Pesen Meja Sekarang</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <a
                href="#menu"
                className="px-7 py-4 bg-zinc-900 hover:bg-stone-800 text-stone-200 hover:text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-stone-800 hover:border-stone-700 cursor-pointer"
              >
                Lihat Menu Lengkap
              </a>
            </div>

            {/* Key credentials metrics row */}
            <div className="pt-8 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 border-t border-stone-900 text-left">
              <div>
                <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider block">PRESTIGE RATING</span>
                <strong className="text-white font-display text-lg font-bold">⭐️ 4.8 / 5.0</strong>
              </div>
              <div>
                <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider block">REVIEWERS</span>
                <strong className="text-white font-display text-lg font-bold">2.500+ Ulasan</strong>
              </div>
              <div>
                <span className="text-stone-500 font-mono text-[9px] uppercase tracking-wider block">GRILL METHOD</span>
                <strong className="text-orange-400 font-display text-lg font-bold">Arang Kayu</strong>
              </div>
            </div>
          </div>

          {/* Right 3D Visual Mesh Column */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <InteractiveSteak3D />
          </div>
        </div>
      </section>

      {/* 3. BAGIAN TENTANG (About Section with dynamic counters) */}
      <section id="story" className="py-24 bg-zinc-950/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image grid representing restaurant dining experience */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-stone-800/80 shadow-2xl aspect-[4/3] group bg-[#0e0a09]">
              {/* Premium cozy steakhouse dining interior image */}
              <img
                src={imgInterior}
                alt="Bonfire Dine-In Experience"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-750"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              
              {/* Overlay location detail stamp */}
              <div className="absolute top-6 right-6 backdrop-blur-md bg-stone-950/80 border border-stone-800 p-3.5 rounded-2xl flex items-center gap-2 max-w-xs shadow-lg">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block tracking-wider">Bandung Steakhouse</span>
                  <p className="text-stone-200 text-xs font-sans font-semibold">Jl. LLRE Martadinata No.137</p>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-base font-sans italic font-medium">
                  "Suasana makan dalam ruangan yang sangat nyaman berselimut wangi asap kayu aromatik."
                </p>
              </div>
            </div>

            {/* Right text layout & statistics (about-stats-section) */}
            <div id="about-stats-section" className="lg:col-span-6 space-y-6 lg:pl-4">
              <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-400 font-bold rounded-md border border-amber-500/20 uppercase">
                Kisah & Craftsmanship
              </span>
              <h2 className="text-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
                Panggang Lambat, Sajian Sempurna
              </h2>
              <p className="text-stone-300 font-sans text-sm sm:text-base leading-relaxed">
                Terinspirasi dari rahasia teknik pemanggangan barbekyu koboi yang diolah lambat, Bonfire Roast & Grill Bandung didirikan untuk menghadirkan kelezatan daging sejati bagi Anda.
              </p>
              <p className="text-stone-400 font-sans text-sm leading-relaxed">
                Kami bangga mengimpor potongan daging sapi Australian pilihan, menyajikan porsi makanan yang melimpah (porsi besar sejati), serta memberikan suasana ruang santap beraksen kayu premium yang ramah keluarga, pasangan, maupun kolega bisnis.
              </p>

              {/* Counters section animated by scroll */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-stone-900">
                {/* Stat 1: 4.8 Rating */}
                <div className="text-left">
                  <div className="text-orange-500 font-display text-2xl sm:text-3xl font-extrabold flex items-baseline gap-0.5">
                    <span>{rating.toFixed(1)}</span>
                    <span className="text-amber-500 text-xs sm:text-sm">★</span>
                  </div>
                  <span className="text-stone-400 text-[10px] font-mono uppercase tracking-widest font-semibold block mt-1.5">
                    Prestise Rating
                  </span>
                  <span className="text-stone-500 text-[9px] font-sans block mt-0.5">
                    Dari 2.581+ Ulasan
                  </span>
                </div>

                {/* Stat 2: 2500+ Reviews */}
                <div className="text-left">
                  <div className="text-orange-500 font-display text-2xl sm:text-3xl font-extrabold">
                    {reviews.toLocaleString("id-ID")}+
                  </div>
                  <span className="text-stone-400 text-[10px] font-mono uppercase tracking-widest font-semibold block mt-1.5">
                    Pelanggan Puas
                  </span>
                  <span className="text-stone-500 text-[9px] font-sans block mt-0.5">
                    Ulasan Terkonfirmasi
                  </span>
                </div>

                {/* Stat 3: 100% Halal Certified */}
                <div className="text-left">
                  <div className="text-orange-500 font-display text-2xl sm:text-3xl font-extrabold">
                    {halal}%
                  </div>
                  <span className="text-stone-400 text-[10px] font-mono uppercase tracking-widest font-semibold block mt-1.5">
                    Halal Premium
                  </span>
                  <span className="text-stone-500 text-[9px] font-sans block mt-0.5">
                    Bahan-Bahan Rapi
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 font-mono uppercase tracking-widest font-bold"
                >
                  <span>Explore 50+ Sajian Kami</span>
                  <span>→</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. BAGIAN MENU UNGGULAN (Core 3D Hover food cards) */}
      <section id="unggulan" className="py-24 bg-stone-950 relative overflow-hidden">
        {/* Atmosphere red rings */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-orange-500/10 text-orange-400 font-bold rounded-md border border-orange-500/20 uppercase">
              Sajian Bestseller
            </span>
            <h2 className="text-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Tiga Menu Kebanggaan Bonfire
            </h2>
            <p className="text-stone-400 font-sans text-xs sm:text-sm">
              Potongan daging sapi gourmet, tumpukan roti artisan buatan segar, dan teknik mengasapan herba terbaik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Sirloin Steak Australia */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-xl hover:border-orange-500/20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative mb-5 bg-[#0e0b0a]">
                  <img
                    src={imgSteak}
                    alt="Australian Grain Feed Sirloin Steak"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-stone-950/85 border border-amber-500/30 text-amber-300 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold">
                    STEAK PREMIUM
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-sans text-lg font-bold uppercase tracking-wide group-hover:text-amber-300 transition-colors">
                    Sirloin Australia
                  </h3>
                  <span className="text-amber-400 font-mono text-xs font-bold">Rp198.000</span>
                </div>
                
                <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                  Australian Grain-Fed Sirloin Steak premium berukuran 200 gram yang juicy dengan lapisan lemak gurih khas. Panggang dngan arang beraroma rempah.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">Makan di Tempat / Bawa Pulang</span>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-2 bg-zinc-950 hover:bg-orange-600 text-stone-200 hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-stone-800 hover:border-orange-500/30 transition-all cursor-pointer"
                >
                  Pesan Meja
                </button>
              </div>
            </div>

            {/* Card 2: On Fire Wagyu Burger */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 shadow-xl hover:border-orange-500/20 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative mb-5 bg-[#0e0b0a]">
                  <img
                    src={imgBurger}
                    alt="Signature On Fire Wagyu Burger"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-stone-950/85 border border-amber-500/30 text-amber-300 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold">
                    SANGAT PEDAS
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-white font-sans text-lg font-bold uppercase tracking-wide group-hover:text-amber-300 transition-colors">
                    On Fire Burger
                  </h3>
                  <span className="text-amber-400 font-mono text-xs font-bold">Rp95.000</span>
                </div>

                <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                  Paduan lumeran keju cheddar, bacon sapi panggang, tumpukan patty daging wagyu impor tebal garing, caramel onion, dan siraman saus pedas khas BBQ.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500">Premium Brioche Bun</span>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-2 bg-zinc-950 hover:bg-orange-600 text-stone-200 hover:text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider border border-stone-800 hover:border-orange-500/30 transition-all cursor-pointer"
                >
                  Pesan Meja
                </button>
              </div>
            </div>

            {/* Card 3: Interactive Grilled Dory Fish - WITH REQUIRED 3D HOVER, FLOATING & SHADOW GLOW EFFECTS */}
            <div
              onMouseMove={handleDoryMouseMove}
              onMouseLeave={handleDoryMouseLeave}
              onMouseEnter={() => setDoryHover(true)}
              className="bg-stone-900 border border-stone-800 rounded-3xl p-5 flex flex-col justify-between group relative select-none cursor-pointer overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateX(${doryTilt.x}deg) rotateY(${doryTilt.y}deg) translateY(${doryHover ? "-8px" : "0px"})`,
                boxShadow: doryHover
                  ? "0 20px 40px rgba(251, 191, 36, 0.12), 0 0 25px rgba(239, 126, 42, 0.2)"
                  : "0 10px 30px rgba(0,0,0,0.3)",
                transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
              }}
            >
              {/* Highlighting badge */}
              <div className="absolute top-4 left-4 z-10 bg-amber-500/90 text-stone-950 font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md font-bold">
                GLOWING 3D HOVER EFFECT
              </div>

              <div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] relative mb-5 bg-[#0e0b0a]">
                  <img
                    src={imgDory}
                    alt="Signature Herb Grilled Dory"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glowing amber radial gradient on hover */}
                  <div className={`absolute inset-0 bg-radial from-orange-600/10 via-transparent to-transparent pointer-events-none transition-opacity duration-300 ${doryHover ? "opacity-100" : "opacity-0"}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 right-3 bg-stone-950/85 border border-amber-500/30 text-amber-300 font-mono text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-md font-bold">
                    IKAN DORY SEGAR
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-white font-sans text-lg font-bold uppercase tracking-wide group-hover:text-amber-300 transition-colors">
                    Ikan Dory Panggang
                  </h3>
                  <span className="text-amber-400 font-mono text-xs font-bold">Rp65.000</span>
                </div>

                <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                  Fillet ikan Dory panggang herba berlapis gurihnya herb wood mentega, jus lemon segar, dipadu dengan asparagus panggang hijau krispi.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/40 flex items-center justify-between">
                <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-extrabold animate-pulse">
                  * 3D Floating Card
                </span>
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-orange-500/10"
                >
                  Pesan Meja
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FULL COMPREHENSIVE MENU - DISPLAYS OVER 50 ITEMS CLEANLY */}
      <section id="menu" className="py-24 bg-stone-950/50 border-t border-stone-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Menu Title heading */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-orange-500/10 text-orange-400 font-bold rounded-md border border-orange-500/20 uppercase">
                Menu Lengkap 50+ Pilihan
              </span>
              <h2 className="text-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mt-3">
                Jelajahi Cita Rasa Bonfire
              </h2>
              <p className="text-stone-400 font-sans text-xs sm:text-sm mt-1">
                Gunakan filter kategori dan bilah pencarian untuk menyaring pesanan Anda.
              </p>
            </div>

            {/* Keyword Search Input Bar */}
            <div className="relative w-full md:max-w-sm shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setMenuLimit(9); // Reset limits during search
                }}
                placeholder="Cari makanan, steak, burger atau minuman..."
                className="w-full bg-zinc-900/90 border border-stone-800 hover:border-stone-700 focus:border-amber-500 text-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs outline-none focus:ring-1 focus:ring-amber-500/30 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white text-xs font-mono font-bold"
                >
                  RESET
                </button>
              )}
            </div>
          </div>

          {/* Tab Categories Filters Horizontal Scrollbar */}
          <div className="mb-10 overflow-x-auto pb-4 scrollbar-thin flex flex-nowrap gap-2.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setMenuLimit(9); // Reset limits during category switches
                }}
                className={`py-2 px-4 rounded-xl text-xs uppercase font-mono font-bold tracking-widest whitespace-nowrap border cursor-pointer transition-all ${
                  selectedCategory === cat.id
                    ? "bg-orange-500 text-stone-950 border-orange-500 shadow-md font-extrabold"
                    : "bg-zinc-900 hover:bg-stone-800 text-stone-400 border-stone-800 hover:border-stone-700"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Dishes list grid layout */}
          {filteredMenuItems.length === 0 ? (
            <div className="py-16 text-center border border-dashed border-stone-800 rounded-2xl bg-zinc-950/20 max-w-md mx-auto">
              <UtensilsCrossed className="w-10 h-10 text-stone-600 mx-auto mb-3" />
              <h4 className="text-white font-sans text-sm font-semibold">Tidak Ada Hidangan yang Cocok</h4>
              <p className="text-stone-400 text-xs mt-1 px-4">
                Coba cari dengan kata kunci lain atau pilih filter "Semua Menu".
              </p>
            </div>
          ) : (
            <div>
              {/* Dynamic list rendering */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.slice(0, menuLimit).map((item) => (
                  <div
                    key={item.id}
                    id={`menu-item-tile-${item.id}`}
                    className="relative bg-zinc-950/40 backdrop-blur-xs border border-stone-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-stone-700/80 transition-all duration-300 group"
                  >
                    {/* Floating labels */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
                      {item.isBestSeller && (
                        <span className="bg-orange-500 text-stone-950 font-mono text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                          Best Seller
                        </span>
                      )}
                      {item.isNew && (
                        <span className="bg-amber-400 text-stone-950 font-mono text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                          Terbaru
                        </span>
                      )}
                      {item.isFeatured && (
                        <span className="border border-orange-500 bg-zinc-950 text-orange-400 font-mono text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                          Sajian Utama
                        </span>
                      )}
                    </div>

                    <div className="space-y-3.5">
                      {/* Name & price heading */}
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="text-white font-sans text-sm sm:text-base font-bold uppercase tracking-wider group-hover:text-amber-300 transition-colors block">
                          {item.name}
                        </h4>
                        <span className="text-amber-400 font-mono text-xs sm:text-sm font-bold block shrink-0">
                          Rp{item.price.toLocaleString("id-ID")}
                        </span>
                      </div>

                      {/* Description Text */}
                      <p className="text-stone-400 text-xs leading-relaxed font-sans line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-900">
                      {/* Hot spice indicator */}
                      <div className="flex items-center gap-1">
                        {item.spicyLevel && item.spicyLevel > 0 ? (
                          <div className="flex items-center gap-0.5">
                            {[...Array(item.spicyLevel)].map((_, idx) => (
                              <Flame key={idx} className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                            ))}
                            <span className="text-[10px] font-mono text-orange-200 font-semibold ml-1 block">Pedas</span>
                          </div>
                        ) : (
                          <span className="text-[9px] font-mono text-zinc-500">Non-pedas</span>
                        )}
                      </div>

                      <button
                        onClick={() => setIsBookingOpen(true)}
                        className="px-3.5 py-1.5 bg-zinc-900 group-hover:bg-orange-600 text-[10px] font-mono font-bold uppercase tracking-wider text-stone-300 group-hover:text-white rounded-lg transition-colors cursor-pointer"
                      >
                        Pesan Meja
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Show more button if actual items are larger than limit */}
              {filteredMenuItems.length > menuLimit && (
                <div className="text-center mt-12">
                  <button
                    onClick={() => setMenuLimit((prev) => prev + 12)}
                    className="px-7 py-3.5 bg-zinc-900 hover:bg-stone-800 text-stone-200 hover:text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-stone-800 hover:border-stone-700 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Tampilkan Sajian Lainnya (+{filteredMenuItems.length - menuLimit} Hidangan)</span>
                    <ChevronDown className="w-4 h-4 text-orange-500 animate-bounce" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* 6. BAGIAN ULASAN PELANGGAN (Seamless Glassmorphism slider) */}
      <section className="py-24 bg-stone-950 relative overflow-hidden border-t border-stone-900">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-400 font-bold rounded-md border border-amber-500/20 uppercase">
              Ulasan Pelanggan
            </span>
            <h2 className="text-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Apa Kata Penikmat Bonfire?
            </h2>
            <p className="text-stone-400 font-sans text-xs sm:text-sm">
              Rating rata-rata <span className="text-amber-400 font-bold">4.8/5.0</span> didukung oleh lebih dari 2.581+ bintang terkonfirmasi dari berbagai penjuru.
            </p>
          </div>

          <ReviewCarousel />

        </div>
      </section>

      {/* 7. BAGIAN GALERI (Masonry responsive layout and lightbox popup) */}
      <section id="galeri" className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-orange-500/10 text-orange-400 font-bold rounded-md border border-orange-500/20 uppercase">
              Galeri Sinematik
            </span>
            <h2 className="text-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Eksplorasi Sudut Kuliner Bonfire
            </h2>
            <p className="text-stone-400 font-sans text-xs sm:text-sm">
              Gambar dinamis hidangan bestseller, area makan indoor modern kayu premium, serta detail panggangan bara api.
            </p>
          </div>

          <GalleryMasonry />

        </div>
      </section>

      {/* 8. BAGIAN KEUNGGULAN PENGALAMAN (3D styled flat icon cards) */}
      <section id="keunggulan" className="py-24 bg-zinc-950/40 relative border-t border-stone-900">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-orange-600/[0.04] rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-400 font-bold rounded-md border border-amber-500/20 uppercase">
              Keunggulan Kami
            </span>
            <h2 className="text-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Lima Pengalaman Utama Anda
            </h2>
            <p className="text-stone-400 font-sans text-xs sm:text-sm">
              Mengapa Bonfire Roast & Grill menjadi pilihan utama berkumpulnya keluarga dan pecinta kuliner Bandung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Keunggulan 1: Porsi Besar */}
            <div className="bg-stone-900 border border-stone-800 hover:border-orange-500/20 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto shadow-md">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <h3 className="text-white font-sans text-sm font-bold uppercase tracking-wider">
                Porsi Besar Sejati
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed font-sans">
                Setiap hidangan disajikan dalam porsi mewah melimpah, mengenyangkan perut lapar dengan kelezatan maksimal.
              </p>
            </div>

            {/* Keunggulan 2: Musik Live */}
            <div className="bg-stone-900 border border-stone-800 hover:border-orange-500/20 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto shadow-md">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-white font-sans text-sm font-bold uppercase tracking-wider">
                Acoustic Live Music
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed font-sans">
                Iringan alunan musik akustik hangat setiap akhir pekan untuk melengkapi santap malam romantis Anda.
              </p>
            </div>

            {/* Keunggulan 3: Ramah Keluarga */}
            <div className="bg-stone-900 border border-stone-800 hover:border-orange-500/20 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto shadow-md">
                <Coffee className="w-6 h-6" />
              </div>
              <h3 className="text-white font-sans text-sm font-bold uppercase tracking-wider">
                Kids & Family Friendly
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed font-sans">
                Meja beralas sofa kayu besar, area makan bebas asap rokok yang aman serta menu khusus ramah anak-anak.
              </p>
            </div>

            {/* Keunggulan 4: Parkir Luas */}
            <div className="bg-stone-900 border border-stone-800 hover:border-orange-500/20 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-white font-sans text-sm font-bold uppercase tracking-wider">
                Lahan Parkir Luas
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed font-sans">
                Akses parkir yang sangat mumpuni, lapang, aman, dan terjaga baik di kawasan sibuk Riau - Bandung.
              </p>
            </div>

            {/* Keunggulan 5: Suasana Nyaman */}
            <div className="bg-stone-900 border border-stone-800 hover:border-orange-500/20 p-6 rounded-2xl shadow-xl hover:-translate-y-1 transition-all text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mx-auto shadow-md">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-white font-sans text-sm font-bold uppercase tracking-wider">
                Kehangatan Bara Api
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed font-sans">
                Interior kayu alami berkualitas dilapisi ornamen hangat bercahaya lilin menghadirkan momen bersahaja.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 9. BAGIAN LOKASI (Interactive map & contact triggers & active bookings view) */}
      <section id="alamat" className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-orange-500/10 text-orange-400 font-bold rounded-md border border-orange-500/20 uppercase">
              Lokasi Utama
            </span>
            <h2 className="text-white font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
              Jl. LLRE Martadinata 137, Bandung
            </h2>
            <p className="text-stone-400 font-sans text-xs sm:text-sm">
              Hubungi staf reservasi pusat, tanyakan petunjuk koordinat, atau temui kami langsung.
            </p>
          </div>

          <LocationMap />

          {/* ACTIVE LOCAL RESERVATIONS SUMMARY SECTION (HIGH-TIER DEVELOPMENT DETAIL) */}
          {activeBookings.length > 0 && (
            <div className="mt-16 bg-gradient-to-br from-stone-900 via-zinc-950 to-stone-900 border border-stone-800/80 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.04]">
                <Ticket className="w-24 h-24" />
              </div>

              <div className="flex items-center gap-2.5 mb-6 border-b border-stone-800/60 pb-4">
                <BookmarkCheck className="w-6 h-6 text-orange-500" />
                <div>
                  <h4 className="text-white font-sans text-[15px] font-bold uppercase tracking-wider">Reservasi Aktif Anda</h4>
                  <p className="text-stone-500 text-[10px] font-mono uppercase">Tunjukkan tiket ini kepada pelayan resepsionis</p>
                </div>
              </div>

              <div className="space-y-4">
                {activeBookings.map((b) => (
                  <div
                    key={b.code}
                    className="bg-stone-950/80 rounded-2xl border border-stone-800 p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-grow text-xs font-sans text-stone-300">
                      <div>
                        <span className="text-stone-500 font-mono text-[9px] uppercase block tracking-wider">KODE TIKET</span>
                        <strong className="text-orange-400 font-mono text-sm tracking-widest block mt-0.5">{b.code}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 font-mono text-[9px] uppercase block tracking-wider">NAMA ANDA</span>
                        <strong className="text-white block mt-0.5 truncate max-w-[120px]">{b.name}</strong>
                      </div>
                      <div>
                        <span className="text-stone-500 font-mono text-[9px] uppercase block tracking-wider">TANGGAL & JAM</span>
                        <strong className="text-white block mt-0.5">{b.date} • <span className="text-amber-300">{b.time}</span></strong>
                      </div>
                      <div>
                        <span className="text-stone-500 font-mono text-[9px] uppercase block tracking-wider">KURSI & AREA</span>
                        <strong className="text-white block mt-0.5 uppercase">{b.guests}p ({b.seating})</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCancelBooking(b.code)}
                      className="px-4 py-2 bg-red-950/20 hover:bg-red-900/30 text-red-400 rounded-lg text-xs font-mono font-bold uppercase tracking-wider border border-red-900/30 transition-colors cursor-pointer block sm:shrink-0 text-center"
                    >
                      Batalkan
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-stone-950 border-t border-stone-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Col 1: Brand details */}
            <div className="space-y-4">
              <a href="#hero" className="flex items-center gap-2 group cursor-pointer focus:outline-none">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-600 to-amber-500 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                  <span className="text-white font-display text-base tracking-wider font-extrabold uppercase block">
                    BONFIRE
                  </span>
                  <span className="text-stone-500 text-[8px] font-mono tracking-widest uppercase block -mt-1">
                    Roast & Grill
                  </span>
                </div>
              </a>
              <p className="text-stone-400 text-xs font-sans leading-relaxed">
                Mengejar standar kualitas kemewahan tertinggi dalam setiap potongan daging steak premium untuk kehangatan bersantap keluarga Bandung.
              </p>
              <div className="flex items-center gap-3.5 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-stone-800 text-stone-400 hover:text-orange-500 flex items-center justify-center transition-colors"
                  aria-label="Instagram Bonfire"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#alamat"
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-stone-800 text-stone-400 hover:text-orange-500 flex items-center justify-center transition-colors"
                  aria-label="Navigasi Peta"
                >
                  <MapPin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Navigation map links */}
            <div className="space-y-4">
              <h4 className="text-white font-display text-xs font-bold uppercase tracking-widest">Navigasi Cepat</h4>
              <ul className="space-y-2 text-xs text-stone-400 font-sans">
                <li><a href="#story" className="hover:text-orange-400 transition-colors">Kisah Kami</a></li>
                <li><a href="#unggulan" className="hover:text-orange-400 transition-colors">Sajian Unggulan</a></li>
                <li><a href="#menu" className="hover:text-orange-400 transition-colors">Menu Lengkap 50+</a></li>
                <li><a href="#galeri" className="hover:text-orange-400 transition-colors">Galeri Sinematik</a></li>
                <li><a href="#keunggulan" className="hover:text-orange-400 transition-colors">Keunggulan Pengalaman</a></li>
              </ul>
            </div>

            {/* Col 3: Business Hours */}
            <div className="space-y-4">
              <h4 className="text-white font-display text-xs font-bold uppercase tracking-widest">Jam Operasional</h4>
              <ul className="space-y-2 text-xs text-stone-400 font-sans">
                <li className="flex justify-between">
                  <span>Senin - Kamis</span>
                  <span className="font-mono text-amber-200">10:00 - 22:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Jumat - Sabtu</span>
                  <span className="font-mono text-amber-200">10:00 - 23:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Minggu</span>
                  <span className="font-mono text-amber-200">10:00 - 22:00</span>
                </li>
                <li className="border-t border-stone-900 pt-2 text-[10px] text-orange-400 font-mono uppercase tracking-wider block">
                  * Live Acoustic Weekends
                </li>
              </ul>
            </div>

            {/* Col 4: Contact links */}
            <div className="space-y-4">
              <h4 className="text-white font-display text-xs font-bold uppercase tracking-widest">Kontak Reservasi</h4>
              <p className="text-stone-400 text-xs">
                Ada pertanyaan khusus atau reservasi rombongan / ulang tahun pernikahan? Hubungi tim kami:
              </p>
              <div className="space-y-2 text-xs font-mono">
                <a href="https://wa.me/6282110008545" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-stone-300 hover:text-orange-400 transition-colors cursor-pointer">
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  <span>0821-1000-8545</span>
                </a>
                <span className="flex items-center gap-2 text-stone-300">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span className="text-stone-400 block break-words">LLRE Martadinata 137, Bandung</span>
                </span>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-800/60 pt-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
            <p className="font-sans">
              © 2026 Bonfire Roast & Grill Bandung. Hak Cipta Dilindungi.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest">
              Designed by Elite Web Architect Award Winner
            </p>
          </div>

        </div>
      </footer>

      {/* RENDER RESERVATION DIALOG MODAL ON TRIGGER */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingSuccess={handleBookingSuccess}
      />

    </div>
  );
}
