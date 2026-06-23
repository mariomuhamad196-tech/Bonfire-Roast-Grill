import React from "react";
import { Phone, MessageSquare, MapPin, ExternalLink, Calendar, Clock } from "lucide-react";

export default function LocationMap() {
  const address = "Jl. LLRE Martadinata No.137, Cihapit, Bandung Wetan, Bandung, Jawa Barat";
  
  // Clean coordinates search query for Google Maps redirections
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Bonfire Roast & Grill Jl. LLRE Martadinata No.137 Bandung")}`;
  
  // Localized dialing link
  const phoneNo = "+6282110008545"; // New contact phone format (0821-1000-8545)
  const waUrl = "https://wa.me/6282110008545?text=Halo%20Bonfire%20Roast%20%26%20Grill%20Bandung%2C%20saya%20tertarik%20untuk%20reservasi%20meja%2Fmenanyakan%20menu.";

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Visual map rendering box (lg:col-span-7) */}
      <div 
        id="location-map-frame-holder"
        className="lg:col-span-7 rounded-2xl overflow-hidden border border-stone-800 bg-zinc-950/60 shadow-2xl relative min-h-[300px] sm:min-h-[400px] flex flex-col"
      >
        {/* Subtle wood premium accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600 z-10" />

        {/* Dynamic Map Iframe pointing directly to Jl. LLRE Martadinata 137 Bandung */}
        <iframe
          src="https://maps.google.com/maps?q=Jl.%20LLRE%20Martadinata%20No.137%2C%20Cihapit%2C%20Bandung&t=&z=16&ie=UTF8&iwloc=&output=embed"
          className="w-full flex-grow border-0 grayscale invert opacity-80 hover:opacity-95 transition-opacity duration-300 pointer-events-auto"
          title="Bonfire Roast & Grill Bandung Google Map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          aria-label="Google Map"
        />

        {/* Floating marker summary card */}
        <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:bottom-6 sm:max-w-xs bg-zinc-950/90 backdrop-blur-md p-4 rounded-xl border border-stone-800 shadow-2xl flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-500 shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-white font-sans text-xs font-semibold uppercase tracking-wider">LOKASI UTAMA</h4>
            <p className="text-stone-300 text-[11px] font-sans mt-1 leading-normal">
              Jl. LLRE Martadinata 137, Bandung, Jawa Barat (Riau Area)
            </p>
          </div>
        </div>
      </div>

      {/* Control panel & Contact triggers (lg:col-span-5) */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-zinc-950/40 backdrop-blur-sm border border-stone-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest px-2.5 py-1 bg-amber-500/10 text-amber-400 font-bold rounded-md border border-amber-500/20 uppercase">
              Rute & Kontak
            </span>
            <h3 className="text-white font-sans text-xl sm:text-2xl font-bold uppercase tracking-wide mt-3">
              Temukan Meja Anda di Pusat Bandung
            </h3>
            <p className="text-stone-400 font-sans text-sm mt-2 leading-relaxed">
              Terletak strategis di kawasan prestisius Riau, Bandung. Sangat mudah di jangkau, memiliki tempat parkir yang sangat luas dan aman, serta dilengkapi panggung musik live setiap akhir pekan.
            </p>
          </div>

          <div className="border-t border-stone-800/60 pt-5 space-y-4">
            {/* Address Row */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Alamat Restoran</span>
                <p className="text-stone-200 text-sm font-sans mt-0.5">{address}</p>
              </div>
            </div>

            {/* Opening Hours list */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">Jam Operasional</span>
                <div className="text-stone-200 text-xs font-sans mt-1 space-y-1">
                  <div className="flex justify-between gap-12">
                    <span>Senin - Kamis</span>
                    <span className="font-mono text-amber-200">10:00 - 22:00</span>
                  </div>
                  <div className="flex justify-between gap-12">
                    <span>Jumat - Sabtu</span>
                    <span className="font-mono text-amber-200">10:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between gap-12">
                    <span>Minggu</span>
                    <span className="font-mono text-amber-200">10:00 - 22:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Action Buttons requested (Panggil, WhatsApp, Arah) */}
        <div className="border-t border-stone-800/60 pt-6 mt-8 space-y-3.5">
          <div className="grid grid-cols-2 gap-3.5">
            {/* Panggil (Call Button) */}
            <a
              href={`tel:${phoneNo}`}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-stone-800 text-stone-200 hover:text-white rounded-xl border border-stone-800 transition-all font-sans text-xs uppercase font-bold tracking-wider cursor-pointer"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              Hubungi
            </a>

            {/* WhatsApp (WhatsApp Button) */}
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-[#128c7e]/10 hover:bg-[#128c7e]/25 text-[#25d366] rounded-xl border border-[#128c7e]/30 transition-all font-sans text-xs uppercase font-bold tracking-wider cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Tombol Arah (Directions Button) */}
          <a
            href={mapsSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white rounded-xl font-sans text-xs uppercase font-bold tracking-widest cursor-pointer group shadow-lg text-center"
          >
            <MapPin className="w-4.5 h-4.5" />
            Petunjuk Arah Maps
            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
